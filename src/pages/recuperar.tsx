// Paulo Henrique

import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Stack,
  Text,
  Image,
  useToast
} from '@chakra-ui/react';
import { Title } from '~components/Title';
import { useColorModeValue } from '~components/ui/color-mode';
import Link from 'next/link';
import { Input } from '~components/Input';
import theme from '~styles/theme';
import { TemplateGrid } from '~components/TemplateGrid';
import { useState, useEffect } from 'react';
import { api } from '~services/api'; // Supondo que a API esteja configurada
import { notifyError, notifySuccess } from '~utils/toastify';
import { useRouter } from 'next/router'; // Importando useRouter
import { isAxiosError } from 'axios';

export default function ResetPassword() {
  const bg = useColorModeValue('gray.100', 'gray.800');
  const color = useColorModeValue('gray.800', 'gray.100');
  const toast = useToast();
  const router = useRouter(); // Hook para pegar os parâmetros da URL

  // Verifica se a URL tem o parâmetro "token"
  const { token } = router.query;

  // Estados para controlar o e-mail (ou senha) e o estado de carregamento
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // Estado para a senha
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   // Se o token estiver presente, mudamos o título e o texto para refletir a troca de senha
  //   if (token) {
  //     document.title = "Redefinir Senha";
  //   }
  // }, [token]);

  // Função para enviar o e-mail para redefinir a senha
  const sendEmail = async () => {
    if (!email) {
      notifyError('Por favor, insira um e-mail válido.');
      return;
    }

    try {
      setLoading(true); // Ativa o carregamento
      const response = await api.post(`/redefinir/esqueci-senha?email=${email}`,);

      if (response.status === 200) {
        notifySuccess('E-mail enviado!');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          const message = error.response.data;
  
          // Verificando se o erro está relacionado a um token já existente
            if (message.includes('duplicate key value violates unique constraint')) {
            if (message.includes("usuario_id")) {
            notifyError('Você já solicitou um token de redefinição de senha recentemente. Verifique seu e-mail.');
            }
          } else {
            notifyError(message || 'Erro ao tentar enviar o e-mail para redefinir a senha.');
          }
        }
      } else {
        console.log('Erro desconhecido:', error);
        notifyError('Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false); // Desativa o carregamento
    }
  };

  // Função para redefinir a senha com o token
  const resetPassword = async () => {
    if (!password || password.length < 8) {
      notifyError('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    try {
      setLoading(true); // Ativa o carregamento
      const response = await api.post(`/redefinir/resetar-senha?token=${token}`, { password });

      if (response.status === 200) {
        notifySuccess('Senha redefinida com sucesso!');
        router.push("/login"); // Redireciona para o login
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          const message = error.response.data;

          if(message === "Token inválido."){
            notifyError(message);
          }
        }
      } else {
        console.log('Erro desconhecido:', error);
        notifyError('Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false); // Desativa o carregamento
    }
  };

  return (
    <Box bg={bg}>
      <Title name={token ? "Redefinir Senha" : "Recuperar senha"} />
      <TemplateGrid img="/images/Organic.png">
        <Box bgImage="url('/images/floating.png')" bgSize="cover" bgPosition="center" bgRepeat="no-repeat">
          <Flex align={'center'} justify={'center'} h={'100vh'}>
            <Flex as="form" w="100%" maxWidth={360} p="8" borderRadius={8} flexDir="column">
              <Stack spacing="4">
                <Image src="/images/logo.png" alt="logo" width={'100%'} />
                <Text color={color}>
                  {token
                    ? "Digite a nova senha para redefinir."
                    : "Para recuperar sua senha, digite o e-mail cadastrado."}
                </Text>
              </Stack>
              <Stack>
                {token ? (
                  // Se houver token, mostramos o campo de senha
                  <Input
                    name="password"
                    type="password"
                    label="Nova Senha"
                    color={color}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                ) : (
                  // Caso contrário, o campo continua sendo o de email
                  <Input
                    name="email"
                    type="email"
                    label="E-mail"
                    color={color}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Atualiza o estado com o e-mail digitado
                  />
                )}
              </Stack>
              <Stack>
                <Flex justifyContent={'space-between'}>
                  <Link href="/login" passHref>
                    <Button
                      as="a"
                      w={140}
                      mt="6"
                      alignItems="center"
                      colorScheme="whiteAlpha"
                      bg={useColorModeValue(theme.colors.gray[300], theme.colors.gray[700])}
                      color={color}
                      size="lg"
                    >
                      Voltar
                    </Button>
                  </Link>
                  <Button
                    type="button"
                    w={140}
                    mt="6"
                    alignItems="center"
                    colorScheme={"green"} // Alterando a cor conforme o contexto
                    bg={useColorModeValue(theme.colors.green[700], theme.colors.green[500])}
                    color={useColorModeValue(theme.colors.gray[100], theme.colors.gray[100])}
                    size="lg"
                    isLoading={loading}
                    onClick={token ? resetPassword : sendEmail} // Função para enviar ou redefinir
                    isDisabled={loading}
                  >
                    {token ? "Redefinir" : "Enviar"}
                  </Button>
                </Flex>
              </Stack>
            </Flex>
          </Flex>
        </Box>
      </TemplateGrid>
    </Box>
  );
}
