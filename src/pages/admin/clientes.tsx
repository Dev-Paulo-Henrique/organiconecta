import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Stack,
  Text,
  useDisclosure,
  Input,
  useColorModeValue,
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

export default function Product() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState<string>("");
  const [clientes, setClientes] = useState([]) 
  const { token } = useAuth()

  async function getClientes () {
    try {
      const response = await api.get('/cliente', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log(response.data)

      setClientes(response.data)
    } catch (error) {
      console.error("Erro ao buscar clientes", error)
    }
  }

  useEffect(() => {
    getClientes()
  }, [])

  const handleOpen = (newTitle: string) => {
    setTitle(newTitle);
    onOpen();
  };

  return (
    <>
      <Header />
      <Title name="Clientes"/>
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
                mb="4"
              >
                <Text>ID</Text>
                <Text>CPF</Text>
                <Text>Data de Nascimento</Text>
                <Text>Nome</Text>
                <Text>E-mail</Text>
                <Text>Ações</Text>
              </Flex>

              <Divider borderColor="gray.300" mb="4" />

              {/* Renderizando os clientes dinamicamente */}
              {clientes.map((cliente: any) => (
                <Flex
                  key={cliente.id}
                  justifyContent="space-between"
                  w="100%"
                  align="center"
                  gap="4"
                  mb="4"
                >
                  <Text>{cliente.id}</Text>
                  <Text>{cliente.cpf}</Text>
                  <Text>{cliente.dataNascimento}</Text>
                  <Text>{cliente.nome}</Text>
                  <Text>{cliente.email}</Text>
                  <Flex gap="2">
                    <Icon
                      as={IoEyeOutline}
                      boxSize="6"
                      cursor="pointer"
                      bg="blue.500"
                      color="white"
                      borderRadius="md"
                      p={1}
                      onClick={() => handleOpen("Visualizar Cliente")}
                    />
                    <Icon
                      as={FiEdit3}
                      boxSize="6"
                      cursor="pointer"
                      bg="yellow.400"
                      color="black"
                      borderRadius="md"
                      p={1}
                      onClick={() => handleOpen("Editar Cliente")}
                    />
                    <Icon
                      as={PiTrash}
                      boxSize="6"
                      cursor="pointer"
                      bg="red.500"
                      color="white"
                      borderRadius="md"
                      p={1}
                      onClick={() => handleOpen("Deletar Cliente")}
                    />
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </GridItem>
        </Grid>

        <Viewer isOpen={isOpen} onClose={onClose} title={title}/>
      </Box>
    </>
  )
}
