// Paulo Henrique

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

export function Header() {
  const bg = useColorModeValue('white', 'gray.900')
  const color = useColorModeValue('gray.800', 'gray.100')
  const router = useRouter()
  const { token, user } = useAuth() // Obtendo o token e o usuário do contexto
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [isValidToken, setIsValidToken] = useState<boolean>(false)

  // Adicionando estado de loading para o botão de ativação/desativação do plano
  const [loadingPlan, setLoadingPlan] = useState<boolean>(false)

  // Função para abrir o modal com o título correto
  const handleOpen = (newTitle: string) => {
    setTitle(newTitle)
    onOpen()
  }

  // async function loadToken() {
  //   if (!token) {
  //     setLoading(false)
  //     return
  //   }

  //   try {
  //     const response = await api.get('/cliente', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })

  //     setIsValidToken(response.data)
  //     setLoading(false)
  //   } catch (error) {
  //     setLoading(false)
  //     localStorage.removeItem("email")
  //     localStorage.removeItem("token")
  //     window.location.reload()
  //     console.error('Erro ao carregar token', error)
  //   }
  // }

  // useEffect(() => {
  //   if (token) {
  //     loadToken()
  //   }
  // }, [])

  // if(loading){
  //   return <Loading/>
  // }

  const links = [
    { href: '/', label: 'Início' },
    { href: '/admin/produtos', label: 'Produtos' },
    { href: '/admin/clientes', label: 'Clientes' },
    { href: '/admin/pedidos', label: 'Pedidos' },
    { href: `/loja/${user?.id}`, label: 'Loja' },
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

  const handlePlanToggle = async () => {
    setLoadingPlan(true); // Ativando o estado de loading

    try {
      // Dependendo do tipo de cliente, fazemos a requisição PUT
      const endpoint = isClient
        ? `/assinatura/${user.id}/ativarplano`
        : `/assinatura/${user.id}/desativarplano`;

      const response = await api.put(endpoint, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Plano atualizado:', response);
      window.location.reload();  // Recarrega a página após sucesso
    } catch (error) {
      console.error('Erro ao atualizar plano:', error);
    } finally {
      setLoadingPlan(false); // Desativa o estado de loading após a requisição
    }
  }

  return (
    <Flex align={'center'} justify={'space-between'} p={'1rem 3rem'} bg={bg}>
      <Logo size={250} link="/" />
      <Flex gap={5} alignItems={'center'}>
        {isProducer && token && links.map((link, index) => (
          <Text
            key={index}
            as={'a'}
            href={link.href}
            color={color}
            fontWeight={
              router.pathname === "/produto" && link.href.includes("/produto") 
                ? "bold"
                : router.pathname === link.href 
                ? "bold"
                : "normal"
            }
            
          >
            {link.label}
          </Text>
        ))}

        {/* Se o usuário for cliente, exibe o botão "Quero virar produtor" */}
        {token && (
          <Button
          isLoading={loadingPlan} // Passando o estado de carregamento
          onClick={handlePlanToggle}
          type={isClient ? 22 : 23}
        >
          {isClient ? 'Ativar Plano' : 'Desativar Plano'}
        </Button>        
        )}

        {/* Caso o usuário esteja logado e esteja em alguma página diferente de Início */}
        {!token && router.pathname === '/' && <Button type={12} />}
        {token && router.pathname !== '/' && (
          <Button
            type={buttonType}
            onClick={
              buttonType === 21
                ? () => handleOpen('Adicionar Produto')
                : undefined
            }
          />
        )}
        {!token && router.pathname === '/' && (
          <Button
            type={buttonType}
            onClick={
              buttonType === 21
                ? () => handleOpen('Adicionar Produto')
                : undefined
            }
          />
        )}
        {token && <Button type={1} />}
      </Flex>
      <Viewer isOpen={isOpen} onClose={onClose} title={title} />
    </Flex>
  )
}
