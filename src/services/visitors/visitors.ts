import { Redis } from '@upstash/redis';

// A small in‑memory store used when Upstash isn't configured. This allows
// local development, testing and "safe failure" without crashing the app.
const ARMAZENAMENTO_EM_MEMORIA: Record<string, number> = {};
let FALLBACK_EM_MEMORIA: VisitorsStore | null = null;
let SINGLETON_REDIS: VisitorsStore | null = null;

export interface VisitorsStore {
  get(key: string): Promise<number | null>;
  incr(key: string): Promise<number>;
}
function readEnv(...names: string[]): string | undefined {
  for (const NOME of names) {
    const VALOR = process.env[NOME];
    if (VALOR !== undefined && VALOR !== null && VALOR.trim() !== '')
      return VALOR;
  }
  return undefined;
}

/**
 * Obtém instância singleton do cliente Redis do Upstash
 *
 * Utiliza variáveis de ambiente para configuração:
 * - UPSTASH_REDIS_REST_URL ou UPSTASH_REDIS_URL
 * - UPSTASH_REDIS_REST_TOKEN ou UPSTASH_REDIS_TOKEN
 *
 * @returns Instância do cliente Redis
 * @throws Error se as variáveis de ambiente não estiverem configuradas
 *
 * @example
 * ```ts
 * const redis = getVisitorsRedis();
 * void redis.incr('visitor:count');
 * ```
 */
/**
 * Determines whether the Redis client is configured via environment
 * variables. Useful for handlers that need to report status without
 * triggering an exception.
 */
export function isVisitorsRedisConfigured(): boolean {
  const URL = readEnv('UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_URL');
  const TOKEN = readEnv('UPSTASH_REDIS_REST_TOKEN', 'UPSTASH_REDIS_TOKEN');
  return URL !== undefined && TOKEN !== undefined;
}
export function getVisitorsRedis(): VisitorsStore {
  if (SINGLETON_REDIS !== null) return SINGLETON_REDIS;

  // environment values, if present
  const URL = readEnv('UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_URL');
  const TOKEN = readEnv('UPSTASH_REDIS_REST_TOKEN', 'UPSTASH_REDIS_TOKEN');

  // if either value is missing we fall back to an in‑memory implementation
  // rather than blowing up. This matches the "graceful degradation"
  // guidance from the .skills best‑practices docs.
  if (URL === undefined || TOKEN === undefined) {
    if (FALLBACK_EM_MEMORIA === null) {
      FALLBACK_EM_MEMORIA = {
        async get(key: string) {
          return ARMAZENAMENTO_EM_MEMORIA[key] ?? null;
        },
        async incr(key: string) {
          ARMAZENAMENTO_EM_MEMORIA[key] =
            (ARMAZENAMENTO_EM_MEMORIA[key] ?? 0) + 1;
          return ARMAZENAMENTO_EM_MEMORIA[key];
        },
      };
    }
    return FALLBACK_EM_MEMORIA;
  }
  const client = new Redis({
    url: URL,
    token: TOKEN,
  });
  SINGLETON_REDIS = {
    async get(key: string) {
      try {
        const value = await client.get<number>(key);
        return typeof value === 'number' ? value : null;
      } catch {
        return null;
      }
    },
    async incr(key: string) {
      try {
        const value = await client.incr(key);
        return typeof value === 'number' ? value : Number(value) || 0;
      } catch {
        return 0;
      }
    },
  };
  return SINGLETON_REDIS;
}
export function normalizeVisitorId(rawId: string): string | null {
  const IDENTIFICADOR = rawId.trim();

  // ids curtos e previsíveis para evitar abuso/keys gigantes.
  if (IDENTIFICADOR.length < 1 || IDENTIFICADOR.length > 64) return null;
  if (!/^[a-zA-Z0-9_-]+$/.test(IDENTIFICADOR)) return null;
  return IDENTIFICADOR;
}
export function visitorKey(IDENTIFICADOR: string): string {
  return `visitors:${IDENTIFICADOR}`;
}
