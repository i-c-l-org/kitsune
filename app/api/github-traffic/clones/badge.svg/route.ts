import { NextResponse } from 'next/server';
import {
  renderCloneBadgeSvg,
  renderCombinedBadgeSvg,
} from '@/lib/cloneBadgeSvg';
import type { VisitorBadgeStyleOptions } from '@/tipos/visitor';

const DEFAULT_OWNER = 'i-c-l-org';
const DEFAULT_REPO = 'i-c-l-org';
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

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const owner = normalizeRepoPart(searchParams.get('owner'), DEFAULT_OWNER, 39);
  const repo = normalizeRepoPart(searchParams.get('repo'), DEFAULT_REPO, 100);
  const token = process.env['GITHUB_TOKEN']?.trim();
  const type =
    searchParams.get('type') === 'uniques'
      ? 'uniques'
      : searchParams.get('type') === 'combined'
        ? 'combined'
        : 'clones';

  const labelGradientStart =
    searchParams.get('labelGradientStart') ?? undefined;
  const labelGradientEnd = searchParams.get('labelGradientEnd') ?? undefined;
  const valueGradientStart =
    searchParams.get('valueGradientStart') ?? undefined;
  const valueGradientEnd = searchParams.get('valueGradientEnd') ?? undefined;

  const hasLabelGradient = labelGradientStart && labelGradientEnd;
  const hasValueGradient = valueGradientStart && valueGradientEnd;

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
        const count =
          typeof data.count === 'number' && Number.isFinite(data.count)
            ? data.count
            : 0;
        const uniques =
          typeof data.uniques === 'number' && Number.isFinite(data.uniques)
            ? data.uniques
            : 0;

        if (type === 'uniques') {
          message = `${uniques}`;
        } else if (type === 'combined') {
          message = `${count}`;
        } else {
          message = `${count}`;
        }
      }
    } catch {
      message = 'n/a';
    }
  }

  if (type === 'combined') {
    let clonesMsg = 'n/a';
    let uniquesMsg = 'n/a';

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
          const count =
            typeof data.count === 'number' && Number.isFinite(data.count)
              ? data.count
              : 0;
          const uniques =
            typeof data.uniques === 'number' && Number.isFinite(data.uniques)
              ? data.uniques
              : 0;
          clonesMsg = `${count}`;
          uniquesMsg = `${uniques}`;
        }
      } catch {
        clonesMsg = 'n/a';
        uniquesMsg = 'n/a';
      }
    }

    const styleOptions: VisitorBadgeStyleOptions = {
      labelBg: '#0f172a',
      valueBg: '#1d4ed8',
      textColor: '#ffffff',
      shape: 'rounded',
    };

    const svg = renderCombinedBadgeSvg(clonesMsg, uniquesMsg, styleOptions);

    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS}`,
      },
    });
  }

  const label = type === 'uniques' ? 'unique visits' : 'clones';

  const gradient: VisitorBadgeStyleOptions['gradient'] =
    hasLabelGradient && hasValueGradient
      ? {
          label: { start: labelGradientStart!, end: labelGradientEnd! },
          value: { start: valueGradientStart!, end: valueGradientEnd! },
        }
      : undefined;

  const styleOptions: VisitorBadgeStyleOptions = {
    labelBg: '#0f172a',
    valueBg: '#1d4ed8',
    textColor: '#ffffff',
    shape: 'rounded',
    ...(gradient ? { gradient } : {}),
  };

  const svg = renderCloneBadgeSvg(label, message, styleOptions);

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS}`,
    },
  });
}
