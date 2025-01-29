// Paulo Henrique

import { ChakraProvider } from '@chakra-ui/react'
import 'react-color-picker/index.css'

import { AuthContextProvider } from '../contexts/AuthContext'

import { AppProps } from 'next/app'
import theme from '~styles/theme'
import { ColorModeButton, ColorModeProvider } from '~components/ui/color-mode'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FloattingButton } from '~components/FloattingButton'

export default function Main({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ToastContainer />
      <ColorModeProvider>
        <AuthContextProvider>
        <ColorModeButton />
          <Component {...pageProps} />
        </AuthContextProvider>
        <FloattingButton />
      </ColorModeProvider>
    </ChakraProvider>
  )
}
