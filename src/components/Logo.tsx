// Paulo Henrique

import { Image, Link } from '@chakra-ui/react'

interface LogoProps {
  size: number
  link?: string
}

export function Logo({ size, link }: LogoProps) {
  return (
    <>
      {link ? (
        <Link href={link}>
          <Image src="/images/logo.png" alt="logo" width={size} />
        </Link>
      ) : (
        <Image src="/images/logo.png" alt="logo" width={size} />
      )}
    </>
  )
}
