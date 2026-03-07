---
Proveniência e Autoria: Este documento integra o projeto Galeria Kitsune (licença MIT).
Nada aqui implica cessão de direitos morais/autorais.
Conteúdos de terceiros não licenciados de forma compatível não devem ser incluídos.
Referências a materiais externos devem ser linkadas e reescritas com palavras próprias.
---

# Guia de Variáveis de Ambiente (Deploy)

Este guia descreve as variáveis usadas atualmente no projeto e como configurar no deploy (Vercel).

## 1. Variáveis usadas no código

| Variável                    | Obrigatória                       | Onde é usada                                                                              | Objetivo                                                                  |
| --------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Recomendada                       | frontend (`GalleryGrid`, `VisitorsBadgeGrid`) e `lib/getBaseUrl.ts`                       | Define URL base pública para gerar links absolutos em markdown/previews   |
| `NEXT_PUBLIC_CANONICAL_URL` | Recomendada em produção           | frontend e `lib/getBaseUrl.ts`                                                            | URL canônica do domínio final (ex.: `https://kitsune-galeria.vercel.app`) |
| `GITHUB_TOKEN`              | Opcional (fortemente recomendada) | `src/services/github/github-stats.ts`, `app/api/clones/[owner]/[repo]/badge.svg/route.ts` | Aumenta rate limit e habilita dados oficiais de clones (GitHub Traffic)   |
| `UPSTASH_REDIS_REST_URL`    | Opcional                          | `src/services/visitors/visitors.ts`                                                       | Backend do contador de visitantes persistente                             |
| `UPSTASH_REDIS_REST_TOKEN`  | Opcional                          | `src/services/visitors/visitors.ts`                                                       | Token do Upstash Redis                                                    |

## 2. Recomendação por ambiente

### Produção (Vercel)

Configure no mínimo:

- `NEXT_PUBLIC_CANONICAL_URL=https://kitsune-galeria.vercel.app`
- `NEXT_PUBLIC_SITE_URL=https://kitsune-galeria.vercel.app`
- `GITHUB_TOKEN=<seu_token>`

Opcional:

- `UPSTASH_REDIS_REST_URL=<url_upstash>`
- `UPSTASH_REDIS_REST_TOKEN=<token_upstash>`

### Preview/Desenvolvimento

- `GITHUB_TOKEN` é recomendado para evitar limite baixo da API.
- Sem Upstash, o contador de visitantes funciona em fallback de memória.

## 3. Como configurar na Vercel

1. Abra o projeto na Vercel.
2. Vá em `Settings` -> `Environment Variables`.
3. Adicione as variáveis acima para os ambientes desejados (`Production`, `Preview`, `Development`).
4. Faça `Redeploy` após salvar.

## 4. Exemplo de `.env.local`

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CANONICAL_URL=https://kitsune-galeria.vercel.app
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxxxxxxxxxxxxxxxxx
```

## 5. Validação pós-deploy

Após publicar, valide estes endpoints:

```text
GET /api/github-stats/seu-usuario
GET /api/github-langs/seu-usuario
GET /api/clones/i-c-l-org/kitsune/badge.svg
GET /api/visitors/seu-id
GET /api/visitors/seu-id/badge.svg?label=visitors
```

Sinais de configuração correta:

- Cards de GitHub respondendo sem erro 429 frequente.
- Badge de clones mostrando número (não `n/a`).
- Header `X-Visitors-Configured: 1` nas rotas de visitantes (quando Upstash estiver ativo).

## 6. Problemas comuns

### `clones 14d: n/a`

Causa provável:

- `GITHUB_TOKEN` ausente/inválido, ou token sem permissão para leitura de traffic do repositório.

### URLs erradas em markdown gerado pela galeria

Causa provável:

- `NEXT_PUBLIC_SITE_URL` e/ou `NEXT_PUBLIC_CANONICAL_URL` não configuradas corretamente.

### Contador de visitantes não persiste entre deploys

Causa provável:

- Upstash não configurado; app entrou em fallback de memória.
