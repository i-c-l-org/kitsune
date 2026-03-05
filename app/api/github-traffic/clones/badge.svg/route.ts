import { NextResponse } from 'next/server';
import { renderVisitorBadgeSvg } from '@/lib/visitorBadgeSvg';

const DEFAULT_OWNER = 'i-c-l-5-5-5';
const DEFAULT_REPO = 'kitsune';
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

  // GitHub Traffic API retorna janela de 14 dias.
  let message = 'err 503';

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
        message = `${count} | u:${uniques}`;
      } else {
        message = `err ${response.status}`;
      }
    } catch {
      message = 'err 500';
    }
  }

  const svg = renderVisitorBadgeSvg('clones', message, {
    labelBg: '#0f172a',
    valueBg: '#1d4ed8',
    textColor: '#ffffff',
    shape: 'rounded',
  });

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS}`,
    },
  });
}
