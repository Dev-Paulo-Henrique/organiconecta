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
  Text
} from '@chakra-ui/react'

import { FaChevronDown } from 'react-icons/fa'

interface ListProps {
    title: string;
}

export function List({ title }: ListProps) {
  return (
    <Menu>
      <MenuButton as={'button'}>
        <Flex align={"center"}>
        <Text marginRight={2}>{title}</Text>
        <FaChevronDown size={12}/>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  )
}
