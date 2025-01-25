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
  name: string
  price: string
}

interface ProductsGridProps {
  products: Product[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <Grid
    //   templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
      templateColumns={{ base: "1fr 1fr", md: "repeat(auto-fit, minmax(200px, 1fr))" }}
      gap={4}
      p={8}
    >
      {products.map((product, index) => (
        <Box
          key={index}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          bg="white"
          boxShadow="sm"
        >
          <Flex justifyContent={'center'}>
            <Image
              src="/images/cebola-roxa.png"
              alt={product.name}
              borderRadius="md"
              mb={4}
            />
          </Flex>
          <Heading size="sm" mb={2}>
            {product.name}
          </Heading>
          <Text mb={2}>{product.price}</Text>
          <Button type={10} onClick={() => alert(`Você comprou ${product.name}`)}/>
        </Box>
      ))}
    </Grid>
  )
}
