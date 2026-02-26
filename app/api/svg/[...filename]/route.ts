import fs from 'fs';
import path from 'path';
import { type NextRequest, NextResponse } from 'next/server';
import { isValidDimension, manipulateSvgDimensions } from '../svgManipulator';
import type { CacheEntry } from '@/tipos/svg';

// Cache simples em memória; invalida quando o mtime do arquivo muda.
const svgCache = new Map<string, CacheEntry>();

const SVG_ROOT = path.join(process.cwd(), 'public', 'svg');
const MAX_WALK = 10000;

function isSafeSvgRequestPath(filename: string): boolean {
  if (filename.trim() === '') return false;
  // Bloqueia path traversal e paths absolutos (POSIX/Windows).
  if (filename.includes('..')) return false;
  if (filename.startsWith('/') || filename.startsWith('\\')) return false;
  if (filename.includes('\\')) return false;
  if (path.isAbsolute(filename)) return false;
  // Apenas SVGs.
  if (!filename.toLowerCase().endsWith('.svg')) return false;
  // Permite somente caracteres previsíveis (evita espaços, % estranhos, etc.).
  if (!/^[a-zA-Z0-9._\-/]+$/.test(filename)) return false;
  return true;
}

function findSvgPath(filename: string): string | null {
  // caminho direto (permite subpastas na URL)
  const direct = path.join(SVG_ROOT, filename);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return direct;

  // busca por basename dentro de public/svg (recursiva, BFS)
  const target = path.basename(filename);
  const stack: string[] = [SVG_ROOT];
  let iterations = 0;
  while (stack.length > 0) {
    if (++iterations > MAX_WALK) break;
    const cur = stack.shift();
    if (cur === undefined) break;
    let entries: string[];
    try {
      entries = fs.readdirSync(cur);
    } catch {
      continue;
    }
    for (const entry of entries) {
      const full = path.join(cur, entry);
      try {
        const st = fs.statSync(full);
        if (st.isDirectory()) {
          stack.push(full);
        } else if (st.isFile() && entry === target) {
          return full;
        }
      } catch {
        // ignora entradas inacessíveis
      }
    }
  }
  return null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string | string[] }> },
): Promise<NextResponse> {
  try {
    const { filename: raw } = await params;
    const filename = Array.isArray(raw) ? raw.join('/') : raw;

    if (!isSafeSvgRequestPath(filename)) {
      return new NextResponse('Invalid path', { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const widthParam = searchParams.get('width') ?? searchParams.get('w');
    const heightParam = searchParams.get('height') ?? searchParams.get('h');
    const fitParam = searchParams.get('fit');

    const widthInfo = isValidDimension(widthParam);
    const heightInfo = isValidDimension(heightParam);
    if (widthParam !== null && widthInfo.ok === false)
      return new NextResponse('Invalid width parameter', { status: 400 });
    if (heightParam !== null && heightInfo.ok === false)
      return new NextResponse('Invalid height parameter', { status: 400 });

    const svgPath = findSvgPath(filename);
    if (svgPath === null)
      return new NextResponse('SVG not found', { status: 404 });

    const stat = fs.statSync(svgPath);
    const cached = svgCache.get(svgPath);
    const isFresh = cached?.mtimeMs === stat.mtimeMs;
    const baseContent = isFresh
      ? cached.content
      : fs.readFileSync(svgPath, 'utf-8');
    if (!isFresh) {
      svgCache.set(svgPath, { content: baseContent, mtimeMs: stat.mtimeMs });
    }

    let svgContent = baseContent;
    svgContent = manipulateSvgDimensions(
      svgContent,
      widthParam,
      heightParam,
      fitParam,
    );
    return new NextResponse(svgContent, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving SVG:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
