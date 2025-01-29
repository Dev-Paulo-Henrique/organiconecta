// Paulo Henrique

import { IconButton } from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'

export function CartButton() {
  return (
    <IconButton
      icon={<FiShoppingCart />}
      aria-label="Carrinho"
      position="fixed"
      bottom={4}
      right={4}
      colorScheme="green"
      borderRadius="full"
      size="lg"
    />
  )
}
