import { type NextRequest, NextResponse } from 'next/server';
import {
  getVisitorsRedis,
  normalizeVisitorId,
  visitorKey,
} from '@/lib/visitors';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id: rawId } = await params;
  try {
    const id = normalizeVisitorId(rawId);
    if (id === null) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const incrementParam = searchParams.get('increment');
    const shouldIncrement =
      incrementParam === null ? true : incrementParam !== '0';

    const redis = getVisitorsRedis();
    const key = visitorKey(id);

    let count: number;
    if (shouldIncrement) {
      count = await redis.incr(key).catch((err) => {
        console.error('Visitors counter incr error:', err);
        return 0;
      });
    } else {
      count =
        (await redis.get<number>(key).catch((err) => {
          console.error('Visitors counter get error:', err);
          return null;
        })) ?? 0;
    }

    return NextResponse.json(
      {
        id,
        count,
        configured: true,
      },
      {
        headers: {
          // Sem cache: o valor muda a cada request.
          'Cache-Control': 'no-store',
          // Útil caso você consuma via fetch em sites externos.
          'Access-Control-Allow-Origin': '*',
          'X-Visitors-Configured': '1',
        },
      },
    );
  } catch (error) {
    // Normalmente isso acontece quando as envs do Upstash não estão configuradas.
    console.error('Visitors counter error:', error);
    const id = normalizeVisitorId(rawId) ?? rawId;
    return NextResponse.json(
      {
        id,
        count: 0,
        configured: false,
        error: 'Visitors counter not configured',
      },
      {
        headers: {
          'Cache-Control': 'no-store',
          'Access-Control-Allow-Origin': '*',
          'X-Visitors-Configured': '0',
        },
      },
    );
  }
}
