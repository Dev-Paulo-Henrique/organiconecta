import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import { Button } from './Button'
import { Logo } from './Logo'
import { useColorModeValue } from './ui/color-mode'
import { useRouter } from 'next/router'
import { Viewer } from './Modal'
import { useState } from 'react'

export function Header() {
  const bg = useColorModeValue('white', 'gray.900')
  const color = useColorModeValue('gray.800', 'gray.100')
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
    const [title, setTitle] = useState<string>("");
  
    const handleOpen = (newTitle: string) => {
      setTitle(newTitle);
      onOpen();
    };

  const links = [
    { href: '/', label: 'Início' },
    { href: '/cadastro/produto', label: 'Produtos' },
    { href: '/clientes', label: 'Clientes' },
    { href: '/pedidos', label: 'Pedidos' },
  ]

  const buttonType =
    router.pathname === '/'
      ? 11
      : router.pathname === '/cadastro/produto'
      ? 21
      : router.pathname === '/clientes'
      ? 3
      : router.pathname === '/pedidos'
      ? 4
      : 11

  return (
    <Flex align={'center'} justify={'space-between'} p={'1rem 3rem'} bg={bg}>
      <Logo size={250} link="/" />
      <Flex gap={5} alignItems={'center'}>
        {links.map((link, index) => (
          <Text
            key={index}
            as={'a'}
            href={link.href}
            color={color}
            fontWeight={router.pathname === link.href ? 'bold' : 'normal'}
          >
            {link.label}
          </Text>
        ))}
        {router.pathname === "/" && <Button type={12} />}
        <Button type={buttonType} onClick={buttonType === 21 ? () => handleOpen("Adicionar Produto") : undefined} />
      </Flex>
      <Viewer isOpen={isOpen} onClose={onClose} title={title}/>
    </Flex>
  )
}
