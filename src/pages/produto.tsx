import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Text, Spinner, Box, Flex } from '@chakra-ui/react'
import { Header } from '~components/Header'
import { ProductDetails } from '~components/ProductDetails'
import { api } from '~services/api'
import ErrorPage from './404'
import { Loading } from '~components/Loading'
import { useAuth } from '~hooks/useAuth'
import { FaStar } from 'react-icons/fa'
import { useColorModeValue } from '~components/ui/color-mode'
import { Title } from '~components/Title'

interface Product {
  produtoNome: string
  produtoPreco: string
  quantity: string
  produtoDescricao: string
  produtoImagens: string
  produtoCategoria: string
  produtoQuantidade: string
  id: string
}

export default function Produto() {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')

  const router = useRouter()
  const { id } = router.query // Pegando o ID da URL
  const { token } = useAuth()

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          // Fazendo o fetch do produto com o id da URL
          const response = await api.get(`/produto/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (response.status !== 200) {
            throw new Error('Produto não encontrado')
          }

          // Dados são diretamente acessados por `response.data` com o Axios
          setProduct(response.data)
          setLoading(false)
        } catch (error) {
          setError('Erro ao carregar o produto')
          setLoading(false)
        }
      }

      fetchProduct()
    }
  }, [id])

  console.log(product)

  if (loading) {
    return <Loading />
  }

  if (error || !product) {
    return <ErrorPage />
  }

  return (
    <>
      <Header />
      <Title name={product.produtoNome} />
      <Box px={60} py={'auto'} h={'100vh'} bg={'gray.100'}>
        <ProductDetails
          img={product.produtoImagens[0]}
          alt={`Imagem de ${product.produtoNome}`}
          price={product.produtoPreco}
          id={product.id}
          quantity={product.produtoQuantidade}
        >
          <Text fontSize={60} fontWeight="bold" textTransform={'uppercase'}>
            {product.produtoNome}
          </Text>
          <Flex alignItems={'center'} mt={1} mb={3}>
            <FaStar color="gold" size={22} />
            <FaStar color="gold" size={22} />
            <FaStar color="gold" size={22} />
            <FaStar color="gold" size={22} />
            <FaStar color="gold" size={22} />
            <Text mx={3}>•</Text>
            <Text fontSize="18" color={'gray.600'}>
              {product.produtoCategoria}
            </Text>
          </Flex>
          <Text fontSize={24} fontWeight="thin">
            {product.produtoDescricao}
          </Text>
        </ProductDetails>

        <Flex
          alignItems="center"
          justifyContent="center"
          direction="row"
          w="full"
          mt={8}
        >
          <Text
            fontSize={55}
            fontWeight="bold"
            textTransform="uppercase"
            mr={4} // Adicionando margem à direita para espaçamento entre o texto e o traço
          >
            Relacionados
          </Text>
          <Box
            flex="1"
            height="5px"
            bg="black"
          />
        </Flex>
      </Box>
      {/* <ProductsGrid products={products}/> */}
    </>
  )
}
