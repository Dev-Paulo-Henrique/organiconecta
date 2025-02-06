//Alex William

import {
  Box,
  Flex,
  Heading,
  Grid,
  GridItem,
  Image,
  Text,
  Button,
  Stack,
  Divider,
  RadioGroup,
  Radio,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { Header } from '~components/Header'
import { Title } from '~components/Title'

interface Product {
  id: number
  name: string
  producer: string
  price: string
  quantity: number
  image: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Cebola Roxa',
    producer: 'Produtor',
    price: 'R$ 20,00',
    quantity: 0,
    image: '/images/cebola-roxa.png',
  },
  {
    id: 2,
    name: 'Morango',
    producer: 'Produtor',
    price: 'R$ 15,00',
    quantity: 0,
    image: '/images/cebola-roxa.png',
  },
  {
    id: 3,
    name: 'Pimentão Amarelo',
    producer: 'Produtor',
    price: 'R$ 10,00',
    quantity: 0,
    image: '/images/cebola-roxa.png',
  },
]

export default function Carrinho() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')

  return (
    <Box bg={bg} minH="100vh">
      <Title name="Carrinho" />
      <Header />
      <Grid
        templateColumns={{ base: '1fr', md: '2fr 1fr' }}
        gap={6}
        maxW="1200px"
        mx="auto"
        p={8}
      >
        {/* Teste visual ainda não sei como receber informações do back - Lista de Produtos */}
        <GridItem>
          <Heading size="lg" mb={4}>
            Carrinho
          </Heading>
          <Stack spacing={4}>
            {products.map(product => (
              <Flex
                key={product.id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                alignItems="center"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  boxSize="80px"
                  objectFit="cover"
                  borderRadius="md"
                  mr={4}
                />
                <Box flex="1">
                  <Text color={color}>{product.name}</Text>
                  <Text fontSize="sm" color={color}>
                    {product.producer}
                  </Text>
                </Box>
                <Flex alignItems="center">
                  <Button size="sm" mr={2}>
                    -
                  </Button>
                  <Text color={color}>{product.quantity} </Text>
                  <Button size="sm" ml={2}>
                    +
                  </Button>
                </Flex>
                <Text ml={4}>{product.price}</Text>
              </Flex>
            ))}
          </Stack>
          <Button mt={4} colorScheme="teal" variant="link">
            Continuar comprando
          </Button>
        </GridItem>

        {/* Teste visual ainda não sei como receber informações do back - Resumo do Pedido*/}
        <GridItem>
          <Box
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            bg={useColorModeValue('white', 'gray.700')}
          >
            <Heading size="md" mb={4}>
              Resumo do Pedido
            </Heading>
            <Stack spacing={2}>
              <Flex justifyContent="space-between">
                <Text>Valor dos produtos</Text>
                <Text>R$ 0,00</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>Frete</Text>
                <Text>R$ 0,00</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>Taxas adicionais</Text>
                <Text>R$ 0,00</Text>
              </Flex>
            </Stack>
            <Divider my={4} />
            <RadioGroup defaultValue="credito">
              <Stack spacing={2}>
                <Radio value="credito">Cartão de crédito</Radio>
                <Radio value="debito">Cartão de débito</Radio>
                <Radio value="pix">Pix</Radio>
              </Stack>
            </RadioGroup>
            <Divider my={4} />
            <Flex justifyContent="space-between" fontWeight="bold">
              <Text>Total</Text>
              <Text>R$ 0,00</Text>
            </Flex>
            <Button mt={4} colorScheme="green" width="full">
              Finalizar compra
            </Button>
          </Box>
          <Flex justifyContent="flex-end" mt={2}>
            <Button colorScheme="red" variant="link">
              Cancelar pedidos
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  )
}
