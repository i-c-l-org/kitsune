/**
 * API route para geração de badge de status do projeto
 */

import type { NextRequest } from 'next/server';
// eslint-disable-next-line no-duplicate-imports
import { NextResponse } from 'next/server';
import { generateStatusSVG, getTheme } from '@/lib/statusBadgeSvg';
import type { StatusBadgeTheme } from '@/tipos/statusBadge';

const CACHE_DURATION_SECONDS = 3600; // 1 hour

export function GET(request: NextRequest): NextResponse {
  const { searchParams } = request.nextUrl;

  const themeQuery = searchParams.get('theme');
  const themeParam =
    themeQuery !== null && themeQuery.trim() !== '' ? themeQuery : 'ocean';

  const variantQuery = searchParams.get('variant');
  const variant =
    variantQuery !== null && variantQuery.trim() !== ''
      ? variantQuery
      : 'default';

  const theme: StatusBadgeTheme = getTheme(themeParam);

  const svg = generateStatusSVG(theme, variant);

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': `public, max-age=${CACHE_DURATION_SECONDS}, s-maxage=${CACHE_DURATION_SECONDS}`,
    },
  });
}
