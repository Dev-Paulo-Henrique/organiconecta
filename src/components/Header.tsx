// Paulo Henrique

import { Flex } from '@chakra-ui/react'
import { Button } from './Button'
import { Logo } from './Logo'
import { List } from './List'

export function Header() {
  return (
    <Flex align={'center'} justify={'space-between'} p={3} m={'0 3rem'}>
      <Logo size={250} link='/'/>
      <Flex align={'center'} justify={'space-between'} w={200}>
        <List title='Actions'/>
        
        <Button
          text="Sair"
          bg={'red.500'}
          color={'white'}
        />
      </Flex>
    </Flex>
  )
}
