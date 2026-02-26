import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import { getButtonClasses } from "../components/ui/buttonStyles";

export const metadata: Metadata = {
  title: "Termos de Uso - Galeria I.C.L",
  description: "Termos de uso completos da Galeria I.C.L",
};

export default function TermosDeUsoPage(): React.ReactElement {
  return (
    <Container max="xl" className="p-5 pb-20">
      <header className="maxW1400 shadowHeader mx-auto mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--vscode-border)] bg-[var(--vscode-editor)] px-4 py-6 backdrop-blur-md">
        <h1 className="m-0 flex items-center gap-2 font-mono text-lg font-semibold text-[var(--text-bright)]">
          <i className="fas fa-file-contract" /> Termos de Uso
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

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          1. Aceitação dos Termos
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          Ao acessar e utilizar a Galeria I.C.L (&quot;Serviço" ,
          &quot;Site&quot;, &quot;Plataforma&quot;), você concorda em cumprir e
          estar vinculado a estes Termos de Uso. Se você não concordar com
          qualquer parte destes termos, não deverá utilizar este Serviço.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          2. Descrição do Serviço
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          A Galeria I.C.L é uma plataforma educativa e gratuita que
          disponibiliza recursos visuais (SVGs, badges, banners) para uso em
          projetos de código aberto, perfis do GitHub, READMEs e documentações
          técnicas. O Serviço também oferece um blog com conteúdo educativo
          sobre desenvolvimento de software.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          3. Licença e Propriedade Intelectual
        </h2>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          3.1. Licença MIT
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">
          O projeto é disponibilizado sob a <strong>Licença MIT</strong>,
          permitindo uso livre, comercial ou não, com as seguintes condições:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>
            Você pode usar, copiar, modificar, mesclar, publicar e distribuir
          </li>
          <li>
            Deve incluir o aviso de copyright e licença em todas as cópias
          </li>
          <li>
            O software é fornecido &quot;como está&quot;, sem garantias de
            qualquer tipo
          </li>
        </ul>
        <p className="mt-2 text-[var(--text-secondary)]">
          Para o texto completo da licença, consulte{" "}
          <a
            href="/LICENSE.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="linkAccent underline-offset-2 hover:underline"
          >
            LICENSE.txt
          </a>
          .
        </p>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          3.2. Marcas de Terceiros
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">
          Os logos, nomes e marcas de linguagens de programação, frameworks,
          ferramentas e tecnologias exibidos nos badges são propriedade de seus
          respectivos detentores. Seu uso neste Serviço é meramente descritivo e
          informativo, sob o princípio de <em>fair use</em> (uso justo).{" "}
          <strong>Não temos afiliação, patrocínio, parceria ou endosso</strong>{" "}
          com ou de qualquer uma dessas marcas.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          4. Uso Aceitável
        </h2>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          4.1. Condutas Permitidas
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">Você pode:</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>
            Baixar e usar os recursos visuais em seus projetos pessoais ou
            comerciais
          </li>
          <li>Modificar e adaptar os recursos para suas necessidades</li>
          <li>
            Incorporar badges e banners em READMEs, portfólios e documentações
          </li>
          <li>Compartilhar links para o Serviço com outros desenvolvedores</li>
        </ul>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          4.2. Condutas Proibidas
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">Você não pode:</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>Usar o Serviço para fins ilegais ou não autorizados</li>
          <li>
            Tentar hackear, sobrecarregar ou prejudicar a infraestrutura do Site
          </li>
          <li>Coletar dados de outros usuários sem consentimento</li>
          <li>
            Remover avisos de copyright ou atribuições quando exigido pela
            licença
          </li>
          <li>Fazer-se passar pelo projeto ou seus mantenedores</li>
          <li>
            Usar recursos para criar conteúdo ofensivo, discriminatório ou
            ilegal
          </li>
          <li>Violar direitos de propriedade intelectual de terceiros</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          5. APIs e Serviços de Terceiros
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          O Serviço pode integrar-se com APIs de terceiros, incluindo mas não
          limitado a:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>
            <strong>GitHub API</strong> - para estatísticas de repositórios
          </li>
          <li>
            <strong>Upstash Redis</strong> - para cache e contadores de
            visitantes
          </li>
          <li>
            <strong>Vercel Analytics</strong> - para métricas de desempenho
          </li>
        </ul>
        <p className="mt-2 text-[var(--text-secondary)]">
          O uso desses serviços está sujeito aos seus respectivos termos e
          políticas de privacidade.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          6. Disponibilidade e Modificações
        </h2>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          6.1. Disponibilidade
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">
          Embora nos esforcemos para manter o Serviço disponível 24/7, não
          garantimos disponibilidade ininterrupta. Podemos realizar manutenções,
          atualizações ou enfrentar problemas técnicos que afetem
          temporariamente o acesso.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          6.2. Modificações
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">
          Reservamo-nos o direito de modificar, suspender ou descontinuar
          qualquer aspecto do Serviço a qualquer momento, com ou sem aviso
          prévio. Podemos adicionar, remover ou alterar recursos, conteúdos e
          funcionalidades.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          7. Isenção de Garantias
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          O SERVIÇO É FORNECIDO &quot;COMO ESTÁ&quot; E &quot;CONFORME
          DISPONÍVEL&quot;, SEM GARANTIAS DE QUALQUER TIPO, EXPRESSAS OU
          IMPLÍCITAS, INCLUINDO MAS NÃO LIMITADO A:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>Garantias de comercialização</li>
          <li>Adequação a um propósito específico</li>
          <li>Não violação de direitos de terceiros</li>
          <li>Precisão, confiabilidade ou completude do conteúdo</li>
          <li>Ausência de erros, vírus ou outros componentes prejudiciais</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          8. Limitação de Responsabilidade
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          EM NENHUMA CIRCUNSTÂNCIA OS MANTENEDORES, COLABORADORES OU AFILIADOS
          SERÃO RESPONSÁVEIS POR:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>
            Danos diretos, indiretos, incidentais, especiais ou consequenciais
          </li>
          <li>Perda de lucros, dados, uso ou outras perdas intangíveis</li>
          <li>
            Interrupção de negócios resultante do uso ou impossibilidade de usar
            o Serviço
          </li>
          <li>Conteúdo de terceiros acessado através do Serviço</li>
        </ul>
        <p className="mt-2 text-[var(--text-secondary)]">
          Esta limitação aplica-se independentemente da teoria legal (contrato,
          responsabilidade civil, negligência ou outro), mesmo se avisados sobre
          a possibilidade de tais danos.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          9. Indenização
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          Você concorda em indenizar e isentar os mantenedores do projeto,
          colaboradores e parceiros de quaisquer reclamações, danos, obrigações,
          perdas, responsabilidades, custos ou dívidas, e despesas (incluindo
          honorários advocatícios) resultantes de:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--text-secondary)]">
          <li>Seu uso e acesso ao Serviço</li>
          <li>Sua violação destes Termos de Uso</li>
          <li>Violação de quaisquer direitos de terceiros</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          10. Privacidade e Proteção de Dados
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          O tratamento de dados pessoais é regido por nossa{" "}
          <Link
            href="/politica-de-privacidade"
            className="linkAccent underline-offset-2 hover:underline"
          >
            Política de Privacidade
          </Link>
          , que está em conformidade com a Lei Geral de Proteção de Dados (LGPD
          - Lei nº 13.709/2018).
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          11. Lei Aplicável e Jurisdição
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          Estes Termos de Uso serão regidos e interpretados de acordo com as
          leis da República Federativa do Brasil, sem considerar seus conflitos
          de disposições legais. Qualquer disputa relacionada a estes termos
          será submetida à jurisdição exclusiva dos tribunais brasileiros.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          12. Alterações aos Termos
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          Reservamo-nos o direito de modificar estes Termos de Uso a qualquer
          momento. Alterações significativas serão comunicadas através de aviso
          no Site. O uso continuado do Serviço após tais modificações constitui
          sua aceitação dos novos termos.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          13. Disposições Gerais
        </h2>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          13.1. Acordo Integral
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">
          Estes Termos de Uso, juntamente com a Política de Privacidade,
          constituem o acordo integral entre você e o projeto Galeria I.C.L OSS.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          13.2. Independência das Cláusulas
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">
          Se qualquer disposição destes Termos for considerada inválida ou
          inexequível, as demais disposições permanecerão em pleno vigor e
          efeito.
        </p>

        <h3 className="mt-4 text-lg font-semibold text-[var(--text-bright)]">
          13.3. Renúncia
        </h3>
        <p className="mt-2 text-[var(--text-secondary)]">
          A falha em exercer ou fazer valer qualquer direito ou disposição
          destes Termos não constituirá renúncia a tal direito ou disposição.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[var(--text-bright)]">
          14. Contato
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          Para questões sobre estes Termos de Uso, entre em contato através dos
          canais disponíveis no rodapé do Site (GitHub ou WhatsApp).
        </p>

        <div className="mt-10 rounded-lg border border-petrol-700 bg-petrol-950/20 p-4">
          <p className="text-sm text-[var(--text-secondary)]">
            <strong>Importante:</strong> Ao utilizar este Serviço, você declara
            ter lido, compreendido e concordado com todos os termos e condições
            aqui estabelecidos.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/politica-de-privacidade"
            className={getButtonClasses("secondary", "md")}
          >
            <i className="fas fa-user-shield" /> Política de Privacidade
          </Link>
          <Link href="/galeria" className={getButtonClasses("secondary", "md")}>
            <i className="fas fa-images" /> Ir para Galeria
          </Link>
        </div>
      </Card>
    </Container>
  );
}
