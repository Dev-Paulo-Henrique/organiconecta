import { Box, Button, Flex, Image, Progress, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Header } from '~components/Header'
import { Input } from '~components/Input'
import { Loading } from '~components/Loading'
import { NotPermission } from '~components/NotPermission'
import { Title } from '~components/Title'
import { useAuth } from '~hooks/useAuth'
import { api } from '~services/api'
import theme from '~styles/theme'
import { format, parseISO } from 'date-fns'
import InputMask from 'react-input-mask'
import { notifyError, notifySuccess } from '~utils/toastify'
import { Button as Btn } from '../components/Button'
import { storage } from '~services/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export default function Perfil() {
  const bg = 'gray.100'
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [clienteImagem, setClienteImagem] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [enderecos, setEnderecos] = useState<any[]>([])
  const [loadingPlan, setLoadingPlan] = useState<boolean>(false)
  const [hasLoja, setHasLoja] = useState<any>(false)
  const [uploading, setUploading] = useState(false)
  const [progresspercent, setProgresspercent] = useState<number>(0)

  const { token, user } = useAuth()
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(true)
  const [loadingButton, setLoadingButton] = useState<boolean>(false)

  const isClient = user?.tipoCliente?.tipo === 'Cliente'
  const isProducer = user?.tipoCliente?.tipo === 'Produtor'

  async function getUser() {
    if (!token || !user?.id) {
      setLoading(false)
      return
    }

    try {
      const response = await api.get(`/cliente/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = response.data
      setNome(data.nome)
      setTelefone(data.telefone)
      setEmail(data.usuario.username)
      setCpf(data.cpf)
      setClienteImagem(data.clienteImagem)
      setDataNascimento(format(parseISO(data.dataNascimento), 'dd/MM/yyyy'))
      setEnderecos(data.enderecos) // Populando os endereços

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Erro ao buscar cliente', error)
    }
  }

  const checkLoja = async () => {
    setLoading(true)
    try {
      const response = await api.get('/loja', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const loja = response.data.find(
        (loja: any) => loja.cliente.id === user.id,
      )

      if (loja) {
        setHasLoja(loja)
      } else {
        setHasLoja(false)
        // router.push('/cadastro/loja')
      }
    } catch (error) {
      console.error('Erro ao verificar loja:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token && user?.id) {
      getUser()
      checkLoja()
    }
  }, [token, user])

  if (loading) {
    return <Loading />
  }

  if (!token) {
    return <NotPermission />
  }

  const handleProfileImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const fileUrls: string[] = []

      // Criação do caminho para a imagem no Firebase Storage
      const storageRef = ref(storage, `perfil/${user.id}/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      try {
        const uploadPromise = new Promise<string>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            snapshot => {
              // Acompanhando o progresso do upload
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
              )
              setProgresspercent(progress) // Atualizando o progresso
            },
            error => {
              console.error('Erro ao fazer upload:', error)
              reject(error)
            },
            () => {
              // Quando o upload for concluído com sucesso
              getDownloadURL(uploadTask.snapshot.ref)
                .then(downloadURL => {
                  fileUrls.push(downloadURL) // Armazenando a URL da imagem
                  resolve(downloadURL)
                })
                .catch(error => {
                  console.error('Erro ao obter a URL de download:', error)
                  reject(error)
                })
            },
          )
        })

        // Espera o upload ser concluído e obtém a URL
        const profileImageURL = await uploadPromise
        setClienteImagem(profileImageURL) // Atualiza a imagem de perfil no estado

        // Atualiza a foto de perfil do usuário no backend
        await updateProfileImage(profileImageURL) // Chama a função para atualizar a imagem no servidor

        notifySuccess('Imagem de perfil carregada com sucesso!')
      } catch (error) {
        console.error('Erro ao fazer upload da imagem de perfil:', error)
        notifyError('Erro ao carregar a imagem de perfil.')
      }
    }
  }

  const updateProfileImage = async (profileImageURL: string) => {
    try {
      const response = await api.put(
        `/cliente/${user.id}`, // Endpoint para atualizar a foto de perfil
        {
          nome,
          telefone,
          cpf,
          dataNascimento,
          email,
          clienteImagem: profileImageURL,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluindo o token de autorização
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.status === 200) {
        console.log('Foto de perfil atualizada com sucesso!')
        window.location.reload()
      } else {
        throw new Error('Erro ao atualizar foto de perfil')
      }
    } catch (error) {
      console.error('Erro ao atualizar foto de perfil:', error)
      notifyError('Erro ao atualizar foto de perfil.')
    }
  }

  async function handleEditing() {
    setLoadingButton(true)
    try {
      await api.put(
        `/cliente/${user.id}`,
        {
          nome,
          telefone,
          cpf,
          dataNascimento,
          email,
          clienteImagem,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (enderecos.length > 0) {
        const endereco = enderecos[0]

        if (
          endereco.rua &&
          endereco.numero &&
          endereco.bairro &&
          endereco.cep &&
          endereco.cidade &&
          endereco.estado
        ) {
          if (endereco.id) {
            await api.put(
              `/cliente/endereco/${endereco.id}`,
              {
                rua: endereco.rua,
                numero: endereco.numero,
                bairro: endereco.bairro,
                cep: endereco.cep,
                cidade: endereco.cidade,
                estado: endereco.estado,
                complemento: endereco.complemento,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              },
            )
          } else {
            await api.post(
              `/cliente/endereco/${user.id}`,
              {
                rua: endereco.rua,
                numero: endereco.numero,
                bairro: endereco.bairro,
                cep: endereco.cep,
                cidade: endereco.cidade,
                estado: endereco.estado,
                complemento: endereco.complemento,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              },
            )
          }
        } else {
          notifyError(
            'Por favor, preencha todos os campos obrigatórios do endereço!',
          )
        }
      }

      setLoadingButton(false)
      notifySuccess('Dados atualizados com sucesso!')
    } catch (error) {
      setLoadingButton(false)
      console.log('Erro ao atualizar dados', error)
    }
  }

  const handlePlanToggle = async () => {
    // if (hasLoja) {
    setLoadingPlan(true)
    try {
      const endpoint = isClient
        ? `/assinatura/${user.id}/ativarplano`
        : `/assinatura/${user.id}/desativarplano`
      const response = await api.put(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      console.log('Plano atualizado:', response)
      if (isClient) {
        if (hasLoja) {
          window.location.href = `/loja/${hasLoja?.id}` // Recarrega a página após sucesso
        } else {
          window.location.href = '/cadastro/loja' // Recarrega a página após sucesso
        }
      } else {
        window.location.reload() // Recarrega a página após sucesso
      }
    } catch (error) {
      console.error('Erro ao atualizar plano:', error)
    } finally {
      setLoadingPlan(false) // Desativa o estado de loading após a requisição
      isProducer ? router.push('/') : router.push('/cadastro/loja')
    }
    // } else {
    //   router.push('/cadastro/loja')
    // }
  }

  return (
    <>
      <Header />
      <Title />
      <Flex bg={bg} h="100vh" justifyContent={'center'}>
        <Flex
          justifyContent={'center'}
          alignItems={'flex-start'}
          gap={3}
          as="form"
          mt={20}
        >
          <Flex
            flexDir={'column'}
            justify={'center'}
            alignItems={'center'}
            h={'auto'}
          >
            {/* <Image src={clienteImagem} alt="logo" width={'auto'} h={'135px'} /> */}
            <Image
              src={clienteImagem || '/default-profile.png'} // Use a URL da imagem ou uma imagem padrão
              alt="Foto de perfil"
              width="135px"
              height="135px"
              borderWidth={1}
              borderColor={'gray.500'}
              borderStyle={'solid'}
              borderRadius="50%" // Para torná-la redonda
            />
            <Flex flexDirection="column" mb={4}>
              <label htmlFor="imageUpload">
                <Button
                  as="span"
                  colorScheme="green"
                  size="sm"
                  cursor={'pointer'}
                  mt={3}
                  isLoading={progresspercent > 0 && progresspercent !== 100}
                >
                  {progresspercent === 100 ? 'Upload Completo' : 'Alterar Foto'}
                </Button>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept=".png,.jpg,.jpeg"
                style={{ display: 'none' }}
                onChange={handleProfileImageUpload} // Função de upload
              />
            </Flex>
            {progresspercent === 100 ? (
              // <Text>Upload Completo!</Text>
              <></>
            ) : (
              progresspercent > 0 &&
              progresspercent < 100 && (
                <Flex direction="column" alignItems="center" mt={3}>
                  <Text>Progresso: {progresspercent}%</Text>
                  <Progress
                    value={progresspercent}
                    size="xs"
                    colorScheme="green"
                    width="100%"
                  />
                </Flex>
              )
            )}
          </Flex>

          <Flex flexDir="column">
            <Flex justifyContent={'space-between'} gap={4} mb={3}>
              <Input
                name="nome"
                type="text"
                label="Nome Completo"
                w={750}
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
              <InputMask
                mask="99/99/9999" // Máscara de data
                value={dataNascimento}
                onChange={e => setDataNascimento(e.target.value)}
              >
                {(inputProps: any) => (
                  <Input
                    {...inputProps}
                    name="dataNasc"
                    type="text"
                    label="Data Nascimento"
                  />
                )}
              </InputMask>
            </Flex>
            <Flex justifyContent={'space-between'} gap={4} mb={3}>
              <Input
                name="email"
                type="email"
                label="E-mail"
                w={500}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Input
                name="telefone"
                type="text"
                label="Telefone"
                value={telefone}
                onChange={e => setTelefone(e.target.value)}
              />
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> }
                }) => setCpf(e.target.value)}
              >
                {(inputProps: any) => (
                  <Input
                    name="cpf"
                    type="text"
                    label="CPF"
                    // color={color}
                    {...inputProps}
                  />
                )}
              </InputMask>
            </Flex>
            <Flex justifyContent={'space-between'} gap={4} mb={3}>
              <Input
                name="Rua"
                type="text"
                label="Rua"
                value={enderecos[0]?.rua}
                onChange={e =>
                  setEnderecos([{ ...enderecos[0], rua: e.target.value }])
                }
              />
              <Input
                name="numero"
                type="text"
                label="Número"
                value={enderecos[0]?.numero}
                onChange={e =>
                  setEnderecos([{ ...enderecos[0], numero: e.target.value }])
                }
              />
            </Flex>
            <Flex justifyContent={'space-between'} gap={4} mb={3}>
              <Input
                name="bairro"
                type="text"
                label="Bairro"
                value={enderecos[0]?.bairro}
                onChange={e =>
                  setEnderecos([{ ...enderecos[0], bairro: e.target.value }])
                }
              />
              <Input
                name="complemento"
                type="text"
                label="Complemento"
                value={enderecos[0]?.complemento}
                onChange={e =>
                  setEnderecos([
                    { ...enderecos[0], complemento: e.target.value },
                  ])
                }
              />
              <InputMask
                mask="99999-999" // Máscara do CEP
                value={enderecos[0]?.cep}
                onChange={e =>
                  setEnderecos([{ ...enderecos[0], cep: e.target.value }])
                }
              >
                {(inputProps: any) => (
                  <Input {...inputProps} name="cep" type="text" label="CEP" />
                )}
              </InputMask>
            </Flex>
            <Flex justifyContent={'space-between'} gap={4} mb={3}>
              <Input
                name="cidade"
                type="text"
                label="Cidade"
                value={enderecos[0]?.cidade}
                onChange={e =>
                  setEnderecos([{ ...enderecos[0], cidade: e.target.value }])
                }
              />
              <Input
                name="uf"
                type="text"
                label="UF"
                maxLength={2}
                min={2}
                value={enderecos[0]?.estado}
                onChange={e =>
                  setEnderecos([
                    { ...enderecos[0], estado: e.target.value.toUpperCase() },
                  ])
                }
              />
              <Input
                name="pais"
                type="text"
                label="País"
                value={'Brasil'}
                isReadOnly
                isDisabled
              />
            </Flex>
            <Flex alignItems={'center'} justifyContent={'end'} gap={5} mt={3}>
              {token && (
                <Btn
                  isLoading={loadingPlan} // Passando o estado de carregamento
                  onClick={handlePlanToggle}
                  type={isClient ? 22 : 23}
                >
                  {isClient ? 'Ativar Plano' : 'Desativar Plano'}
                </Btn>
              )}
              <Button
                alignItems={'center'}
                w={140}
                type="button"
                onClick={handleEditing}
                // mt="6"
                colorScheme="green"
                bg={theme.colors.green[700]}
                // size="lg"
                isLoading={loadingButton}
                color={theme.colors.gray[100]}
              >
                Salvar
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
