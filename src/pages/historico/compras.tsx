// Gisele Oliveira

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Divider,
  Text,
  Button,
  Image,
} from '@chakra-ui/react'
import { useColorModeValue } from '~components/ui/color-mode'
import { Header } from '~components/Header'
import { Title } from '~components/Title'

export default function Compras() {
  const bg = useColorModeValue('gray.100', 'gray.800')

  return (
    <>
      <Header />
      <Title name="Histórico de compras" />
      <Box bg={bg}>
        <Grid
          templateAreas={`"img main"`}
          h={'100vh'}
          gap="1"
          color="blackAlpha.800"
        >
          <GridItem area={'main'}>
            <Flex justifyContent="space-between" h="100vh">
              <Flex as="form" bg={bg} p="8" borderRadius={8} flexDir="column">
                <Flex
                  justifyContent="space-between"
                  w="100%"
                  gap="3"
                  fontWeight="bold"
                >
                  <Text>HISTÓRICO DE VENDAS</Text>
                </Flex>
                <Divider
                  my="4"
                  borderColor="gray.900"
                  borderWidth="1px"
                  w={900}
                />
                <Flex justifyContent="space-between" alignItems={'center'}>
                  <Flex justifyContent="space-between" flexDir="column">
                    <Image
                      src={'/images/cebola.png'}
                      alt="logo"
                      width={'100%'}
                      objectFit="cover"
                      boxSize="100%"
                    ></Image>
                  </Flex>
                  <Flex justifyContent="space-between" flexDir="column">
                    <Text>Cebola Roxa - Verdura</Text>
                    <Text>Tipo: 100% natural</Text>
                    <Text>Peso: 1,5Kg </Text>
                  </Flex>
                  <Flex flexDir="column" alignItems={'center'}>
                    <Text>QTD</Text>
                    <Text>04</Text>
                  </Flex>
                  <Flex justifyContent="space-between" flexDir="column">
                    <Text>Data de compra</Text>
                    <Text>10/10/2025</Text>
                  </Flex>
                  <Flex justifyContent="space-between" flexDir="column">
                    <Button
                      type="submit"
                      mt="5"
                      bg={useColorModeValue('green.700', 'green.500')}
                      size="lg"
                      fontSize={'15px'}
                      color={useColorModeValue('gray.100', 'gray.100')}
                    >
                      COMPRAR NOVAMENTE
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}
