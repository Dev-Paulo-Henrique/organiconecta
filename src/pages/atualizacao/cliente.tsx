//Gisele Oliveira
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react"
import { Header } from "~components/Header"
import { Input } from '~components/Input'
import { useColorModeValue } from '~components/ui/color-mode'
import theme from '~styles/theme'

export default function Atualizacao() {
    const bg = useColorModeValue('gray.100', 'gray.800')
    const color = useColorModeValue('gray.800', 'gray.100')

    return (
        <>
            <Header />
            <Box bg={bg} h="100vh" display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Flex justifyContent={"center"} alignItems={"flex-start"} gap={3} as="form" >
                    <Image src={'/images/avatar.png'} alt="logo" width={'auto'} h={"135px"}/>

                    <Flex flexDir="column">
                        <Flex justifyContent={"space-between"} gap={4} bg={bg}>
                            <Input
                                name="nome"
                                type="text"
                                label="Nome"
                            />
                            <Input
                                name="sobreNome"
                                type="text"
                                label="SobreNome"
                            />
                            <Input
                                name="dataNasc"
                                type="text"
                                label="Data Nascimento"
                            />
                        </Flex>
                        <Flex justifyContent={"space-between"} gap={4} bg={bg}>
                            <Input
                                name="email"
                                type="email"
                                label="E-mail"
                                w={500}

                            />
                            <Input
                                name="telefone"
                                type="text"
                                label="Telefone"
                            />
                        </Flex>
                        <Flex justifyContent={"space-between"} gap={4} bg={bg}>
                            <Input
                                name="Rua"
                                type="text"
                                label="Rua"
                                w={500}
                            />
                            <Input
                                name="numero"
                                type="text"
                                label="Numero"
                            />
                        </Flex>
                        <Flex justifyContent={"space-between"} gap={4} bg={bg}>
                            <Input
                                name="bairro"
                                type="text"
                                label="Bairro"
                            />
                            <Input
                                name="complemento"
                                type="text"
                                label="Complemento"
                            />
                            <Input
                                name="cep"
                                type="text"
                                label="CEP"
                            />
                        </Flex>
                        <Flex justifyContent={"space-between"} gap={4} bg={bg}>
                            <Input
                                name="cidade"
                                type="text"
                                label="Cidade"
                            />
                            <Input
                                name="uf"
                                type="text"
                                label="UF"
                            />
                            <Input
                                name="pais"
                                type="text"
                                label="País"
                            />
                        </Flex>
                        <Flex alignItems={"center"} justifyContent={"end"} gap={5} bg={bg}>
                            <Text color={"red"}>Descatar Alterações</Text>
                            <Button
                                alignItems={"center"}
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
                                Salvar
                            </Button>
                        </Flex>

                    </Flex>

                </Flex>
            </Box>

        </>
    )
}