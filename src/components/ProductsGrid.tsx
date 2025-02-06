// Paulo Henrique

import {
  Box,
  Flex,
  Heading,
  Grid,
  Image,
  Text,
  useColorModeValue,
  Tooltip,
  Icon,
} from '@chakra-ui/react'
import { Router, useRouter } from 'next/router'
import React from 'react'
import { FiArchive, FiTag } from 'react-icons/fi'
import { Button } from '~components/Button'

interface Product {
  id: string
  produtoNome: string
  produtoPreco: number | string
  produtoImagens: string[]
  produtoDescricao: string
  produtoCategoria: string
  produtoCodigo?: string
  produtoQuantidade: number | string
  // quantity?: string;

}

interface ProductsGridProps {
  products: Product[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const router = useRouter()

  return (
    <Grid
      templateColumns={{
        base: '1fr 1fr',
        md: 'repeat(auto-fit, minmax(200px, 1fr))',
      }}
      gap={4}
      p={8}
    >
      {products.map(product => (
        <Box
          key={product.id}
          p={3}
          borderWidth="1px"
          borderRadius="md"
          bg="white"
          boxShadow="sm"
          _hover={{ transform: "scale(1.02)", boxShadow: "xl" }}
          transition="0.3s"

        >
          <Flex position={"relative"} justifyContent={'center'}>
          <Box
              position="absolute"
              top="0"
              border={"1px solid white"}
              right="0"
              bg="green.500"
              color="white"
              px="3"
              py="1"
              borderRadius="md"
              fontWeight="bold"
              fontSize="sm"
            >
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(product.produtoPreco))} / KG
            </Box>
            <Image
              src={product.produtoImagens[0]} // Usando a primeira imagem do array
              alt={product.produtoNome}
              borderRadius="md"
              mb={4}
              mt={-2}
              objectFit="contain"
              w="200px" // Tamanho máximo para a largura
              h="200px" // Tamanho máximo para a altura
            />
          </Flex>
          <Flex align={"center"} mb={3} justify={"space-between"}>
          <Heading size="md" color={"gray.700"}>
            {product.produtoNome}
          </Heading>
          {/* <Text mb={2} fontSize="xl" fontWeight="bold" color="green.600">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(product.produtoPreco)}{' '}
          </Text> */}
          <Flex align="center" justify="space-between">
            <Tooltip label="Categoria do Produto" hasArrow>
              <Flex align="center">
                <Icon as={FiTag} color="gray.500" mr={1} />
                <Text fontSize="sm" color="gray.600">{product.produtoCategoria}</Text>
              </Flex>
            </Tooltip>
            {/* <Tooltip label="Código do Produto" hasArrow>
              <Flex align="center">
                <Icon as={FiArchive} color="gray.500" mr={2} />
                <Text fontSize="sm" color="gray.600">{product.produtoCodigo}</Text>
              </Flex>
            </Tooltip> */}
          </Flex>
          </Flex>
          <Button
            type={10}
            onClick={() => router.push(`/produto?id=${product.id}`)}
          />
        </Box>
      ))}
    </Grid>
  )
}
