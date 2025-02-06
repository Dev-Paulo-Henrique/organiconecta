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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiTag } from "react-icons/fi";
import { Button } from "~components/Button";

interface Product {
  id: string;
  produtoNome: string;
  produtoPreco: number | string;
  produtoImagens: string[];
  produtoDescricao: string;
  produtoCategoria: string;
  produtoCodigo?: string;
  produtoQuantidade: number | string;
}

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const router = useRouter();

  return (
    <Grid
      templateColumns={{
        base: "1fr", // Uma coluna Mobile
        sm: "1fr 1fr", // Duas colunas Mobile
        md: "repeat(auto-fit, minmax(200px, 1fr))",
      }}
      gap={{ base: 2, md: 4 }}
      p={{ base: 4, md: 8 }} 
    >
      {products.map((product) => (
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
          <Flex position="relative" justifyContent="center">
            <Box
              position="absolute"
              top="0"
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
              }).format(Number(product.produtoPreco))}{" "}
              / KG
            </Box>
            <Image
              src={product.produtoImagens[0]}
              alt={product.produtoNome}
              borderRadius="md"
              mb={4}
              mt={-2}
              objectFit="contain"
              w="100%" 
              maxW="200px" 
              h="200px"
            />
          </Flex>
          <Flex align="center" mb={3} justify="space-between">
            <Heading size="md" color="gray.700" fontSize={{ base: "sm", md: "md" }}>
              {product.produtoNome}
            </Heading>
            <Flex align="center" justify="space-between">
              <Tooltip label="Categoria do Produto" hasArrow>
                <Flex align="center">
                  <Icon as={FiTag} color="gray.500" mr={1} />
                  <Text fontSize="sm" color="gray.600">
                    {product.produtoCategoria}
                  </Text>
                </Flex>
              </Tooltip>
            </Flex>
          </Flex>
          <Button
            type={10}
            // width="100%" -- Necessario para ocupar a tela toda no mobile
            onClick={() => router.push(`/produto?id=${product.id}`)}
          />
        </Box>
      ))}
    </Grid>
  );
}
