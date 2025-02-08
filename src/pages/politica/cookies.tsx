import { Box, Text, Flex } from '@chakra-ui/react'
import { useColorModeValue } from '~components/ui/color-mode'
import { Footer } from '~components/Footer'
import { Header } from '~components/Header'
import { Title } from '~components/Title'
import theme from '~styles/theme'

export default function TermoSevicos() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')

  return (
    <>
      <Box bg={bg}>
        <Header />
        <Title />
        <Flex p={7} flexDirection="column" maxW="800px" mx="auto">
          <Text fontSize="1.5rem" fontWeight="bold" textAlign="center" mb={4}>
            TERMO DE SERVIÇOS DA ORGANICONECTA
          </Text>

          <Text fontSize="1rem" fontWeight="medium" textAlign="center" mb={6}>
            Última Atualização: [02/08/2025]
          </Text>
          {[
            {
              title: 'ACEITAÇÃO DOS TERMOS',
              content:
                'Ao continuar navegando em nossa plataforma, você concorda com o uso de cookies conforme descrito nesta Política. Caso não concorde, você pode ajustar as configurações de cookies no seu navegador ou sair da plataforma.',
            },
            {
              title: 'O QUE SÃO COOKIES?',
              content:
                'Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo (computador, celular, tablet, etc.) quando você acessa nosso site. Eles permitem que a plataforma se lembre de suas ações e preferências durante um período de tempo, tornando sua navegação mais eficiente.',
            },
            {
              title: 'COMO UTILIZAMOS OS COOKIES?',
              content:
                'A OrganiConecta utiliza cookies para melhorar a experiência de navegação, personalizar conteúdo e anúncios, e analisar o desempenho da plataforma, visando aprimorar continuamente nossos serviços.',
            },
            {
              title: 'COOKIES DE TERCEIROS',
              content:
                'Podemos utilizar cookies de terceiros para nos ajudar a analisar o desempenho de nossa plataforma e exibir anúncios personalizados. Esses cookies podem ser utilizados por plataformas como Google, Facebook, entre outros.',
            },
            {
              title: 'GERENCIAMENTO DE COOKIES',
              content:
                'Você pode gerenciar suas preferências de cookies a qualquer momento, diretamente em seu navegador. A maioria dos navegadores permite bloquear ou apagar cookies, mas ao desativá-los, algumas funcionalidades da nossa plataforma podem ser limitadas.',
            },
            {
              title: 'CONSENTIMENTO',
              content:
                'Ao continuar navegando em nossa plataforma, você concorda com o uso de cookies conforme descrito nesta Política. Caso não concorde, você pode ajustar as configurações de cookies no seu navegador ou sair da plataforma.',
            },
            {
              title: 'ALTERAÇÕES NA POLÍTICA DE COOKIES',
              content:
                'A OrganiConecta pode atualizar esta Política de Cookies periodicamente. Recomendamos que você revise este documento regularmente. Se houver alterações significativas, notificaremos você por e-mail ou na plataforma.',
            },
            {
              title: 'CONTATO',
              content:
                'Se tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco através do e-mail: organiconecta@gmail.com ou no nosso site: [https://lcl507.wixsite.com/organiconecta]',
            },
            {
              title: 'OrganiConecta - Ligando Você ao Melhor da Natureza.',
              content:
                'Agradecemos por escolher a OrganiConecta! Juntos, promovemos uma alimentação mais saudável e consciente.',
            },
          ].map((section, index) => (
            <Flex key={index} flexDirection="column" mb={6}>
              <Text fontSize="1.2rem" fontWeight="bold" color={color} mb={2}>
                {section.title}
              </Text>
              <Text fontSize="1rem" color={color}>
                {section.content}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Footer />
      </Box>
    </>
  )
}
