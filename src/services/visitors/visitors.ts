import { Redis } from '@upstash/redis';

// A small in‑memory store used when Upstash isn't configured. This allows
// local development, testing and "safe failure" without crashing the app.
const inMemoryStore: Record<string, number> = {};
let inMemoryFallback: Redis | null = null;
let redisSingleton: Redis | null = null;

function readEnv(...names: string[]): string | undefined {
  for (const name of names) {
    const value = process.env[name];
    if (value !== undefined && value !== null && value.trim() !== '')
      return value;
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
  const url = readEnv('UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_URL');
  const token = readEnv('UPSTASH_REDIS_REST_TOKEN', 'UPSTASH_REDIS_TOKEN');
  return url !== undefined && token !== undefined;
}

export function getVisitorsRedis(): Redis {
  if (redisSingleton !== null) return redisSingleton;

  // environment values, if present
  const url = readEnv('UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_URL');
  const token = readEnv('UPSTASH_REDIS_REST_TOKEN', 'UPSTASH_REDIS_TOKEN');

  // if either value is missing we fall back to an in‑memory implementation
  // rather than blowing up. This matches the "graceful degradation"
  // guidance from the .skills best‑practices docs.
  if (url === undefined || token === undefined) {
    if (inMemoryFallback === null) {
      inMemoryFallback = {
        async get(key: string) {
          return (inMemoryStore[key] ?? null) as unknown as any;
        },
        async incr(key: string) {
          inMemoryStore[key] = (inMemoryStore[key] ?? 0) + 1;
          return inMemoryStore[key] as unknown as any;
        },
      } as unknown as Redis;
    }
    return inMemoryFallback;
  }

  redisSingleton = new Redis({ url, token });
  return redisSingleton;
}

export function normalizeVisitorId(rawId: string): string | null {
  const id = rawId.trim();

  // ids curtos e previsíveis para evitar abuso/keys gigantes.
  if (id.length < 1 || id.length > 64) return null;
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) return null;

  return id;
}

export function visitorKey(id: string): string {
  return `visitors:${id}`;
}
