// Paulo Henrique

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Flex,
  Text,
  theme
} from '@chakra-ui/react'

import { FaChevronDown } from 'react-icons/fa'
import { useColorModeValue } from './ui/color-mode';

interface ListProps {
  title: string;
}

export function List({ title }: ListProps) {
  const color = useColorModeValue('black', 'white')
  const bg = useColorModeValue('gray.100', 'gray.800')
  return (
    <Menu>
      <MenuButton as={'button'}>
        <Flex align={"center"}>
          <Text marginRight={2} color={color}>{title} </Text>
          <FaChevronDown size={12} color={color} />
        </Flex>
      </MenuButton>
      <MenuList bg={bg}>
        <MenuItem _hover={bg === "gray.800" ? { color: color, background: theme.colors.gray[900] } : { color: color, background: theme.colors.gray[200] }} color={color}>Download</MenuItem>
        <MenuItem _hover={bg === "gray.800" ? { color: color, background: theme.colors.gray[900] } : { color: color, background: theme.colors.gray[200] }} color={color}>Create a Copy</MenuItem>
        <MenuItem _hover={bg === "gray.800" ? { color: color, background: theme.colors.gray[900] } : { color: color, background: theme.colors.gray[200] }} color={color}>Mark as Draft</MenuItem>
        <MenuItem _hover={bg === "gray.800" ? { color: color, background: theme.colors.gray[900] } : { color: color, background: theme.colors.gray[200] }} color={color}>Delete</MenuItem>
        <MenuItem _hover={bg === "gray.800" ? { color: color, background: theme.colors.gray[900] } : { color: color, background: theme.colors.gray[200] }} color={color}>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  )
}
