import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAuth } from '~hooks/useAuth'
import { useRouter } from 'next/router'
import { Header } from '~components/Header'
import { Title } from '~components/Title'
import { NotPermission } from '~components/NotPermission'
import { Loading } from '~components/Loading'
import { FaStar } from 'react-icons/fa'
import { api } from '~services/api' // Certifique-se de importar a API
import ErrorPage from '~pages/404'

export default function Loja() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')
  const { token, user } = useAuth()
  const { query, push } = useRouter()
  const { id } = query
  const isProducer = user?.tipoCliente?.tipo === 'Produtor'

  const [loja, setLoja] = useState<any>(null) // Estado para armazenar os dados da loja
  const [produtos, setProdutos] = useState<any[]>([]) // Estado para armazenar os produtos da loja
  const [loading, setLoading] = useState(true)

  // Carregar dados da loja e produtos
  useEffect(() => {
    async function fetchData() {
      try {
        const responseLoja = await api.get(`/loja/${id}`)
        setLoja(responseLoja.data) // Armazenar dados da loja no estado

        // Buscar os produtos da loja
        const responseProdutos = await api.get(`/produto`)
        const filteredProducts = responseProdutos.data.filter(
          (produto: any) => produto.lojas.id == id
        )
        // console.log(filteredProducts)
        setProdutos(filteredProducts) // Armazenar dados dos produtos no estado
      } catch (error) {
        console.error('Erro ao buscar loja ou produtos:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])
// console.log(produtos)
  if (loading) return <Loading /> // Carregando...

  if (!loja) {
    return <ErrorPage /> // Caso a loja não seja encontrada
  }

  return (
    <>
      <Header />
      <Title name={'Loja'} />
      <Box position="relative">
        {/* Capa do produtor */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          background="rgba(0, 0, 0, 0.5)" // Cor preta com opacidade de 40%
          zIndex={1} // Coloca a camada sobre a imagem
        />
        <Image
          zIndex={0}
          src={loja.capaLojaImagem || 'https://via.placeholder.com/1920x300'} // Imagem da capa da loja
          alt="Capa do produtor"
          w="100%"
          h="300px"
          objectFit="cover"
        />

        {/* Informações da loja */}
        <Flex
          zIndex={2}
          position="absolute"
          bottom="50px"
          left="40px"
          color="white"
          alignItems={'center'}
          ml={40}
        >
          <Image
            src={loja.perfilLojaImagem || 'https://via.placeholder.com/200'} // Imagem do perfil da loja
            borderRadius="full"
            border={'5px solid green'}
            alt="Perfil do produtor"
            w={200}
            h={200}
            bg={"white"}
            objectFit="cover"
          />
          <Box ml={4}>
            <Text fontSize="3xl" fontWeight="bold">
              {loja.nomeLoja}
            </Text>
            <Text fontSize="md">
              {loja.cliente?.nome} • {loja.cliente?.usuario?.username}
            </Text>
            <Text display={'flex'} alignItems={'center'} mt={1}>
              Avaliações:
              <Flex mx={2}>
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStar color="gold" />
              </Flex>{' '}
              ({Number(id) * 3} avaliações)
            </Text>
          </Box>
        </Flex>

        {/* Botão para seguir */}
        <Button
          mr={40}
          zIndex={2}
          position="absolute"
          bottom="-20px"
          right="40px"
          fontSize={18}
          p={5}
          bg="green.500"
          colorScheme="green"
          color="white"
          // isDisabled
          // disabled
          // onClick={() => localStorage.setItem("seguindo", id)}
        >
          + SEGUIR
        </Button>
      </Box>

      {/* Seção de produtos */}
      <Box p={10}>
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Produtos da Loja
        </Text>
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
          {produtos.length > 0 && (
            produtos.map((produto) => (
              <GridItem key={produto.id}>
                <Box
                  border="1px solid #e0e0e0"
                  borderRadius="md"
                  overflow="hidden"
                  boxShadow="md"
                  bg="white"
                  // maxH={600}
                  p={4}
                >
                  <Image
                    src={produto.produtoImagens[0] || 'https://via.placeholder.com/250'}
                    alt={produto.produtoNome}
                    boxSize="250px"
                    objectFit="contain"
                    mx="auto"
                  />
                  <Text fontSize="lg" fontWeight="bold" mt={4}>
                    {produto.produtoNome}
                  </Text>
                  <Text fontSize="sm" color="gray.500" mt={2} noOfLines={3} textAlign={"justify"}>
                    {produto.produtoDescricao}
                  </Text>
                  <Text fontSize="xl" fontWeight="bold" mt={4}>
                    {
                      new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(produto.produtoPreco)
                    }
                  </Text>
                  <Button
                    mt={4}
                    colorScheme="green"
                    w="full"
                    onClick={() => push(`/produto?id=${produto.id}`)}
                  >
                    Ver detalhes
                  </Button>
                </Box>
              </GridItem>
            ))
          )}
        </Grid>
        {produtos.length === 0 && (
          <Box w="full" textAlign="center" p={6} border="1px solid #e0e0e0" borderRadius="md" bg="gray.50">
          <Text fontSize="xl" w={"full"} color="gray.500">
            Não há produtos disponíveis na loja no momento.
          </Text>
        </Box>
        )}
      </Box>
    </>
  )
}
