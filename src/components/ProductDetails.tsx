//Gisele Oliveira

import { Flex, Image, Text, Box, Grid, Button } from '@chakra-ui/react'
import { useColorModeValue } from '~components/ui/color-mode'
import theme from '~styles/theme'

interface ProductDetailsProps {
  backgroundImg: string
  alt: string
  children: string
}
export function ProductDetails({
  children,
  alt,
  backgroundImg,
}: ProductDetailsProps) {
  const bg = useColorModeValue('gray.100', 'gray.800')

  return (
    <>
      <Flex alignItems={'center'} justifyContent={'center'} gap={9}>
        <Flex flexDir="column" alignItems={'center'}>
          <Box
            flexDir="column"
            p={4}
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            boxShadow="sm"
            h="auto"
            w={'350px'}
          >
            <Image
              src={backgroundImg}
              alt={alt}
              w={'350px'}
              h="auto"
              objectFit="cover"
            ></Image>
          </Box>
          <Button
            w={350}
            type="submit"
            mt="6"
            colorScheme="green"
            bg={useColorModeValue(
              theme.colors.green[700],
              theme.colors.green[500],
            )}
            size="lg"
            color={useColorModeValue(
              theme.colors.gray[100],
              theme.colors.gray[100],
            )}
          >
            Comprar
          </Button>
        </Flex>
        <Box
          display="flex"
          alignItems="start"
          justifyContent="start"
          flexDir="column"
        >
          <Text w={'35rem'}>{children}</Text>
        </Box>
      </Flex>
    </>
  )
}
