import { Box, HStack, Icon, Link, Stack, Text } from '@chakra-ui/react'
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si'
import { Logo } from './Logo'

export function Footer() {
  return (
    <Box as="footer" py={{ base: '10', md: '2' }} px={{ base: 10, md: 8 }}>
      <Stack gap="6" borderTop={"1px solid gray"} pt={3}>
        <Stack direction="row" justify="space-between" align="center">
          <Logo size={32} />
          <HStack gap="4">
            {socialLinks.map(({ href, icon }, index) => (
              <Link key={index} href={href} color="gray">
                <Icon fontSize={'md'}>{icon}</Icon>
              </Link>
            ))}
          </HStack>
        </Stack>
        <Text fontSize="sm" color="fg.muted">
          &copy; {new Date().getFullYear()} Organiconecta, Inc. Todos os direitos reservados.
        </Text>
      </Stack>
    </Box>
  )
}

const socialLinks = [
  { href: 'https://x.com', icon: <SiX /> },
  { href: 'https://github.com', icon: <SiGithub /> },
  { href: 'https://www.linkedin.com', icon: <SiLinkedin /> },
]
