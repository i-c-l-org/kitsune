import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { getButtonClasses } from "../components/ui/buttonStyles";

export const metadata: Metadata = {
  title: "Parceria - Galeria I.C.L",
  description:
    "Conheça o projeto open source e saiba como colaborar com a I.C.L",
};

export default function ParceriasPage(): React.ReactElement {
  return (
    <Container max="xl" className="p-5 pb-20">
      <header className="maxW1400 shadowHeader mx-auto mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--vscode-border)] bg-[var(--vscode-editor)] px-4 py-6 backdrop-blur-md">
        <h1 className="m-0 flex items-center gap-2 font-mono text-lg font-semibold text-[var(--text-bright)]">
          <i className="fas fa-handshake" /> Parceria
        </h1>
        <Link
          href="/"
          className={getButtonClasses("secondary", "md")}
          title="Voltar para Home"
        >
          <i className="fas fa-arrow-left" /> <span>Voltar para Home</span>
        </Link>
      </header>

      {/* Introdução */}
      <Card
        as="section"
        className="mx-auto mb-8 max-w-[1100px] leading-relaxed"
      >
        <div className="text-center">
          <i className="fas fa-rocket icon2xl mb-4 text-[var(--accent-primary)]" />
          <h2 className="mb-4 text-2xl font-semibold text-[var(--text-bright)]">
            Colaboração Estratégica
          </h2>
          <p className="text-[var(--text-secondary)]">
            A I.C.L valoriza parcerias que impulsionam a inovação no ecossistema
            open source. Se você representa uma empresa, comunidade ou é um
            desenvolvedor independente interessado em colaborar, entre em
            contato para discutirmos oportunidades.
          </p>
        </div>
      </Card>

      {/* Projetos em Destaque */}
      <section className="mx-auto mb-10 max-w-[1100px]">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-[var(--text-bright)]">
          <i className="fas fa-code-branch text-[var(--accent-tertiary)]" />
          Portfólio Open Source
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Projeto Galeria */}
          <Card as="article" className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <i className="fas fa-images text-2xl text-[var(--accent-tertiary)]" />
                <div>
                  <h3 className="m-0 text-lg font-semibold text-[var(--text-bright)]">
                    Galeria I.C.L
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    galeria-icl
                  </p>
                </div>
              </div>
              <Badge>
                <i className="fas fa-star iconWithMarginRight" /> Open Source
              </Badge>
            </div>

            <p className="text-[var(--text-secondary)]">
              Coleção de SVGs animados, banners profissionais e badges modernos
              para perfis do GitHub. Recursos gratuitos e educativos para
              desenvolvedores.
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge className="badgeSecondary">
                <i className="fab fa-react iconWithMarginRight" /> Next.js
              </Badge>
              <Badge className="badgeSecondary">
                <i className="fab fa-css3-alt iconWithMarginRight" /> Tailwind
              </Badge>
              <Badge className="badgeSecondary">
                <i className="fas fa-vector-square iconWithMarginRight" /> SVG
              </Badge>
            </div>

            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              <Button
                href="https://github.com/icl/galeria"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
              >
                <i className="fab fa-github iconWithMarginRight" /> Repositório
              </Button>
              <Button
                href="https://galeria-icl.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
              >
                <i className="fas fa-external-link-alt iconWithMarginRight" />{" "}
                Demo
              </Button>
            </div>
          </Card>

          {/* Projeto Oráculo */}
          <Card as="article" className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <i className="fas fa-search-plus text-2xl text-[var(--accent-purple)]" />
                <div>
                  <h3 className="m-0 text-lg font-semibold text-[var(--text-bright)]">
                    Doutor CLI
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">doutor</p>
                </div>
              </div>
              <Badge className="badgePurple">
                <i className="fas fa-star iconWithMarginRight" /> Open Source
              </Badge>
            </div>

            <p className="text-[var(--text-secondary)]">
              CLI modular para analisar, diagnosticar e manter projetos JS/TS.
              Oferece diagnósticos estruturais, verificação de integridade,
              linting avançado com 20+ analistas e métricas para CI/CD.
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge className="badgeSecondary">
                <i className="fab fa-js iconWithMarginRight" /> TypeScript
              </Badge>
              <Badge className="badgeSecondary">
                <i className="fas fa-terminal iconWithMarginRight" /> CLI
              </Badge>
              <Badge className="badgeSecondary">
                <i className="fas fa-bug iconWithMarginRight" /> Linter
              </Badge>
            </div>

            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              <Button
                href="https://github.com/icl/doutor"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
              >
                <i className="fab fa-github iconWithMarginRight" /> Repositório
              </Button>
              <Button
                href="https://github.com/icl/doutor"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
                className="!bg-[var(--accent-purple)] hover:!bg-[var(--accent-purple-hover)]"
              >
                <i className="fas fa-play iconWithMarginRight" /> Demo Rápido
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Por que fazer parceria */}
      <Card
        as="section"
        className="mx-auto mb-10 max-w-[1100px] leading-relaxed"
      >
        <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-[var(--text-bright)]">
          <i className="fas fa-lightbulb text-[var(--accent-warning)]" />
          Benefícios da Parceria
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center gap-3 text-center">
            <i className="fas fa-users text-3xl text-[var(--accent-tertiary)]" />
            <h3 className="font-semibold text-[var(--text-bright)]">
              Rede de Desenvolvedores
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Acesso a uma rede qualificada de profissionais e entusiastas do
              ecossistema open source.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <i className="fas fa-code text-3xl text-[var(--accent-primary)]" />
            <h3 className="font-semibold text-[var(--text-bright)]">
              Transparência Total
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Projeto open source com documentação completa, código auditável e
              licenciamento MIT.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <i className="fas fa-chart-line text-3xl text-[var(--accent-purple)]" />
            <h3 className="font-semibold text-[var(--text-bright)]">
              Valor Agregado
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Colaboração estruturada com visibilidade, reconhecimento e
              benefício mútuo para as partes envolvidas.
            </p>
          </div>
        </div>
      </Card>

      {/* Tipos de Parcerias */}
      <Card
        as="section"
        className="mx-auto mb-10 max-w-[1100px] leading-relaxed"
      >
        <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-[var(--text-bright)]">
          <i className="fas fa-puzzle-piece text-[var(--accent-tertiary)]" />
          Modalidade de Colaboração
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface-2)] p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-[var(--text-bright)]">
              <i className="fas fa-code-branch text-[var(--accent-primary)]" />
              Desenvolvimento
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Contribuição técnica com código, correção de bugs, implementação
              de funcionalidades ou melhoria de documentação.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface-2)] p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-[var(--text-bright)]">
              <i className="fas fa-palette text-[var(--accent-warning)]" />
              Design e Conteúdo
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Criação de assets visuais, SVGs, banners ou produção de conteúdo
              técnico para o blog e documentação.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface-2)] p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-[var(--text-bright)]">
              <i className="fas fa-bullhorn text-[var(--accent-tertiary)]" />
              Divulgação
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Promoção do projeto em canais de comunicação, redes profissionais,
              comunidades ou eventos do setor.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface-2)] p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-[var(--text-bright)]">
              <i className="fas fa-handshake text-[var(--accent-purple)]" />
              Integração
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Integração dos recursos em projeto próprio ou desenvolvimento de
              ferramenta complementar ao ecossistema.
            </p>
          </div>
        </div>
      </Card>

      {/* Contato */}
      <Card
        as="section"
        className="mx-auto max-w-[1100px] bg-gradient-to-br from-[var(--bg-surface-1)] to-[var(--bg-surface-2)]"
      >
        <div className="text-center">
          <i className="fas fa-envelope-open-text icon2xl mb-4 text-[var(--accent-primary)]" />
          <h2 className="mb-4 text-2xl font-semibold text-[var(--text-bright)]">
            Contato
          </h2>
          <p className="mb-6 text-[var(--text-secondary)]">
            Para proposta de parceria ou informação adicional sobre o projeto,
            utilize um dos canais abaixo.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              href="mailto:ossmoralus@gmail.com"
              variant="primary"
              size="lg"
              className="inline-flex items-center gap-2"
            >
              <i className="fas fa-envelope" /> E-mail
            </Button>

            <Button
              href="https://wa.me/5537998553430"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              className="inline-flex items-center gap-2 !border-green-600 !text-green-500 hover:!bg-green-600 hover:!text-white"
            >
              <i className="fab fa-whatsapp" /> WhatsApp
            </Button>

            <Button
              href="https://github.com/icl"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              className="inline-flex items-center gap-2"
            >
              <i className="fab fa-github" /> GitHub
            </Button>
          </div>

          <p className="mt-6 text-sm text-[var(--text-secondary)]">
            <i className="fas fa-clock iconWithMarginRight" />
            Retorno em até 24 horas úteis.
          </p>
        </div>
      </Card>
    </Container>
  );
}
