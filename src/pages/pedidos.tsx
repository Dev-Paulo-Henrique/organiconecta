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
import { useRouter } from 'next/router'
import { format } from 'date-fns'

export default function Pedidos() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState<string>('Pedidos do Cliente')
  const [pedidos, setPedidos] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { token, user } = useAuth()

  const isClient = user?.tipoCliente?.tipo === 'Cliente' // Verifique a estrutura real dos dados
  const isProducer = user?.tipoCliente?.tipo === 'Produtor' // Verifique a estrutura real dos dados

  // if(isProducer){
  //   router.push("/admin/pedidos")
  // }

  // Função para buscar pedidos do cliente
  async function getPedidos(idCliente: number) {
    if (!idCliente || !token) return

    setLoading(true) // Começar o carregamento

    try {
      const response = await api.get(`/pedido/cliente/${idCliente}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPedidos(response.data) // Armazenar os pedidos no estado
    } catch (error) {
      setError('Erro ao buscar pedidos')
      console.error('Erro ao buscar pedidos', error)
    } finally {
      setLoading(false) // Finalizar o carregamento
    }
  }

  // console.log(pedidos)
  useEffect(() => {
    if (user?.id) {
      getPedidos(user.id) // Buscar pedidos do cliente
    }
  }, [user, token])

  const handleOpen = (newTitle: string) => {
    setTitle(newTitle)
    onOpen()
  }

  if (!user && token) {
    return <Loading />
  }

  if (!isClient) {
    return <NotPermission />
  }

  return (
    <>
      <Header />
      <Title name="Pedidos" />
      <Box bg={bg} p={8} minH="100vh">
        <Grid templateAreas={`"main"`} gap="4">
          <GridItem area="main">
            <Flex
              as="form"
              bg={bg}
              p="8"
              borderRadius="8"
              flexDir="column"
              maxW="1200px"
              mx="auto"
            >
              <Flex
                justifyContent="space-between"
                w="100%"
                fontWeight="bold"
                align="center"
                mb="4"
                gap={4}
              >
                <Text textAlign="start" flex="1">
                  Pedido
                </Text>
                <Text textAlign="start" flex="2">
                  Itens
                </Text>
                <Text textAlign="start" flex="2">
                  Total
                </Text>
                <Text textAlign="start" flex="2">
                  Data
                </Text>
                {/* <Text textAlign="end" flex="1">
                  Ações
                </Text> */}
              </Flex>

              <Divider borderColor="gray.300" mb="4" />

              {error && <Text color="red.500">{error}</Text>}

              {loading ? (
                <Text textAlign={'center'}>Carregando pedidos...</Text>
              ) : pedidos.length > 0 ? (
                pedidos.map(pedido => (
                  <Flex
                    key={pedido.id}
                    justifyContent="space-between"
                    w="100%"
                    align="center"
                    gap="4"
                    mb="4"
                    borderBottomWidth={1}
                    borderBottomColor={"gray.300"}
                    borderBottomStyle={"dashed"}
                    pb={5}
                  >
                    <Text textAlign="start" flex="1">
                      # {pedido.id}
                    </Text>
                    <Text textAlign="start" flex="2">
                      {pedido.itens.map((item: any, index: number) => (
                        <span key={index}>
                          {item.quantidade} - {item.produto.produtoNome}
                          <br />
                        </span>
                      ))}
                    </Text>

                    <Text textAlign="start" flex="2">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(pedido.valorTotal)}
                    </Text>
                    <Text textAlign="start" flex="2">
                      {format(new Date(pedido.dataCompra), "dd/MM/yyyy" )}
                    </Text>
                    <Flex gap="2">
                      {/* <Icon
                        as={IoEyeOutline}
                        boxSize="6"
                        cursor="pointer"
                        bg="blue.500"
                        color="white"
                        borderRadius="md"
                        p={1}
                        onClick={() => handleOpen('Visualizar pedido')}
                      /> */}
                      {/* <Icon
                        as={FiEdit3}
                        boxSize="6"
                        cursor="pointer"
                        bg="yellow.400"
                        color="black"
                        borderRadius="md"
                        p={1}
                        onClick={() => handleOpen('Editar pedido')}
                      /> */}
                      {/* <Icon
                        as={PiTrash}
                        boxSize="6"
                        cursor="pointer"
                        bg="red.500"
                        color="white"
                        borderRadius="md"
                        p={1}
                        // OnClick to delete can be implemented here
                      /> */}
                    </Flex>
                  </Flex>
                ))
              ) : (
                <Text textAlign={'center'}>
                  Você não possui pedidos realizados.
                </Text>
              )}
            </Flex>
          </GridItem>
        </Grid>

        <Viewer isOpen={isOpen} onClose={onClose} title={title} />
      </Box>
    </>
  )
}
