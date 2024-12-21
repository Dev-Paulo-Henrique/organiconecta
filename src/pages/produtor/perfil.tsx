// Gisele Oliveira

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Image,
  Button,
} from '@chakra-ui/react'

import { useColorModeValue } from '~components/ui/color-mode'
import { Header } from '~components/Header'
import { Foto } from '~components/Foto'
export default function Perfil() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  return (
    <>
      <Header />
      <Box bg={bg}>
        <Grid templateAreas={`"img main"`} h={'100vh'} color="blackAlpha.800">
          <GridItem area={'main'}>
            <Flex h="100vh">
              <Flex as="form" bg={bg} p="8" borderRadius={8} flexDir="column">
                <Foto
                  backgroundImg="/images/foto-fundo-produtor.png"
                  alt="Imagem de fundo produtor perfil"
                  profileImg="https://bit.ly/naruto-sage"
                >
                  {' '}
                  <p>Fazenda Aprisco</p>
                </Foto>

              </Flex>
           
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}
