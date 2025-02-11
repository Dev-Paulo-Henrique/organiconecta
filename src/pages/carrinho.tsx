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
  IconButton,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Header } from '~components/Header'
import { Title } from '~components/Title'
import { useAuth } from '~hooks/useAuth'
import { useCart } from '~hooks/useCart'
import theme from '~styles/theme'
import { notifyError, notifyInfo, notifySuccess } from '~utils/toastify'

const FRETE_FIXO = 20
const TAXA_POR_PRODUTO = 1.75

export default function Carrinho() {
  const bg = useColorModeValue('gray.100', 'gray.800');
  const color = useColorModeValue('gray.800', 'gray.100');
  const [paymentMethod, setPaymentMethod] = useState('credito');
  const { token } = useAuth();
  const router = useRouter(); // Usando o roteador do Next.js

  const { cartItems, addItem, removeItem, deleteItems, removeProduct } = useCart();

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  const updateQuantity = (productId: string, operation: string) => {
    const product = cartItems.find(item => item.id === productId);
    if (!product) return;

    if (operation === 'increment') {
      addItem({ ...product, quantity: 1 });
    } else if (operation === 'decrement' && product.quantity > 1) {
      removeItem(productId);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.produtoPreco) * item.quantity,
    0
  );
  const taxas = cartItems.length * TAXA_POR_PRODUTO;
  const total = subtotal + (cartItems.length === 0 ? 0 : FRETE_FIXO) + taxas;

  return (
    <Box bg={bg} minH="100vh">
      <Title name="Carrinho" />
      <Header />
      <Grid
        templateColumns={{ base: '1fr', md: '2fr 1fr' }}
        gap={{ base: 4, md: 6 }}
        maxW="1200px"
        mx="auto"
        p={{ base: 4, md: 8 }}
      >
        {/* Coluna do Carrinho */}
        <GridItem>
          <Heading size={{ base: 'md', md: 'lg' }} mb={4}>
            Carrinho
          </Heading>

          {cartItems.length === 0 ? (
            <Flex justifyContent="center" flexDir="column" align="center">
              <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" textAlign="center" my={6}>
                🛒 Seu carrinho está vazio!
              </Text>
              <Button
                mt={3}
                colorScheme="green"
                onClick={() => router.push('/')}
                fontSize={{ base: 'sm', md: 'md' }}
              >
                Continuar comprando
              </Button>
            </Flex>
          ) : (
            <Stack spacing={{ base: 3, md: 4 }}>
              {cartItems.map(product => (
                <Flex
                  bg="white"
                  key={product.id}
                  p={{ base: 3, md: 4 }}
                  borderWidth="1px"
                  borderRadius="lg"
                  alignItems="center"
                  flexDir={{ base: 'column', md: 'row' }}
                >
                  <Image
                    src={product.produtoImagens}
                    alt={product.produtoNome}
                    boxSize={{ base: '60px', md: '80px' }}
                    objectFit="contain"
                    bg="white"
                    borderRadius="md"
                    mb={{ base: 2, md: 0 }}
                    mr={{ md: 4 }}
                  />
                  <Box flex="1" textAlign={{ base: 'center', md: 'left' }}>
                    <Text
                      color="green.600"
                      textTransform="uppercase"
                      fontSize={{ base: 'md', md: 'lg' }}
                      fontWeight="bold"
                    >
                      {product.produtoNome}
                    </Text>
                    <Text as="small" fontSize="sm" color={color}>
                      {formatCurrency(Number(product.produtoPreco))}
                    </Text>
                  </Box>
                  <Flex alignItems="center" mt={{ base: 2, md: 0 }}>
                    <Button
                      bg="green.500"
                      color="white"
                      fontWeight="bold"
                      size="sm"
                      mr={2}
                      onClick={() => updateQuantity(product.id, 'decrement')}
                      disabled={product.quantity === 1}
                    >
                      -
                    </Button>
                    <Text color={color} mx={1} fontWeight="bold">
                      {product.quantity}
                    </Text>
                    <Button
                      bg="green.500"
                      color="white"
                      fontWeight="bold"
                      size="sm"
                      ml={2}
                      onClick={() => updateQuantity(product.id, 'increment')}
                      disabled={product.quantity === Number(product.produtoQuantidade)}
                    >
                      +
                    </Button>
                    <IconButton
                      icon={<FaTrash />}
                      aria-label="Remover item"
                      colorScheme="red"
                      size="sm"
                      ml={5}
                      onClick={() => removeProduct(product.id)}
                    />
                  </Flex>
                </Flex>
              ))}
            </Stack>
          )}
        </GridItem>

        {/* Coluna do Resumo */}
        <GridItem>
          <Box
            p={{ base: 4, md: 6 }}
            borderWidth="1px"
            borderRadius="lg"
            bg={useColorModeValue('white', 'gray.700')}
          >
            <Heading size={{ base: 'sm', md: 'md' }} mb={4}>
              Resumo do Pedido
            </Heading>
            <Stack spacing={2}>
              <Flex justifyContent="space-between">
                <Text>Valor dos produtos</Text>
                <Text>{formatCurrency(subtotal)}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>Frete</Text>
                <Text>{formatCurrency(cartItems.length === 0 ? 0 : FRETE_FIXO)}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>Taxas adicionais</Text>
                <Text>{formatCurrency(taxas)}</Text>
              </Flex>
            </Stack>
            <Divider my={4} />
            <RadioGroup
              value={paymentMethod}
              onChange={e => setPaymentMethod(e)}
              defaultValue="credito"
            >
              <Stack spacing={2}>
                <Radio value="credito">Cartão de crédito</Radio>
                <Radio value="debito">Cartão de débito</Radio>
                <Radio value="pix" isDisabled>
                  Pix
                </Radio>
              </Stack>
            </RadioGroup>
            <Divider my={4} />
            <Flex justifyContent="space-between" fontWeight="bold">
              <Text>Total</Text>
              <Text>{formatCurrency(total)}</Text>
            </Flex>
            <Button
              mt={4}
              colorScheme="green"
              disabled={cartItems.length === 0}
              width="full"
              fontSize={{ base: 'sm', md: 'md' }}
              onClick={() => {
                if (token) {
                  router.push(`/checkout?type=${paymentMethod}`);
                } else {
                  notifyInfo('Faça login para continuar a compra');
                  router.push(`/login`);
                }
              }}

            >
              Finalizar compra
            </Button>
          </Box>
          <Flex
            justifyContent={cartItems.length !== 0 ? 'space-between' : 'flex-end'}
            mt={3}
            flexDir={{ base: 'column', md: 'row' }}
          >
            {cartItems.length !== 0 && (
              <>
                <Button
                  colorScheme="green"
                  variant="link"
                  onClick={() => router.push('/')}
                  mb={{ base: 2, md: 0 }}
                >
                  Continuar comprando
                </Button>
                <Button colorScheme="red" variant="link" onClick={deleteItems}>
                  Cancelar pedidos
                </Button>
              </>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
}
