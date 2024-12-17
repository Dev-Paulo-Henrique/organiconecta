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
import { IoIosArrowDropright } from 'react-icons/io'

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
                <Flex
                  justifyContent="space-between"
                  w="100%"
                  gap="3"
                  fontWeight="bold"
                  flexDir="column"
                  alignItems={'center'}
                >
                  <Image
                    src={'/images/foto-fundo-produtor.png'}
                    alt="logo"
                    objectFit="cover"
                    boxSize="100%"
                    w={'100vw'}
                  ></Image>

                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    position={'absolute'}
                    top={'20%'}
                    left={'10%'}
                    gap={10}
                    color={'#ffff'}
                  >
                    <Image
                      src="https://bit.ly/naruto-sage"
                      boxSize="150px"
                      borderRadius="full"
                      fit="cover"
                      alt="Naruto Uzumaki"
                    />
                    <Flex
                      justifyContent="space-between"
                      alignItems={'start'}
                      flexDir="column"
                    >
                      <Flex
                        justifyContent="space-between"
                        alignItems={'start'}
                        flexDir="column"
                        fontSize={'45'}
                      >
                        <Text>FAZENDA APRISCO</Text>
                      </Flex>

                      <Flex
                        justifyContent="space-between"
                        alignItems={'start'}
                        flexDir="column"
                      >
                        <Text>ovelhanegra@gmail.com</Text>
                        <Text>Recife - PE /Desde 2024</Text>
                        <Text>Avaliações: (82 avaliações)</Text>
                      </Flex>
                    </Flex>
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

                  <Flex
                    justifyContent="space-between"
                    flexDir="column"
                    alignItems={'start'}
                  >
                    <Text>FRUTAS/VEGETAIS FRESCOS</Text>
                  </Flex>

                  <Grid
                    templateColumns="repeat(3, 1fr)"
                    gap="6"
                    alignItems={'center'}
                  >
                    <GridItem colSpan={1}>
                      <IoIosArrowDropright />
                      <Image
                        src={'/images/organic-food-farm 1.jpg'}
                        alt="logo"
                        width={'100%'}
                        objectFit="cover"
                        boxSize="100%"
                      ></Image>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Image
                        src={'/images/organic-food-image.jpg'}
                        alt="logo"
                        width={'100%'}
                        objectFit="cover"
                        boxSize="100%"
                      ></Image>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Image
                        src={'/images/organic-food.jpg'}
                        alt="logo"
                        width={'100%'}
                        objectFit="cover"
                        boxSize="100%"
                      ></Image>
                    </GridItem>
                  </Grid>
                </Flex>
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}
