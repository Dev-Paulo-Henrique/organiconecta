//Gisele Oliveira
import { Flex, Image, Text, Button } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Link from 'next/link'
import { useColorModeValue } from '~components/ui/color-mode'
interface FotoProps {
  backgroundImg: string
  profileImg: string
  alt: string
  children?: ReactNode
}

export function BackgroundPerfil({
  backgroundImg,
  children,
  profileImg,
  alt,
  infor,
}: FotoProps) {
  const bg = useColorModeValue('gray.100', 'gray.800')
  return (
    <Flex
      w="100%"
      position={'relative'}
      fontWeight="bold"
      flexDir="column"
      alignItems={'start'}
      justifyContent="center"
    >
      <Image
        src={backgroundImg}
        alt={alt}
        boxSize="100%"
        objectFit="cover"
        w={'100vw'}
      ></Image>
      <Flex marginStart={10} flexDir="column" position={'absolute'}>
        <Flex alignItems={'center'} color={'#ffff'} gap={5}>
          <Image
            src={profileImg}
            alt={alt}
            boxSize="150px"
            objectFit="cover"
            borderRadius="full"
            position="relative"
            zIndex={1}
          />
          <Text fontSize={'40'}>{children}</Text>

          <Flex></Flex>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Link href="/cadastroCliente/clienteComplemento" passHref>
          <Button
            type="submit"
            position={'absolute'}
            right={10}
            mt="5"
            bg={useColorModeValue('green.700', 'green.500')}
            size="lg"
            fontSize={'17px'}
            color={useColorModeValue('gray.100', 'gray.100')}
          >
            + Seguir
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}
