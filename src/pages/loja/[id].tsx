import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useState, useMemo } from 'react'
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
  const { query } = useRouter()
  const { id } = query
  const isProducer = user?.tipoCliente?.tipo === 'Produtor'

  const [loja, setLoja] = useState<any>(null) // Estado para armazenar os dados da loja
  const [loading, setLoading] = useState(true)

  // Carregar dados da loja
  useEffect(() => {
    async function fetchData() {
    try {
        const response = await api.get(`/loja/${id}`)
        setLoja(response.data) // Armazenar dados da loja no estado
      } catch (error) {
        console.error('Erro ao buscar loja:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  if (loading) return <Loading />
  // if (!isProducer || Number(id) !== user?.id) return <NotPermission />

  if (!loja) {
    return (
      <ErrorPage/>
    )
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
          disabled
          // onClick={() => localStorage.setItem("seguindo", id)}
        >
          + SEGUIR
        </Button>
      </Box>

      {/* Seção de produtos - Você pode adicionar a exibição dos produtos da loja aqui */}
    </>
  )
}
