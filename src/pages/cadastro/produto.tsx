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
} from '@chakra-ui/react'

import { Header } from '~components/Header'
import { Viewer } from '~components/Modal'
import { useState } from 'react'
import { Title } from '~components/Title'
import { ListItem } from '~components/ListItem'

export default function Product() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState<string>("");

  const handleOpen = (newTitle: string) => {
    setTitle(newTitle);
    onOpen();
  };

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
              <Flex
                justifyContent="space-between"
                w="100%"
                fontWeight="bold"
                mb="4"
              >
                <Text>ID</Text>
                <Text>Produto</Text>
                <Text>Quantidade</Text>
                <Text>Ações</Text>
              </Flex>

              <Divider borderColor="gray.300" mb="4" />

              

              
            </Flex>
          </GridItem>
        </Grid>

        <Viewer isOpen={isOpen} onClose={onClose} title={title}/>
      </Box>
    </>
  )
}
