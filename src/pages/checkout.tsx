import { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react';
import { useAuth } from '~hooks/useAuth'; // Hook para pegar o user e token
import { api } from '~services/api'; // Requisição para a API
import theme from '~styles/theme'; // Seu tema
import { notifyError, notifySuccess } from '~utils/toastify';
import { NotPermission } from '~components/NotPermission';
import { Loading } from '~components/Loading';
import { CreditCard } from '~components/CreditCard';
import InputMask from 'react-input-mask';

export default function Checkout() {
  const [numeroCartao, setNumeroCartao] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [cvc, setCvc] = useState('');
  const [parcelas, setParcelas] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      clienteId: user?.id,
      dataInicio: new Date().toISOString().split('T')[0], // Data de início (hoje)
      validade: vencimento, // Data de validade
      statusAssinatura: true, // Status da assinatura
    };

    try {
      await api.post('/assinatura', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notifySuccess("Assinatura concluída!")
    } catch (error) {
        notifyError("Houve um problema ao processar sua assinatura.")
    } finally {
      setLoading(false);
    }
  };

    if (loading) {
      return <Loading />
    }
  
    // Se o token não estiver disponível, mostra a tela de permissão
    if (!token) {
      return <NotPermission />
    }

  return (
    <Box w="100%" p={5} bg="gray.50" minHeight="100vh" display={"flex"} flexDir={{ base: "column-reverse", md: "row" }} justifyContent={"center"}>
      <Flex align="center" justify="center" gap={10} flexDir={{ base: "column-reverse", md: "row" }}>
        {/* <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Finalizar Compra
        </Text> */}

        <Box
          w="full"
          maxW="400px"
          p={5}
          borderWidth={1}
          borderRadius="lg"
          bg="white"
          boxShadow="lg"
          mb={5}
        >
          <Text fontSize="lg" mb={3} fontWeight="bold">
            Finalizar compra
          </Text>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* Nome completo (preenchido com o nome do usuário) */}
              <FormControl>
                <FormLabel htmlFor="nome">Nome Completo</FormLabel>
                <Input id="nome" value={user?.nome} isReadOnly disabled />
              </FormControl>

              {/* Número do cartão */}
              <FormControl>
                <FormLabel htmlFor="numeroCartao">Número do Cartão</FormLabel>
                <InputMask
          mask="9999 9999 9999 9999" // Máscara para o cartão de crédito
          value={numeroCartao}
          onChange={(e) => setNumeroCartao(e.target.value)}
          maskChar={""}
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
              {/* Data de validade */}
              <FormControl>
                <FormLabel htmlFor="vencimento">Validade</FormLabel>
                <InputMask
          mask="99/99" // Mascara para a validade do cartão (MM/AA)
          value={vencimento}
          onChange={(e) => setVencimento(e.target.value)}
          maskChar={""}
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
              {/* CVC */}
              <FormControl>
                <FormLabel htmlFor="cvc">CVC</FormLabel>
                <Input
                  id="cvc"
                  type="text"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  maxLength={3}
                />
              </FormControl>

              {/* Parcelas */}

              <FormControl>
                <FormLabel htmlFor="parcelas">Parcelas</FormLabel>
                <Input
                  id="parcelas"
                  type="number"
                  min={1}
                  max={12}
                  value={parcelas}
                  onChange={(e) => setParcelas(Number(e.target.value))}
                  />
              </FormControl>
                  </Flex>

              {/* Botão de pagamento */}
              <Button
                colorScheme="teal"
                type="submit"
                isLoading={loading}
                // isFullWidth
                mt={4}
                size="lg"
              >
                Finalizar Pagamento
              </Button>
            </Stack>
          </form>
        </Box>

        {/* Cartão com animação de preenchimento */}
        <CreditCard numeroCartao={numeroCartao} parcelas={parcelas} user={user?.nome} vencimento={vencimento} cvc={cvc}/>
      </Flex>
    </Box>
  );
};