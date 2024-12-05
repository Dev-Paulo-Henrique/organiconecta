import { Box, Flex, Text } from '@chakra-ui/react'
import Head from 'next/head'

export default function ErrorPage() {
  return (
    <Box>
      <Head>
        <title>404 - Página não encontrada</title>
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
          Página não encontrada!
        </Text>
        <Text color="green.900" fontWeight="bold">
          OrganiConecta
        </Text>
      </Flex>
    </Box>
  )
}
