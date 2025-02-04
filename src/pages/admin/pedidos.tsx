// Paulo Henrique

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

export default function Clientes() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState<string>('')
  const [clientes, setClientes] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { token, user } = useAuth()

  const isProducer = user?.tipoCliente?.tipo === 'Produtor' // Verifique a estrutura real dos dados

  async function getClientes() {
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const response = await api.get('/cliente', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setClientes(response.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError('Erro ao buscar clientes')
      console.error('Erro ao buscar clientes', error)
    }
  }

  useEffect(() => {
    if (token) {
      getClientes()
    }
  }, [token])

  const handleOpen = (newTitle: string) => {
    setTitle(newTitle)
    onOpen()
  }

  if (loading && token) {
    return (
      <Loading/>
    )
  }

  if (!isProducer) {
    return <NotPermission />
  }

  return (
    <>
      <Header />
      <Title name="Clientes" />
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
                {/* Centralizar os títulos das colunas */}
                {/* <Text textAlign="center" flex="1">ID</Text> */}
                <Text textAlign="start" flex="1">
                  CPF
                </Text>
                {/* <Text textAlign="start" flex="1">Data de Nascimento</Text> */}
                <Text textAlign="start" flex="2">
                  Nome
                </Text>
                <Text textAlign="start" flex="2">
                  E-mail
                </Text>
                <Text textAlign="start" flex="1">
                  Ações
                </Text>
              </Flex>

              <Divider borderColor="gray.300" mb="4" />

              {error && <Text color="red.500">{error}</Text>}

              {loading ? (
                <Text>Carregando clientes...</Text>
              ) : (
                clientes.map(cliente => (
                  <Flex
                    key={cliente.id}
                    justifyContent="space-between"
                    w="100%"
                    align="center"
                    gap="4"
                    mb="4"
                  >
                    {/* Definir limites de largura e aplicar ellipsis */}
                    {/* <Text textAlign="center" flex="1">{cliente.id}</Text> */}
                    <Text textAlign="start" flex="1">
                      {cliente.cpf}
                    </Text>
                    {/* <Text textAlign="start" flex="1">{cliente.dataNascimento}</Text> */}
                    <Text textAlign="start" flex="2">
                      {cliente.nome}
                    </Text>
                    <Text textAlign="start" flex="2">
                      {cliente.usuario.username}
                    </Text>

                    <Flex gap="2">
                      <Icon
                        as={IoEyeOutline}
                        boxSize="6"
                        cursor="pointer"
                        bg="blue.500"
                        color="white"
                        borderRadius="md"
                        p={1}
                        onClick={() => handleOpen('Visualizar Cliente')}
                      />
                      <Icon
                        as={FiEdit3}
                        boxSize="6"
                        cursor="pointer"
                        bg="yellow.400"
                        color="black"
                        borderRadius="md"
                        p={1}
                        onClick={() => handleOpen('Editar Cliente')}
                      />
                      <Icon
                        as={PiTrash}
                        boxSize="6"
                        cursor="pointer"
                        bg="red.500"
                        color="white"
                        borderRadius="md"
                        p={1}
                        onClick={() => api.delete(`/cliente/${cliente.id}`, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })}
                      />
                    </Flex>
                  </Flex>
                ))
              )}
            </Flex>
          </GridItem>
        </Grid>

        <Viewer isOpen={isOpen} onClose={onClose} title={title} />
      </Box>
    </>
  )
}
