import {
  Box,
  Flex,
  Heading,
  Grid,
  Image,
  Text,
  useColorModeValue,
  Divider
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Button } from '~components/Button';
import { CardsEndScreen } from '~components/CardsEndScreen';
import { Footer } from '~components/Footer';
import { Header } from '~components/Header';
import { ProductsGrid } from '~components/ProductsGrid';
import { Title } from '~components/Title';
import { useAuth } from '~hooks/useAuth';
import { api } from '~services/api';
import { storage } from '~services/firebase';

// Interface do Produto
interface Product {
  id: string;
  produtoNome: string;
  produtoPreco: number;
  produtoImagens: string[];
  produtoDescricao: string;
  produtoCategoria: string;
  produtoCodigo: string;
  produtoQuantidade: number;
}

const producers = Array(20).fill({ name: 'Produtor' });

export default function App() {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const color = useColorModeValue('gray.800', 'gray.50');
  const { token } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);

  async function carregarCliente() {
    await api.post("/tipocliente/inicializar");
  }

  async function carregarProdutos() {
    try {
      const response = await api.get("/produto");
      if (response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  }

  useEffect(() => {
    carregarCliente();
    carregarProdutos();
  }, [token]);

  // Agrupa produtos por categoria
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.produtoCategoria;
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Ordem desejada das categorias
  const categoryOrder = [
    'Fruta',
    'Verdura',
    'Legume',
    'Carne',
    'Laticínio',
    'Grão',
    'Cereal'
  ];

  return (
    <Box bg={bg} color={color} minH="100vh">
      <Header />
      <Title />
      <Flex bgImage="url('/images/farm.png')"
        alignItems="center"
        h={{ base: 300, md: 400 }}
        bgSize="cover"
        bgPos="center"
        p={{ base: 4, md: 8 }}
      >
        <Box
          // bg="rgba(255, 255, 255, 0.8)"
          p={{ base: 4, md: 6 }}
          borderRadius="md"
          maxH={150}
          maxW={{ base: "90%", md: "700px" }}
        >
          <Heading size={{ base: "lg", md: "2xl" }}
            color={'white'}
            textAlign={{ base: "left", md: "left" }}
            lineHeight={{ base: "shorter", md: "tall" }}
          >
            Conectando pessoas a produtos frescos, cultivados com carinho e
            dedicação.
          </Heading>
        </Box>
      </Flex>

      {/* <Box p={8} px={""}>
        <Heading size="md" mb={4}>
          Perfil de produtores
        </Heading>
        <Flex gap={3} flexWrap={"wrap"} justifyContent={"space-between"}>
          {producers.map((producer, index) => (
            <Box
              key={index}
              w="60px"
              h="60px"
              bg="gray.200"
              borderRadius="full"
              borderWidth="2px"
              borderColor="gray.400"
            />
          ))}
        </Flex>
      </Box> */}

      {/* Passando os produtos para o ProductsGrid */}

      {products.length > 0 && <Heading
        size={{
          base: "xl",
          md: "2xl"
        }}
        p={{ base: 4, md: 8 }}
        textAlign="left"
      >
        Produtos Orgânicos
      </Heading>}

      <Divider />

      {/* <ProductsGrid products={products} /> -- Listagem de produtos antiga */}

      {/* Seção de produtos por categoria */}
      {categoryOrder.map((category) => {
        const categoryProducts = productsByCategory[category] || [];

        if (categoryProducts.length === 0) return null;

        return (
          <Box key={category} pb={{ base: "4", md: "2" }}>
            <Heading
              size={{ base: "xl", md: "lg" }}
              p={{ base: 4, md: 8 }}
              textAlign="left"
            >
              {category}
            </Heading>

            <ProductsGrid products={categoryProducts} />
            <Divider />
          </Box>
        );
      })}

      {/* <Grid
        templateColumns={{ base: "1fr", md: "repeat(auto-fit, minmax(200px, 1fr))" }}
        gap={6}
        p={{ base: 4, md: 8 }}
      >
        <Box bg="purple.100" p={4} borderRadius="md"
        >
          <Heading size="sm" mb={2}>
            Semente ao solo, esperança ao futuro.
          </Heading>
          <Button type={20} />
        </Box>
        <Box bg="pink.100" p={4} borderRadius="md">
          <Heading size="sm" mb={2}>
            Na terra, o trabalho se transforma em alimento.
          </Heading>
          <Button type={20} />
        </Box>
        <Box bg="green.100" p={4} borderRadius="md">
          <Heading size="sm" mb={2}>
            Agricultura: a força que alimenta o mundo.
          </Heading>
          <Button type={20} />
        </Box>
      </Grid> */}
      <CardsEndScreen />
      <Footer />
    </Box>
  );
}
