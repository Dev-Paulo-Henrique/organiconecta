// Gisele Oliveira

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
import { Input } from '~components/Input'
import { Header } from '~components/Header'

export default function perfil() {
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
                ></Flex>

              </Flex>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}
