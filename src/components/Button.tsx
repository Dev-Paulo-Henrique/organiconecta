// Paulo Henrique

import { Stack, Button as Btn, Text } from '@chakra-ui/react'
import { buttonsUtils } from '~utils/button'

interface ButtonProps {
  text?: string
  onClick?: () => void
  bg?: string
  color?: string
  colorScheme?: string
  type?: keyof typeof buttonsUtils
}

export function Button({
  text,
  onClick,
  bg,
  color,
  colorScheme,
  type,
}: ButtonProps) {
  const buttonConfigs = buttonsUtils

  const {
    text: typeText = '',
    bg: typeBg = '',
    color: typeColor = '',
    colorScheme: typeColorScheme = '',
    onClick: typeOnClick,
  } = type ? buttonConfigs[type] : {}

  return (
    <Stack gap="2" align="flex-start">
      <Btn
        p={4}
        bg={bg || typeBg}
        onClick={onClick || typeOnClick}
        colorScheme={colorScheme || typeColorScheme}
        w="full"
      >
        <Text color={color || typeColor}>{text || typeText}</Text>
      </Btn>
    </Stack>
  )
}
