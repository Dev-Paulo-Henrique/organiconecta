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
import { useCart } from '~components/useCart'


interface Product {
  id: string
  produtoNome: string
  produtoPreco: number | string
  produtoImagens: string[]
  produtoDescricao: string
  produtoCategoria: string
  produtoCodigo?: string
  produtoQuantidade: number | string
  quantity:number
}

export default function Carrinho() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')

  // Pegando os dados do carrinho do contexto
  const { cartItems, addToCart, removeFromCart } = useCart(); // Acesso aos itens do carrinho e funções

  // Função para atualizar a quantidade de um produto
  const updateQuantity = (productId: string, operation: 'increment' | 'decrement') => {
    const updatedProduct = cartItems.find(product => product.id === productId);
    if (!updatedProduct) return;

    if (operation === 'increment') {
      updatedProduct.quantity += 1;
    } else if (operation === 'decrement' && updatedProduct.quantity > 1) {
      updatedProduct.quantity -= 1;
    }

    // Atualizando o carrinho com a nova quantidade
    addToCart(updatedProduct);
  }

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
            {cartItems.map(product => (
              <Flex
                key={product.id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                alignItems="center"
              >
                <Image
                  src={product.produtoImagens[0]}
                  alt={product.produtoNome}
                  boxSize="80px"
                  objectFit="cover"
                  borderRadius="md"
                  mr={4}
                />
                <Box flex="1">
                  <Text color={color}>{product.produtoNome}</Text>
                  <Text fontSize="sm" color={color}>
                    {product.produtoPreco}
                  </Text>
                </Box>
                <Flex alignItems="center">
                  <Button size="sm" mr={2}>
                    -
                  </Button>
                  <Text color={color}>{product.produtoQuantidade}</Text>
                  <Button size="sm" ml={2}>
                    +
                  </Button>
                </Flex>
            
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
              {}

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
            <Button
              mt={4}
              colorScheme="green"
              width="full"
              onClick={() =>
                (window.location.href =
                  'https://buy.stripe.com/test_cN2cQseId2cH0Bq9AA')
              }
            >
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
