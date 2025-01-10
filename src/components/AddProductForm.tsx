// Paulo Henrique

import {
  Box,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  Icon,
  Text,
} from '@chakra-ui/react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useState } from 'react'
import { Button } from './Button'

interface AddProductFormProps {
  title: string
}
export function AddProductForm({ title }: AddProductFormProps) {
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = {
      productName,
      price,
      quantity,
      description,
      image,
    }

    console.log('Dados do Formulário:', formData)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  return (
    <Box p={8} borderRadius="lg" maxW="600px" mx="auto">
      <Text>{title}</Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="productName" isRequired>
            <FormLabel>
              <Icon as={IoIosAddCircleOutline} mr={2} />
              Nome do Produto
            </FormLabel>
            <Input
              placeholder="Nome do Produto"
              value={productName}
              onChange={e => setProductName(e.target.value)}
            />
          </FormControl>

          <FormControl id="price" isRequired>
            <FormLabel>Preço</FormLabel>
            <NumberInput
              value={price}
              onChange={valueString => setPrice(parseFloat(valueString))}
              min={0}
              precision={2}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl id="quantity" isRequired>
            <FormLabel>Quantidade</FormLabel>
            <NumberInput
              value={quantity}
              onChange={valueString => setQuantity(parseInt(valueString, 10))}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl id="description">
            <FormLabel>Descrição</FormLabel>
            <Textarea
              placeholder="Escreva a descrição do produto"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl id="image">
            <FormLabel>Imagem do Produto</FormLabel>
            <Input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleFileUpload}
            />
          </FormControl>

          <Button type={18}/>
        </VStack>
      </form>
    </Box>
  )
}
