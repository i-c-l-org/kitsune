import { NextResponse } from 'next/server';
import {
  getVisitorsRedis,
  normalizeVisitorId,
  visitorKey,
  isVisitorsRedisConfigured,
} from '@/services/visitors/visitors';
import { renderVisitorBadgeSvg } from '@/lib/visitorBadgeSvg';

function normalizeHexColor(value: string | null): string | undefined {
  if (value === null) return undefined;
  const trimmed = value.trim();
  if (trimmed === '') return undefined;

  const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
  // Aceita apenas hex curto (3) ou completo (6) para evitar valores maliciosos.
  if (
    /^#[0-9a-fA-F]{3}$/.test(withHash) ||
    /^#[0-9a-fA-F]{6}$/.test(withHash)
  ) {
    return withHash;
  }
  return undefined;
}

function normalizeShape(
  value: string | null,
): 'rounded' | 'square' | 'pill' | undefined {
  if (value === null) return undefined;
  switch (value.trim().toLowerCase()) {
    case 'rounded':
      return 'rounded';
    case 'square':
      return 'square';
    case 'pill':
      return 'pill';
    default:
      return undefined;
  }
}

function normalizeGradientColor(
  value: string | null,
): string | undefined {
  if (value === null) return undefined;
  const trimmed = value.trim();
  if (trimmed === '') return undefined;
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed) || /^#[0-9a-fA-F]{6}$/.test(trimmed)) {
    return trimmed;
  }
  return undefined;
}

function normalizeLabel(value: string | null): string | undefined {
  if (value === null) return undefined;
  const trimmed = value.trim();
  if (trimmed === '') return undefined;
  // Allow only a safe subset of characters and limit length to avoid abuse.
  const cleaned = trimmed
    .replace(/[^0-9A-Za-zÀ-ÿ .,_\-+:/]/g, '')
    .slice(0, 100);
  return cleaned === '' ? undefined : cleaned;
}

export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id: rawId } = await params;
  const id = normalizeVisitorId(rawId);
  if (id === null) {
    return new NextResponse('Invalid id', {
      status: 400,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  const { searchParams } = new URL(request.url);
  const label = normalizeLabel(searchParams.get('label')) ?? 'visitors';
  const incrementParam = searchParams.get('increment');
  const shouldIncrement =
    incrementParam === null ? true : incrementParam !== '0';

  const labelBg = normalizeHexColor(searchParams.get('labelColor'));
  const valueBg = normalizeHexColor(searchParams.get('valueColor'));
  const textColor = normalizeHexColor(searchParams.get('textColor'));
  const shape = normalizeShape(searchParams.get('shape'));

  const labelGradientStart = normalizeGradientColor(searchParams.get('labelGradientStart'));
  const labelGradientEnd = normalizeGradientColor(searchParams.get('labelGradientEnd'));
  const valueGradientStart = normalizeGradientColor(searchParams.get('valueGradientStart'));
  const valueGradientEnd = normalizeGradientColor(searchParams.get('valueGradientEnd'));

  const hasLabelGradient = labelGradientStart !== undefined && labelGradientEnd !== undefined;
  const hasValueGradient = valueGradientStart !== undefined && valueGradientEnd !== undefined;

  const styleOptions = {
    ...(labelBg !== undefined ? { labelBg } : {}),
    ...(valueBg !== undefined ? { valueBg } : {}),
    ...(textColor !== undefined ? { textColor } : {}),
    ...(shape !== undefined ? { shape } : {}),
    ...(hasLabelGradient || hasValueGradient
      ? {
          gradient: {
            label: {
              start: labelGradientStart!,
              end: labelGradientEnd!,
            },
            value: {
              start: valueGradientStart!,
              end: valueGradientEnd!,
            },
          },
        }
      : {}),
  };

  const configured = isVisitorsRedisConfigured();
  const redis = getVisitorsRedis();
  const key = visitorKey(id);

  let count = 0;
  try {
    if (shouldIncrement) {
      count = await redis.incr(key);
    } else {
      count = (await redis.get(key)) ?? 0;
    }
  } catch (err) {
    console.error('Visitors badge operation error:', err);
    count = 0;
  }

  const svg = renderVisitorBadgeSvg(label, String(count), styleOptions);
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      // GitHub tende a cachear imagens; force revalidação.
      'Cache-Control': 'no-store',
      'X-Visitors-Configured': configured ? '1' : '0',
    },
  });
}
