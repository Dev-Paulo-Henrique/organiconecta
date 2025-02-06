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
import { farms, persons, getRandomImage } from '~utils/store' // Importando o utilitário
import { FaStar } from 'react-icons/fa'

export default function Loja() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')
  const { token, user } = useAuth()
  const { query } = useRouter()
  const { id } = query
  const isProducer = user?.tipoCliente?.tipo === 'Produtor'

  const [capa, setCapa] = useState<string>('') // Capa do produtor
  const [perfil, setPerfil] = useState<string>('') // Perfil do produtor
  const [loading, setLoading] = useState(true)

  // Carregar capa e perfil
  useEffect(() => {
    async function fetchData() {
      try {
        // Usar a função getRandomImage para selecionar imagens aleatórias
        setCapa(getRandomImage(farms)) // Seleciona uma imagem aleatória para a capa
        setPerfil(getRandomImage(persons)) // Seleciona uma imagem aleatória para o perfil
      } catch (error) {
        console.error('Erro ao buscar imagem:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Usando useMemo para garantir que a capa e o perfil não mudem durante os re-renders
  const capaMemo = useMemo(() => capa, [capa])
  const perfilMemo = useMemo(() => perfil, [perfil])

  if (loading) return <Loading />
  if (!isProducer || Number(id) !== user?.id) return <NotPermission />

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
          src={
            capaMemo ||
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt="Capa do produtor"
          w="100%"
          h="300px"
          objectFit="cover"
        />

        {/* Informações da fazenda */}
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
            src={perfilMemo}
            borderRadius="full"
            border={'5px solid green'}
            alt="Perfil do produtor"
            w={200}
            h={200}
            objectFit="cover"
          />
          <Box ml={4}>
            <Text fontSize="3xl" fontWeight="bold">
              FAZENDA APRISCO
            </Text>
            <Text fontSize="md">
              ovelhanegra@gmail.com • Recife - PE • Desde 2024
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
              (82 avaliações)
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
        >
          + SEGUIR
        </Button>
      </Box>

      {/* Seção de produtos */}
      {/* <Box bg={bg} p={8} minH="100vh">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              FRUTAS/VEGETAIS FRESCOS
            </Text>
            <Flex gap={4}>
              <Image
                src="/images/tomato.jpg"
                boxSize="150px"
                borderRadius="md"
              />
              <Image
                src="/images/banana.jpg"
                boxSize="150px"
                borderRadius="md"
              />
              <Image
                src="/images/strawberry.jpg"
                boxSize="150px"
                borderRadius="md"
              />
            </Flex>
          </GridItem>

          <GridItem>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              DERIVADOS DE ANIMAIS
            </Text>
            <Flex gap={4}>
              <Image src="/images/milk.jpg" boxSize="150px" borderRadius="md" />
              <Image src="/images/eggs.jpg" boxSize="150px" borderRadius="md" />
              <Image
                src="/images/cheese.jpg"
                boxSize="150px"
                borderRadius="md"
              />
            </Flex>
          </GridItem>
        </Grid>
      </Box> */}
    </>
  )
}
