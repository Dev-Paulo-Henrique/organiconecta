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
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} color={color}>
          {label}
        </FormLabel>
      )}
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor={theme.colors.green[500]}
        borderColor={color}
        bgColor={bg}
        variant="filled"
        size="lg"
        _hover={{ 
          background: "transparent"
         }}
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
