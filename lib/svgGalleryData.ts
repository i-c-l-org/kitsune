/**
 * Dados centralizados da galeria de SVGs
 * Este arquivo re-exporta dados dos arquivos de categoria individuais
 * para manter compatibilidade com importações existentes.
 *
 * Para novos códigos, considere importar diretamente de:
 * - lib/gallery/types.ts - Tipos e interfaces
 * - lib/gallery/banners.ts - Dados dos banners
 * - lib/gallery/skills.ts - Dados dos badges de skills
 * - lib/gallery/decorativos.ts - Dados dos badges decorativos
 * - lib/gallery/info.ts - Dados dos badges de info
 */

import { bannerItems } from './gallery/banners';
import { decorativosItems } from './gallery/decorativos';
import { infoItems } from './gallery/info';
import { socialItems } from './gallery/social';
import { skillsItems } from './gallery/skills';
import {
  categoryLabels,
  type CategoryType,
  type SVGItem,
} from './gallery/types';

// Re-exporta tipos para compatibilidade
export type { CategoryType, SVGItem };

// Re-exporta categoryLabels para compatibilidade
export { categoryLabels };
// Combina todos os items em um único array
// Combina todos os items em um único array e remove duplicatas por `id`, mantendo a primeira ocorrência.
const combinedItems: SVGItem[] = [
  ...bannerItems,
  ...decorativosItems,
  ...infoItems,
  ...socialItems,
  ...skillsItems,
];

export const svgItems: SVGItem[] = Array.from(
  new Map(combinedItems.map((item) => [item.id, item])).values(),
);

// Funções auxiliares para filtrar por categoria
export const getBannerItems = (): SVGItem[] => bannerItems;

export const getSkillsItems = (): SVGItem[] => skillsItems;

const SKILLS_LANGS_IDS = new Set<string>([
  'badge-javascript',
  'badge-typescript',
  'badge-python',
  'badge-java',
  'badge-csharp',
  'badge-go',
  'badge-rust',
  'badge-php',
  'badge-ruby',
  'badge-swift',
  'badge-kotlin',
  'badge-cpp',
  'badge-c',
  'badge-scala',
  'badge-elixir',
  'badge-haskell',
  'badge-lua',
  'badge-dart',
  'badge-r',
  'badge-perl',
  'badge-bash',
  'badge-cobol',
  'badge-crystal',
  'badge-delphi',
  'badge-erlang',
  'badge-fortran',
  'badge-fsharp',
  'badge-groovy',
  'badge-matlab',
  'badge-nim',
  'badge-objective-c',
  'badge-ocaml',
  'badge-powershell',
  'badge-racket',
  'badge-sql',
  'badge-html',
  'badge-css',
  'badge-julia',
  'badge-zig',
  'badge-clojure',
  'badge-shell',
]);

const SKILLS_FERRAMENTAS_IDS = new Set<string>([
  'badge-git',
  'badge-github',
  'badge-github-actions',
  'badge-gitlab',
  'badge-bitbucket',
  'badge-eslint',
  'badge-prettier',
  'badge-jest',
  'badge-vitest',
  'badge-mocha',
  'badge-cypress',
  'badge-playwright',
  'badge-selenium',
  'badge-testing-library',
  'badge-storybook',
  'badge-webpack',
  'badge-rollup',
  'badge-vite',
  'badge-turbo',
  'badge-nx',
  'badge-lerna',
  'badge-esbuild',
  'badge-npm',
  'badge-yarn',
  'badge-pnpm',
  'badge-bun',
  'badge-deno',
  'badge-docker',
  'badge-kubernetes',
  'badge-terraform',
  'badge-ansible',
  'badge-jenkins',
  'badge-travisci',
  'badge-circleci',
  'badge-sonarqube',
  'badge-postman',
  'badge-insomnia',
  'badge-figma',
  'badge-jira',
  'badge-notion',
  'badge-vscode',
  'badge-neovim',
  'badge-intellij',
  'badge-jupyter',
  'badge-slack',
  'badge-discord',
  'badge-prometheus',
  'badge-grafana',
  'badge-helm',
  'badge-datadog',
  'badge-sentry',
  'badge-newrelic',
  'badge-pagerduty',
  'badge-raycast',
  'badge-obsidian',
  'badge-linear',
  'badge-clickup',
  'badge-splunk',
  'badge-airflow',
  'badge-antigravity',
  'badge-cursor',
  'badge-congelado',
]);

export const getSkillsLangsItems = (): SVGItem[] =>
  skillsItems.filter((item) => SKILLS_LANGS_IDS.has(item.id));

export const getSkillsFerramentasItems = (): SVGItem[] =>
  skillsItems.filter((item) => SKILLS_FERRAMENTAS_IDS.has(item.id));

export const getSkillsTecnologiasItems = (): SVGItem[] =>
  skillsItems.filter(
    (item) =>
      !SKILLS_LANGS_IDS.has(item.id) && !SKILLS_FERRAMENTAS_IDS.has(item.id),
  );

export const getDecorativosItems = (): SVGItem[] => decorativosItems;

export const getInfoItems = (): SVGItem[] => infoItems;

export const getSocialItems = (): SVGItem[] => socialItems;

export const getItemsByCategory = (category: CategoryType): SVGItem[] =>
  svgItems.filter((item) => item.category === category);
