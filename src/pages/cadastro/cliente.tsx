//Gisele Oliveira
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react'

import { useColorModeValue } from '~components/ui/color-mode'
import Link from 'next/link'
import { Input } from '~components/Input'
import theme from '~styles/theme'
import React, { useEffect, useState } from 'react'
import { Title } from '~components/Title'
import { api } from '~services/api'
import { notifyError, notifySuccess } from '~utils/toastify'
import { isAxiosError } from 'axios'
import InputMask from 'react-input-mask'
import { TemplateGrid } from '~components/TemplateGrid'
import { useRouter } from 'next/router'

export default function Cliente() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    if (password.length < 8) {
      notifyError("A senha deve ter no mínimo 8 caracteres.");
      setLoading(false);
      return; // Impede que o formulário seja enviado
    }

    const data = {
      nome,
      email,
      telefone,
      cpf,
      password,
      dataNascimento,
      clienteImagem: "/images/avatar.png"
    }

    // console.log(data)
    try {
      const response = await api.post('/cliente', data)

      console.log(response.data)
      notifySuccess(`${response.data.nome} cadastrado`)
      router.push("/login");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          console.log(error)
          const message = error.response.data;

        // Verificando o erro de duplicação para cada campo
        if (message.includes("duplicate key value violates unique constraint")) {
          if (message.includes("cpf")) {
            notifyError("O CPF já está cadastrado.");
          } else if (message.includes("username")) {
            notifyError("O e-mail já está cadastrado.");
          } else if (message.includes("telefone")) {
            notifyError("O número de telefone já está cadastrado.");
          } else if (message.includes("nome")) {
            notifyError("Já existe um cliente com o este nome.");
          } else {
            notifyError("Ocorreu um erro ao tentar cadastrar o cliente. Tente novamente.");
          }
        } else {
          // Se o erro não for de duplicação, exibe a mensagem genérica do erro
          notifyError(message);
        }
        }
      } else {
        console.log('Erro desconhecido:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box bg={bg}>
      <Title name="Cadastrar cliente" />
      <TemplateGrid img="/images/photo-clientCadastro.jpg">
      <Box bgImage="url('/images/floating.png')" bgSize={"cover"} bgPosition={"center"} bgRepeat={"no-repeat"}>

        <Flex align="center" justify="center" h="100vh" overflowY="auto">
          <Flex
            as="form"
            w="100%"
            maxWidth={360}
            // bg={bg}
            p="8"
            borderRadius={8}
            flexDir="column"
            onSubmit={handleSubmit}
            overflowY="auto"
          >
            <Stack spacing="2">
              <Image src={'/images/logo.png'} alt="logo" width={'100%'} />
              <Input
                name="nomeCompleto"
                type="text"
                color={color}
                label="Nome Completo"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                color={color}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <InputMask
                mask="(99) 99999-9999"
                value={telefone}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> }
                }) => setTelefone(e.target.value)}
              >
                {(inputProps: any) => (
                  <Input
                    name="telefone"
                    type="text"
                    color={color}
                    label="Telefone"
                    {...inputProps}
                  />
                )}
              </InputMask>
              <Input
                name="senha"
                type="password"
                label="Senha"
                value={password}
                color={color}
                onChange={e => setPassword(e.target.value)}
              />
              <Flex gap={5}>
                <InputMask
                  mask="999.999.999-99"
                  value={cpf}
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> }
                  }) => setCpf(e.target.value)}
                >
                  {(inputProps: any) => (
                    <Input
                      name="cpf"
                      type="text"
                      label="CPF"
                      color={color}
                      {...inputProps}
                    />
                  )}
                </InputMask>
                <InputMask
                  mask="99/99/9999"
                  value={dataNascimento}
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> }
                  }) => setDataNascimento(e.target.value)}
                >
                  {(inputProps: any) => (
                    <Input
                      name="dataNascimento"
                      label="Nascimento"
                      value={dataNascimento}
                      color={color}
                      {...inputProps}
                    />
                  )}
                </InputMask>
              </Flex>
            </Stack>
            <Flex justifyContent="space-between" alignItems="center" mt="3">
              <Button
                w={350}
                type="submit"
                mt="6"
                colorScheme="green"
                bg={useColorModeValue(
                  theme.colors.green[700],
                  theme.colors.green[500],
                )}
                size="lg"
                color={useColorModeValue(
                  theme.colors.gray[100],
                  theme.colors.gray[100],
                )}
                isLoading={loading}
              >
                Prosseguir
              </Button>
            </Flex>
            <Flex justifyContent="center" alignItems="center" mt="3">
              <Link href="/login" passHref>
                <Text
                  color={useColorModeValue(
                    theme.colors.gray[700],
                    theme.colors.gray[500],
                  )}
                  _hover={{
                    color: theme.colors.green[800],
                    transition: '0.25s',
                    cursor: 'pointer',
                  }}
                >
                  Login
                </Text>
              </Link>
              {/* <Link href="/cadastro/produtor" passHref>
                <Text
                  color={useColorModeValue(
                    theme.colors.gray[700],
                    theme.colors.gray[500],
                  )}
                  _hover={{
                    color: theme.colors.green[800],
                    transition: '0.25s',
                    cursor: 'pointer',
                  }}
                >
                  Cadastrar como Produtor
                </Text>
              </Link> */}
            </Flex>
          </Flex>
        </Flex>
        </Box>
      </TemplateGrid>
    </Box>
  )
}
