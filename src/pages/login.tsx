import { Box, Flex, Text } from '@chakra-ui/react'
import { Title } from '~components/Title'

export default function Login() {
  return (
    <Box>
      <Title name="Login" />
      <Flex
        maxW="1120px"
        h="100vh"
        margin="auto"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
      >
        <Text fontSize="2rem" fontWeight="bold" lineHeight="4.5rem">
          Login
        </Text>
      </Flex>
    </Box>
  )
}
