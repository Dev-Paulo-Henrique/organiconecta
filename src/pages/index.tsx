// Paulo Henrique

import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Viewer } from '~components/Modal'
import { Title } from '~components/Title'
import { useColorModeValue } from '~components/ui/color-mode'

export default function App() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')
  return (<Box bg={bg}><Title/><Flex justify={"center"} align={"center"} h={"100vh"}><Viewer /></Flex></Box>)
}
