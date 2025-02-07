import { IconButton, Box, Badge } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from '~hooks/useCart';
import { useEffect, useState } from 'react';

export function FloattingButton() {
  const router = useRouter();
  const { cartItems } = useCart();
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setTotalItems(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }, [cartItems]);

  return (
    <Box position="fixed" bottom={10} right={10}>
      <IconButton
        icon={<FaCartShopping />}
        aria-label="Carrinho"
        colorScheme="green"
        borderRadius="full"
        size="lg"
        onClick={() => router.push("/carrinho")}
        position="relative"
      />

      {totalItems > 0 && (
        <Badge
          bg={"red.500"}
          color={"white"}
          borderRadius="full"
          position="absolute"
          top="-5px"
          right="-5px"
          fontSize="0.8em"
          px={2}
        >
          {totalItems}
        </Badge>
      )}
    </Box>
  );
}
