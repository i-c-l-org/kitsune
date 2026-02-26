import { Redis } from '@upstash/redis';

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
export function getVisitorsRedis(): Redis {
  if (redisSingleton !== null) return redisSingleton;

  // Preferimos configurar explicitamente para:
  // - suportar nomes alternativos
  // - dar erro mais previsível quando faltar env
  const url = readEnv('UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_URL');
  const token = readEnv('UPSTASH_REDIS_REST_TOKEN', 'UPSTASH_REDIS_TOKEN');

  if (url === undefined || token === undefined) {
    throw new Error(
      'Upstash Redis env not configured. Expected UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.',
    );
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
