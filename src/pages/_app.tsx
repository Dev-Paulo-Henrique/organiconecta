// Paulo Henrique

import { ChakraProvider } from '@chakra-ui/react'
import 'react-color-picker/index.css'

import { AppProps } from 'next/app'
import theme from '~styles/theme'
import { ColorModeButton, ColorModeProvider } from '~components/ui/color-mode'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { CartButton } from '~components/CartButton'

export default function Main({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ToastContainer />
      <ColorModeProvider>
        <ColorModeButton />
        <Component {...pageProps} />
        <CartButton/>
      </ColorModeProvider>
    </ChakraProvider>
  )
}
