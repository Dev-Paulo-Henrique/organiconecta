// Paulo Henrique

import { Box, Text, HStack, Icon, VStack, Divider } from '@chakra-ui/react'
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa' // Você pode importar ícones de bandeiras de cartões
import { MdCreditCard } from 'react-icons/md' // Ícone de cartão de crédito

interface CreditCardProps {
  user: any
  numeroCartao: string
  vencimento: string
  cvc: string
  parcelas: number
}

export function CreditCard({
  user,
  numeroCartao,
  vencimento,
  parcelas,
  cvc
}: CreditCardProps) {
  return (
    <Box
      w="full"
      maxW="400px"
      h="220px"
      borderWidth={1}
      borderRadius="lg"
      bg="gray.800"
      color="white"
      boxShadow="lg"
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      p={5}
      mb={5}
      sx={{
        background: 'linear-gradient(145deg, #374151, #1f2937)', // Gradient para dar um efeito mais realista
        border: '2px solid #2d3748', // Contorno mais sutil
      }}
    >
      {/* Área superior com logo do cartão e número do cartão */}
      <HStack justify="space-between" mb={3}>
        <HStack>
          <Icon as={FaCcVisa} w={10} h={10} /> {/* Bandeira do cartão */}
          <Text fontSize="sm" fontWeight="medium">Crédito</Text>
        </HStack>
        <HStack>
          <Text fontSize="lg" fontWeight="bold">
            {numeroCartao !== ''
              ? `${numeroCartao.slice(0, 4).padEnd(4, '•')}`
              : '••••'}{' '}
            {numeroCartao?.slice(5, 9).padEnd(4, '•')}{' '}
            {numeroCartao?.slice(10, 14).padEnd(4, '•')}{' '}
            {numeroCartao?.slice(15, 19).padEnd(4, '•')}
          </Text>
        </HStack>
      </HStack>

      {/* Informações do cartão */}
      <VStack align="start" spacing={1} mb={2}>
        <Text fontSize="sm" fontWeight="medium">
          Nome: {user}
        </Text>
        <Text fontSize="sm" fontWeight="medium">
          Validade: {vencimento}
        </Text>
        <Text fontSize="sm" fontWeight="medium">
          Parcelas: {parcelas}
        </Text>
      </VStack>

      {/* Divider para separar a área da bandeira e o CVC */}
      <Divider color="whiteAlpha.600" my={2} />

      {/* CVC e segurança */}
      <HStack justify="space-between" align="center">
        <Box>
          <Text fontSize="sm" fontWeight="medium">
            CVC
          </Text>
          <Text fontSize="sm">{cvc ? cvc.slice(-3) : "•••"}</Text>
        </Box>
        <Icon as={MdCreditCard} w={7} h={7} />
      </HStack>
    </Box>
  )
}
