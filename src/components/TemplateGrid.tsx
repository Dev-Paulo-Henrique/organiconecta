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
      templateAreas={`"img main"`}
      gridTemplateColumns={'40vw 1fr'}
      h={'100vh'}
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem bg="green.500" area={'img'}>
        <Flex align="center" justify="center" h="100vh">
          <Image
            src={img}
            alt="logo"
            width={'100%'}
            objectFit="cover"
            boxSize="100%"
          ></Image>
        </Flex>
      </GridItem>
      <GridItem area={'main'}>
        {children}
      </GridItem>
    </Grid>
  )
}