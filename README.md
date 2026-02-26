Proveniência e Autoria: Este documento integra o projeto Galeria I.C.L (licença MIT).
Nada aqui implica cessão de direitos morais/autorais.
Conteúdos de terceiros não licenciados de forma compatível não devem ser incluídos.
Referências a materiais externos devem ser linkadas e reescritas com palavras próprias.

<div align="center">

# 🎨 Galeria I.C.L

**Plataforma open-source de badges, SVGs e banners para perfis GitHub**

[![CI](https://github.com/i-c-l-5-5-5/kitsune/actions/workflows/ci.yml/badge.svg)](https://github.com/i-c-l-5-5-5/kitsune/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/Node-24.x-green.svg)](https://nodejs.org)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black.svg)](https://vercel.com)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)](./package.json)
[![GitHub stars](https://img.shields.io/github/stars/i-c-l-5-5-5/kitsune?style=social)](https://github.com/i-c-l-5-5-5/kitsune)

[Demo](https://galeria-tau-ten.vercel.app) · [Galeria](https://galeria-tau-ten.vercel.app/galeria) · [Blog](https://galeria-tau-ten.vercel.app/blog) · [Documentação](./docs/)

</div>

---

## Sumário

- [Sobre](#sobre)
- [Recursos Principais](#recursos-principais)
- [Início Rápido](#início-rápido)
- [Uso](#uso)
- [Configuração](#configuração)
- [Desenvolvimento](#desenvolvimento)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Licença](#licença)
- [Contato](#contato)

---

## Sobre

Galeria I.C.L oferece uma coleção completa de SVGs, badges e banners prontos para personalizar perfis GitHub. Com APIs dinâmicas para estatísticas e uma galeria interativa, o projeto combina performance, acessibilidade e código aberto.

---

## Recursos Principais

- **Galeria de SVGs** — badges, banners e ícones por categoria
- **APIs dinâmicas** — GitHub Stats, Top Languages, Visitor Counter
- **Blog em MDX** — conteúdo educativo com SEO otimizado
- **Temas personalizáveis** — dark, light, neon, sunset, ocean, forest
- **100% Open Source** — MIT License, código transparente

---

## Início Rápido

### Pré-requisitos

- Node.js 24.x
- npm ou yarn

### Instalação

```bash
git clone https://github.com/i-c-l-5-5-5/kitsune.git
cd kitsune
npm install
cp .env.example .env.local  # opcional
npm run dev
```

Acesse: http://localhost:3000

---

## Uso

### Exemplos rápidos

**Badge SVG:**

```md
![Badge](https://galeria-tau-ten.vercel.app/api/svg/badges/skills/langs/badge-typescript.svg)
```

**Banner:**

```md
![Banner](https://galeria-tau-ten.vercel.app/api/svg/banner/capa-1.svg?width=100%)
```

**Contador de visitantes:**

```md
![Visitors](https://galeria-tau-ten.vercel.app/api/visitors/icl/badge.svg)
```

**Estatísticas GitHub:**

```md
![GitHub Stats](https://galeria-tau-ten.vercel.app/api/github-stats/icl?theme=dark&width=600)
```

### Parâmetros comuns

| Parâmetro | Exemplo        | Descrição           |
| --------- | -------------- | ------------------- |
| `width`   | `300` ou `80%` | Largura em px ou %  |
| `height`  | `120`          | Altura em px        |
| `theme`   | `dark`, `neon` | Tema visual do card |

**Temas disponíveis:** dark · light · neon · sunset · ocean · forest

> Documentação completa: [docs/](./docs)

---

## Configuração

### Variáveis de ambiente

**Recomendadas para produção:**

- `GITHUB_TOKEN` — aumenta limites de requisição da API GitHub (evita erro 429)
- `UPSTASH_REDIS_REST_URL` — URL do Redis para contador de visitantes
- `UPSTASH_REDIS_REST_TOKEN` — token de autenticação do Redis

**Para desenvolvimento:** coloque em `.env.local`  
**Para produção:** configure no Vercel > Settings > Environment Variables

---

## Desenvolvimento

### Scripts principais

| Comando                | Descrição                                        |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Servidor local (porta 3000)                      |
| `npm run build`        | Build de produção                                |
| `npm run start`        | Serve o build em produção                        |
| `npm run test`         | Roda os testes usando Vitest                     |
| `npm run formatar`     | Formata e corrige código automaticamente         |
| `npm run type-check`   | Verifica tipagem do TypeScript                   |
| `npm run diagnosticar` | Roda diagnóstico geral do projeto via Prometheus |
| `npm run decap-server` | Inicia proxy local do Decap CMS (acesso offline) |

> Veja todos os scripts em [package.json](./package.json)

---

## Gerenciamento de Conteúdo (CMS)

O projeto utiliza o **Decap CMS** para o gerenciamento fácil das postagens do Blog. Ele não requer banco de dados externo e salva os arquivos com extensão `.mdx` diretamente no seu repositório do GitHub.

### Acessando o CMS Localmente (Offline)

Para criar ou editar conteúdos no seu próprio computador, sem precisar fazer commits manuais:

1. Em um terminal, inicie o servidor principal do Next.js:
   ```bash
   npm run dev
   ```
2. Em um **segundo terminal**, na mesma pasta, inicie o proxy do CMS local:
   ```bash
   npm run decap-server
   ```
3. Abra o navegador no endereço: **`http://localhost:3000/admin/index.html`**

### Acessando o CMS em Produção (Online)

Após realizar o deploy (ex: na Vercel), o CMS ficará acessível no seu domínio público através da rota `/admin/index.html` (ex: `https://seu-site.com/admin/index.html`).

**Importante:** Para realizar login no ambiente de produção (online), o painel abrirá a janela de login do GitHub. É necessário configurar um **GitHub OAuth App** (nas configurações de developer da sua conta GitHub) e conectar junto às variáveis de ambiente, de acordo com a documentação do Decap CMS.

---

## Estrutura do Projeto

```
galeria/
├── app/               # Next.js App Router
│   ├── api/          # Endpoints (SVG, Stats, Visitors)
│   ├── blog/         # Páginas do blog
│   ├── galeria/      # Galeria interativa
│   └── components/   # Componentes React
├── content/posts/     # Posts em MDX
├── docs/              # Documentação
├── lib/               # Utilitários e geração de SVGs
├── public/            # Assets (SVGs, ícones, imagens)
└── scripts/           # Automações
```

---

## Contribuição

Contribuições são bem-vindas! Siga o guia em [CONTRIBUTING.md](./CONTRIBUTING.md).

### Fluxo básico

1. **Fork** o repositório
2. **Crie uma branch** para sua feature: `git checkout -b feature/descricao`
3. **Faça commits** com Conventional Commits: `git commit -m "feat: descrição"`
4. **Valide** o código: `npm run fix:all && npm run lint`
5. **Abra um Pull Request** com descrição clara

---

## Troubleshooting

### HTTP 429 — Rate Limit do GitHub

**Problema:** Sem `GITHUB_TOKEN`, o limite é apenas 60 requisições/hora.

**Solução:**

1. Crie um [Personal Access Token](https://github.com/settings/tokens) com escopo `public_repo`
2. Configure no Vercel: **Settings → Environment Variables**
3. Redeploy a aplicação

### Outros Problemas

Consulte a [documentação de debugging](./docs) ou [abra uma issue](https://github.com/i-c-l-5-5-5/kitsune/issues).

---

## Roadmap

- Integrações com GitLab e Bitbucket
- Temas customizáveis via API
- Sistema de templates para badges
- Analytics integrado
- Suporte a múltiplos idiomas
- App mobile

---

## Licença

MIT — veja [LICENSE](./LICENSE)

Auditoria de dependências: [docs/AUDITORIA-LICENCAS.md](./docs/AUDITORIA-LICENCAS.md)

---

## Contato

- **Site:** https://galeria-tau-ten.vercel.app
- **GitHub:** https://github.com/i-c-l-5-5-5/kitsune
- **Issues:** https://github.com/i-c-l-5-5-5/kitsune/issues

---
