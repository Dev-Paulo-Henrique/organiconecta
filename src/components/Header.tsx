// // Paulo Henrique

import { Flex, Text, useDisclosure, Spinner } from '@chakra-ui/react'
import { Button } from './Button'
import { Logo } from './Logo'
import { useColorModeValue } from './ui/color-mode'
import { useRouter } from 'next/router'
import { Viewer } from './Modal'
import { useState, useEffect } from 'react'
import { useAuth } from '~hooks/useAuth'
import { api } from '~services/api'
import { Loading } from './Loading'
import { NotPermission } from './NotPermission'

export function Header() {
  const bg = useColorModeValue('white', 'gray.900')
  const color = useColorModeValue('gray.800', 'gray.100')
  const router = useRouter()
  const { token, user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [isValidToken, setIsValidToken] = useState<boolean>(false)

  const { query } = useRouter()
  const { id } = query

  const [loja, setLoja] = useState<any>(null) // Estado para armazenar os dados da loja

  // Função para verificar se a loja pertence ao cliente logado
  const checkLoja = (lojas: any[]) => {
    return lojas.find(loja => loja.cliente.id === user?.id)
  }

  // Carregar dados da loja
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/loja', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        
        // Verificar se a loja pertence ao cliente logado
        const lojaEncontrada = checkLoja(response.data)
        
        if (lojaEncontrada) {
          setLoja(lojaEncontrada) // Se encontrar, armazena os dados da loja
        } else {
          console.error('Loja não encontrada para esse cliente.')
        }
      } catch (error) {
        console.error('Erro ao buscar lojas:', error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchData()
    }
  }, [token, user?.id])

  console.log(loja)

  // if (loading) return <Loading />
  // if (!isProducer || !loja) return <NotPermission />

  //   // Adicionando estado de loading para o botão de ativação/desativação do plano

  // Função para abrir o modal com o título correto
  const handleOpen = (newTitle: string) => {
    setTitle(newTitle)
    onOpen()
  }

  const isProducerLinks = [
    { href: '/', label: 'Início' },
    loja ? { href: `/admin/produtos`, label: 'Produtos' } : {},
    { href: '/admin/clientes', label: 'Clientes' },
    { href: '/admin/pedidos', label: 'Pedidos' },
    { href: '/perfil', label: 'Perfil' },
    loja ? { href: `/loja/${loja.id}`, label: 'Loja' } : {},
  ]

  const isClientLinks = [
    { href: '/', label: 'Início' },
    // { href: '/admin/produtos', label: 'Produtos' },
    // { href: '/admin/clientes', label: 'Clientes' },
    // { href: '/admin/pedidos', label: 'Pedidos' },
    { href: '/perfil', label: 'Perfil' },
    { href: '/pedidos', label: 'Pedidos' },
    // { href: `/loja/${user?.id}`, label: 'Loja' },
  ]

  const buttonType =
    router.pathname === '/'
      ? 11
      : router.pathname === '/admin/produtos'
        ? 21
        : router.pathname === '/admin/clientes'
          ? 3
          : router.pathname === '/admin/pedidos'
            ? 4
            : router.pathname === `/loja/${user?.id}`
              ? 4
              : token
                ? 1
                : undefined

  // Verificando o tipo do usuário: cliente ou produtor
  const isClient = user?.tipoCliente?.tipo === 'Cliente'
  const isProducer = user?.tipoCliente?.tipo === 'Produtor'
  const isAdmin = user?.usuario?.username?.includes('@discente.ifpe.edu.br');

  return (
    <Flex align={'center'} justify={'space-between'} p={{ base: '1rem', md: '1rem 3rem' }} bg={bg} flexDirection={{ base: 'column', md: 'row' }}>
      <Logo size={{ base: 150, md: 250 }} link='/' />
      <Flex gap={{ base: 3, md: 5 }} alignItems={'center'} flexWrap='wrap' justifyContent={{ base: 'center', md: 'flex-start' }}>
        {isProducer && token && isProducerLinks.map((link, index) => (
          <Text
            key={index}
            as={'a'}
            href={link.href}
            color={color}
            fontSize={{ base: 'sm', md: 'md' }}
            fontWeight={
              router.pathname === '/produto' && link?.href?.includes('/produto')
                ? 'bold'
              : link?.href?.includes(`/loja/${id}`)
                ? 'bold'
                : router.pathname === link.href
                  ? 'bold'
                  : 'normal'
            }
          >
            {link.label}
          </Text>
        ))}

{isClient && token && isClientLinks.map((link, index) => (
          <Text
            key={index}
            as={'a'}
            href={link.href}
            color={color}
            fontSize={{ base: 'sm', md: 'md' }}
            fontWeight={
              router.pathname === '/produto' && link.href.includes('/produto')
                ? 'bold'
                : router.pathname === link.href
                  ? 'bold'
                  : 'normal'
            }
          >
            {link.label}
          </Text>
        ))}

        {/* {token && isClient && router.pathname === '/' && <Button type={12} />} */}
        {router.pathname !== '/lojas' && <Button type={17} />}
        {token && isAdmin && router.pathname !== '/admin/dashboard' && <Button type={16} />}
        {!token && router.pathname === '/' && <Button type={12} />}
        {!token && router.pathname === '/carrinho' && <Button type={11} />}
        {!token && router.pathname === '/produto' && <Button type={11} />}
        {!token && router.pathname.includes('/politicas') && <Button type={11} />}
        {/* {token && router.pathname !== '/' && (
          <Button type={buttonType}
            onClick={
              buttonType === 21
                ? () => handleOpen('Adicionar Produto')
                : undefined
            }
          />
        )} */}
        {!token && router.pathname === '/' && (
          <Button
            type={buttonType}
            onClick={buttonType === 21
              ? () => handleOpen('Adicionar Produto')
              : undefined
            }
          />
        )}
        {loja && isProducer && token && router.pathname === "/admin/produtos" && <Button
            type={21}
            onClick={() => handleOpen('Adicionar Produto')
            }
          />}
        {!token && router.pathname.includes('/loja') && <Button type={12} />}
        {!token && router.pathname.includes('/loja') && <Button type={11} />}
        {token && <Button type={1} />}
      </Flex>
      <Viewer isOpen={isOpen} onClose={onClose} title={title} />
    </Flex>
  )
}
