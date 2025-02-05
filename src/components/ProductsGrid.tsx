// Paulo Henrique

import {
  Box,
  Flex,
  Heading,
  Grid,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { Button } from '~components/Button'

interface Product {
  id: string
  produtoNome: string
  produtoPreco: number
  produtoImagens: string[]
  produtoDescricao: string
  produtoCategoria: string
  produtoQuantidade: number
}

interface ProductsGridProps {
  products: Product[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
  // Função para formatar o valor para moeda BRL
  const formatToBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Grid
      templateColumns={{ base: "1fr 1fr", md: "repeat(auto-fit, minmax(200px, 1fr))" }}
      gap={4}
      p={8}
    >
      {products.map((product) => (
        <Box
          key={product.id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          bg="white"
          boxShadow="sm"
        >
          <Flex justifyContent={'center'}>
            <Image
              src={product.produtoImagens[0]}  // Usando a primeira imagem do array
              alt={product.produtoNome}
              borderRadius="md"
              mb={4}
              maxW="100%" // Garantindo que a imagem não ultrapasse o tamanho do container
              objectFit="contain" // Ajustando a imagem para caber no espaço
            />
          </Flex>
          <Heading size="sm" mb={2}>
            {product.produtoNome}
          </Heading>
          <Text mb={2}>
            {formatToBRL(product.produtoPreco)} {/* Formatação do preço como moeda BRL */}
          </Text>
          <Button type={10} onClick={() => alert(`Você comprou ${product.produtoNome}`)} />
        </Box>
      ))}
    </Grid>
  )
}
