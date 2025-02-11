import { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useAuth } from '~hooks/useAuth'
import { api } from '~services/api'
import theme from '~styles/theme'
import { notifyError, notifySuccess } from '~utils/toastify'
import { NotPermission } from '~components/NotPermission'
import { Loading } from '~components/Loading'
import { CreditCard } from '~components/CreditCard'
import InputMask from 'react-input-mask'
import { useCart } from '~hooks/useCart'
import { useRouter } from 'next/router'
import ErrorPage from './404'
import { AxiosError } from 'axios'
import { startOfDay, format } from 'date-fns';
import { Header } from '~components/Header'
import { Title } from '~components/Title'

const FRETE_FIXO = 20
const TAXA_POR_PRODUTO = 1.75

export default function Checkout() {
  const [numeroCartao, setNumeroCartao] = useState('')
  const [vencimento, setVencimento] = useState('')
  const [cvc, setCvc] = useState('')
  const [parcelas, setParcelas] = useState(1)
  const [loading, setLoading] = useState(false)
  const { user, token } = useAuth()
  const { cartItems, deleteItems } = useCart()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const itens = cartItems.map(item => ({
      idProduto: item.id,
      quantidade: item.quantity,
      valorUnitario: item.produtoPreco,
    }))

    const data = {
      idCliente: user?.id,
      itens,
    //   dataCompra: format(startOfDay(new Date()), 'dd/MM/yyyy')
    //   dataCompra: new Date().toISOString()
    }

    // console.log(data)

    try {
      await api.post('/pedido', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      notifySuccess('Pedido realizado com sucesso!')
      router.push("/pedidos")
      deleteItems()
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data || 'Houve um erro ao realizar o pedido.';
        notifyError(errorMessage); // Exibindo a mensagem de erro
      } else {
        notifyError('Erro inesperado. Tente novamente.');
      }
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = () => {
    return (
      numeroCartao.length === 19 &&
      vencimento.length === 5 &&
      cvc.length === 3 &&
      parcelas >= 1
    )
  }

  if (
    cartItems.length === 0 ||
    !router.query.type ||
    (router.query.type !== 'credito' && router.query.type !== 'debito')
  ) {
    return <ErrorPage />
  }

  if (loading) {
    return <Loading />
  }

  if (!token) {
    return <NotPermission />
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.produtoPreco) * item.quantity,
    0,
  )
  const taxas = cartItems.length * TAXA_POR_PRODUTO
  const total = subtotal + (cartItems.length === 0 ? 0 : FRETE_FIXO) + taxas

  return (
    <>
    <Header/>
    <Title name="Checkout"/>
    <Box
      w="100%"
      p={5}
      bg="gray.50"
      minHeight="100vh"
      display={'flex'}
      flexDir={{ base: 'column-reverse', md: 'row' }}
      justifyContent={'center'}
    >
      <Flex
        align="center"
        justify="center"
        gap={10}
        flexDir={{ base: 'column-reverse', md: 'row' }}
      >
        <Box
          w="full"
          maxW="400px"
          p={5}
          borderWidth={1}
          borderRadius="lg"
          border={"1px solid gray"}
          bg="white"
          boxShadow="lg"
          mb={5}
        >
          <Text fontSize="lg" mb={3} fontWeight="bold">
            Finalizar compra
          </Text>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="nome">Nome Completo</FormLabel>
                <Input id="nome" value={user?.nome} isReadOnly disabled />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="numeroCartao">Número do Cartão</FormLabel>
                <InputMask
                  mask="9999 9999 9999 9999"
                  value={numeroCartao}
                  onChange={e => setNumeroCartao(e.target.value)}
                  maskChar={''}
                >
                  {(inputProps: any) => (
                    <Input
                      {...inputProps}
                      id="numeroCartao"
                      type="text"
                      placeholder="1234 5678 1234 5678"
                    />
                  )}
                </InputMask>
              </FormControl>

              <Flex justifyContent="space-between" alignItems="center" gap={3}>
                <FormControl>
                  <FormLabel htmlFor="vencimento">Validade</FormLabel>
                  <InputMask
                    mask="99/99"
                    value={vencimento}
                    onChange={e => setVencimento(e.target.value)}
                    maskChar={''}
                  >
                    {(inputProps: any) => (
                      <Input
                        {...inputProps}
                        id="vencimento"
                        type="text"
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                    )}
                  </InputMask>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="cvc">CVC</FormLabel>
                  <Input
                    id="cvc"
                    type="text"
                    placeholder="123"
                    value={cvc}
                    onChange={e => setCvc(e.target.value)}
                    maxLength={3}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="parcelas">Parcelas</FormLabel>
                  <Input
                    id="parcelas"
                    type="number"
                    min={1}
                    max={12}
                    value={parcelas}
                    onChange={e => setParcelas(Number(e.target.value))}
                  />
                </FormControl>
              </Flex>

              <Button
                colorScheme="teal"
                type="submit"
                isLoading={loading}
                mt={4}
                size="lg"
                isDisabled={!isFormValid()}
              >
                Finalizar Pagamento
              </Button>
            </Stack>
          </form>
        </Box>

        <CreditCard
          numeroCartao={numeroCartao}
          parcelas={parcelas}
          user={user?.nome}
          vencimento={vencimento}
          cvc={cvc}
          type={router.query.type}
          total={total}
        />
      </Flex>
    </Box>
    </>
  )
}
