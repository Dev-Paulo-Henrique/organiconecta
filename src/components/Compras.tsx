//Gisele Oliveira
import { Flex, Image, Text, Button } from '@chakra-ui/react'
import { useColorModeValue } from '~components/ui/color-mode'
interface ComprasProps {
  images: {
    src: string
    alt: string
    produto: string
    tipo: string
    peso: string
    qtd: string
    data: string
  }[]
  children?: React.ReactNode
}

export function Compra({ images, children }: ComprasProps) {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const buttonBg = useColorModeValue('green.700', 'green.500')
  const buttonColor = useColorModeValue('gray.100', 'gray.100')
  return (
    <Flex alignItems={'center'} justifyContent={'space-between'}>
      <Flex flexDir="column">
        <Flex>
          {images.map((image, index) => (
            <Flex key={index}>
              <Image
                src={image.src}
                alt={image.alt}
                boxSize="100px"
                objectFit="cover"
                borderRadius="md"
                flexDirection={'row'}
              />

              <Flex
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                gap={'20px'}
              >
                <Text>{image.produto}</Text>
                <Text>{image.tipo}</Text>
                <Text>{image.peso}</Text>
                <Text>{image.qtd}</Text>
                <Text>{image.data}</Text>
              </Flex>
            </Flex>
          ))}
          <Button
            type="submit"
            mt="5"
            bg={useColorModeValue('green.700', 'green.500')}
            size="lg"
            fontSize={'15px'}
            color={useColorModeValue('gray.100', 'gray.100')}
          >
            COMPRAR NOVAMENTE
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
