import { Flex, Spinner } from '@chakra-ui/react'
import { useColorModeValue } from './ui/color-mode'

export function Loading() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')
  return (
    <Flex justify="center" align="center" w="100%" height="100vh" bg={bg}>
      <Spinner size="lg" color="green.500" />
    </Flex>
  )
}
