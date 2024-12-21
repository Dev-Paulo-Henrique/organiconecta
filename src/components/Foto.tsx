import { Flex, Image, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
interface FotoPros {
  backgroundImg: string
  profileImg: string
  alt: string
  children?: ReactNode
}

export function Foto({ backgroundImg, children, profileImg, alt }: FotoPros) {
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
        <Flex fontSize={'45'} alignItems={'center'} color={'#ffff'} gap={5}>
          <Image
            src={profileImg}
            alt={alt}
            boxSize="150px"
            objectFit="cover"
            borderRadius="full"
            position="relative"
            zIndex={1}
          />
          <Text>{children}</Text>
        </Flex>
      
      </Flex>
    </Flex>
  )
}
