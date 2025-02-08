import { ReactNode, useEffect, useState } from 'react'
import { Flex, Image, Text, Box, Button } from '@chakra-ui/react'
import { useColorModeValue } from '~components/ui/color-mode'
import theme from '~styles/theme'
import { useRouter } from 'next/router'

interface ProductDetailsProps {
  img: string
  alt: string
  price: string
  id: string
  quantity: string
  onClick: () => void
  children: ReactNode
}

export function ProductDetails({
  children,
  alt,
  img,
  price,
  id,
  quantity,
  onClick
}: ProductDetailsProps) {
  const [isClient, setIsClient] = useState(false)
    const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const bg = useColorModeValue('gray.100', 'gray.800')
  const buttonBg = useColorModeValue(
    theme.colors.green[500],
    theme.colors.green[600],
  )
  const buttonColor = useColorModeValue(
    theme.colors.gray[100],
    theme.colors.gray[100],
  )

  if (!isClient) {
    return null
  }

  return (
    <Flex
     gap={{base: 5, md: 20}} 
     pt={{base: 10, md: 20}}
     flexDir={{ base: 'column', md: 'row' }} 
      alignItems="center" // Centraliza os itens em mobile
     >
      <Flex flexDir="column" alignItems={'center'}>
        <Box
          position="relative" // Define o container como referência
          p={4}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="sm"
          bg={"white"}
          h="auto"
          w={{base: '280px', md: '350px'}}
          textAlign="center"
        >
          {/* Preço posicionado em cima da imagem */}
          <Box
            position="absolute"
            top="10px"
            left="10px"
            bg="green.500"
            color="white"
            px="3"
            py="1"
            borderRadius="md"
            fontWeight="bold"
            fontSize="sm"
          >
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(parseFloat(price))} / KG
          </Box>

          <Image
            src={img}
            alt={alt}
            w={{base: '250px', md:'300px'}} //Tamano menor no mobile
            h={{base: '250px', md:'300px'}} //Tamano menor no mobile
            objectFit="contain"
            borderRadius="md"
          />
        </Box>
        <Button
          w={{base:'280px', md:'350px'}}
          type="submit"
          mt="6"
          colorScheme="green"
          bg={buttonBg}
          size="lg"
          p={{ base: 6, md: 10 }} 
          fontSize={{ base: 18, md: 24 }} 
          textTransform={"uppercase"}
          fontWeight={"bold"}
          color={buttonColor}
          onClick={onClick}
        >
          Comprar agora
        </Button>
        <Text mt={2}>{quantity} itens restantes</Text>
      </Flex>
      <Flex
        // alignItems="start"
        // justifyContent="start"
        flexDir="column"
        w={{ base: '100%', md: 'auto' }}
      >
        {children}
      </Flex>
    </Flex>
  )
}
