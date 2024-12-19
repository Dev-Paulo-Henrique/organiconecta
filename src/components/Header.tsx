// Paulo Henrique

import { Flex } from '@chakra-ui/react'
import { Button } from './Button'
import { Logo } from './Logo'
import { List } from './List'
import { useColorModeValue } from './ui/color-mode'

export function Header() {
  const bg = useColorModeValue('white', 'gray.900')
  const color = useColorModeValue('gray.800', 'gray.100')

  return (
    <Flex align={'center'} justify={'space-between'} p={"1rem 3rem"} bg={bg}>
      <Logo size={250} link='/'/>
      <Flex align={'center'} justify={'space-between'} w={200}>
        <List title='Ações'/>
        
        <Button
          text="Sair"
          bg={'red.500'}
          color={'white'}
          colorScheme={"red"}
        />
      </Flex>
    </Flex>
  )
}
