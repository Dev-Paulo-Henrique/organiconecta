import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Text,
  useDisclosure,
  useColorModeValue,
  Spinner,
  useBreakpointValue,
  Stack
} from '@chakra-ui/react'
import { IoEyeOutline } from 'react-icons/io5'
import { PiTrash } from 'react-icons/pi'
import { FiEdit3 } from 'react-icons/fi'
import { Header } from '~components/Header'
import { Viewer } from '~components/Modal'
import { useEffect, useState } from 'react'
import { api } from '~services/api'
import { useAuth } from '~hooks/useAuth'
import { Title } from '~components/Title'
import { NotPermission } from '~components/NotPermission'
import { Loading } from '~components/Loading'

export default function Pedidos() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const cardBg = useColorModeValue('white', 'gray.700') // Cor de fundo dos cards
  const color = useColorModeValue('gray.800', 'gray.100')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState<string>('Pedidos do Cliente')
  const [pedidos, setPedidos] = useState<any[]>([]) // Agora lidando com pedidos
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { token, user } = useAuth()

  const isMobile = useBreakpointValue({ base: true, md: false }) //Detecta se o aparelho é mobile
  const isProducer = user?.tipoCliente?.tipo === 'Produtor' // Verifique a estrutura real dos dados

  async function getPedidosPorCliente() {
    if (!user?.id || !token) {
      setLoading(false)
      return
    }

    try {
      const response = await api.get(`/pedido/cliente/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Filtrando os pedidos que pertencem ao cliente logado
      const pedidosFiltrados = response.data.filter((pedido: any) => pedido.cliente.id === user?.id)

      setPedidos(pedidosFiltrados)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError('Erro ao buscar pedidos')
      console.error('Erro ao buscar pedidos', error)
    }
  }

  useEffect(() => {
    if (token && user?.id) {
      getPedidosPorCliente()
    }
  }, [token, user?.id])

  const handleOpen = (newTitle: string) => {
    setTitle(newTitle)
    onOpen()
  }

  if (loading && token) {
    return (
      <Loading />
    )
  }

  if (!isProducer) {
    return <NotPermission />
  }

  return (
    <>
      <Header />
      <Title name="Pedidos" />
      <Box bg={bg} p={[4, 8]} minH="100vh">
      <Text fontSize={40} fontWeight={"bold"} textTransform={"uppercase"} my={5} textAlign={"center"}>Meus produtos</Text>
        <Grid templateAreas={`"main"`} gap="4">
          <GridItem area="main">
            <Flex
              as="form"
              bg={bg}
              p={[4, 8]}
              borderRadius="8"
              flexDir="column"
              maxW="1200px"
              mx="auto"
              bg={"white"}
            >

              {/* Tabela para desktop (oculta em mobile) */}
              <Box display={['none', 'none', 'block']}>
                <Flex
                  justifyContent="space-between"
                  w="100%"
                  fontWeight="bold"
                  align="center"
                  mb="4"
                  gap={4}
                >
                  <Text textAlign="start" flex="1">Cliente</Text>
                  <Text textAlign="start" flex="2">Nome do Produto</Text>
                  <Text textAlign="start" flex="2">Valor</Text>
                  <Text textAlign="start" flex="1">Data</Text>
                  {/* <Text textAlign="start" flex="1">Ações</Text> */}
                </Flex>

                <Divider borderColor="gray.300" mb="4" />

                {error && <Text color="red.500">{error}</Text>}

                {loading ? (
                  <Text>Carregando pedidos...</Text>
                ) : (
                  pedidos.map(pedido => (
                    <Flex
                      key={pedido.id}
                      justifyContent="space-between"
                      w="100%"
                      align="center"
                      gap="4"
                      borderBottomWidth={1}
                    borderBottomColor={"gray.300"}
                    borderBottomStyle={"dashed"}
                      mb="4"
                    pb={5}
                    >
                      <Text textAlign="start" flex="1">{pedido.cliente.nome}</Text>
                      <Text textAlign="start" flex="2">{pedido.itens.map((item: any) => item.produto.produtoNome).join(', ')}</Text>
                      <Text textAlign="start" flex="2">{new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(pedido.valorTotal)}</Text>
                      <Text textAlign="start" flex="1">{new Date(pedido.dataCompra).toLocaleDateString()}</Text>

                      {/* <Flex gap="2">
                        <Icon
                          as={IoEyeOutline}
                          boxSize="6"
                          cursor="pointer"
                          bg="blue.500"
                          color="white"
                          borderRadius="md"
                          p={1}
                          onClick={() => handleOpen('Visualizar Pedido')}
                        />
                        <Icon
                          as={FiEdit3}
                          boxSize="6"
                          cursor="pointer"
                          bg="yellow.400"
                          color="black"
                          borderRadius="md"
                          p={1}
                          onClick={() => handleOpen('Editar Pedido')}
                        />
                        <Icon
                          as={PiTrash}
                          boxSize="6"
                          cursor="pointer"
                          bg="red.500"
                          color="white"
                          borderRadius="md"
                          p={1}
                          onClick={() => api.delete(`/pedido/${pedido.id}`, {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          })}
                        />
                      </Flex> */}
                    </Flex>
                  ))
                )}
              </Box>

              {/* Cards para mobile (oculto em desktop) */}
              <Box display={['block', 'block', 'none']} pb="70px">
                {error && (
                  <Text color="red.500" textAlign="center" mb={4}>
                    {error}
                  </Text>
                )}

                {loading ? (
                  <Flex justify="center">
                    <Spinner size="lg" />
                  </Flex>
                ) : (
                  <Stack spacing={4}>
                    {pedidos.map(pedido => (
                      <Box
                        key={pedido.id}
                        bg={cardBg}
                        p={4}
                        borderRadius="md"
                        boxShadow="md"
                      >
                        <Stack spacing={2}>
                          <Text fontSize="sm">
                            <strong>Cliente:</strong> {pedido.cliente.nome}
                          </Text>
                          <Text fontSize="sm">
                            <strong>Produtos:</strong> {pedido.itens.map((item: any) => item.produto.produtoNome).join(', ')}
                          </Text>
                          <Text fontSize="sm">
                            <strong>Valor Total:</strong> {pedido.valorTotal}
                          </Text>
                          <Text fontSize="sm">
                            <strong>Data:</strong> {new Date(pedido.dataCompra).toLocaleDateString()}
                          </Text>
                          <Flex justify="flex-end" mt={2}>
                            <Flex gap="2">
                              <Icon
                                as={IoEyeOutline}
                                boxSize="5"
                                cursor="pointer"
                                bg="blue.500"
                                color="white"
                                borderRadius="md"
                                p={1}
                                onClick={() => handleOpen('Visualizar Pedido')}
                              />
                              <Icon
                                as={FiEdit3}
                                boxSize="5"
                                cursor="pointer"
                                bg="yellow.400"
                                color="black"
                                borderRadius="md"
                                p={1}
                                onClick={() => handleOpen('Editar Pedido')}
                              />
                              <Icon
                                as={PiTrash}
                                boxSize="5"
                                cursor="pointer"
                                bg="red.500"
                                color="white"
                                borderRadius="md"
                                p={1}
                                onClick={() => api.delete(`/pedido/${pedido.id}`, {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                })}
                              />
                            </Flex>
                          </Flex>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Box>
            </Flex>
          </GridItem>
        </Grid>

        <Viewer isOpen={isOpen} onClose={onClose} title={title} />
      </Box>
    </>
  )
}
