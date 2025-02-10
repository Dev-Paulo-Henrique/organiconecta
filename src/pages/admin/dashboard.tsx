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
  IconButton,
  Button,
  HStack,
} from '@chakra-ui/react'
import { IoEyeOutline } from 'react-icons/io5'
import { PiTrash } from 'react-icons/pi'
import { Spline } from '~components/Grafico'
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
import dynamic from 'next/dynamic'
import { notifyError, notifySuccess } from '~utils/toastify'
import { useRouter } from 'next/router'

export default function Clientes() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState<string>('')
  const [clientes, setClientes] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [pedidos, setPedidos] = useState<any[]>([])
  const [vendasMensais, setVendasMensais] = useState<any[]>([])
  const { token, user } = useAuth()
  const router = useRouter()

  const isAdmin = user?.usuario?.username?.includes('@discente.ifpe.edu.br')

  const [lojaCount, setLojaCount] = useState<number>(0)
  const [clienteCount, setClienteCount] = useState<number>(0)
  const [produtoCount, setProdutoCount] = useState<number>(0)
  const [produtorCount, setProdutorCount] = useState<number>(0)
  const [lojas, setLojas] = useState<any[]>([])
  const [produtos, setProdutos] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const lojaCount = await getLojaCount()
        const { clienteCount, produtorCount } = await getClienteAndProdutorCount()
        const produtoCount = await getProdutoCount()

        setLojaCount(lojaCount)
        setClienteCount(clienteCount)
        setProdutorCount(produtorCount)
        setProdutoCount(produtoCount)
      } catch (error) {
        console.error('Erro ao buscar contagens:', error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchCounts()
      fetchLojas()
      fetchProdutos()
    }
  }, [token])

  async function getLojaCount() {
    try {
      const response = await api.get('/loja', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data.length
    } catch (error) {
      console.error('Erro ao buscar lojas', error)
      return 0
    }
  }

  async function getClienteAndProdutorCount() {
    try {
      const response = await api.get('/cliente', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const clientes = response.data.filter((cliente: any) => cliente.tipoCliente.tipo === 'Cliente')
      const produtores = response.data.filter((cliente: any) => cliente.tipoCliente.tipo === 'Produtor')

      return { clienteCount: clientes.length, produtorCount: produtores.length }
    } catch (error) {
      console.error('Erro ao buscar clientes', error)
      return { clienteCount: 0, produtorCount: 0 }
    }
  }

  async function getProdutoCount() {
    try {
      const response = await api.get('/produto', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data.length
    } catch (error) {
      console.error('Erro ao buscar produtos', error)
      return 0
    }
  }

  async function fetchLojas() {
    try {
      const response = await api.get('/loja', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setLojas(response.data)
    } catch (error) {
      console.error('Erro ao buscar lojas', error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteLoja(id: string) {
    try {
      await api.delete(`/loja/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // Após deletar, atualizamos a lista de lojas
      const updatedLojas = await fetchLojas()
      setLojas([updatedLojas])
      notifySuccess('Loja excluída')
    } catch (error) {
      console.error('Erro ao deletar loja', error)
      notifyError('Ocorreu um erro ao excluir a loja.')
    }
  }

  async function fetchProdutos() {
    try {
      const response = await api.get('/produto', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setProdutos(response.data)
    } catch (error) {
      console.error('Erro ao buscar produtos', error)
    } finally {
      setLoading(false)
    }
  }

  // Função para excluir um produto
  async function deleteProduto(id: string) {
    try {
      await api.delete(`/produto/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // Após deletar, atualizamos a lista de produtos
      const updatedProdutos = await fetchProdutos()
      setProdutos([updatedProdutos])
      notifySuccess('Produto excluído')
    } catch (error) {
      console.error('Erro ao deletar produto', error)
      notifyError('Erro')
    }
  }

  const paginatedProducts = produtos.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  )

  // Função para mudar a página
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading && token) {
    return <Loading />
  }

  if (!isAdmin) {
    return <NotPermission />
  }

  const totalPages = Math.ceil(produtos.length / itemsPerPage)

  // console.log(produtos)
  return (
    <>
      <Header />
      <Title name="Administração" />
      <Box bg={bg} p={5} px={10} minH="100vh">
        <Flex flexDirection={'column'}>
          <Flex>
            <Text fontSize={40} fontWeight={"bold"} textTransform={"uppercase"}>
              Dashboard
            </Text>
          </Flex>
          <Flex justifyContent={'space-between'} py={10}>
          <BoxRelatorio
            src="/images/IconTime.png"
            alt="Usuários Ao Vivo"
            total={1} // Contagem de clientes
            atualizacao="Nesse exato momento"
          >
            Usuários Ao Vivo
          </BoxRelatorio>
          <BoxRelatorio
            src="/images/IconPessoa.png"
            alt="Total de Clientes"
            total={clienteCount} // Contagem de clientes
            atualizacao="Desde o último mês"
          >
            Total de Clientes
          </BoxRelatorio>
          <BoxRelatorio
            src="/images/IconPessoa.png"
            alt="Total de Produtores"
            total={produtorCount} // Contagem de produtores
            atualizacao="Desde o último mês"
          >
            Total de Produtores
          </BoxRelatorio>
          <BoxRelatorio
            src="/images/IconBox.png"
            alt="Total de Lojas"
            total={lojaCount}
            atualizacao="Desde o último mês"
          >
            Total de Lojas
          </BoxRelatorio>
          <BoxRelatorio
            src="/images/IconNivel.png"
            alt="Total de Produtos"
            total={produtoCount}
            atualizacao="Desde o último mês"
          >
            Total de Produtos
          </BoxRelatorio>
        </Flex>
        </Flex>
        <Box p={5} bg={"white"} rounded={5}>
          <Flex alignItems={"center"} justifyContent={"space-between"} mb={4} p={5}>
        <Text fontSize={40} fontWeight={"bold"}>
          Lojas
        </Text>
        <Button bg={"green.500"} colorScheme='green' onClick={() => router.push("/lojas")}>Ver Lojas</Button>
          </Flex>
        {lojas.length > 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Loja</Th>
                <Th>Administrador</Th>
                <Th>CPF</Th>
                <Th>Telefone</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {lojas.map((loja: any) => (
                <Tr key={loja.id} onClick={() => router.push(`/loja/${loja.id}`)} cursor={"pointer"} _hover={{ bg: "gray.100" }} transitionDuration={"0.1s"}>
                  <Td>{loja.nomeLoja}</Td>
                  <Td>{loja.cliente.nome}</Td>
                  <Td>{loja.cliente.cpf}</Td>
                  <Td>{loja.cliente.telefone}</Td>
                  <Td>
                    <IconButton
                      aria-label="Deletar loja"
                      icon={<PiTrash />}
                      colorScheme="red"
                      onClick={() => deleteLoja(loja.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text>Nenhuma loja cadastrada.</Text>
        )}
      </Box>
        <Box p={5} bg={"white"} mt={10} rounded={5}>
        <Flex alignItems={"center"} justifyContent={"space-between"} mb={4} p={5}>
        <Text fontSize={40} fontWeight={"bold"}>
          Produtos
        </Text>
        <Button bg={"green.500"} colorScheme='green' onClick={() => router.push("/admin/produtos")}>Meus Produtos</Button>
        </Flex>
        {produtos.length > 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Produto</Th>
                <Th>Loja</Th>
                <Th>Categoria</Th>
                <Th>Preço</Th>
                <Th>Quantidade</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedProducts.map((produto: any) => (
                <Tr key={produto.id} onClick={() => router.push(`/produto?id=${produto.id}`)} cursor={"pointer"} _hover={{ bg: "gray.100" }} transitionDuration={"0.1s"}>
                  <Td>{produto.produtoNome}</Td>
                  <Td>{produto.lojas.nomeLoja}</Td>
                  <Td>{produto.produtoCategoria}</Td>
                  <Td>{new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(produto.produtoPreco)}</Td>
                  <Td>{produto.produtoQuantidade}</Td>
                  <Td>
                    <IconButton
                      aria-label="Deletar produto"
                      icon={<PiTrash />}
                      colorScheme="red"
                      onClick={() => deleteProduto(produto.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text>Nenhum produto cadastrado.</Text>
        )}
        <HStack spacing={4} mt={4} justify="center">
          <Button 
            isDisabled={currentPage === 1} 
            onClick={() => handlePageChange(currentPage - 1)}
            bg={"green.500"}
            color={"white"}
            colorScheme='green'
            >
            Anterior
          </Button>
          <Text>
            Página {currentPage} de {totalPages}
          </Text>
          <Button 
            isDisabled={currentPage === totalPages} 
            onClick={() => handlePageChange(currentPage + 1)}
            bg={"green.500"}
            color={"white"}
            colorScheme='green'
          >
            Próxima
          </Button>
        </HStack>
      </Box>
      </Box>
    </>
  )
}
