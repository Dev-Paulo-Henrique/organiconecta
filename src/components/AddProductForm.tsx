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
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
// import { Button } from './Button'
import { storage } from '../services/firebase'
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '~hooks/useAuth'

interface AddProductFormProps {
  title: string
}
export function AddProductForm({ title }: AddProductFormProps) {
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [progresspercent, setProgresspercent] = useState<number>(0)
  const [description, setDescription] = useState('')
  const [codigo, setCodigo] = useState(0)
  const [files, setFiles] = useState<File[]>([])
  const [imgPreviews, setImgPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { user, token } = useAuth()

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files];
    const updatedPreviews = [...imgPreviews];
  
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
  
    setFiles(updatedFiles);
    setImgPreviews(updatedPreviews);
  };  

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles) return

    const newFiles = Array.from(selectedFiles)
    const newImgPreviews = newFiles.map(file => URL.createObjectURL(file))

    setImgPreviews(prev => [...prev, ...newImgPreviews])
    setFiles(prev => [...prev, ...newFiles])

    event.target.value = ''
  }

  const handleSubmit = async (e: FormEvent<any>) => {
    e.preventDefault();
  
    if (files.length > 0) {
      setUploading(true);
      const fileUrls: string[] = []; // Array para armazenar as URLs das imagens
  
      // Gerando o UUID para o produto antes do upload
      const productUUID = uuidv4();
  
      // Para cada arquivo em files, faça o upload para o Firebase Storage
      const uploadPromises = files.map((file) => {
        const storageRef = ref(storage, `products/${user?.id}/${productUUID}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        return new Promise<string>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgresspercent(progress); // Atualizando o progresso do upload
            },
            (error) => {
              console.error('Erro ao fazer upload:', error);
              reject(error);
            },
            () => {
              // Obtendo a URL de download após o upload
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                fileUrls.push(downloadURL); // Armazenando a URL do arquivo no array
                resolve(downloadURL);
              });
            }
          );
        });
      });
  
      try {
        // Aguardar o upload de todos os arquivos
        await Promise.all(uploadPromises);
  
        // Dados do produto com as URLs das imagens
        const productData = {
          produtoNome: productName,
          produtoPreco: price,
          produtoQuantidade: quantity,
          produtoDescricao: description,
          produtoCodigo: productUUID,  // Usando o UUID gerado para o código do produto
          produtoCategoria: 'Orgânico',
          produtoImagens: fileUrls, // Armazenando as URLs das imagens no banco de dados
        };
  
        console.log(productData);
        // Enviar os dados para a API
        const response = await api.post('/produto', productData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Produto enviado com sucesso!', response.data);
  
        // Resetando os estados após o envio
        setCodigo(0);
        setDescription('');
        setFiles([]);
        setPrice(0);
        setProductName('');
        setQuantity(0);
        setUploading(false);
      } catch (error) {
        console.log('Erro ao enviar produto', error);
        setUploading(false);
      }
    } else {
      // Se não houver arquivos selecionados, envia os dados sem as imagens
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
        setFiles([]);
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

  // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     console.log('Arquivo selecionado:', e.target.files[0].name)
  //   }
  // }

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

          {/* Preço */}
          <Flex gap={5}>
            <FormControl id="price" isRequired>
              <FormLabel fontWeight="bold">Preço</FormLabel>
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
              <FormLabel fontWeight="bold">Quantidade</FormLabel>
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
          <FormControl id="description" borderColor="green.600" isRequired>
            <FormLabel fontWeight="bold">Descrição</FormLabel>
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
            <FormLabel fontWeight="bold">Imagens</FormLabel>
            <InputGroup>
              <Box
                border="2px dashed"
                borderColor="gray.300"
                p={4}
                w="full"
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
                multiple
                hidden
                onChange={handleFileChange}
              />
            </InputGroup>
          </FormControl>

          {files &&
            files.map((file, index) => (
              <HStack key={file.name} justify="space-between" w="full" align="center">
                <HStack>
                  <Box boxSize="50px" overflow="hidden" borderRadius="md">
                    <img
                      src={imgPreviews[index]}
                      alt={file.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <Text>{file.name}</Text>
                </HStack>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleRemoveFile(index)}
                  aria-label="Excluir imagem"
                >
                  X
                </Button>
              </HStack>
            ))}

          <Button
            type="submit"
            colorScheme="green"
            size="lg"
            width="full"
            mt={4}
            onClick={handleSubmit}
            isLoading={uploading}
          >
            Adicionar
          </Button>
        </VStack>
      </form>
    </Box>
  )
}
