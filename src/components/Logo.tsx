// Paulo Henrique

import { Image, Link } from '@chakra-ui/react'

interface LogoProps {
  size: number | {base: number; md: number} 
  link?: string
}

export function Logo({ size, link }: LogoProps) {

  const responsiveSize = typeof size === 'number' ? { base: size * 0.75, md: size } : size;
  
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
