// Gisele Oliveira
import { Flex, Image, Text } from '@chakra-ui/react'
interface PostsProps {
  images: { src: string; alt: string }[]
  children?: React.ReactNode
}
export function Posts({ images, children }: PostsProps) {
  return (
    <Flex
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Flex flexDirection={'column'} alignItems={'start'} padding={5}>
        {children && <Text>{children}</Text>}
      </Flex>
      <Flex>
        {images.map((image, index) => (
          <Flex key={index}>
            <Image
              src={image.src}
              alt={image.alt}
              flexDirection={'row'}
              gap={7}
              padding={3}
            ></Image>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
