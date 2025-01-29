// Paulo Henrique

import { Box, Flex, Text } from '@chakra-ui/react'
import { Title } from '~components/Title'
import { useColorModeValue } from '~components/ui/color-mode'

export default function ErrorPage() {
    const bg = useColorModeValue('gray.100', 'gray.800')
    const color = useColorModeValue('gray.800', 'gray.100')
    
  return (
    <Box bg={bg}>
      <Title name="404" />
      <Flex
        maxW="1120px"
        h="100vh"
        margin="auto"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
      >
        <Text fontSize="2rem" fontWeight="bold" lineHeight="4.5rem" color={color}>
          Página não encontrada!
        </Text>
        <Text color="green.900" fontWeight="bold">
          OrganiConecta
        </Text>
      </Flex>
    </Box>
  )
}
