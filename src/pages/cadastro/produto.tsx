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

import { IoEyeOutline } from 'react-icons/io5'
import { PiTrash } from 'react-icons/pi'
import { FiEdit3 } from 'react-icons/fi'
import { Header } from '~components/Header'
import { Viewer } from '~components/Modal'
import { useState } from 'react'

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

              <Flex
                justifyContent="space-between"
                w="100%"
                align="center"
                gap="4"
                mb="4"
              >
                <Text>0001</Text>
                <Text>Maçã Verde</Text>
                <Text>2.342</Text>
                <Flex gap="2">
                  <Icon
                    as={IoEyeOutline}
                    boxSize="6"
                    cursor="pointer"
                    bg="blue.500"
                    color="white"
                    borderRadius="md"
                    p={1}
                    onClick={() => handleOpen("Visualizar Produto")}
                    />
                  <Icon
                    as={FiEdit3}
                    boxSize="6"
                    cursor="pointer"
                    bg="yellow.400"
                    color="black"
                    borderRadius="md"
                    p={1}
                    onClick={() => handleOpen("Editar Produto")}
                  />
                  <Icon
                    as={PiTrash}
                    boxSize="6"
                    cursor="pointer"
                    bg="red.500"
                    color="white"
                    borderRadius="md"
                    p={1}
                    onClick={() => handleOpen("Deletar Produto")}
                  />
                </Flex>
              </Flex>
            </Flex>
          </GridItem>
        </Grid>

        <Viewer isOpen={isOpen} onClose={onClose} title={title}/>
      </Box>
    </>
  )
}
