import { NextResponse } from 'next/server';
import { renderCloneBadgeSvg } from '@/lib/cloneBadgeSvg';
import type { VisitorBadgeStyleOptions } from '@/tipos/visitor';

const CACHE_SECONDS = 3600;

interface GitHubTrafficClonesResponse {
  count?: number;
  uniques?: number;
}

function normalizeRepoPart(
  input: string | null,
  fallback: string,
  maxLength: number,
): string {
  if (input === null) return fallback;
  const trimmed = input.trim();
  if (trimmed === '') return fallback;
  if (trimmed.length > maxLength) return fallback;
  if (!/^[A-Za-z0-9_.-]+$/.test(trimmed)) return fallback;
  return trimmed;
}

export const runtime = 'nodejs';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ owner: string; repo: string }> },
): Promise<NextResponse> {
  const { owner: rawOwner, repo: rawRepo } = await params;
  const owner = normalizeRepoPart(rawOwner, 'i-c-l-org', 39);
  const repo = normalizeRepoPart(rawRepo, 'kitsune', 100);

  const { searchParams } = new URL(request.url);

  const labelGradientStart =
    searchParams.get('labelGradientStart') ?? undefined;
  const labelGradientEnd = searchParams.get('labelGradientEnd') ?? undefined;
  const valueGradientStart =
    searchParams.get('valueGradientStart') ?? undefined;
  const valueGradientEnd = searchParams.get('valueGradientEnd') ?? undefined;

  const hasLabelGradient = labelGradientStart && labelGradientEnd;
  const hasValueGradient = valueGradientStart && valueGradientEnd;

  const token = process.env['GITHUB_TOKEN']?.trim();
  let message = 'n/a';

  if (token !== undefined && token !== '') {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/traffic/clones`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${token}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
          cache: 'no-store',
        },
      );

      if (response.ok) {
        const data = (await response.json()) as GitHubTrafficClonesResponse;
        const uniques =
          typeof data.uniques === 'number' && Number.isFinite(data.uniques)
            ? data.uniques
            : 0;
        message = `${uniques}`;
      }
    } catch {
      message = 'n/a';
    }
  }

  const gradient: VisitorBadgeStyleOptions['gradient'] =
    hasLabelGradient && hasValueGradient
      ? {
          label: { start: labelGradientStart!, end: labelGradientEnd! },
          value: { start: valueGradientStart!, end: valueGradientEnd! },
        }
      : undefined;

  const styleOptions: VisitorBadgeStyleOptions = {
    labelBg: '#000000',
    valueBg: '#120077',
    textColor: '#ffffff',
    shape: 'rounded',
    ...(gradient ? { gradient } : {}),
  };

  const svg = renderCloneBadgeSvg('unique visits', message, styleOptions);

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS}`,
    },
  });
}
