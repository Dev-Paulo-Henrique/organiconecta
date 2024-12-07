// Paulo Henrique

import { ChakraProvider } from '@chakra-ui/react'
import 'react-color-picker/index.css'

import { AppProps } from 'next/app'
import theme from '~styles/theme'
import { ColorModeButton, ColorModeProvider } from '~components/ui/color-mode'

export default function Main({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider>
        <ColorModeButton />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}
