// Paulo Henrique

import type { IconButtonProps } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { ThemeProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useState, useEffect, forwardRef } from "react"
import { LuMoon, LuSun } from "react-icons/lu"

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  )
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme()
  const [colorMode, setColorMode] = useState<'light' | 'dark' | undefined>(undefined)

  useEffect(() => {
    if (resolvedTheme === "light" || resolvedTheme === "dark") {
      setColorMode(resolvedTheme)
    } else {
    }
  }, [resolvedTheme])

  const toggleColorMode = () => {
    setTheme(colorMode === "light" ? "dark" : "light")
  }

  return {
    colorMode: colorMode ?? "light",
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === "light" ? light : dark
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === "light" ? <LuSun /> : <LuMoon />
}

interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {}

export const ColorModeButton = forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode()
  const color = useColorModeValue('gray.100', 'gray.800')
  const bg = useColorModeValue('gray.800', 'gray.100')
  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      size="lg"
      ref={ref}
      {...props}
      position={"fixed"}
      bottom={10}
      left={10}
      bg={bg}
      _hover={{
        bg: "gray.500"
      }}
      color={color}
      css={{
        _icon: {
          width: "5",
          height: "5",
        },
      }}
    >
      <ColorModeIcon />
    </IconButton>
  )
})
