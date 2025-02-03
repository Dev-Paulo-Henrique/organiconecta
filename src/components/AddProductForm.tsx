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
  Text,
  HStack,
  Button,
  Flex,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Center,
} from '@chakra-ui/react'
import { PiOrange } from 'react-icons/pi'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { FiBox } from 'react-icons/fi'
import { TiPencil } from 'react-icons/ti'
import { api } from '~services/api'
import { useEffect, useRef, useState } from 'react'
// import { Button } from './Button'
import { storage } from '../services/firebaseConfig'; // Caminho correto para o serviço Firebase
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


interface AddProductFormProps {
  title: string
}
export function AddProductForm({ title }: AddProductFormProps) {
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [progresspercent, setProgresspercent] = useState<number>(0);
  const [description, setDescription] = useState('')
  const [codigo, setCodigo] = useState(0)
  const [image, setImage] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    console.log('Componente montado ou alguma dependência mudou!')
  }, [productName, price, quantity, description, image])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (image) {
      setUploading(true);
  
      // Criando uma referência no Firebase Storage
      const storageRef = ref(storage, `products/${image.name}`);

      console.log(storageRef)
  
      const uploadTask = uploadBytesResumable(storageRef, image);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress); // Atualizando o progresso do upload
        },
        (error) => {
          console.error('Erro ao fazer upload:', error);
          setUploading(false);
        },
        () => {
          // Obtendo a URL de download da imagem
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // Dados do produto
            const productData = {
              produtoNome: productName,
              produtoPreco: price,
              quantity,
              produtoDescricao: description,
              codigo,
              produtoCategoria: "Orgânico",
              produtoImagem: downloadURL,  // Armazenando a URL da imagem no banco de dados
            };
  
            console.log(productData)
            // Enviando os dados para a API
            api.post('/produto', productData, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then((response) => {
              console.log('Produto enviado com sucesso!', response.data);
              setCodigo(0);
              setDescription('');
              setImage(null);
              setPrice(0);
              setProductName('');
              setQuantity(0);
              setUploading(false);  // Resetando o estado de upload
            })
            .catch((error) => {
              console.log('Erro ao enviar produto', error);
              setUploading(false);
            });
          });
        }
      );
    } else {
      // Se a imagem não foi selecionada, envia os dados sem a imagem
      const productData = {
        productName,
        price,
        quantity,
        description,
        codigo,
      };
  
      try {
        const response = await api.post('/produto', productData);
        console.log('Produto enviado com sucesso!', response.data);
        setCodigo(0);
        setDescription('');
        setImage(null);
        setPrice(0);
        setProductName('');
        setQuantity(0);
      } catch (error) {
        console.log('Erro ao enviar produto', error);
      }
    }
  };
  

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log('Arquivo selecionado:', e.target.files[0].name)
    }
  }

  return (
    <Box p={8} borderRadius="lg" maxW="600px" mx="auto">
      <HStack justify="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
      </HStack>
      <form>
        <VStack spacing={4}>
          {/* Nome do Produto */}
          <FormControl id="productName" isRequired>
            <FormLabel fontWeight="bold">Nome do Produto</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <PiOrange />
              </InputLeftElement>
              <Input
                placeholder="Digite o nome do produto"
                value={productName}
                onChange={e => setProductName(e.target.value)}
                focusBorderColor="green.500"
                bg="white"
              />
            </InputGroup>
          </FormControl>

          {/* codigpo do produto */}
          <FormControl id="price" isRequired>
            
          <FormLabel fontWeight="bold">Nome do Produto</FormLabel>
            <InputGroup>
              <NumberInput
                value={codigo}
                onChange={valueString => setCodigo(parseFloat(valueString))}
                min={0}
                precision={2}
                focusBorderColor="green.500"
              >
                <InputLeftElement pointerEvents="none">
                  <RiMoneyDollarCircleLine color="green.600" />
                </InputLeftElement>
                <NumberInputField bg="white" pl="30px" />
              </NumberInput>
            </InputGroup>
          </FormControl>

          {/* Preço */}
          <Flex gap={5}>
            <FormControl id="price" isRequired>
              <InputGroup>
                <NumberInput
                  value={price}
                  onChange={valueString => setPrice(parseFloat(valueString))}
                  min={0}
                  precision={2}
                  focusBorderColor="green.500"
                >
                  <InputLeftElement pointerEvents="none">
                    <RiMoneyDollarCircleLine color="green.600" />
                  </InputLeftElement>
                  <NumberInputField bg="white" pl="30px" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
            </FormControl>

            {/* Quantidade */}
            <FormControl id="quantity" isRequired>
              <InputGroup>
                <NumberInput
                  value={quantity}
                  onChange={valueString =>
                    setQuantity(parseInt(valueString, 10))
                  }
                  min={0}
                  focusBorderColor="green.500"
                >
                  <InputLeftElement pointerEvents="none">
                    <FiBox color="green.600" />
                  </InputLeftElement>
                  <NumberInputField bg="white" pl="30px" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
            </FormControl>
          </Flex>

          {/* Descrição */}
          <FormControl id="description" borderColor="green.600">
            <InputGroup>
              <Box position="relative" w="full">
                <InputLeftElement pointerEvents="none">
                  <TiPencil color="green.600" />
                </InputLeftElement>
                <Textarea
                  placeholder="Escreva a descrição do produto"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  focusBorderColor="green.500"
                  borderColor="green.600"
                  _hover={{
                    borderColor: 'green.600',
                  }}
                  bg="white"
                  pl="40px"
                />
              </Box>
            </InputGroup>
          </FormControl>

          {/* Upload de Imagem */}
          <FormControl id="image">
            <InputGroup>
              <Box
                border="2px dashed"
                borderColor="gray.300"
                p={4}
                textAlign="center"
                borderRadius="md"
                cursor="pointer"
                bg="gray.50"
                _hover={{ bg: 'gray.100' }}
                onClick={handleFileClick}
              >
                Arraste e solte aqui para fazer upload <br />
                <Text fontSize="sm" color="gray.500">
                  (.png, .jpg até 5MB)
                </Text>
              </Box>
              <Input
                type="file"
                accept=".png, .jpg, .jpeg"
                ref={fileInputRef}
                hidden
                onChange={handleFileUpload}
              />
            </InputGroup>
          </FormControl>

          {/* Botão de Enviar */}
          <Button
            type="submit"
            colorScheme="green"
            size="lg"
            width="full"
            mt={4}
            onClick={handleSubmit}
          >
            Adicionar
          </Button>
        </VStack>
      </form>
    </Box>
  )
}
