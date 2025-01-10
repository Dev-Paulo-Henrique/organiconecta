// Paulo Henrique

import { Flex, Text, Button as Btn } from '@chakra-ui/react'
import { Button } from './Button'
import { Logo } from './Logo'
import { List } from './List'
import { useColorModeValue } from './ui/color-mode'
import { useRouter } from 'next/router'

export function Header() {
  const bg = useColorModeValue('white', 'gray.900')
  const color = useColorModeValue('gray.800', 'gray.100')
  const router = useRouter()

  const links = [
    { href: '/', label: 'Início' },
    { href: '/cadastro/produto', label: 'Produtos' },
    { href: '/clientes', label: 'Clientes' },
    { href: '/pedidos', label: 'Pedidos' }
  ]

  return (
    <Flex align={'center'} justify={'space-between'} p={"1rem 3rem"} bg={bg}>
      <Logo size={250} link='/' />
      <Flex gap={5} alignItems={"center"}>
      {links.map((link, index) => (
          <Text key={index} as={"a"} href={link.href} fontWeight={router.pathname === link.href ? 'bold' : 'normal'}>
            {link.label}
          </Text>
        ))}
        {/* <List title='Ações'/> */}
        <Button
          type={1}
        />
      </Flex>
    </Flex>
  )
}
