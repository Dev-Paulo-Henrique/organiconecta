import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  Image,
  FormControl,
  FormLabel,
  // Input,
  InputGroup,
} from '@chakra-ui/react'
import { useColorModeValue } from '~components/ui/color-mode'
import Link from 'next/link'
import { Input } from '~components/Input'
import theme from '~styles/theme'
import { useAuth } from '~hooks/useAuth'
import { useRouter } from 'next/router'
import { Title } from '~components/Title'
import { useState, ChangeEvent, useRef } from 'react'
import { storage } from '../../services/firebase' // Firebase configuration
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { TemplateGrid } from '~components/TemplateGrid'

export default function Loja() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')
  const [nomeLoja, setNomeLoja] = useState('')
  const [certificacao, setCertificacao] = useState('')
  const [registroPropriedade, setRegistroPropriedade] = useState('')
  const [perfilLojaImagem, setPerfilLojaImagem] = useState<File | null>(null)
  const [capaLojaImagem, setCapaLojaImagem] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRefPerfil = useRef<HTMLInputElement | null>(null)
  const fileInputRefCapa = useRef<HTMLInputElement | null>(null)
  const [idCliente, setIdCliente] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { token, setToken } = useAuth()

  // useEffect(() => {
  //   if (token) {
  //     router.push('/')
  //   }
  // }, [token, router])

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Lógica para enviar os dados para o servidor (aqui é apenas um exemplo)
      const data = {
        nomeLoja,
        certificacao,
        registroPropriedade,
        capaLojaImagem,
        perfilLojaImagem,
        idCliente,
      }

      // Exemplo de chamada à API
      // const response = await api.post('/sua-rota', data)

      setLoading(false)
      router.push('/') // Redirecionar após o sucesso
    } catch (erro) {
      setLoading(false)
      console.error(erro)
    }
  }

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
    type: 'perfil' | 'capa',
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Defina o tipo de arquivo (perfil ou capa) e faça o upload para o Firebase
    const fileName = uuidv4() + file.name
    const storageRef = ref(storage, `loja/${fileName}`)

    setUploading(true)

    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        )
        // Aqui você pode adicionar um indicador de progresso, se necessário
      },
      error => {
        console.error('Erro ao fazer upload', error)
        setUploading(false)
      },
      () => {
        // Quando o upload for concluído com sucesso
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          if (type === 'perfil') {
            setPerfilLojaImagem(file)
          } else if (type === 'capa') {
            setCapaLojaImagem(file)
          }
          setUploading(false)
        })
      },
    )
  }

  return (
    <>
      <Title name="Cadastrar loja" />
      <Box bg={bg}>
        <TemplateGrid img="/images/photo-clientCadastro.jpg">
          <Box
            bgImage="url('/images/floating.png')"
            bgSize={'cover'}
            bgPosition={'center'}
            bgRepeat={'no-repeat'}
          >
            <Flex align="center" justify="center" h="100vh">
              <Flex
                as="form"
                w="100%"
                maxWidth={360}
                p="2"
                borderRadius={8}
                flexDir="column"
                onSubmit={handleLogin} // Envia os dados quando o formulário for submetido
              >
                <Stack spacing="2">
                  <Image src={'/images/logo.png'} alt="logo" width={'100%'} />

                  <Input
                    name="nomeLoja"
                    type="text"
                    placeholder="Nome da sua loja"
                    label="Nome da Loja"
                    color={color}
                    value={nomeLoja}
                    onChange={e => setNomeLoja(e.target.value)}
                  />

                  <Input
                    name="certificacao"
                    type="text"
                    placeholder="Certificados"
                    label="Certificados"
                    color={color}
                    value={certificacao}
                    onChange={e => setCertificacao(e.target.value)}
                  />

                  <Input
                    name="registroPropriedade"
                    type="text"
                    placeholder="Registros"
                    label="Registros de Propriedade"
                    color={color}
                    value={registroPropriedade}
                    onChange={e => setRegistroPropriedade(e.target.value)}
                  />

                  {/* <Input
                    name="capaLojaImagem"
                    type="text"
                    placeholder="URL da Capa da Loja"
                    label="Capa da Loja (Imagem)"
                    color={color}
                    value={capaLojaImagem}
                    onChange={e => setCapaLojaImagem(e.target.value)}
                  /> */}

                  {/* <Input
                    name="perfilLojaImagem"
                    type="text"
                    placeholder="URL do Perfil da Loja"
                    label="Perfil da Loja (Imagem)"
                    color={color}
                    value={perfilLojaImagem}
                    onChange={e => setPerfilLojaImagem(e.target.value)}
                  /> */}
                  <InputGroup>
                    <Button
                      onClick={() => fileInputRefPerfil.current?.click()}
                      colorScheme="green"
                      width="full"
                      isLoading={uploading}
                    >
                      {perfilLojaImagem
                        ? 'Trocar Imagem de Perfil'
                        : 'Escolher Imagem de Perfil'}
                    </Button>
                    <Input
                      type="file"
                      ref={fileInputRefPerfil}
                      onChange={e => handleFileChange(e, 'perfil')}
                      hidden
                      accept=".png,.jpg,.jpeg"
                      name="perfilLojaImagem"
                    />
                  </InputGroup>
                  {perfilLojaImagem && (
                    <Image
                      src={URL.createObjectURL(perfilLojaImagem)}
                      alt="Imagem de Perfil"
                      mt={3}
                      boxSize="150px"
                      objectFit="cover"
                    />
                  )}

                  <InputGroup>
                    <Button
                      onClick={() => fileInputRefCapa.current?.click()}
                      colorScheme="green"
                      width="full"
                      isLoading={uploading}
                    >
                      {capaLojaImagem
                        ? 'Trocar Imagem de Capa'
                        : 'Escolher Imagem de Capa'}
                    </Button>
                    <Input
                      type="file"
                      ref={fileInputRefCapa}
                      onChange={e => handleFileChange(e, 'capa')}
                      hidden
                      accept=".png,.jpg,.jpeg"
                      name="capaLojaImagem"
                    />
                  </InputGroup>
                  {capaLojaImagem && (
                    <Image
                      src={URL.createObjectURL(capaLojaImagem)}
                      alt="Imagem de Capa"
                      mt={3}
                      boxSize="300px"
                      objectFit="cover"
                    />
                  )}

                  <Input
                    name="idCliente"
                    type="number"
                    placeholder="ID do Cliente"
                    label="ID do Cliente"
                    color={color}
                    value={idCliente}
                    onChange={e => setIdCliente(Number(e.target.value))}
                  />
                </Stack>
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  mt={2}
                  gap={2}
                >
                  <Link href="/" passHref>
                    <Button
                    w={"50%"}
                      as="a"
                      // w={140}
                      alignItems="center"
                      colorScheme="whiteAlpha"
                      bg={useColorModeValue(theme.colors.gray[300], theme.colors.gray[700])}
                      color={color}
                      size="lg"
                    >
                      Voltar
                    </Button>
                  </Link>
                  <Button
                    // w={250}
                    // w={140}
                    type="submit"
                    colorScheme="green"
                    // gap={1}
                    w={"50%"}
                    bg={useColorModeValue(
                      theme.colors.green[700],
                      theme.colors.green[500],
                    )}
                    size="lg"
                    color={useColorModeValue(
                      theme.colors.gray[100],
                      theme.colors.gray[100],
                    )}
                    isLoading={loading}
                    loadingText="Cadastrando..."
                  >
                    Cadastrar
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </TemplateGrid>
      </Box>
    </>
  )
}
