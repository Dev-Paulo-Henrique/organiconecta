import { Box, Flex, Text } from '@chakra-ui/react'
import Head from 'next/head'

export default function App() {
  return (
    <Box>
      <Head>
        <title>Página Inicial</title>
      </Head>
      <Flex
        maxW="1120px"
        h="100vh"
        margin="auto"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
      >
        <Text fontSize="2rem" fontWeight="bold" lineHeight="4.5rem">
          Página Inicial
        </Text>
      </Flex>
    </Box>
  )
}
