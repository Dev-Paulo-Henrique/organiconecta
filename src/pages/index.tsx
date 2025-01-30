// Paulo Henrique

import {
  Box,
  Flex,
  Heading,
  Grid,
  Image,
  Text,
  // Button,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { Button } from '~components/Button';
import { Header } from '~components/Header';
import { ProductsGrid } from '~components/ProductsGrid';
import { Title } from '~components/Title';

interface Product {
  name: string;
  price: string;
  quantity: string;
}

const producers = Array(20).fill({ name: 'Produtor' });
const products: Product[] = Array(16).fill({
  name: 'Cebola roxa - Faz o L',
  price: 'R$ 20,00',
});

export default function App() {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const color = useColorModeValue('gray.800', 'gray.50');

  return (
    <Box bg={bg} color={color} minH="100vh">
      <Header/>
      <Title />
      <Flex bgImage="url('/images/ovelha.jpg')" alignItems={"center"} h={400} bgSize="cover" bgPos="center" p={8}>
        <Box bg="rgba(255, 255, 255, 0.8)" p={6} borderRadius="md" maxH={150} maxW="600px">
          <Heading size="lg">
            Conectando pessoas a produtos frescos, cultivados com carinho e
            dedicação.
          </Heading>
        </Box>
      </Flex>

      <Box p={8} px={""}>
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
      </Box>

      <ProductsGrid products={products}/>

      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4} p={8}>
        <Box bg="purple.100" p={4} borderRadius="md">
          <Heading size="sm" mb={2}>
            Semente ao solo, esperança ao futuro.
          </Heading>
          <Button type={20}/>
        </Box>
        <Box bg="pink.100" p={4} borderRadius="md">
          <Heading size="sm" mb={2}>
            Na terra, o trabalho se transforma em alimento.
          </Heading>
          <Button type={20}/>
        </Box>
        <Box bg="green.100" p={4} borderRadius="md">
          <Heading size="sm" mb={2}>
            Agricultura: a força que alimenta o mundo.
          </Heading>
          <Button type={20}/>
        </Box>
      </Grid>
    </Box>
  );
}
