// Paulo Henrique
// Gisele Oliveira
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
import BoxRelatorio from '~components/BoxRelatorio'
export default function Clientes() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState<string>('')
  const [clientes, setClientes] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { token, user } = useAuth()
  const bgBox = useColorModeValue('gray.50', 'gray.800')
  const produtos = [
    {
      nome: 'Produto 1',
      local: 'Local 1',
      data: '01/01/2025',
      quantidade: 15,
      total: 20,
      status: 'Ativo',
    },
    {
      nome: 'Produto 2',
      local: 'Local 2',
      data: '02/01/2025',
      quantidade: 30,
      total: 40,
      status: 'Inativo',
    },
    {
      nome: 'Produto 3',
      local: 'Local 3',
      data: '03/01/2025',
      quantidade: 25,
      total: 35,
      status: 'Ativo',
    },
  ]

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
        <Flex flexDirection={'column'}>
          <Text left={1} fontSize={30} fontWeight={700}>
            Dashboard
          </Text>
          <Flex justifyContent={'space-around'}>
            <BoxRelatorio
              src="/images/Icon.png"
              alt="Descrição da imagem"
              total={40.689}
              atualizacao=" Desde ontem"
            >
              Total de Usuários
            </BoxRelatorio>
            <BoxRelatorio
              src="/images/IconBox.png"
              alt="Descrição da imagem"
              total={40.689}
              atualizacao="Desde o último mês"
            >
              Total de pedidos
            </BoxRelatorio>{' '}
            <BoxRelatorio
              src="/images/IconNivel.png"
              alt="Descrição da imagem"
              total={40.689}
              atualizacao="Desde ontem"
            >
              Total de Vendas
            </BoxRelatorio>{' '}
            <BoxRelatorio
              src="/images/IconTime.png"
              alt="Descrição da imagem"
              total={40.689}
              atualizacao="Desde ontem"
            >
              Total de Cancelados
            </BoxRelatorio>
          </Flex>
        </Flex>
        <Box mt={8} bg={bgBox}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome do Produto</Th>
                <Th>Local</Th>
                <Th>Data </Th>
                <Th>Quantidade </Th>
                <Th>Total </Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {produtos.map((produto, index) => (
                <Tr key={index}>
                  <Td>{produto.nome}</Td>
                  <Td>{produto.local}</Td>
                  <Td>{produto.data}</Td>
                  <Td>{produto.quantidade}</Td>
                  <Td>{produto.total}</Td>
                  <Td>{produto.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </>
  )
}
