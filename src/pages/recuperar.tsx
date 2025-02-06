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
import { TemplateGrid } from '~components/TemplateGrid'

export default function ResetPassword() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')

  return (
    <Box bg={bg}>
      <Title name="Recuperar senha" />
      <TemplateGrid img='/images/Organic.png'>
      <Box bgImage="url('/images/floating.png')" bgSize={"cover"} bgPosition={"center"} bgRepeat={"no-repeat"}>
        <Flex align={'center'} justify={'center'} h={'100vh'}>
          <Flex
            as="form"
            w="100%"
            maxWidth={360}
            p="8"
            borderRadius={8}
            flexDir="column"
          >
            <Stack spacing="4">
              <Image src="/images/logo.png" alt="logo" width={'100%'} />
              <Text color={color}>
                Para recuperar sua senha, digite o e-mail cadastrado.
              </Text>
            </Stack>
            <Stack>
              <Input name="email" type="email" label="E-mail" color={color} />
            </Stack>
            <Stack>
              <Flex justifyContent={'space-between'}>
                <Link href="/login" passHref>
                  <Button
                    as="a"
                    w={140}
                    mt="6"
                    alignItems="center"
                    colorScheme="whiteAlpha"
                    bg={useColorModeValue(
                      theme.colors.gray[300],
                      theme.colors.gray[700],
                    )}
                    color={color}
                    size="lg"
                  >
                    Voltar
                  </Button>
                </Link>
                <Button
                  type='submit'
                  w={140}
                  mt="6"
                  alignItems="center"
                  colorScheme="green"
                  bg={useColorModeValue(
                    theme.colors.green[700],
                    theme.colors.green[500],
                  )}
                  color={useColorModeValue(
                    theme.colors.gray[100],
                    theme.colors.gray[100],
                  )}
                  size="lg"
                  disabled
                //onClick={() => sendEmail()}
                >
                  Enviar
                </Button>
              </Flex>
            </Stack>
          </Flex>
        </Flex>
        </Box>
      </TemplateGrid>
    </Box>
  )
}
