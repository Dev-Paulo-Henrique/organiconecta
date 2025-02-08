import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react'
import { Header } from '~components/Header'
import { Title } from '~components/Title'
import { Footer } from '~components/Footer'

export default function PoliticaPrivacidade() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'gray.100')
  return (
    <Box bg={bg}>
      <Header />
      <Title />
      <Flex p={7} flexDirection="column" maxW="800px" mx="auto">
        <Text fontSize="1.5rem" fontWeight="bold" textAlign="center" mb={4}>
          POLÍTICA DE PRIVACIDADE DA ORGANICONECTA
        </Text>

        {/* <Text fontSize="1rem" fontWeight="medium" textAlign="center" mb={6}>
          Última Atualização: [02/08/2025]
        </Text> */}
        {[
          {
            title: 'ACEITAÇÃO DOS TERMOS',
            content:
              'A OrganiConecta se compromete a proteger a privacidade e os dados pessoais de seus usuários. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações ao utilizar nossa plataforma.',
          },
          {
            title: 'INFORMAÇÕES COLETADAS',
            content:
              'Podemos coletar os seguintes tipos de informações quando você utiliza nossos serviços:\n\nInformações pessoais: Nome, e-mail, telefone, endereço, CPF (quando necessário para transações).\nInformações de uso: Dados sobre como você interage com a plataforma, incluindo preferências e histórico de navegação.\nDados de pagamento: Informações bancárias e transações realizadas dentro da plataforma (protegidas por protocolos de segurança).\nCookies e tecnologias de rastreamento: Utilizamos cookies para melhorar sua experiência e otimizar nossos serviços.',
          },
          {
            title: 'USO DAS INFORMAÇÕES',
            content:
              'Os dados coletados são utilizados para:\n\n✔ Fornecer, operar e melhorar nossos serviços.\n✔ Personalizar sua experiência na plataforma.\n✔ Processar pagamentos e garantir a segurança das transações.\n✔ Enviar comunicações importantes, como atualizações e suporte ao cliente.\n✔ Cumprir obrigações legais e regulatórias.',
          },
          {
            title: 'COMPARTILHAMENTO DE DADOS',
            content:
              'A OrganiConecta NÃO vende ou compartilha seus dados pessoais com terceiros, exceto:\n\n✅ Parceiros e prestadores de serviço: Para processar pagamentos e otimizar a experiência na plataforma.\n✅ Autoridades legais: Quando exigido por lei ou para proteger direitos e segurança.\n\nTodos os dados são protegidos por contratos e medidas de segurança rigorosas.',
          },
          {
            title: 'SEGURANÇA DOS DADOS',
            content:
              'Adotamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acessos não autorizados, vazamentos ou usos indevidos. Entre as práticas adotadas estão:\n\n🔒 Criptografia de dados em transações.\n🔒 Acesso restrito a informações sensíveis.\n🔒 Monitoramento contínuo contra ameaças digitais.',
          },
          {
            title: 'DIREITOS DOS USUÁRIOS',
            content:
              'Você tem direito a:\n\n✔ Acessar, corrigir ou excluir seus dados pessoais.\n✔ Solicitar informações sobre como usamos seus dados.\n✔ Revogar consentimentos concedidos anteriormente.\n\nPara exercer seus direitos, entre em contato pelo e-mail: suporte@organiconecta.com',
          },
          {
            title: 'COOKIES E TECNOLOGIAS SEMELHANTES',
            content:
              'Utilizamos cookies para:\n\n🍪 Melhorar sua experiência de navegação.\n🍪 Personalizar conteúdo e anúncios.\n🍪 Analisar métricas de desempenho da plataforma.\n\nVocê pode gerenciar suas preferências de cookies diretamente no navegador.',
          },
          {
            title: 'ALTERAÇÕES NESTA POLÍTICA',
            content:
              'A OrganiConecta pode atualizar esta Política de Privacidade periodicamente. Recomendamos que você revise este documento regularmente.\n\nSe houver mudanças significativas, notificaremos você por e-mail ou na plataforma.',
          },
          {
            title: 'CONTATO',
            content:
              'Se tiver dúvidas ou precisar de suporte sobre esta Política de Privacidade, entre em contato conosco:\n\n📧 E-mail: organiconecta@gmail.com\n🌍 Site: https://lcl507.wixsite.com/organiconecta',
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
  )
}
