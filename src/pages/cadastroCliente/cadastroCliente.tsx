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

export default function ClientRegistration() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')
  return (
    <Box bg={bg}>
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
            <Image
              src={'/images/photo-clientCadastro.jpg'}
              alt="logo"
              width={'100%'}
              objectFit="cover"
              boxSize="100%"
            ></Image>
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
            >
              <Stack spacing="2">
                <Image src={'/images/logo.png'} alt="logo" width={'100%'} />
                <Input name="nomeCompleto" type="text" label="Nome Completo" />
                <Input name="email" type="email" label="E-mail" />
                <Input name="telefone" type="text" label="Telefone" />
                <Input name="cpf" type="text" label="CPF" />
              </Stack>
              <Flex justifyContent="space-between" alignItems="center">
                <Link href="/cadastroCliente/clienteComplemento" passHref>
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
                  >
                    Prosseguir
                  </Button>
                </Link>
              </Flex>
              <Flex justifyContent="flex-end" mt="3" gap={10}>
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
                <Link href="/" passHref>
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
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  )
}
