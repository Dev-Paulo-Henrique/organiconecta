import { Header } from '~components/Header'
import { ProductDetails } from '~components/ProductDetails'
import { Flex, Image, Button, Box, Text } from '@chakra-ui/react'
import { useColorModeValue } from '~components/ui/color-mode'
export default function Descricao() {
  return (
    <>
      <Header />
      <ProductDetails backgroundImg="/images/cebola.png">
        <Box>
          <Text fontSize="40" fontWeight="bold">
            CEBOLA & ALHO
          </Text>
          <Text fontSize={'15'}> • Lúcia Santana Silva</Text>
          <Text fontSize={'15'} fontWeight="400">
            Com sua tonalidade vibrante e sabor adocicado, ela é perfeita para
            realçar o sabor de diversas receitas. Além disso, a Cebola Roxa
            possui propriedades antioxidantes, que ajudam a combater os radicais
            livres e fortalecer o sistema imunológico.
          </Text>
        </Box>
      </ProductDetails>
    </>
  )
}
