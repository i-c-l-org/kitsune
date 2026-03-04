---
Proveniência e Autoria: Este documento integra o projeto Galeria Kitsune (licença MIT).
Nada aqui implica cessão de direitos morais/autorais.
Conteúdos de terceiros não licenciados de forma compatível não devem ser incluídos.
Referências a materiais externos devem ser linkadas e reescritas com palavras próprias.
---

# Documentação de APIs

Este documento lista todas as APIs disponíveis no projeto Galeria I.C.L.

## APIs de GitHub

### GitHub Stats

Retorna estatísticas do perfil do GitHub em formato SVG.

**Endpoint:**

```
GET /api/github-stats/[username]
```

**Parâmetros de Query:**

| Parâmetro      | Tipo    | Padrão | Descrição                                             |
| -------------- | ------- | ------ | ----------------------------------------------------- |
| `theme`        | string  | "dark" | Tema visual                                           |
| `width`        | number  | 600    | Largura em px                                         |
| `height`       | number  | 320    | Altura em px                                          |
| `borderRadius` | number  | 12     | Raio dos cantos                                       |
| `showBorder`   | boolean | true   | Mostrar borda                                         |
| `compat`       | string  | -      | Use `github` para renderização mais estável no README |

**Exemplo:**

```
/api/github-stats/seu-usuario?theme=ocean&width=600
```

```
/api/github-stats/seu-usuario?theme=ocean&width=600&compat=github
```

**Preview:**

```
/api/github-stats/preview/[theme]
```

---

### GitHub Top Languages

Retorna as top 5 linguagens do perfil em formato SVG.

**Endpoint:**

```
GET /api/github-langs/[username]
```

**Parâmetros de Query:**

| Parâmetro | Tipo   | Padrão | Descrição                                             |
| --------- | ------ | ------ | ----------------------------------------------------- |
| `theme`   | string | "dark" | Tema visual                                           |
| `width`   | number | 600    | Largura em px                                         |
| `height`  | number | 320    | Altura em px                                          |
| `compat`  | string | -      | Use `github` para renderização mais estável no README |

**Exemplo:**

```
/api/github-langs/seu-usuario?theme=neon
```

```
/api/github-langs/seu-usuario?theme=neon&compat=github
```

**Preview:**

```
/api/github-langs/preview/[theme]
```

---

## APIs de Visitantes

### Visitor Counter (JSON)

Retorna o contador de visitantes em JSON.

**Endpoint:**

```
GET /api/visitors/[id]
```

**Parâmetros de Query:**

| Parâmetro   | Tipo   | Padrão | Descrição                              |
| ----------- | ------ | ------ | -------------------------------------- |
| `increment` | string | `1`    | Use `0` para consultar sem incrementar |

**Exemplo:**

```
/api/visitors/meu-id?increment=0
```

---

### Visitor Counter Badge

Retorna um badge com contador de visitantes.

**Endpoint:**

```
GET /api/visitors/[id]/badge.svg
```

**Parâmetros de Query:**

| Parâmetro    | Tipo   | Padrão     | Descrição                                    |
| ------------ | ------ | ---------- | -------------------------------------------- |
| `label`      | string | `visitors` | Texto do badge                               |
| `increment`  | string | `1`        | Use `0` para gerar/consultar sem incrementar |
| `labelColor` | string | `#111`     | Cor de fundo da parte esquerda (hex)         |
| `valueColor` | string | `#222`     | Cor de fundo da parte direita (hex)          |
| `textColor`  | string | `#fff`     | Cor do texto (hex)                           |
| `shape`      | string | `rounded`  | Formato: `rounded`, `square` ou `pill`       |

**Exemplo:**

```
/api/visitors/meu-id/badge.svg?label=Visualizacoes&shape=pill&labelColor=111111&valueColor=2563eb&textColor=ffffff
```

---

## API de Traffic GitHub

### Clones Oficiais (14 dias)

Retorna badge SVG com dados oficiais de clones do GitHub Traffic (`count` e `uniques`).

**Endpoint:**

```
GET /api/github-traffic/clones/badge.svg
```

**Parâmetros de Query:**

| Parâmetro | Tipo   | Padrão        | Descrição           |
| --------- | ------ | ------------- | ------------------- |
| `owner`   | string | `i-c-l-5-5-5` | Dono do repositório |
| `repo`    | string | `kitsune`     | Nome do repositório |

**Exemplo:**

```
/api/github-traffic/clones/badge.svg?owner=i-c-l-5-5-5&repo=kitsune
```

## APIs de SVG

### SVG Geral

Manipulação de SVGs do repositório.

**Endpoint:**

```
GET /api/svg/[...filename]
```

**Parâmetros de Query:**

| Parâmetro | Tipo        | Descrição            |
| --------- | ----------- | -------------------- |
| `width`   | number ou % | Largura              |
| `height`  | number      | Altura               |
| `fill`    | string      | Cor de preenchimento |

---

## Códigos de Erro

| Código | Descrição                |
| ------ | ------------------------ |
| 200    | Sucesso                  |
| 400    | Parâmetros inválidos     |
| 404    | Recurso não encontrado   |
| 429    | Rate limit excedido      |
| 500    | Erro interno do servidor |

## Rate Limits

- **Sem GITHUB_TOKEN:** 60 requisições/hora
- **Com GITHUB_TOKEN:** 5000 requisições/hora

Para aumentar o limite, configure a variável `GITHUB_TOKEN` nas variáveis de ambiente.
