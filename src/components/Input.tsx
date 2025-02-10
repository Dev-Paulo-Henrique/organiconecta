// Paulo Henrique

import {
  Input as ChakraInput,
  FormLabel,
  FormControl,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'
import { useColorModeValue } from './ui/color-mode'
import theme from '~styles/theme'
import { useRouter } from 'next/router'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref,
) => {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')
  const router = useRouter()
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} color={router.pathname === "/perfil" ? "gray.800" : color}>
          {label}
        </FormLabel>
      )}
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor={theme.colors.green[500]}
        borderColor={router.pathname === "/perfil" ? "gray.800" : color}
        bgColor={router.pathname === "/perfil" ? "white" : bg}
        variant="filled"
        size="lg"
        _hover={{ 
          background: router.pathname === "/perfil" ? "white" : bg
         }}
         _focus={{
          background: router.pathname === "/perfil" ? "white" : bg
         }}
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
