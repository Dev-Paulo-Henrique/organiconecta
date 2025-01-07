// Gisele Oliveira

import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { useColorModeValue } from '~components/ui/color-mode'
import { Header } from '~components/Header'
import { Posts } from '~components/Posts'
import { BackgroundPerfil } from '~components/BackgroundPerfil'
export default function Perfil() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  return (
    <>
      <Header />
      <Box bg={bg}>
        <Grid templateAreas={`"img main"`} h={'100vh'} color="blackAlpha.800">
          <GridItem area={'main'}>
            <Flex h="100vh">
              <Flex bg={bg} borderRadius={8} flexDir="column">
                <BackgroundPerfil
                  backgroundImg="/images/foto-fundo-produtor.png"
                  alt="Imagem de fundo produtor perfil"
                  profileImg="https://bit.ly/naruto-sage"
                >
                  <Text>Fazenda aprisco</Text>
                  <Text fontSize="1rem" fontWeight={200}>
                    ovelhanegra@gmail.com • Recife - PE • Desde 2024
                  </Text>
                  <Text fontSize="1rem" fontWeight={200}>
                    Avaliações: (82 avaliações) 
                  </Text>
                </BackgroundPerfil>
                <Posts
                  images={[
                    { src: '/images/organic-food.jpg', alt: 'Primeira imagem' },
                    {
                      src: '/images/organic-food-image.jpg',
                      alt: 'Segunda imagem',
                    },
                    {
                      src: '/images/organic-food-farm 1.jpg',
                      alt: 'Terceira imagem',
                    },
                  ]}
                >
                  {' '}
                  <Text>FRUTAS/VEGETAIS FRESCOS</Text>{' '}
                </Posts>
                <Posts
                  images={[
                    {
                      src: '/images/organic-food-image.jpg',
                      alt: 'Primeira imagem',
                    },
                    {
                      src: '/images/organic-food-image.jpg',
                      alt: 'Segunda imagem',
                    },
                    {
                      src: '/images/organic-food-image.jpg',
                      alt: 'Terceira imagem',
                    },
                  ]}
                >
                  {' '}
                  <Text>DERIVADOS DE ANIMAIS</Text>{' '}
                </Posts>
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}
