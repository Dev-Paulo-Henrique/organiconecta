// Paulo Henrique

import { IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FaRegCircleQuestion, FaCartShopping  } from "react-icons/fa6";

export function FloattingButton() {
    const router = useRouter()
  
  return (
    <IconButton
      icon={ router.pathname === "/" ? <FaCartShopping /> : <FaRegCircleQuestion  />}
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
