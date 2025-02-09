// Paulo Henrique

import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Image,
  InputGroup,
} from '@chakra-ui/react'
import { useColorModeValue } from '~components/ui/color-mode'
import Link from 'next/link'
import { Input } from '~components/Input'
import theme from '~styles/theme'
import { useState, ChangeEvent, useRef, useEffect } from 'react'
import { storage } from '../../services/firebase' // Firebase configuration
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { Title } from '~components/Title'
import { TemplateGrid } from '~components/TemplateGrid'
import { useAuth } from '~hooks/useAuth'
import { useRouter } from 'next/router'
import { api } from '~services/api'
import { notifySuccess } from '~utils/toastify'

export default function Loja() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')
  const [nomeLoja, setNomeLoja] = useState('')
  const [certificacao, setCertificacao] = useState('')
  const [registroPropriedade, setRegistroPropriedade] = useState('')
  const [perfilLojaImagem, setPerfilLojaImagem] = useState<string | null>(null)
  const [capaLojaImagem, setCapaLojaImagem] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRefPerfil = useRef<HTMLInputElement | null>(null)
  const fileInputRefCapa = useRef<HTMLInputElement | null>(null)
  const [idCliente, setIdCliente] = useState(0)
  const [loading, setLoading] = useState(false)
  const { user, token } = useAuth()
  const router = useRouter()
  const [perfilLoading, setPerfilLoading] = useState(false)  // loading para perfil
  const [capaLoading, setCapaLoading] = useState(false)  // loading para capa

  // const isProducer = user?.tipoCliente?.tipo === 'Produtor' // Verifique a estrutura real dos dados

  // if (!isProducer) {
  //   return <NotPermission />
  // }

  const checkStore = async () => {
    try {
      // Fazendo uma requisição para a rota /lojas
      const response = await api.get('/loja')
      
      // Verificar se algum cliente tem o mesmo id
      const lojaExistente = response.data.find(
        (loja: { cliente: {id: number} }) => loja.cliente.id === user?.id
      )

      if (lojaExistente) {
        // Redireciona para a página inicial caso encontre uma loja com o mesmo idCliente
        router.push('/')
        // window.location.href = '/'
      }
    } catch (error) {
      console.error("Erro ao verificar loja:", error)
    }
  }

  useEffect(() => {
    if (user?.id) {
      checkStore()
    }
  }, [user?.id])

  const handleCreateStore = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = {
        nomeLoja,
        certificacao,
        registroPropriedade,
        perfilLojaImagem,
        capaLojaImagem,
        idCliente: user?.id,
      }

      console.log(data)
      // Fazendo o POST para a API /loja
      const response = await api.post('/loja', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      notifySuccess('Loja cadastrada com sucesso!')

      setLoading(false)
      // Redireciona após o sucesso
      window.location.href = "/"
      // router.push(`/loja/${user?.id}`)  // Descomente se quiser redirecionar após o cadastro
    } catch (erro) {
      setLoading(false)
      console.error('Erro ao cadastrar loja:', erro)
    }
  }

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
    type: 'perfil' | 'capa',
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileName = uuidv4() + file.name
    const storageRef = ref(storage, `loja/${fileName}`)

    // setUploading(true)
    if (type === 'perfil') setPerfilLoading(true)
      if (type === 'capa') setCapaLoading(true)

    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        )
      },
      error => {
        console.error('Erro ao fazer upload', error)
        // setUploading(false)
        if (type === 'perfil') setPerfilLoading(false)
          if (type === 'capa') setCapaLoading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          if (type === 'perfil') {
            setPerfilLojaImagem(url) // Armazena a URL da imagem de perfil
            setPerfilLoading(false)
          } else if (type === 'capa') {
            setCapaLojaImagem(url) // Armazena a URL da imagem de capa
            setCapaLoading(false)
          }
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
            overflowY="auto"
          >
            <Flex align="center" justify="center" h="100vh">
              <Flex
                as="form"
                w="100%"
                maxWidth={360}
                p="2"
                borderRadius={8}
                flexDir="column"
                overflowY="auto"
                // maxHeight="calc(100vh - 20px)"
                onSubmit={handleCreateStore} // Envia os dados quando o formulário for submetido
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

                  <Flex gap={3}>

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
                    label="Registros"
                    color={color}
                    value={registroPropriedade}
                    onChange={e => setRegistroPropriedade(e.target.value)}
                  /></Flex>

                  <InputGroup>
                    <Button
                      onClick={() => fileInputRefPerfil.current?.click()}
                      colorScheme="green"
                      width="full"
                      minW={"full"}
                      isLoading={perfilLoading}
                    >
                      {perfilLojaImagem
                        ? 'Trocar Perfil'
                        : 'Perfil'}
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
                      src={perfilLojaImagem}
                      alt="Imagem de Perfil"
                      alignSelf={"center"}
                      rounded={50}
                      mt={3}
                      boxSize="100px"
                      objectFit="contain"
                    />
                  )}

                  <InputGroup display={"flex"} minW={"full"}>
                    <Button
                      onClick={() => fileInputRefCapa.current?.click()}
                      colorScheme="green"
                      width="full"
                      minW={"full"}
                      isLoading={capaLoading}
                    >
                      {capaLojaImagem 
                        ? 'Trocar Capa'
                        : 'Capa'}
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
                      src={capaLojaImagem}
                      alt="Imagem de Capa"
                      mt={3}
                      alignSelf={"center"}
                      boxSize="100px"
                      objectFit="contain"
                    />
                  )}

                  {/* <Input
                    name="idCliente"
                    type="number"
                    placeholder="ID do Cliente"
                    label="ID do Cliente"
                    color={color}
                    value={idCliente}
                    onChange={e => setIdCliente(Number(e.target.value))}
                  /> */}
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
                      colorScheme="whiteAlpha"
                      bg={useColorModeValue(theme.colors.gray[300], theme.colors.gray[700])}
                      color={color}
                      size="lg"
                    >
                      Voltar
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    colorScheme="green"
                    w={"50%"}
                    bg={useColorModeValue(theme.colors.green[700], theme.colors.green[500])}
                    size="lg"
                    color={theme.colors.gray[100]}
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
