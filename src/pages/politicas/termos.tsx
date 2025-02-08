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

          {/* <Text fontSize="1rem" fontWeight="medium" textAlign="center" mb={6}>
            Última Atualização: [02/08/2025]
          </Text> */}
          {[
            {
              title: 'ACEITAÇÃO DOS TERMOS',
              content:
                'Ao acessar ou utilizar os serviços da OrganiConecta, você concorda com estes Termos de Serviço. Caso não concorde com algum dos termos, recomendamos que não utilize a plataforma.',
            },
            {
              title: 'SERVIÇOS OFERECIDOS',
              content:
                'A OrganiConecta atua como intermediária entre produtores de produtos orgânicos e consumidores. Nossa plataforma permite a comercialização de produtos frescos, fornecendo informações sobre origem, qualidade e boas práticas de cultivo.',
            },
            {
              title: 'CADASTRO E CONTA DO USUÁRIO',
              content:
                'Para utilizar a plataforma, é necessário realizar um cadastro com informações verdadeiras e atualizadas. O usuário é responsável pela segurança de sua conta, incluindo login e senha.',
            },
            {
              title: 'RESPONSABILIDADES DOS USUÁRIOS',
              content:
                'Os produtores cadastrados devem garantir a qualidade e a procedência dos produtos oferecidos.Os consumidores são responsáveis por verificar as informações do produto antes da compra. O uso indevido da plataforma pode resultar na exclusão da conta do usuário.',
            },
            {
              title: 'PAGAMENTOS E TRANSAÇÕES',
              content:
                'As transações são realizadas dentro da plataforma de forma segura.A OrganiConecta não se responsabiliza por pagamentos realizados fora do ambiente seguro da plataforma.',
            },
            {
              title: 'POLÍTICA DE CANCELAMENTO E REEMBOLSO',
              content:
                'O consumidor tem direito a cancelamento e reembolso conforme as normas de consumo vigentes. Em caso de problemas com a qualidade do produto, o consumidor deve entrar em contato com o suporte dentro do prazo estabelecido.',
            },
            {
              title: 'PROTEÇÃO DE DADOS E PRIVACIDADE',
              content:
                'Todos os dados fornecidos pelos usuários são protegidos conforme nossa Política de Privacidade.Nenhuma informação será compartilhada com terceiros sem o devido consentimento.',
            },
            {
              title: 'MODIFICAÇÕES DOS TERMOS',
              content:
                'A OrganiConecta pode alterar estes termos a qualquer momento, sendo responsabilidade do usuário verificá-los periodicamente.',
            },
            {
              title: 'CONTATO',
              content:
                'Para qualquer dúvida ou solicitação, entre em contato com nosso suporte através do e-mail: organiconecta@gmail.com.',
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
