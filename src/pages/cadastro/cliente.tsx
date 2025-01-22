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

export default function Cliente() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      nome,
      email,
      telefone,
      cpf,
      senha,
      dataNascimento,
    }

    try {
      const response = await api.post('/usuario', data)

      console.log(response.data)
      notifySuccess(`Cliente cadastrado ${response.data.id}`)
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          notifyError(error.response.data.message)
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
        <Flex align="center" justify="center" h="100vh" overflowY="auto">
          <Flex
            as="form"
            w="100%"
            maxWidth={360}
            bg={bg}
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
                value={senha}
                color={color}
                onChange={e => setSenha(e.target.value)}
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
      </TemplateGrid>
    </Box>
  )
}
