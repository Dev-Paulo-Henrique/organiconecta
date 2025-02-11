import {
  Box,
  Text,
  Image,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
interface CardProps {
  total: number
  children: ReactNode
  atualizacao: string
  src: string
  alt: string
}

export default function BoxRelatorio({
  total,
  children,
  atualizacao,
  src,
  alt,
}: CardProps) {
  const bg = useColorModeValue('gray.50', 'gray.800')
  return (
    <>
      <Box>
        <Flex flexDirection={'column'} bg={"white"} p={5} borderRadius={7} border={"1px solid gray"}>
          <Flex>
            <Flex gap={5}>
              <Flex flexDirection={'column'}>
                <Text fontWeight={500}>{children}</Text> <Text fontWeight={700} fontSize={23}>{total}</Text>
              </Flex>
              <Image src={src || '/placeholder.png'} alt={alt} boxSize="40px" />
            </Flex>
          </Flex>
          <Flex>
            <Text>{atualizacao}</Text>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
