/**
 * Handlers para API de linguagens do GitHub usando Strategy Pattern
 */

import { NextResponse } from 'next/server';
import { githubLangsStrategy } from '@/strategies/svg';
import { themeRegistry } from '@/strategies/themes';
import { fetchGitHubTopLanguages } from '@/services/github/github-stats';
import type { GitHubCommonParams } from '@/tipos/github';

const VALID_THEMES = themeRegistry.getThemeNames();

function parseTheme(value: string | null | undefined): string {
  if (!value) return 'dark';
  const normalized = value.trim().toLowerCase();
  return VALID_THEMES.includes(normalized as (typeof VALID_THEMES)[number])
    ? normalized
    : 'dark';
}

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
  const compatParam = searchParams.get('compat') ?? searchParams.get('mode');
  const compatNormalized = compatParam?.trim().toLowerCase();
  const compatGithub =
    compatNormalized === 'github' ||
    compatNormalized === '1' ||
    compatNormalized === 'true';

  return {
    theme: theme as GitHubCommonParams['theme'],
    ...(borderRadius !== null && { borderRadius: parseInt(borderRadius) }),
    ...(showBorder !== null && { showBorder: showBorder === 'true' }),
    ...(borderWidth !== null && { borderWidth: parseInt(borderWidth) }),
    ...(widthParam !== null &&
      !Number.isNaN(Number(widthParam)) && { width: Number(widthParam) }),
    ...(heightParam !== null &&
      !Number.isNaN(Number(heightParam)) && { height: Number(heightParam) }),
    ...(compatGithub && { COMPAT_GITHUB: true }),
  };
}

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

export const dynamic = 'force-dynamic';

export async function handleGitHubLangsRequest(
  request: Request,
  { params }: { params: Promise<{ username: string }> },
): Promise<Response> {
  const { username } = await params;
  const { searchParams } = new URL(request.url);

  try {
    const languages = await fetchGitHubTopLanguages(username);
    const config = parseCommonParams(searchParams);
    const displayName = getDisplayName(searchParams, username);

    const svg = githubLangsStrategy.generate(languages, displayName, config);

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    const config = parseCommonParams(searchParams);
    const svg = githubLangsStrategy.generatePreview(config.theme, config);
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  }
}

export async function handleGitHubLangsPreviewRequest(
  request: Request,
  { params }: { params: Promise<{ theme: string }> },
): Promise<Response> {
  try {
    const { theme: themeParam } = await params;
    const { searchParams } = new URL(request.url);
    const config = parseCommonParams(searchParams);
    const theme = parseTheme(themeParam);

    const svg = githubLangsStrategy.generatePreview(theme, config);

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    return new NextResponse('Erro ao gerar preview', { status: 500 });
  }
}
