// Gisele Oliveira

import { Box, Flex, Grid, GridItem, Text, Image } from '@chakra-ui/react'
import { useColorModeValue } from '~components/ui/color-mode'
import { Header } from '~components/Header'

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
