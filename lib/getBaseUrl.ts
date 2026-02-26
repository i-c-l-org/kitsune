/**
 * Retorna a URL base do site de forma inteligente, com fallbacks apropriados
 *
 * Ordem de prioridade:
 * 1. NEXT_PUBLIC_SITE_URL (se definida)
 * 2. NEXT_PUBLIC_CANONICAL_URL (em produção Vercel)
 * 3. VERCEL_URL (em preview/outros ambientes Vercel)
 * 4. http://localhost:3000 (desenvolvimento local)
 *
 * @returns URL base sem trailing slash
 * @throws Error se estiver em produção Vercel sem URLs configuradas
 *
 * @example
 * ```ts
 * const baseUrl = getBaseUrl(); // "https://galeria-tau-ten.vercel.app"
 * const apiUrl = `${baseUrl}/api/stats`;
 * ```
 */

const ENV_SITE_URL = 'NEXT_PUBLIC_SITE_URL';
const ENV_VERCEL_ENV = 'VERCEL_ENV';
const ENV_VERCEL_URL = 'VERCEL_URL';
const ENV_CANONICAL_URL = 'NEXT_PUBLIC_CANONICAL_URL';
const VERCEL_PRODUCTION = 'production';
const HTTPS_PREFIX = 'https://';
const LOCALHOST_URL = 'http://localhost:3000';

export function getBaseUrl(): string {
  const envUrl = process.env[ENV_SITE_URL];
  const vercelEnv = process.env[ENV_VERCEL_ENV];
  const vercelUrl = process.env[ENV_VERCEL_URL];

  const canonicalProductionUrl = process.env[ENV_CANONICAL_URL];

  const normalize = (url: string): string => url.replace(/\/$/, '');

  if (envUrl !== undefined && envUrl !== null && envUrl !== '')
    return normalize(envUrl);

  // Em produção na Vercel, preferimos a URL canônica do projeto (alias),
  // ao invés do deployment URL aleatório em `VERCEL_URL`.
  if (vercelEnv === VERCEL_PRODUCTION) {
    if (
      canonicalProductionUrl !== undefined &&
      canonicalProductionUrl !== null &&
      canonicalProductionUrl !== ''
    ) {
      return normalize(canonicalProductionUrl);
    }

    // Fallback: não derruba o build/deploy se a env canônica não estiver setada.
    // Atenção: isso pode gerar URLs com o deployment URL ao invés do domínio final.
    if (vercelUrl !== undefined && vercelUrl !== null && vercelUrl !== '') {
      console.warn(
        '[getBaseUrl] NEXT_PUBLIC_CANONICAL_URL não configurada em produção; usando VERCEL_URL como fallback.',
      );
      return `${HTTPS_PREFIX}${vercelUrl}`;
    }

    // Falha explícita apenas no ambiente que realmente importa (produção na Vercel).
    throw new Error(
      'Base URL não configurada para produção. Defina NEXT_PUBLIC_CANONICAL_URL (ex: https://seu-dominio) ',
    );
  }

  // Em preview (e outros ambientes Vercel), usar o deployment URL para manter tudo consistente.
  if (vercelUrl !== undefined && vercelUrl !== null && vercelUrl !== '') {
    return `${HTTPS_PREFIX}${vercelUrl}`;
  }

  // Fora da Vercel, mas com URL canônica configurada, usar ela como base.
  if (
    canonicalProductionUrl !== undefined &&
    canonicalProductionUrl !== null &&
    canonicalProductionUrl !== ''
  ) {
    return normalize(canonicalProductionUrl);
  }

  // Último fallback (dev/build local). Evita quebrar o build estático sem env.
  return LOCALHOST_URL;
}
