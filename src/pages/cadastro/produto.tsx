//Gisele Oliveira
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Divider,
  Text,
  Icon,
} from '@chakra-ui/react'
import { useColorModeValue } from '~components/ui/color-mode'
import { IoEyeOutline } from 'react-icons/io5'
import { PiTrash } from 'react-icons/pi'
import { FiEdit3 } from 'react-icons/fi'
import { Header } from '~components/Header'


export default function productRegistration() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')
  return (
    <>
    <Header/>
      <Box bg={bg}>
        <Grid
          templateAreas={`"img main"`}
          h={'100vh'}
          gap="1"
          color="blackAlpha.800"
        >
          <GridItem area={'main'}>
            <Flex justifyContent="space-between" h="100vh">
              <Flex as="form" bg={bg} p="8" borderRadius={8} flexDir="column">
                <Flex
                  justifyContent="space-between"
                  w="100%"
                  gap="3"
                  fontWeight="bold"
                >
                  <Text>ID</Text>
                  <Text>Produto</Text>
                  <Text>Quantidade</Text>
                  <Text>Ações</Text>
                </Flex>
                <Divider
                  my="4"
                  borderColor="gray.900"
                  borderWidth="1px"
                  w={900}
                />
                <Flex justifyContent="space-between" gap="1">
                  <Text>0001</Text>
                  <Text>Maçã Verde</Text>
                  <Text>Quantidade</Text>
                  <Text>
                    <Icon boxSize={6}>
                      <IoEyeOutline />
                    </Icon>
                    <Icon boxSize={6}>
                      <PiTrash />
                    </Icon>
                    <Icon boxSize={6}>
                      <FiEdit3 />
                    </Icon>
                    
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}
