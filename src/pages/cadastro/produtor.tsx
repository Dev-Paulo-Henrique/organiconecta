//Alex William
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
import { Title } from '~components/Title'
import InputMask from 'react-input-mask'
import { TemplateGrid } from '~components/TemplateGrid'

export default function Produtor() {
    const bg = useColorModeValue('gray.100', 'gray.800')
    const color = useColorModeValue('gray.800', 'gray.100')


    return (
        <Box bg={bg}>
            <Title name="Cadastrar produtor" />
            <TemplateGrid img='/images/photo-clientCadastro.jpg'>
                <Flex align="center" justify="center" h="100vh">
                    <Flex
                        as="form"
                        w="100%"
                        maxWidth={360}
                        bg={bg}
                        p="2"
                        borderRadius={8}
                        flexDir="column"
                    >
                        <Stack spacing="2">
                            <Image src={'/images/logo.png'} alt="logo" width={'100%'} />
                            <Input
                                name="nomeCompleto"
                                type="text"
                                color={color}
                                label="Nome Completo"

                            />
                            <Input
                                name="email"
                                type="email"
                                label="E-mail"
                                color={color}

                            />

                            <InputMask
                                mask="(99) 99999-9999"
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
                                color={color}
                            />
                            <Flex direction="row" gap={4} width="100%">
                                <InputMask
                                    mask="999.999.999-99"
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
                                >
                                    {(inputProps: any) => (
                                        <Input
                                            name="dataNascimento"
                                            label="Data de Nascimento"
                                            color={color}
                                        />
                                    )}
                                </InputMask>
                            </Flex>
                        </Stack>
                        <Flex justifyContent="space-between" alignItems="center">
                            {/* <Link href="/cadastroCliente/clienteComplemento" passHref> */}
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
                                )}>
                                Prosseguir
                            </Button>
                            {/* </Link> */}
                        </Flex>
                        <Flex justifyContent="space-between" alignItems="center" mt="3">
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
                            <Link href="/cadastro/cliente" passHref>
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
                                    Cadastrar como Cliente
                                </Text>
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            </TemplateGrid>
        </Box>
    )
}
