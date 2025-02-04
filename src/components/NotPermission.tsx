// Paulo Henrique

import { Box, Button, Text } from '@chakra-ui/react'
import { Title } from './Title'
import { ImBlocked } from 'react-icons/im'
import { useColorModeValue } from './ui/color-mode'

export function NotPermission() {
  const bg = useColorModeValue('white', 'gray.900')
  const color = useColorModeValue('gray.800', 'gray.100')
  return (
    <>
      <Title name="Sem permissão" />
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDir={'column'}
        p={8}
        h={'100vh'}
        gap={3}
        bg={bg}
      >
        <ImBlocked size={'5rem'} color="red" />
        <Text fontWeight={'bold'} fontSize={28} color={color}>
          Você não tem permissão para acessar essa página!
        </Text>
        <Button onClick={() => window.history.back()}>Voltar</Button>
      </Box>
    </>
  )
}
