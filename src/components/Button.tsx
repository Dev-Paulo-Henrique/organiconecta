import { Stack, Button as Btn, Text, Spinner } from '@chakra-ui/react'
import { buttonsUtils } from '~utils/button'

interface ButtonProps {
  children?: React.ReactNode // Alterado para aceitar qualquer tipo de conteúdo dentro do botão
  onClick?: () => void
  bg?: string
  color?: string
  colorScheme?: string
  type?: keyof typeof buttonsUtils
  isLoading?: boolean // Novo prop para controlar o estado de loading
}

export function Button({
  children,
  onClick,
  bg,
  color,
  colorScheme,
  type,
  isLoading = false, // Valor padrão para não carregar se não for passado
}: ButtonProps) {
  const buttonConfigs = buttonsUtils

  const {
    text: typeText = '',
    bg: typeBg = '',
    color: typeColor = '',
    colorScheme: typeColorScheme = '',
    onClick: typeOnClick = () => {},
  } = type ? buttonConfigs[type] : {}

  return (
    <Stack gap="2" align="flex-start">
      <Btn
        p={4}
        bg={bg || typeBg}
        onClick={typeOnClick || onClick}
        colorScheme={colorScheme || typeColorScheme}
        w="full"
        isLoading={isLoading} // Isso ativa o carregamento no botão
        loadingText="" // Para não mostrar texto enquanto carrega
      >
        {/* Renderiza o conteúdo do botão, seja ele texto ou spinner */}
        {isLoading ? (
          <Spinner size="sm" color="white" />
        ) : (
          <Text color={color || typeColor}>{children || typeText}</Text>
        )}
      </Btn>
    </Stack>
  )
}
