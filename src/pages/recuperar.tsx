// Leonardo

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
  Image,
} from '@chakra-ui/react'
import { Title } from '~components/Title'
import { useColorModeValue } from '~components/ui/color-mode'
import Link from 'next/link'
import { Input } from '~components/Input'
import theme from '~styles/theme'

export default function ResetPassword() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')

  return (
    <Box>
      <Title name="Recuperar senha" />
      <Grid
        templateAreas={`"img main"`}
        gridTemplateColumns={'40vw 1fr'}
        h={'100vh'}
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem bg={'green.500'}></GridItem>

        <GridItem area={'main'}>
          <Flex align={'center'} justify={'center'} h={'100vh'}>
            <Flex
              as="form"
              w="100%"
              maxWidth={360}
              bg={bg}
              p="8"
              borderRadius={8}
              flexDir="column"
            >
              <Stack spacing="4">
                <Image src="/images/logo.png" alt="logo" width={'100%'} />
                <Text>
                  Para recuperar sua senha, digite o e-mail cadastrado.
                </Text>
              </Stack>
              <Stack>
                <Input name="email" type="email" label="E-mail" />
              </Stack>
              <Stack>
                <Flex justifyContent={'center'}>
                  <Link href="/" passHref>
                    <Button
                      as="a"
                      w={140}
                      mt="6"
                      alignItems="center"
                      colorScheme="whiteAlpha"
                      bg={useColorModeValue(
                        theme.colors.green[300],
                        theme.colors.green[700],
                      )}
                      color={color}
                      size="lg"
                      //onClick={() => sendEmail()}
                    >
                      Enviar
                    </Button>
                  </Link>
                </Flex>
              </Stack>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  )
}
