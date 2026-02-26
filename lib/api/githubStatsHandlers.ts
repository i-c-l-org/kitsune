/**
 * @fileoverview Handlers para a API de estatísticas do GitHub.
 * Gera SVGs com estatísticas de perfil de um usuário do GitHub.
 * @module lib/api/githubStatsHandlers
 */

import { NextResponse } from 'next/server';
import { fetchGitHubStats } from '@/lib/github-stats';
import {
  generateGitHubStatsSVG,
  generatePreviewSVG,
} from '@/lib/github-stats-svg';
import type { GitHubCardTheme, GitHubCommonParams } from '@/tipos/github';

export const dynamic = 'force-dynamic';

/** Temas disponíveis para os cards de estatísticas */
const THEMES = [
  'dark',
  'light',
  'neon',
  'sunset',
  'ocean',
  'forest',
] as const satisfies readonly GitHubCardTheme[];

/**
 * Valida e normaliza o tema fornecido.
 * @param value - Valor do tema a ser validado
 * @returns Tema válido ou 'dark' como fallback
 */
function parseTheme(value: string | null | undefined): GitHubCardTheme {
  if (value === null || value === undefined) return 'dark';
  const normalized = value.trim().toLowerCase();
  return (THEMES as readonly string[]).includes(normalized)
    ? (normalized as GitHubCardTheme)
    : 'dark';
}

/**
 * Extrai e valida parâmetros comuns da URL.
 * @param searchParams - Parâmetros de busca da URL
 * @returns Objeto com configurações validadas
 */
function parseCommonParams(searchParams: URLSearchParams): GitHubCommonParams {
  const theme = parseTheme(searchParams.get('theme'));
  const borderRadius =
    searchParams.get('border_radius') ?? searchParams.get('borderRadius');
  const showBorder =
    searchParams.get('show_border') ?? searchParams.get('showBorder');
  const borderWidth =
    searchParams.get('border_width') ?? searchParams.get('borderWidth');
  const widthParam = searchParams.get('width') ?? searchParams.get('w');
  const heightParam = searchParams.get('height') ?? searchParams.get('h');

  return {
    theme,
    ...(borderRadius !== null && { borderRadius: parseInt(borderRadius) }),
    ...(showBorder !== null && { showBorder: showBorder === 'true' }),
    ...(borderWidth !== null && { borderWidth: parseInt(borderWidth) }),
    ...(widthParam !== null &&
      !Number.isNaN(Number(widthParam)) && { width: Number(widthParam) }),
    ...(heightParam !== null &&
      !Number.isNaN(Number(heightParam)) && { height: Number(heightParam) }),
  } as const;
}

/**
 * Obtém o nome de exibição do usuário.
 * @param searchParams - Parâmetros de busca da URL
 * @param defaultUsername - Nome de usuário padrão do GitHub
 * @returns Nome de exibição formatado
 */
function getDisplayName(
  searchParams: URLSearchParams,
  defaultUsername: string,
): string {
  const name = searchParams.get('name');
  if (name !== null && name.trim() !== '') {
    return name.trim();
  }
  return `@${defaultUsername}`;
}

/**
 * Handler para requisições de SVG de estatísticas de um usuário.
 * @param request - Objeto Request com a requisição HTTP
 * @param params - Parâmetros da rota contendo o username
 * @returns Response com o SVG gerado ou erro
 */
export async function handleGitHubStatsRequest(
  request: Request,
  { params }: { params: Promise<{ username: string }> },
): Promise<Response> {
  const { username } = await params;
  const { searchParams } = new URL(request.url);

  try {
    const stats = await fetchGitHubStats(username);
    const config = parseCommonParams(searchParams);
    const displayName = getDisplayName(searchParams, username);

    const svg = generateGitHubStatsSVG(stats, displayName, {
      ...config,
      theme: config.theme,
    });

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('Erro ao gerar SVG:', error);
    return new NextResponse('Erro ao buscar dados do GitHub', { status: 500 });
  }
}

/**
 * Handler para requisições de preview de SVG de estatísticas.
 * Gera um SVG de exemplo com dados fictícios para visualização do tema.
 * @param request - Objeto Request com a requisição HTTP
 * @param params - Parâmetros da rota contendo o theme
 * @returns Response com o SVG de preview ou erro
 */
export async function handleGitHubStatsPreviewRequest(
  request: Request,
  { params }: { params: Promise<{ theme: string }> },
): Promise<Response> {
  try {
    const { theme: themeParam } = await params;
    const { searchParams } = new URL(request.url);
    const config = parseCommonParams(searchParams);
    const theme = parseTheme(themeParam);

    const svg = generatePreviewSVG(theme, config);

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('Erro ao gerar preview do GitHub stats:', error);
    return new NextResponse('Erro ao gerar preview', { status: 500 });
  }
}
