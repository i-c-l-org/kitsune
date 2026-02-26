import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import { getButtonClasses } from "../components/ui/buttonStyles";

export const metadata: Metadata = {
  title: "Política de Privacidade - Galeria I.C.L",
  description: "Política de privacidade completa em conformidade com a LGPD",
};

export default function PoliticaDePrivacidadePage(): React.ReactElement {
  return (
    <Container max="xl" className="p-5 pb-20">
      <header className="maxW1400 shadowHeader mx-auto mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--vscode-border)] bg-[var(--vscode-editor)] px-4 py-6 backdrop-blur-md">
        <h1 className="m-0 flex items-center gap-2 font-mono text-lg font-semibold text-[var(--text-bright)]">
          <i className="fas fa-user-shield" /> Política de Privacidade
        </h1>
        <Link
          href="/"
          className={getButtonClasses("secondary", "md")}
          title="Voltar para Home"
        >
          <i className="fas fa-arrow-left" /> <span>Voltar para Home</span>
        </Link>
      </header>

      <Card as="section" className="mx-auto max-w-[1100px] leading-relaxed">
        <p className="text-sm text-[var(--text-secondary)]">
          Última atualização: <strong>11/01/2026</strong>
        </p>

        <div className="mt-4 rounded-lg border border-petrol-700 bg-petrol-950/20 p-4">
          <p className="text-sm text-[var(--text-secondary)]">
            Esta Política de Privacidade está em conformidade com a{" "}
            <strong>
              Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)
            </strong>{" "}
            e descreve como coletamos, usamos, armazenamos e protegemos seus
            dados pessoais.
          </p>
        </div>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          1. Visão Geral
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          A Galeria I.C.L (&quot;nós&quot;, &quot;nosso&quot;) respeita sua
          privacidade e está comprometida em proteger seus dados pessoais. Esta
          Política explica como tratamos informações quando você acessa e
          utiliza nosso Serviço.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          2. Dados que Coletamos
        </h2>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          2.1. Dados de Navegação (Logs)
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">
          Como qualquer site, coletamos automaticamente dados técnicos durante
          sua visita:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>
            <strong>Endereço IP</strong> (anonimizado para proteção de
            privacidade)
          </li>
          <li>
            <strong>Tipo de navegador</strong> (Chrome, Firefox, Safari, etc.)
          </li>
          <li>
            <strong>Sistema operacional</strong> (Windows, macOS, Linux,
            Android, iOS)
          </li>
          <li>
            <strong>Data e hora de acesso</strong>
          </li>
          <li>
            <strong>Páginas visitadas</strong> e tempo de permanência
          </li>
          <li>
            <strong>Referrer</strong> (de onde você veio)
          </li>
        </ul>
        <p className="mt-2 text-[var(--text-secondary)]">
          <strong>Base legal:</strong> Legítimo interesse (Art. 7º, IX da LGPD)
          para segurança, análise de desempenho e melhoria do Serviço.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          2.2. Cookies e Tecnologias Similares
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">
          Utilizamos cookies essenciais e de analytics para:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>
            <strong>Cookies funcionais:</strong> Necessários para o
            funcionamento básico do site
          </li>
          <li>
            <strong>Cookies de analytics:</strong> Para entender como os
            visitantes usam o site (via Vercel Analytics)
          </li>
          <li>
            <strong>Cookies de performance:</strong> Para melhorar velocidade e
            estabilidade (via Vercel Speed Insights)
          </li>
        </ul>
        <p className="mt-2 text-[var(--text-secondary)]">
          <strong>Você pode desabilitar cookies</strong> nas configurações do
          seu navegador, mas isso pode afetar a funcionalidade do site.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          2.3. Dados de APIs Públicas
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">
          Quando você utiliza badges dinâmicos (GitHub Stats, Languages),
          acessamos publicamente:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>
            <strong>Username do GitHub</strong> (informação pública fornecida
            por você na URL)
          </li>
          <li>
            <strong>Estatísticas públicas</strong> do perfil GitHub (commits,
            repos, seguidores)
          </li>
        </ul>
        <p className="mt-2 text-[var(--text-secondary)]">
          <strong>Importante:</strong> Não armazenamos credenciais ou dados
          privados do GitHub. Apenas consultamos APIs públicas.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          2.4. Contador de Visitantes
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">
          Para badges de visitantes, armazenamos temporariamente no Redis
          (Upstash):
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>
            <strong>Identificador único anonimizado</strong> (hash do IP + User
            Agent)
          </li>
          <li>
            <strong>Contador numérico</strong> de visitas
          </li>
          <li>
            <strong>Data da última visita</strong>
          </li>
        </ul>
        <p className="mt-2 text-[var(--text-secondary)]">
          Esses dados são{" "}
          <strong>automaticamente deletados após 30 dias</strong>.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          3. Como Usamos os Dados
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          Utilizamos os dados coletados para:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>
            <strong>Fornecer o Serviço:</strong> Gerar badges, exibir
            estatísticas, contar visitantes
          </li>
          <li>
            <strong>Melhorar performance:</strong> Otimizar velocidade e cache
          </li>
          <li>
            <strong>Análise de uso:</strong> Entender quais recursos são mais
            utilizados
          </li>
          <li>
            <strong>Segurança:</strong> Prevenir abuso, ataques DDoS e
            atividades maliciosas
          </li>
          <li>
            <strong>Manutenção técnica:</strong> Diagnosticar e corrigir
            problemas
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          4. Compartilhamento de Dados
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          <strong>Não vendemos, alugamos ou compartilhamos</strong> seus dados
          pessoais com terceiros para fins de marketing.
        </p>
        <p className="mt-2 text-[var(--text-secondary)]">
          Compartilhamos dados apenas com provedores de serviço essenciais:
        </p>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          4.1. Vercel (Hospedagem)
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">
          Nosso site é hospedado na <strong>Vercel Inc.</strong> (EUA). A Vercel
          pode processar dados de logs e telemetria conforme sua{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="linkAccent underline-offset-2 hover:underline"
          >
            Política de Privacidade
          </a>
          .
        </p>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          4.2. Upstash Redis (Banco de Dados)
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">
          Utilizamos <strong>Upstash</strong> para armazenar cache e contadores.
          Dados são armazenados de forma anonimizada e temporária.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          4.3. GitHub API
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">
          Acessamos a API pública do GitHub para estatísticas. Não
          compartilhamos dados com o GitHub além da consulta pública.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          5. Armazenamento e Segurança
        </h2>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          5.1. Localização dos Dados
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">
          Dados podem ser processados e armazenados em servidores localizados
          nos <strong>Estados Unidos</strong> (Vercel, Upstash). Esses
          provedores possuem certificações de segurança e conformidade
          internacionais.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          5.2. Medidas de Segurança
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">
          Implementamos medidas técnicas como:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>
            <strong>HTTPS/TLS:</strong> Criptografia de dados em trânsito
          </li>
          <li>
            <strong>Rate limiting:</strong> Proteção contra abuso de APIs
          </li>
          <li>
            <strong>Anonimização:</strong> IPs e identificadores são hasheados
          </li>
          <li>
            <strong>Expiração automática:</strong> Dados temporários são
            deletados após 30 dias
          </li>
        </ul>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          5.3. Retenção de Dados
        </h3>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>
            <strong>Logs de acesso:</strong> Mantidos por até 90 dias
          </li>
          <li>
            <strong>Contadores de visitantes:</strong> 30 dias
          </li>
          <li>
            <strong>Cache de APIs:</strong> 24 horas
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          6. Seus Direitos (LGPD)
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          De acordo com a LGPD (Art. 18), você tem direito a:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>
            <strong>Confirmação de tratamento:</strong> Saber se processamos
            seus dados
          </li>
          <li>
            <strong>Acesso aos dados:</strong> Solicitar cópia dos dados que
            temos sobre você
          </li>
          <li>
            <strong>Correção:</strong> Corrigir dados incompletos ou
            desatualizados
          </li>
          <li>
            <strong>Anonimização ou bloqueio:</strong> Tornar dados anônimos ou
            bloqueá-los
          </li>
          <li>
            <strong>Eliminação:</strong> Deletar dados desnecessários ou
            tratados sem conformidade
          </li>
          <li>
            <strong>Portabilidade:</strong> Receber dados em formato estruturado
          </li>
          <li>
            <strong>Oposição:</strong> Opor-se ao tratamento de dados
          </li>
          <li>
            <strong>Revogação de consentimento:</strong> Quando aplicável
          </li>
        </ul>
        <p className="mt-2 text-[var(--text-secondary)]">
          Para exercer esses direitos, entre em contato através dos canais
          disponíveis no rodapé do site.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          7. Menores de Idade
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          Nosso Serviço não é direcionado a menores de 13 anos. Não coletamos
          intencionalmente dados de crianças. Se você é pai/mãe ou responsável e
          acredita que seu filho forneceu dados, entre em contato conosco.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          8. Links de Terceiros
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          Nosso Site pode conter links para sites de terceiros (GitHub,
          documentações, etc.). Não somos responsáveis pelas práticas de
          privacidade desses sites. Recomendamos ler suas políticas.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          9. Transferência Internacional de Dados
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          Seus dados podem ser transferidos e processados fora do Brasil (EUA),
          onde estão localizados nossos provedores de infraestrutura. Garantimos
          que essas transferências seguem os requisitos da LGPD (Art. 33),
          através de:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>Provedores com certificações de segurança reconhecidas</li>
          <li>Cláusulas contratuais padrão de proteção de dados</li>
          <li>Anonimização e minimização de dados</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          10. Alterações a Esta Política
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          Podemos atualizar esta Política periodicamente. Alterações
          significativas serão comunicadas através de aviso no Site. A data da
          &quot;Última atualização&quot; no topo indica a versão mais recente.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          11. Base Legal para Tratamento (LGPD)
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          Processamos dados pessoais com base nas seguintes hipóteses legais
          (Art. 7º da LGPD):
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>
            <strong>Legítimo interesse</strong> (IX) - Para analytics, segurança
            e melhoria do Serviço
          </li>
          <li>
            <strong>Execução de contrato</strong> (V) - Para fornecer badges e
            recursos solicitados
          </li>
          <li>
            <strong>Cumprimento de obrigação legal</strong> (II) - Quando
            exigido por lei
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          12. Encarregado de Dados (DPO)
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          Para questões relacionadas à proteção de dados pessoais, entre em
          contato através dos canais oficiais disponíveis no rodapé do site
          (GitHub ou WhatsApp).
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          13. Reclamações à ANPD
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          Você tem o direito de apresentar reclamação à{" "}
          <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong> caso
          considere que o tratamento de seus dados viola a LGPD.
        </p>
        <p className="mt-2 text-[var(--text-secondary)]">
          Site da ANPD:{" "}
          <a
            href="https://www.gov.br/anpd/"
            target="_blank"
            rel="noopener noreferrer"
            className="linkAccent underline-offset-2 hover:underline"
          >
            www.gov.br/anpd
          </a>
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          14. Contato
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          Para dúvidas, solicitações ou exercício de direitos relacionados a
          esta Política de Privacidade, entre em contato através dos canais
          disponíveis no rodapé do Site (GitHub ou WhatsApp).
        </p>

        <div className="mt-10 rounded-lg border border-petrol-700 bg-petrol-950/20 p-4">
          <p className="text-sm text-[var(--text-secondary)]">
            <strong>Compromisso:</strong> Estamos comprometidos em proteger sua
            privacidade e garantir a transparência no tratamento de dados
            pessoais, em total conformidade com a LGPD.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/termos-de-uso"
            className={getButtonClasses("secondary", "md")}
          >
            <i className="fas fa-file-contract" /> Termos de Uso
          </Link>
          <Link href="/galeria" className={getButtonClasses("secondary", "md")}>
            <i className="fas fa-images" /> Ir para Galeria
          </Link>
        </div>
      </Card>
    </Container>
  );
}
