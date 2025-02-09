import { Box, Text, HStack, Icon, VStack, Divider } from '@chakra-ui/react'
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa'
import { MdCreditCard } from 'react-icons/md'

interface CreditCardProps {
  user: any
  numeroCartao: string
  vencimento: string
  cvc: string
  type: string
  parcelas: number
  total: number  // Adicionando total como propriedade
}

export function CreditCard({
  user,
  numeroCartao,
  vencimento,
  parcelas,
  cvc,
  type,
  total, // Desestruturando o total da propriedade
}: CreditCardProps) {
  return (
    <Box
      w="full"
      maxW="400px"
      h="250px" // Ajuste para acomodar o valor total
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
        background: 'linear-gradient(145deg, #374151, #1f2937)',
        border: '2px solid #2d3748',
      }}
    >
      <HStack justify="space-between" mb={3}>
        <HStack>
          <Icon as={FaCcVisa} w={10} h={10} />
          <Text fontSize="sm" fontWeight="medium">
            {type === 'credito' ? 'Crédito' : 'Débito'}
          </Text>
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

      <Box border={"1px dashed white"} my={2} />

      <VStack align="start" spacing={1} mb={2}>
        <Text fontSize="md" fontWeight="bold">
          Valor Total: {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(total)}
        </Text>
      </VStack>

      <HStack justify="space-between" align="center">
        <Box>
          <Text fontSize="sm" fontWeight="medium">
            CVC
          </Text>
          <Text fontSize="sm">{cvc ? cvc.slice(-3) : '•••'}</Text>
        </Box>
        <Icon as={MdCreditCard} w={7} h={7} />
      </HStack>
    </Box>
  )
}
