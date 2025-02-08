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
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
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
  
    const isAdmin = user?.usuario?.username?.includes('@discente.ifpe.edu.br');
  
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
        <Loading />
      )
    }
  
    if (!isAdmin) {
      return <NotPermission />
    }
    
    return (
      <>
        <Header />
        <Title name="Administração" />
        <Box bg={bg} p={8} minH="100vh">
          <Text>Dashboard</Text>
        </Box>
      </>
    )
  }
  