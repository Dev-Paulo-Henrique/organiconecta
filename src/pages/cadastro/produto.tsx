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
  useDisclosure,
  Input,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

import { Header } from '~components/Header'
import { Viewer } from '~components/Modal'
import { useState } from 'react'
import { Title } from '~components/Title'
import { ListItem } from '~components/ListItem'
import { useAuth } from '~hooks/useAuth'
import { useRouter } from 'next/router'
import { NotPermission } from '~components/NotPermission'
import { FiEdit3 } from 'react-icons/fi'
import { PiTrash } from 'react-icons/pi'

export default function Product() {
  const { token, user } = useAuth();  // Agora estamos pegando o 'user' para verificar o tipo
  const router = useRouter();
  const bg = useColorModeValue('gray.100', 'gray.800');
  const color = useColorModeValue('gray.800', 'gray.100');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState<string>("");

  // Verifica se o usuário é um produtor
  const isProducer = user?.tipoCliente?.tipo === 'Produtor';  // Verifique a estrutura real dos dados

  const handleOpen = (newTitle: string) => {
    setTitle(newTitle);
    onOpen();
  };

  // Se o usuário não for produtor, redireciona para a página inicial
  if (!isProducer) {
    return (
      <NotPermission/>
    );
  }

  return (
    <>
      <Header />
      <Title name="Cadastrar produto" />
      <Box bg={bg} p={8} minH="100vh">
        <Grid templateAreas={`"main"`} gap="4">
          <GridItem area="main">
            <Flex
              as="form"
              bg={bg}
              p="8"
              borderRadius="8"
              flexDir="column"
              maxW="1200px"
              mx="auto"
            >
              {/* Tabela para mostrar os produtos */}
              <Table variant="simple" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Produto</Th>
                    <Th>Quantidade</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {/* Suponha que você tenha uma lista de produtos no estado */}
                  {/* Exemplo de dados fictícios de produtos */}
                  {[
                    { id: 1, produto: "Produto 1", quantidade: 100 },
                    { id: 2, produto: "Produto 2", quantidade: 50 },
                  ].map(produto => (
                    <Tr key={produto.id}>
                      <Td>{produto.id}</Td>
                      <Td>{produto.produto}</Td>
                      <Td>{produto.quantidade}</Td>
                      <Td>
                        <Flex gap="2">
                          <Icon
                            as={FiEdit3}
                            boxSize="6"
                            cursor="pointer"
                            bg="yellow.400"
                            color="black"
                            borderRadius="md"
                            p={1}
                            onClick={() => handleOpen('Editar Produto')}
                          />
                          <Icon
                            as={PiTrash}
                            boxSize="6"
                            cursor="pointer"
                            bg="red.500"
                            color="white"
                            borderRadius="md"
                            p={1}
                            onClick={() => {/* Lógica para deletar o produto */}}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Flex>
          </GridItem>
        </Grid>

        <Viewer isOpen={isOpen} onClose={onClose} title={title} />
      </Box>
    </>
  );
}
