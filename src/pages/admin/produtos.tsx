import { Box, Button, Divider, Flex, Grid, GridItem, Icon, Stack, Text, useDisclosure, Input, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { Header } from '~components/Header';
import { Viewer } from '~components/Modal';
import { useState, useEffect } from 'react';
import { Title } from '~components/Title';
import { ListItem } from '~components/ListItem';
import { useAuth } from '~hooks/useAuth';
import { useRouter } from 'next/router';
import { NotPermission } from '~components/NotPermission';
import { FiEdit3 } from 'react-icons/fi';
import { PiTrash } from 'react-icons/pi';
import { api } from '~services/api'; // Supondo que a API esteja configurada
import { Loading } from '~components/Loading';
import { IoEyeOutline } from 'react-icons/io5';

export default function Product() {
  const { token, user } = useAuth(); // Agora estamos pegando o 'user' para verificar o tipo
  const router = useRouter();
  const bg = useColorModeValue('gray.100', 'gray.800');
  const color = useColorModeValue('gray.800', 'gray.100');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState<string>('');
  const [products, setProducts] = useState<any[]>([]); // Array para armazenar os produtos
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Verifica se o usuário é um produtor
  const isProducer = user?.tipoCliente?.tipo === 'Produtor'; // Verifique a estrutura real dos dados

  const handleOpen = (newTitle: string) => {
    setTitle(newTitle);
    onOpen();
  };

  // Função para carregar os produtos
  useEffect(() => {
    if (token) {
      const carregarProdutos = async () => {
        try {
          setLoading(true);
          const response = await api.get('/produto', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data) {
            setProducts(response.data); // Atualiza os produtos
          }
        } catch (error) {
          console.error('Erro ao carregar os produtos:', error);
        } finally {
          setLoading(false); // Finaliza o carregamento
        }
      };

      carregarProdutos(); // Chama a função para carregar os produtos
    }
  }, [token]);

  const handleEditProduct = (product: any) => {
    setEditingProduct(product); // Carrega o produto no estado para edição
    setTitle(product.produtoNome); // Atualiza o título do modal com o nome do produto
    onOpen(); // Abre o modal
  };

  // Se o usuário não for produtor, redireciona para a página inicial
  if (loading && token) {
    return <Loading />;
  }

  if (!isProducer) {
    return <NotPermission />;
  }

  return (
    <>
      <Header />
      <Title name="Cadastrar produto" />
      <Box bg={bg} p={8} minH="100vh">
        <Grid templateAreas={`"main"`} gap="4">
          <GridItem area="main">
            <Flex as="form" bg={bg} p="8" borderRadius="8" flexDir="column" maxW="1200px" mx="auto">
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
                  {loading ? (
                    <Tr>
                      <Td colSpan={4} textAlign="center">
                        Carregando...
                      </Td>
                    </Tr>
                  ) : products.length === 0 ? (
                    <Tr>
                      <Td colSpan={4} textAlign="center">
                        Nenhum produto encontrado.
                      </Td>
                    </Tr>
                  ) : (
                    products.map(produto => (
                      <Tr key={produto.id}>
                        <Td>{produto.id}</Td>
                        <Td>{produto.produtoNome}</Td>
                        <Td>{produto.produtoQuantidade}</Td>
                        <Td>
                          <Flex gap="2">
                            <Icon
                              as={IoEyeOutline}
                              boxSize="6"
                              cursor="pointer"
                              bg="blue.500"
                              color="white"
                              borderRadius="md"
                              p={1}
                              onClick={() => router.push(`/produto?id=${produto.id}`)}
                            />
                            <Icon
                              as={FiEdit3}
                              boxSize="6"
                              cursor="pointer"
                              bg="yellow.400"
                              color="black"
                              borderRadius="md"
                              p={1}
                              onClick={() => handleEditProduct(produto)} // Chama a função passando o produto correto
                            />
                            <Icon
                              as={PiTrash}
                              boxSize="6"
                              cursor="pointer"
                              bg="red.500"
                              color="white"
                              borderRadius="md"
                              p={1}
                              onClick={() =>
                                api.delete(`/produto/${produto.id}`, {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }).then(() => window.location.reload())
                              }
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </Flex>
          </GridItem>
        </Grid>
      </Box>

      {/* Modal de edição do produto */}
      {editingProduct && (
        <Viewer
          isOpen={isOpen}
          onClose={onClose}
          title={title}
          product={editingProduct} // Passa o produto que foi selecionado para editar
        />
      )}
    </>
  );
}
