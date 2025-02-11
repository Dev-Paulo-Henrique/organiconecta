import {
    Box,
    Button,
    Flex,
    Grid,
    Image,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react'
  import { useEffect, useState } from 'react'
  import { useAuth } from '~hooks/useAuth'
  import { api } from '~services/api' // Importando a API
  import { FaStar } from 'react-icons/fa'
  import { Loading } from '~components/Loading'
  import ErrorPage from '~pages/404'
import { Header } from '~components/Header'
import { Title } from '~components/Title'
import { useRouter } from 'next/router'
  
  export default function LojasList() {
    const bg = useColorModeValue('gray.100', 'gray.800')
    const color = useColorModeValue('gray.800', 'gray.100')
    const { token } = useAuth()
    const router = useRouter()
  
    const [lojas, setLojas] = useState<any[]>([]) // Estado para armazenar todas as lojas
    const [loading, setLoading] = useState(true)
  
    // Carregar a lista de lojas
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await api.get('/loja')
          setLojas(response.data) // Armazenar as lojas no estado
        } catch (error) {
          console.error('Erro ao buscar lojas:', error)
        } finally {
          setLoading(false)
        }
      }
  
    //   if (token) {
        fetchData()
    //   }
    }, [])
  
    if (loading) return <Loading />
    if (!lojas.length) return <ErrorPage /> // Exibe página de erro caso não haja lojas
  
  //   return (
  //       <>
  //       <Header/>
  //       <Title name="Lojas"/>
  //     <Box p={6} bg={bg} minH={"100vh"} h={"100%"}>
  //       <Text fontSize="4xl" fontWeight="bold" mb={4}>
  //         Lojas Orgânicas
  //       </Text>
  //       <Grid templateColumns="repeat(3, 1fr)" gap={6}>
  //         {lojas.map((loja) => (
  //           <Box
  //             key={loja.id}
  //             borderWidth={1}
  //             borderRadius="md"
  //             boxShadow="md"
  //             overflow="hidden"
  //             bg={"white"}
  //             _hover={{ boxShadow: 'xl' }}
  //           >
  //             <Image
  //               src={loja.capaLojaImagem || '/images/floating.png'}
  //               alt="Capa da loja"
  //               w="100%"
  //               h="200px"
  //               objectFit="cover"
  //             />
  //             <Box p={4}>
  //               <Flex alignItems="center">
  //                 <Image
  //                   src={loja.perfilLojaImagem || '/images/icon.png'}
  //                   borderRadius="full"
  //                   border="4px solid green"
  //                   w="50px"
  //                   h="50px"
  //                   alt="Imagem da loja"
  //                 />
  //                 <Box ml={3}>
  //                   <Text fontWeight="bold" fontSize="xl">
  //                     {loja.nomeLoja}
  //                   </Text>
  //                   <Text fontSize="sm" color="gray.500">
  //                     {loja.cliente?.nome}
  //                   </Text>
  //                   <Text fontSize="sm" color="gray.500">
  //                     {loja.cliente?.usuario?.username}
  //                   </Text>
  //                 </Box>
  //               </Flex>
  //               <Text mt={2} fontSize="md" textAlign={"center"} display={"flex"} alignItems={'center'}>
  //                 Avaliações:
  //                 <Flex mx={2}>
  //                   <FaStar color="gold" />
  //                   <FaStar color="gold" />
  //                   <FaStar color="gold" />
  //                   <FaStar color="gold" />
  //                   <FaStar color="gold" />
  //                 </Flex>{' '}
  //                 <Text color={"gray.400"} as={"small"}>({Number(loja?.id) * 3} avaliações)</Text>
  //               </Text>
  
  //               <Button
  //                 mt={4}
  //                 w="full"
  //                 colorScheme="green"
  //                 bg="green.500"
  //                 color="white"
  //                 _hover={{ bg: 'green.600' }}
  //                 onClick={() => router.push(`/loja/${loja?.id}`)}
  //               >
  //               BUSCAR PRODUTOS
  //               </Button>
  //             </Box>
  //           </Box>
  //         ))}
  //       </Grid>
  //     </Box>
  //     </>
  //   )
  // }

  return (
    <>
      <Header />
      <Title name="Lojas" />
      <Box p={{ base: 4, md: 6 }} bg={bg} minH="100vh" h="100%">
        <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold" mb={4}>
          Lojas Orgânicas
        </Text>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          gap={{ base: 4, md: 6 }}
        >
          {lojas.map((loja) => (
            <Box
              key={loja.id}
              borderWidth={1}
              borderRadius="md"
              boxShadow="md"
              overflow="hidden"
              bg="white"
              _hover={{ boxShadow: 'xl' }}
            >
              <Image
                src={loja.capaLojaImagem || '/images/floating.png'}
                alt="Capa da loja"
                w="100%"
                h={{ base: '150px', md: '200px' }}
                objectFit="cover"
              />
              <Box p={{ base: 3, md: 4 }}>
                <Flex alignItems="center">
                  <Image
                    src={loja.perfilLojaImagem || '/images/icon.png'}
                    borderRadius="full"
                    border="4px solid green"
                    w={{ base: '40px', md: '50px' }}
                    h={{ base: '40px', md: '50px' }}
                    alt="Imagem da loja"
                  />
                  <Box ml={3}>
                    <Text fontWeight="bold" fontSize={{ base: 'lg', md: 'xl' }}>
                      {loja.nomeLoja}
                    </Text>
                    <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">
                      {loja.cliente?.nome}
                    </Text>
                    <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">
                      {loja.cliente?.usuario?.username}
                    </Text>
                  </Box>
                </Flex>
                <Text
                  mt={2}
                  fontSize={{ base: 'sm', md: 'md' }}
                  textAlign="center"
                  display="flex"
                  alignItems="center"
                  flexWrap="wrap"
                  // justifyContent="center"
                >
                  Avaliações:
                  <Flex mx={2}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} color="gold" size={14} />
                    ))}
                  </Flex>
                  <Text color="gray.400" as="small" fontSize={{ base: 'xs', md: 'sm' }}>
                    ({Number(loja?.id) * 3} avaliações)
                  </Text>
                </Text>

                <Button
                  mt={4}
                  w="full"
                  colorScheme="green"
                  bg="green.500"
                  color="white"
                  _hover={{ bg: 'green.600' }}
                  size={{ base: 'sm', md: 'md' }}
                  onClick={() => router.push(`/loja/${loja?.id}`)}
                >
                  BUSCAR PRODUTOS
                </Button>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </>
  )
}
  