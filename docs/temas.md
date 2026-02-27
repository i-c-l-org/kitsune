# Documentação de Temas

Este documento descreve os temas disponíveis para os cards SVG do projeto.

## Temas Disponíveis

O projeto conta com **11 temas** para personalização dos cards GitHub Stats e GitHub Top Languages.

### Temas Clássicos

| Tema    | Cor Primária   | Uso Recomendado                     |
| ------- | -------------- | ----------------------------------- |
| `dark`  | #58a6ff (Azul) | Perfis escuros, leitura confortável |
| `light` | #0366d6 (Azul) | READMEs claros, documentação        |

### Temas Coloridos

| Tema     | Cor Primária         | Uso Recomendado         |
| -------- | -------------------- | ----------------------- |
| `neon`   | #00ff88 (Verde neon) | Perfis cyberpunk/styled |
| `sunset` | #ff6b35 (Laranja)    | Warm, convidativo       |
| `ocean`  | #00d4ff (Ciano)      | Tech, desenvolvimento   |
| `forest` | #52b788 (Verde)      | Natureza, open source   |

### Temas Especiais

| Tema        | Cor Primária         | Uso Recomendado           |
| ----------- | -------------------- | ------------------------- |
| `cyberpunk` | #ff00ff (Magenta)    | Neon aesthetic, gaming    |
| `aurora`    | #64ffda (Verde água) | Moderno, clean            |
| `cherry`    | #ff6b9d (Rosa)       | Criativo, pessoal         |
| `midnight`  | #a78bfa (Roxo)       | Dark purple, elegante     |
| `dracula`   | #bd93f9 (Roxo)       | Temas Dracula, developers |

## Parâmetros de Tema

### GitHub Stats

```
https://seu-site.com/api/github-stats/usuario?theme=nome_do_tema
```

### GitHub Top Languages

```
https://seu-site.com/api/github-langs/usuario?theme=nome_do_tema
```

## Exemplo de Uso

```markdown
![GitHub Stats](https://galeria.vercel.app/api/github-stats/seu-usuario?theme=ocean)
![Top Languages](https://galeria.vercel.app/api/github-langs/seu-usuario?theme=cyberpunk)
```

## Adicionar Novos Temas

Os temas são centralizados em `src/strategies/themes/ThemeRegistry.ts`.

Para adicionar um novo tema:

1. Adicione o tipo em `src/core/interfaces/IThemeStrategy.ts`
2. Defina as cores em `src/strategies/themes/ThemeRegistry.ts`
3. Atualize os componentes de preview em `app/galeria/info/_components/`

## Configurações de Estilo

Além do tema, cada card aceita:

| Parâmetro      | Tipo    | Padrão | Descrição        |
| -------------- | ------- | ------ | ---------------- |
| `theme`        | string  | "dark" | Nome do tema     |
| `borderRadius` | number  | 12     | Raio dos cantos  |
| `showBorder`   | boolean | true   | Mostrar borda    |
| `borderWidth`  | number  | 2      | Largura da borda |
| `width`        | number  | 600    | Largura do SVG   |
| `height`       | number  | 320    | Altura do SVG    |
