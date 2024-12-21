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
import Link from 'next/link'
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

                <Flex
                  justifyContent="space-between"
                  w="100%"
                  gap="3"
                  fontWeight="bold"
                  flexDir="column"
                  alignItems={'center'}
                ></Flex>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Link href="/cadastroCliente/clienteComplemento" passHref>
                  <Button
                    type="submit"
                    position={'absolute'}
                    right={10}
                    mt="5"
                    bg={useColorModeValue('green.700', 'green.500')}
                    size="lg"
                    fontSize={'17px'}
                    color={useColorModeValue('gray.100', 'gray.100')}
                  >
                    Seguir
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}
