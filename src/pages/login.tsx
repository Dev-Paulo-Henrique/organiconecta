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
} from '@chakra-ui/react'
import { Title } from '~components/Title'
import { useColorModeValue } from '~components/ui/color-mode'
import Link from 'next/link'
import { Input } from '~components/Input'
import theme from '~styles/theme'
import { RiGoogleFill } from 'react-icons/ri'
import { useState } from 'react'
import { api } from '~services/api'
import { isAxiosError } from 'axios'
import { notifyError, notifySuccess } from '../utils/toastify'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)

  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await api.post('/usuario/login', {
        email,
        senha,
      })

      console.log(response.data)
      notifySuccess(`Cliente ${response.data.id}`)
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
      <Title name='Login'/>
      <Grid
        templateAreas={`"img main"`}
        gridTemplateColumns={'40vw 1fr'}
        h={'100vh'}
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem bg="green.500" area={'img'}>
          <Flex align="center" justify="center" h="100vh">
            <Text>IMAGEM</Text>
          </Flex>
        </GridItem>
        <GridItem area={'main'}>
          <Flex align="center" justify="center" h="100vh">
            <Flex
              as="form"
              w="100%"
              maxWidth={360}
              bg={bg}
              p="8"
              borderRadius={8}
              flexDir="column"
              onSubmit={handleLogin}
            >
              <Stack spacing="4">
                <Image src={'/images/logo.png'} alt="logo" width={'100%'} />
                <Input
                  name="email"
                  type="email"
                  label="E-mail"
                  onChange={e => setEmail(e.target.value)}
                />
                <Input
                  name="password"
                  type="password"
                  label="Senha"
                  onChange={e => setSenha(e.target.value)}
                />
              </Stack>
              <Flex justifyContent="space-between" alignItems="center">
                <Link href="/" passHref>
                  <Button
                    as="a"
                    w={140}
                    mt="6"
                    colorScheme="whiteAlpha"
                    bg={useColorModeValue(
                      theme.colors.gray[300],
                      theme.colors.gray[700],
                    )}
                    color={color}
                    size="lg"
                  >
                    Cadastrar
                  </Button>
                </Link>
                <Button
                  w={140}
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
                  Entrar
                </Button>
              </Flex>
              <Flex justifyContent="flex-end" alignItems="center" mt="3">
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
                  Esqueceu a senha?
                </Text>
              </Flex>
              <Divider my="3" borderColor="gray.300" />
              <Button
                type="button"
                border={`2px solid ${theme.colors.green[500]}`}
                color={theme.colors.gray[800]}
                colorScheme="none"
                bg={useColorModeValue(theme.colors.white, theme.colors.white)}
                size="lg"
              >
                <Flex align={'center'} justify={'center'}>
                  <Icon as={RiGoogleFill} fontSize="30" />
                  <Text fontSize="0.8rem" align={'center'} ml={2}>
                    Entrar com Google
                  </Text>
                </Flex>
              </Button>
              <Text
                color={useColorModeValue(
                  theme.colors.gray[700],
                  theme.colors.gray[500],
                )}
                fontSize="0.8rem"
                fontWeight={'normal'}
                align={'center'}
                mt="3"
              >
                Ao continuar, você concorda com os{' '}
                <b>
                  <Link href="/" passHref>
                    <a>Termos de Serviço</a>
                  </Link>
                </b>
                , com a{' '}
                <b>
                  <Link href="/" passHref>
                    <a>Política de Privacidade </a>
                  </Link>
                </b>
                e com o{' '}
                <b>
                  <Link href="/" passHref>
                    <a>uso de cookies </a>
                  </Link>
                </b>
                da OrganiConecta.
              </Text>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  )
}
