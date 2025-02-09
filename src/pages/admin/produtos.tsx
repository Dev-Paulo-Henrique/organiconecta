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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useBreakpointValue,
  Spinner,
} from '@chakra-ui/react'
import { Header } from '~components/Header'
import { Viewer } from '~components/Modal'
import { useState, useEffect } from 'react'
import { Title } from '~components/Title'
import { ListItem } from '~components/ListItem'
import { useAuth } from '~hooks/useAuth'
import { useRouter } from 'next/router'
import { NotPermission } from '~components/NotPermission'
import { FiEdit3 } from 'react-icons/fi'
import { PiTrash } from 'react-icons/pi'
import { api } from '~services/api' // Supondo que a API esteja configurada
import { Loading } from '~components/Loading'
import { IoEyeOutline } from 'react-icons/io5'
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

export default function Product() {
  const { token, user } = useAuth() // Agora estamos pegando o 'user' para verificar o tipo
  const router = useRouter()
  const bg = useColorModeValue('gray.100', 'gray.800')
  const cardBg = useColorModeValue('white', 'gray.700') // Cor de fundo dos cards
  const color = useColorModeValue('gray.800', 'gray.100')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState<string>('')
  const [products, setProducts] = useState<any[]>([]) // Array para armazenar os produtos
  const [loading, setLoading] = useState<boolean>(true) // Estado de carregamento
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const isMobile = useBreakpointValue({ base: true, md: false }) //Detecta se o aparelho é mobile

  const [currentPage, setCurrentPage] = useState(1) // Página atual
  const productsPerPage = 10 // Número de produtos por página

  // Verifica se o usuário é um produtor
  const isProducer = user?.tipoCliente?.tipo === 'Produtor' // Verifique a estrutura real dos dados

  // const handleOpen = (newTitle: string) => {
  //   setTitle(newTitle)
  //   onOpen()
  // }

  // Função para carregar os produtos
  useEffect(() => {
    if (token) {
      const carregarProdutos = async () => {
        try {
          setLoading(true)
          const response = await api.get('/produto', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          // Filtra os produtos pela loja (usando o ID da loja)
          const filteredProducts = response.data.filter(
            (produto: any) => produto.lojas.cliente.id === user?.id
          )

          setProducts(filteredProducts)
        } catch (error) {
          console.error('Erro ao carregar os produtos:', error)
        } finally {
          setLoading(false)
        }
      }

      carregarProdutos()
    }
  }, [token])

  // console.log(products)

  // Paginando os produtos
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  )

  const handleEditProduct = (product: any) => {
    setEditingProduct(product) // Carrega o produto no estado para edição
    setTitle(product.produtoNome) // Atualiza o título do modal com o nome do produto
    onOpen() // Abre o modal
  }

  // Se o usuário não for produtor, redireciona para a página inicial
  if (loading && token) {
    return <Loading />
  }

  if (!isProducer) {
    return <NotPermission />
  }

  // Função para navegação de páginas
  const handleNextPage = () => {
    if (currentPage * productsPerPage < products.length) {
      setCurrentPage(prevPage => prevPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1)
    }
  }

  return (
    <>
      <Header />
      <Title name="Cadastrar produto" />
      <Box bg={bg} p={8} minH="100vh">
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
            >
              {/* Tabela para mostrar os produtos no Desktop*/}
              <Table variant="simple" colorScheme="gray" display={['none', 'none', 'table']}>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Produto</Th>
                    <Th>Quantidade</Th>
                    <Th>Preço</Th>
                    <Th textAlign={'end'}>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {loading ? (
                    <Tr>
                      <Td colSpan={4} textAlign="center">
                        Carregando...
                      </Td>
                    </Tr>
                  ) : products.length === 0 ? (
                    <Tr>
                      <Td textAlign="center">
                        Nenhum produto encontrado.
                      </Td>
                    </Tr>
                  ) : (
                    currentProducts.map(produto => (
                      <Tr key={produto.id}>
                        <Td>{produto.id}</Td>
                        <Td>{produto.produtoNome}</Td>
                        <Td>{produto.produtoQuantidade}</Td>
                        <Td>
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(parseFloat(produto.produtoPreco))}
                        </Td>
                        <Td textAlign={'end'}>
                          <Flex gap="2" justify={'end'}>
                            <Icon
                              as={IoEyeOutline}
                              boxSize="6"
                              cursor="pointer"
                              bg="blue.500"
                              color="white"
                              borderRadius="md"
                              p={1}
                              onClick={() =>
                                router.push(`/produto?id=${produto.id}`)
                              }
                            />
                            <Icon
                              as={FiEdit3}
                              boxSize="6"
                              cursor="pointer"
                              bg="yellow.400"
                              color="black"
                              borderRadius="md"
                              p={1}
                              onClick={() => handleEditProduct(produto)} // Chama a função passando o produto correto
                            />
                            <Icon
                              as={PiTrash}
                              boxSize="6"
                              cursor="pointer"
                              bg="red.500"
                              color="white"
                              borderRadius="md"
                              p={1}
                              onClick={() =>
                                api
                                  .delete(`/produto/${produto.id}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  })
                                  .then(() => window.location.reload())
                              }
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>

              {/* Cards para mostrar os produtos no Mobile */}
              <Box display={['block', 'block', 'none']} >
                {loading ? (
                  <Flex justify="center" p={4}>
                    <Spinner size="lg" />
                  </Flex>
                ) : products.length === 0 ? (
                  <Text textAlign="center" p={4}>
                    Nenhum produto encontrado.
                  </Text>
                ) : (
                  <Stack spacing={4}>
                    {currentProducts.map(produto => (
                      <Box
                        key={produto.id}
                        bg={cardBg}
                        p={4}
                        borderRadius="md"
                        boxShadow="md"
                      >
                        <Stack spacing={2}>
                          <Text fontSize="sm"><strong>ID:</strong> {produto.id}</Text>
                          <Text fontSize="sm"><strong>Produto:</strong> {produto.produtoNome}</Text>
                          <Text fontSize="sm"><strong>Quantidade:</strong> {produto.produtoQuantidade}</Text>
                          <Text fontSize="sm">
                            <strong>Preço:</strong> {' '}
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(parseFloat(produto.produtoPreco))}
                          </Text>
                          <Flex justify="flex-end" gap={2} mt={3}>
                            <Icon
                              as={IoEyeOutline}
                              boxSize="5"
                              cursor="pointer"
                              bg="blue.500"
                              color="white"
                              borderRadius="md"
                              p={1}
                              onClick={() => router.push(`/produto?id=${produto.id}`)}
                            />
                            <Icon
                              as={FiEdit3}
                              boxSize="5"
                              cursor="pointer"
                              bg="yellow.400"
                              color="black"
                              borderRadius="md"
                              p={1}
                              onClick={() => handleEditProduct(produto)}
                            />
                            <Icon
                              as={PiTrash}
                              boxSize="5"
                              cursor="pointer"
                              bg="red.500"
                              color="white"
                              borderRadius="md"
                              p={1}
                              onClick={() =>
                                api
                                  .delete(`/produto/${produto.id}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  })
                                  .then(() => window.location.reload())
                              }
                            />
                          </Flex>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Box>

              {/* Paginação */}
              {products.length > 0 && <Flex
                justify="center"
                align="center"
                mt={5}
                gap={5}
                direction={['row']}
              >
                <Button
                  bg={'green.500'}
                  color={'white'}
                  colorScheme="green"
                  onClick={handlePrevPage}
                  isDisabled={currentPage === 1}
                  size="sm"
                >
                  Anterior
                </Button>
                <Text
                  fontSize={['sm', 'md']}
                  display={{ base: 'none', md: 'block' }}
                >
                  {`Página ${currentPage} de ${Math.ceil(products.length / productsPerPage)}`}
                </Text>
                <Button
                  bg={'green.500'}
                  color={'white'}
                  colorScheme="green"
                  onClick={handleNextPage}
                  isDisabled={currentPage * productsPerPage >= products.length}
                  size="sm"
                >
                  Próxima
                </Button>
              </Flex>}
            </Flex>
          </GridItem>
        </Grid>
      </Box>

      {/* Modal de edição do produto */}
      {editingProduct && (
        <Viewer
          isOpen={isOpen}
          onClose={onClose}
          title={title}
          product={editingProduct} // Passa o produto que foi selecionado para editar
        />
      )}
    </>
  )
}
