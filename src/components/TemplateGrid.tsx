// Paulo Henrique

import {
  Flex,
  Grid,
  GridItem,
  Image,
} from '@chakra-ui/react'
import { ReactNode } from 'react';

interface TemplateGridProps {
  img: string;
  children?: ReactNode
}

export function TemplateGrid({ img, children }: TemplateGridProps) {
  return (
    <Grid
      templateAreas={{base: `"main"`, md: `"img main"`}}
      gridTemplateColumns={{md:'40vw 1fr'}}
      h={'100vh'}
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem area={'img'} display={{ base: 'none', md: 'block' }}>
        <Flex align="center" justify="center" h="100vh">
          <Image
            src={img}
            alt="logo"
            width={'100%'}
            objectFit="cover"
            boxSize="100%"
            borderRightRadius={20}
            // borderRadius={"0 20px 20px 0"}
          />
        </Flex>
      </GridItem>
      <GridItem area={'main'}>
        {children}
      </GridItem>
    </Grid>
  )
}