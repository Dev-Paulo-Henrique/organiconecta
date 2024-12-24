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
import { Compra } from '~components/Compras'

export default function Compras() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const imageData = [
    {
      src: '/images/cebola.png',
      alt: 'Ceboa roxa',
      produto: 'produto A',
      tipo: 'Natural',
      peso: '1kg',
      qtd: '2 kl',
      data: '20/14/2024',
    },
  ]

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
              <Flex
                as="form"
                bg={bg}
                p="8"
                borderRadius={8}
                flexDir="column"
            
              >
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
                <Flex flexDir={'column'}  justifyContent="space-between" w="100%" >
                  <Compra images={imageData} />
                  </Flex>
                </Flex>
              </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}
