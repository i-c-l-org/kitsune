# Arquitetura do Projeto

Este documento descreve a arquitetura do projeto Galeria I.C.L.

## Visão Geral

O projeto utiliza **Next.js 16** com App Router e implementa o **Strategy Pattern** para geração de SVGs dinâmicos.

## Estrutura de Diretórios

```
src/
├── core/                    # Contratos e interfaces
│   └── interfaces/
│       ├── IThemeStrategy.ts   # Interface de tema
│       └── ISVGStrategy.ts    # Interface de estratégia SVG
│
├── strategies/              # Implementações concretas
│   ├── themes/
│   │   ├── ThemeRegistry.ts    # Registro centralizado de temas
│   │   └── index.ts
│   └── svg/
│       ├── GitHubStatsStrategy.ts   # Stats card
│       ├── GitHubLangsStrategy.ts  # Languages card
│       └── index.ts
│
├── services/                # Serviços centrais
│   └── SVGGeneratorService.ts  # Orquestrador de estratégias
│
└── index.ts                # Exports principais
```

## Padrões de Projeto

### Strategy Pattern

O projeto utiliza o padrão Strategy para permitir:

- Fácil adição de novos tipos de cards
- Manutenção centralizada de temas
- Testabilidade aprimorada

**Interfaces:**

```typescript
interface SVGStrategy {
  readonly type: string;
  generate(data: unknown, username: string, config?: CardConfig): string;
  generatePreview(theme: string, config?: Partial<CardConfig>): string;
}

interface ThemeStrategy {
  readonly name: ThemeName;
  readonly colors: ThemeColors;
  getColors(): ThemeColors;
}
```

### ThemeRegistry

Centraliza o gerenciamento de temas:

- Registro automático de temas padrão
- Fallback para tema 'dark' em caso de tema inválido
- Extensibilidade para novos temas

```typescript
import { themeRegistry } from "@/src/strategies/themes";

const theme = themeRegistry.get("ocean");
const colors = theme.getColors();
```

### SVGGeneratorService

Orquestra as estratégias de geração:

```typescript
import { svgGeneratorService } from "@/src/services";

// Gerar preview
const svg = svgGeneratorService.generatePreview("github-stats", "neon");

// Gerar com dados reais
const svg = svgGeneratorService.generate(
  "github-stats",
  statsData,
  "username",
  {
    theme: "ocean",
  },
);
```

## Camadas

### 1. Camada de Interface (`core/interfaces`)

Define contratos que todas as implementações devem seguir.

### 2. Camada de Estratégia (`strategies`)

Contém implementações concretas:

- **themes/**: Definições de cores e estilos
- **svg/**: Geradores de SVG para cada tipo de card

### 3. Camada de Serviço (`services`)

Coordenação entre estratégias e interface.

### 4. Camada de Presentation (`app/`)

Componentes React e rotas da API.

## Legado (lib/)

O diretório `lib/` contém código legado mantido para compatibilidade:

- `lib/legacy/` - Antigos geradores de SVG (github-stats-svg.ts, github-langs-svg.ts)
- `lib/api/legacy/` - Antigos handlers de API

O código ativo agora está em `src/`:

- `src/strategies/svg/` - Estratégias de geração SVG
- `src/strategies/themes/` - Registro de temas
- `src/services/` - Serviços centrais

## Adicionando Novos Componentes

### Novo Tema

1. Adicione o tipo em `src/core/interfaces/IThemeStrategy.ts`
2. Defina as cores em `src/strategies/themes/ThemeRegistry.ts`

### Novo Tipo de Card

1. Crie uma nova classe em `src/strategies/svg/`
2. Implemente a interface `SVGStrategy`
3. Registre no `SVGGeneratorService`

## Testes

Cada estratégia pode ser testada isoladamente:

```typescript
import { githubStatsStrategy } from "@/src/strategies/svg";

const svg = githubStatsStrategy.generatePreview("dark");
// Assertivas sobre o SVG gerado
```
