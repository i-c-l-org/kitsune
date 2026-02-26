/**
 * SVGO Configuration
 * https://github.com/svg/svgo
 *
 * Otimiza e padroniza SVGs mantendo qualidade e legibilidade
 */

export default {
  multipass: true, // Múltiplas passagens para melhor otimização

  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          // Manter IDs para referencias CSS/JS
          cleanupIds: {
            preserve: [],
            preservePrefixes: [],
            minify: false,
          },

          // Não remover atributos desconhecidos (pode quebrar animações)
          removeUnknownsAndDefaults: {
            keepRoleAttr: true,
            keepAriaAttrs: true,
          },
        },
      },
    },

    // IMPORTANTE: Remover viewBox quebra responsividade, então desabilitamos explicitamente
    {
      name: "removeViewBox",
      active: false,
    }, // Remover comentários e metadados
    "removeComments",
    "removeMetadata",
    "removeEditorsNSData",

    // Otimizar estrutura
    "convertStyleToAttrs",
    "mergePaths",
    "convertShapeToPath",

    // Otimizar valores numéricos
    {
      name: "cleanupNumericValues",
      params: {
        floatPrecision: 2, // Precisão de 2 casas decimais
      },
    },

    // Remover atributos vazios e inúteis
    "removeEmptyAttrs",
    "removeEmptyContainers",
    "removeUnusedNS",

    // Ordenar atributos alfabeticamente (consistência)
    "sortAttrs",

    // Adicionar atributos necessários
    {
      name: "addAttributesToSVGElement",
      params: {
        attributes: [
          // Adicionar xmlns se não existir
          { xmlns: "http://www.w3.org/2000/svg" },
        ],
      },
    },

    // Remover título e descrição (metadados desnecessários para badges)
    // Comentar se precisar de acessibilidade
    "removeTitle",
    "removeDesc",

    // Converter cores para formato mais curto
    "convertColors",

    // Remover atributos de estilo inline vazios
    "removeStyleElement",

    // Otimizar transformações
    "convertTransform",
    "removeUselessStrokeAndFill",
  ],

  // Configurações para badges e banners
  js2svg: {
    indent: 2, // Indentação de 2 espaços
    pretty: true, // Manter legível
  },
};
