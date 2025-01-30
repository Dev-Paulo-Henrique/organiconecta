import {
    Flex,
    Icon,
    Text,
  } from '@chakra-ui/react'
  
  import { IoEyeOutline } from 'react-icons/io5'
  import { PiTrash } from 'react-icons/pi'
  import { FiEdit3 } from 'react-icons/fi'

import React from 'react';

interface ListItemProps {
    onClick: () => void,
    id: number,
    nome: string,
    quantidade: number
}

export function ListItem({ onClick, id, nome, quantidade }: ListItemProps){
    function handleOpen(action: string): void {
        alert(`${action} do produto ${nome}`);
      }

    return (
        <Flex
                justifyContent="space-between"
                w="100%"
                align="center"
                gap="4"
                mb="4"
              >
                <Text>{id}</Text>
                <Text>{nome}</Text>
                <Text>{quantidade}</Text>
                <Flex gap="2">
                  <Icon
                    as={IoEyeOutline}
                    boxSize="6"
                    cursor="pointer"
                    bg="blue.500"
                    color="white"
                    borderRadius="md"
                    p={1}
                    onClick={() => handleOpen("Visualizar Produto")}
                    />
                  <Icon
                    as={FiEdit3}
                    boxSize="6"
                    cursor="pointer"
                    bg="yellow.400"
                    color="black"
                    borderRadius="md"
                    p={1}
                    onClick={() => handleOpen("Editar Produto")}
                  />
                  <Icon
                    as={PiTrash}
                    boxSize="6"
                    cursor="pointer"
                    bg="red.500"
                    color="white"
                    borderRadius="md"
                    p={1}
                    onClick={() => handleOpen("Deletar Produto")}
                  />
                </Flex>
              </Flex>
    )
}
