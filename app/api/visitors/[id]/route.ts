import { type NextRequest, NextResponse } from 'next/server';
import {
  getVisitorsRedis,
  normalizeVisitorId,
  visitorKey,
  isVisitorsRedisConfigured,
} from '@/services/visitors/visitors';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id: rawId } = await params;

  // validate id first; we return early when invalid instead of throwing
  const id = normalizeVisitorId(rawId);
  if (id === null) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const incrementParam = searchParams.get('increment');
  const shouldIncrement =
    incrementParam === null ? true : incrementParam !== '0';

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
    count = 0;
  }

  return NextResponse.json(
    {
      id,
      count,
      configured,
    },
    {
      headers: {
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*',
        'X-Visitors-Configured': configured ? '1' : '0',
      },
    },
  );
}
