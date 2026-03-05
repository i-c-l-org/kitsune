<!--

Proveniência e Autoria: Este documento integra o projeto Galeria Kitsune (licença MIT).
Nada aqui implica cessão de direitos morais/autorais.
Conteúdos de terceiros não licenciados de forma compatível não devem ser incluídos.
Referências a materiais externos devem ser linkadas e reescritas com palavras próprias.

-->

<img src="./img/verm-preto.png"/>

---

<div align="center">

# Galeria Kitsune 🦊

Plataforma open-source para gerar e servir SVGs (badges, banners e cards de GitHub) com foco em uso em README/perfil.

</div>

---

![estrelas que e bom nada!](https://kitsune-galeria.vercel.app/api/github-traffic/clones/badge.svg?owner=i-c-l-org&repo=kitsune)


![colecionavel](https://kitsune-galeria.vercel.app/api/svg/badges/info/badge-colecionavel.svg)

<div align="center">

[Demo](https://kitsune-galeria.vercel.app) · [Galeria](https://kitsune-galeria.vercel.app/galeria) · [Blog](https://kitsune-galeria.vercel.app/blog) · [API](./docs/api.md) · [Arquitetura](./docs/arquitetura.md)

</div>

---

## Visão Geral

O projeto é um app **Next.js 16 (App Router)** que combina:

- Coleção estática de SVGs em `public/svg`
- APIs dinâmicas para cards GitHub e contador de visitantes
- Galeria web para preview, cópia de markdown e download
- Blog em MDX + Decap CMS

## Estado Atual (Snapshot)

- Runtime principal: **Node.js >= 24.12.0**
- Framework: **Next.js 16.1.6** + **React 19**
- Temas de cards: `dark`, `light`, `neon`, `sunset`, `ocean`, `forest`, `cyberpunk`, `aurora`, `cherry`, `midnight`, `dracula`
- Endpoints ativos para SVG: `api/svg`, `api/github-stats`, `api/github-langs`, `api/visitors`, `api/status-badge`

## Funcionalidades

### 1) Galeria de SVGs

Categorias atuais na UI (`/galeria`):

- `banners`
- `decorativos`
- `ferramentas`
- `github-stats`
- `info`
- `langs`
- `skills`
- `social`
- `tecnologias`
- `visitors`

### 2) APIs Dinâmicas

- **GitHub Stats Card** (SVG)
- **GitHub Top Languages Card** (SVG)
- **Visitor Counter** (JSON e badge SVG)
- **Status Badge** (SVG)
- **Manipulação de SVG estático** via `/api/svg/[...filename]`

## Endpoints Principais

### SVG estático/manipulado

- `GET /api/svg/[...filename]`
- Query suportada: `width|w`, `height|h`, `fit`

Exemplo:

```md
![Badge TS](https://kitsune-galeria.vercel.app/api/svg/badges/langs/badge-typescript.svg)
```

### GitHub Stats (SVG)

- `GET /api/github-stats/[username]`
- `GET /api/github-stats?username=<username>`
- `GET /api/github-stats/preview/[theme]`

Exemplo recomendado para README do GitHub:

```md
![GitHub Stats](https://kitsune-galeria.vercel.app/api/github-stats/seu-usuario?theme=ocean&width=600&compat=github)
```

```md
![Top Langs](https://kitsune-galeria.vercel.app/api/github-langs/seu-usuario?theme=neon&compat=github)

```
---
<div align="center">

<a href="https://kitsune-galeria.vercel.app/api/github-stats/i-c-l-org?theme=ocean&width=600&compat=github">
  <img src="https://kitsune-galeria.vercel.app/api/github-stats/i-c-l-org?theme=ocean&width=400&compat=github" width="400" alt="GitHub Stats" />
</a>
<a href="https://kitsune-galeria.vercel.app/api/github-langs/i-c-l-org?theme=neon&compat=github">
  <img src="https://kitsune-galeria.vercel.app/api/github-langs/i-c-l-org?theme=neon&width=400&compat=github" width="400" alt="Top Langs" />
</a>

</div>

---

### Visitors

- `GET /api/visitors/[id]` (JSON)
- `GET /api/visitors/[id]/badge.svg` (SVG)

Exemplo:

```md
![Visitors](https://kitsune-galeria.vercel.app/api/visitors/icl/badge.svg?label=visitors)
```

### Status Badge

- `GET /api/status-badge?theme=ocean&variant=default`

## Instalação e Execução

### Pré-requisitos

- Node.js `>=24.12.0`
- npm

### Setup local

```bash
git clone https://github.com/i-c-l-org/kitsune.git
cd kitsune
npm install
cp .env.example .env.local
npm run dev
```

Aplicação local: `http://localhost:3000`

## Variáveis de Ambiente

Definidas no `.env.example`:

- `NEXT_PUBLIC_SITE_URL` (recomendado, URL pública base para links/markdown)
- `NEXT_PUBLIC_CANONICAL_URL` (recomendado em produção, domínio canônico)
- `GITHUB_TOKEN` (opcional, aumenta rate limit da API do GitHub)
- `UPSTASH_REDIS_REST_URL` (opcional, para contador persistente)
- `UPSTASH_REDIS_REST_TOKEN` (opcional, para contador persistente)

Notas:

- Sem Upstash configurado, o contador de visitantes usa fallback em memória.
- Sem `GITHUB_TOKEN`, o projeto ainda funciona, sujeito ao limite público da API do GitHub.

Guia completo de publicação/configuração:

- [docs/deploy-env.md](./docs/deploy-env.md)

## Checklist de Go Live

Antes de publicar em produção, valide:

1. `NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_CANONICAL_URL` apontando para o domínio final.
2. `GITHUB_TOKEN` configurado no ambiente de produção.
3. (`Opcional`) `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN` configurados para persistir visitantes.
4. Build local passando: `npm run build`.
5. Tipagem passando: `npm run type-check`.
6. Testes passando: `npm run test`.
7. Endpoint de stats respondendo: `/api/github-stats/<usuario>`.
8. Endpoint de top langs respondendo: `/api/github-langs/<usuario>`.
9. Badge de clones oficial respondendo: `/api/github-traffic/clones/badge.svg?owner=i-c-l-5-5-5&repo=kitsune`.
10. Visitors com persistência validado via header `X-Visitors-Configured` (`1` quando Upstash ativo).

## Scripts

Principais scripts atualmente no `package.json`:

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm run start` — inicia app em produção
- `npm run type-check` — checagem TypeScript
- `npm run lint` — lint (ESLint)
- `npm run test` — testes (Vitest)
- `npm run test:coverage` — cobertura
- `npm run formatar` — formatação/correções via Prometheus
- `npm run diagnosticar` — diagnóstico via Prometheus
- `npm run otimizar` — otimização de SVG via Prometheus
- `npm run decap-server` — proxy local do Decap CMS

## Estrutura do Projeto

```text
app/
  api/              # Rotas API (SVG, GitHub, Visitors, Status)
  blog/             # Blog em MDX
  galeria/          # UI da galeria e previews
  components/       # Componentes da aplicação
src/
  core/             # Interfaces/contratos
  strategies/       # Estratégias de geração SVG e temas
  services/         # Serviços de domínio
lib/                # Handlers, hooks e utilitários
public/svg/         # Coleção de SVGs estáticos
content/posts/      # Conteúdo do blog
scripts/            # Scripts auxiliares
```

## CMS (Decap)

Para editar conteúdo localmente:

1. Terminal 1: `npm run dev`
2. Terminal 2: `npm run decap-server`
3. Abrir: `http://localhost:3000/admin/index.html`

## Limitações Conhecidas

- Renderização de SVG em README do GitHub pode variar conforme sanitização/caching; use `compat=github` nos cards dinâmicos.
- O pipeline de CI atual merece revisão (há etapas herdadas que podem não refletir o fluxo real de build/teste deste app).

## Contribuição

Consulte [CONTRIBUTING.md](./CONTRIBUTING.md).

Fluxo recomendado:

1. Criar branch a partir de `dev`
2. Implementar mudanças
3. Rodar checks locais (`type-check`, `test`, `build`)
4. Abrir PR com descrição objetiva

## Licença

![MIT](https://kitsune-galeria.vercel.app/api/svg/badges/info/badge-license-mit.svg)

---

<img align="right" width="90" height="90" src="./img/logo-l.png"/>
