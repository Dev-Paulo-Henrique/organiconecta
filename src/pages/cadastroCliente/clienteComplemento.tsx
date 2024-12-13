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

export default function ClientContiRegist() {
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

                <Input
                  name="datanacimento"
                  type="date"
                  label="Data de Nascimento"
                />
                <Input name="password" type="password" label="Crie uma senha" />
                <Input
                  name="password"
                  type="password"
                  label="Repita sua senha"
                />
              </Stack>
              <Flex justifyContent="space-between" alignItems="center" gap="2">
                <Link href="/cadastroCliente/cadastroCliente" passHref>
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
                  >
                    Voltar
                  </Button>
                </Link>
                <Link href="/" passHref>
                  <Button
                    w={250}
                    type="submit"
                    mt="6"
                    colorScheme="green"
                    gap={1}
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
                    Concluir
                  </Button>
                </Link>
              </Flex>
              <Flex justifyContent="flex-end" alignItems="center" mt="3">
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
