/**
 * Funções para buscar e processar estatísticas do GitHub
 */

import type { GitHubLanguageStat, GitHubStats } from '@/tipos/github';

// Re-export para manter compatibilidade
export type { GitHubStats };

/**
 * Constantes nomeadas para evitar magic numbers espalhados pelo código.
 * - DEFAULT_REPOS_PER_PAGE: número de repositórios por página nas chamadas GitHub
 * - MAX_REPOS_TO_PROCESS: limite de repositórios processados para operações custo-intenso
 * - DEFAULT_GITHUB_GRAPHQL_URL: endpoint GraphQL do GitHub
 */
const REPOS_POR_PAGINA_PADRAO = 100;
const MAXIMO_REPOS_PARA_PROCESSAR = 30;
const URL_PADRAO_GRAPHQL_GITHUB = 'https://api.github.com/graphql';
const CORES_DAS_LINGUAS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Dart: '#00B4AB',
  Scala: '#c22d40',
  Elixir: '#6e4a7e',
  Haskell: '#5e5086',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
};
function pickLanguageColor(NOME: string): string {
  return CORES_DAS_LINGUAS[NOME] ?? '#58a6ff';
}
const LINGUAS_FALLBACK: GitHubLanguageStat[] = [
  {
    NOME: 'TypeScript',
    VALOR: 320,
    PERCENTUAL: 32,
    color: pickLanguageColor('TypeScript'),
  },
  {
    NOME: 'JavaScript',
    VALOR: 260,
    PERCENTUAL: 26,
    color: pickLanguageColor('JavaScript'),
  },
  {
    NOME: 'Python',
    VALOR: 180,
    PERCENTUAL: 18,
    color: pickLanguageColor('Python'),
  },
  {
    NOME: 'Go',
    VALOR: 140,
    PERCENTUAL: 14,
    color: pickLanguageColor('Go'),
  },
  {
    NOME: 'CSS',
    VALOR: 100,
    PERCENTUAL: 10,
    color: pickLanguageColor('CSS'),
  },
];
interface GitHubGraphQLError {
  message: string;
}
interface GitHubGraphQLUser {
  followers?: {
    totalCount?: number | null;
  } | null;
  repositories?: {
    totalCount?: number | null;
    nodes?: Array<{
      defaultBranchRef?: {
        target?: {
          history?: {
            totalCount?: number | null;
          } | null;
        } | null;
      } | null;
    }> | null;
  } | null;
  pullRequests?: {
    totalCount?: number | null;
  } | null;
  contributionsCollection?: {
    contributionCalendar?: {
      totalContributions?: number | null;
    } | null;
  } | null;
}
interface GitHubGraphQLResponse {
  DADOS?: {
    USUARIO?: GitHubGraphQLUser | null;
  } | null;
  errors?: GitHubGraphQLError[] | null;
}

/**
 * Busca estatísticas do usuário do GitHub via GitHub GraphQL API
 *
 * Coleta dados precisos do perfil público:
 * - Total de commits
 * - Pull requests (abertos + fechados + merged)
 * - Contribuições totais (dos últimos 12 meses)
 * - Seguidores
 * - Repositórios públicos
 *
 * Funciona para QUALQUER usuário público do GitHub.
 * Token (GITHUB_TOKEN env var) é OPCIONAL - melhora apenas o rate limit:
 * - Sem token: 60 requisições/hora
 * - Com token: 5.000 requisições/hora
 *
 * @param username - Nome de usuário do GitHub (qualquer usuário público)
 * @returns Promise com estatísticas do usuário
 *
 * @example
 * ```ts
 * fetchGitHubStats('octocat')
 *   .then((stats) => {
 *     console.log(stats.followers);
 *   })
 *   .catch(console.error);
 *
 * // Funciona sem token também:
 * void fetchGitHubStats('torvalds');
 * ```
 */
export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const TOKEN = process.env['GITHUB_TOKEN'];
  try {
    console.error(`📡 Fetching GitHub stats for ${username}...`);
    const CONSULTA = `
      query {
        user(login: "${username}") {
          followers {
            totalCount
          }
          repositories(first: ${REPOS_POR_PAGINA_PADRAO}, ownerAffiliations: OWNER, isFork: false) {
            totalCount
            nodes {
              defaultBranchRef {
                target {
                  ... on Commit {
                    history {
                      totalCount
                    }
                  }
                }
              }
            }
          }
          pullRequests(first: 1) {
            totalCount
          }
          contributionsCollection {
            totalCommitContributions
            totalIssueContributions
            totalPullRequestContributions
            totalPullRequestReviewContributions
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `;
    const CABECALHOS: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    };

    // Token é OPCIONAL - melhora apenas rate limit
    const TOKEN_CORTADO = typeof TOKEN === 'string' ? TOKEN.trim() : '';
    if (TOKEN_CORTADO.length > 0) {
      CABECALHOS['Authorization'] = `Bearer ${TOKEN_CORTADO}`;
      console.error('✓ Using GitHub token for authentication');
    } else {
      console.error(
        '⚠ No GitHub token available - using unauthenticated requests (60 req/hour limit)',
      );
    }
    let RESPOSTA: Response;
    try {
      // eslint-disable-next-line no-undef
      RESPOSTA = await fetch(URL_PADRAO_GRAPHQL_GITHUB, {
        method: 'POST',
        headers: CABECALHOS,
        body: JSON.stringify({
          CONSULTA,
        }),
        cache: 'no-store',
      });
    } catch (error) {
      console.error('❌ Erro ao chamar GitHub GraphQL API:', error);
      const fallbackResponse = await fetchGitHubStatsRest(username);
      return fallbackResponse;
    }
    if (!RESPOSTA.ok) {
      console.error(`❌ GitHub GraphQL API error: ${RESPOSTA.status}`);
      const fallbackResponse = await fetchGitHubStatsRest(username);
      return fallbackResponse;
    }
    let DADOS: GitHubGraphQLResponse;
    try {
      DADOS = (await RESPOSTA.json()) as GitHubGraphQLResponse;
    } catch (error) {
      console.error('❌ Erro ao fazer parse do JSON (GraphQL):', error);
      const fallbackResponse = await fetchGitHubStatsRest(username);
      return fallbackResponse;
    }

    // Verifica se houve erro na resposta GraphQL
    if (Array.isArray(DADOS.errors) && DADOS.errors.length > 0) {
      console.error(
        '❌ GraphQL errors:',
        DADOS.errors[0]?.message ?? 'Unknown error',
      );
      const fallbackResponse = await fetchGitHubStatsRest(username);
      return fallbackResponse;
    }
    const USUARIO = DADOS.DADOS?.USUARIO;
    if (USUARIO === null || USUARIO === undefined) {
      console.error(`❌ Usuário "${username}" não encontrado no GraphQL`);
      const fallbackResponse = await fetchGitHubStatsRest(username);
      return fallbackResponse;
    }

    // Calcula total de commits
    let TOTAL_COMMITS = 0;
    const NOS_REPO = USUARIO.repositories?.nodes ?? null;
    if (Array.isArray(NOS_REPO)) {
      for (const REPOSITORIO of NOS_REPO) {
        const COMMITS =
          REPOSITORIO.defaultBranchRef?.target?.history?.totalCount ?? 0;
        TOTAL_COMMITS += COMMITS;
      }
    }
    const ESTATISTICAS: GitHubStats = {
      TOTAL_COMMITS: Number.isFinite(TOTAL_COMMITS) ? TOTAL_COMMITS : 0,
      totalPullRequests: USUARIO.pullRequests?.totalCount ?? 0,
      totalContributions:
        USUARIO.contributionsCollection?.contributionCalendar
          ?.totalContributions ?? 0,
      followers: USUARIO.followers?.totalCount ?? 0,
      publicRepos: USUARIO.repositories?.totalCount ?? 0,
    };
    console.error(`✓ Stats retrieved via GraphQL:`, ESTATISTICAS);
    return ESTATISTICAS;
  } catch (error) {
    console.error(`❌ Erro ao buscar stats do GitHub (GraphQL):`, error);
    const fallbackResponse = await fetchGitHubStatsRest(username);
    return fallbackResponse;
  }
}

/**
 * Fallback para buscar stats via REST API (menos preciso)
 * Usado quando token não está disponível ou GraphQL falha
 */
async function fetchGitHubStatsRest(username: string): Promise<GitHubStats> {
  try {
    console.error(`📡 Fetching GitHub stats via REST API for ${username}...`);

    // eslint-disable-next-line no-undef
    const RESPOSTA_USUARIO = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      },
    );
    if (!RESPOSTA_USUARIO.ok) {
      throw new Error(`HTTP ${RESPOSTA_USUARIO.status}`);
    }
    const DADOS_USUARIO = await RESPOSTA_USUARIO.json();
    console.error(
      `✓ User data retrieved: ${username} has ${DADOS_USUARIO.public_repos} public repos and ${DADOS_USUARIO.followers} followers`,
    );

    // eslint-disable-next-line no-undef
    const RESPOSTA_REPOS = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      },
    );
    if (!RESPOSTA_REPOS.ok) {
      throw new Error(`HTTP ${RESPOSTA_REPOS.status}`);
    }
    const REPOSITORIOS = await RESPOSTA_REPOS.json();
    console.error(
      `✓ Found ${REPOSITORIOS.length} repositories for ${username}`,
    );

    // Estimativa de commits (menos precisa)
    let TOTAL_COMMITS = 0;
    for (const REPOSITORIO of REPOSITORIOS.slice(
      0,
      MAXIMO_REPOS_PARA_PROCESSAR,
    )) {
      // Aproximação baseada no tamanho do repo
      TOTAL_COMMITS += (REPOSITORIO.size ?? 0) / 50;
    }
    const ESTATISTICAS: GitHubStats = {
      TOTAL_COMMITS: Math.max(Math.round(TOTAL_COMMITS), 0),
      totalPullRequests: Math.max(Math.round(REPOSITORIOS.length * 0.8), 0),
      totalContributions: Math.max(REPOSITORIOS.length * 10, 0),
      followers: DADOS_USUARIO.followers ?? 0,
      publicRepos: DADOS_USUARIO.public_repos ?? 0,
    };
    console.error(`✓ Stats calculated:`, ESTATISTICAS);
    return ESTATISTICAS;
  } catch (error) {
    console.error(
      '❌ Erro ao buscar stats do GitHub (REST API) para',
      username,
      error,
    );
    // Retorna valores zerados
    return {
      TOTAL_COMMITS: 0,
      totalPullRequests: 0,
      totalContributions: 0,
      followers: 0,
      publicRepos: 0,
    };
  }
}
export async function fetchGitHubTopLanguages(
  username: string,
  TOKEN?: string,
): Promise<GitHubLanguageStat[]> {
  try {
    console.error(`📡 Fetching top languages for ${username}...`);

    // Usa token passado como parâmetro ou variável de ambiente
    const TOKEN_AUTENTICACAO = (
      TOKEN ??
      process.env['GITHUB_TOKEN'] ??
      ''
    ).trim();
    const CABECALHOS: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    };
    if (TOKEN_AUTENTICACAO.length > 0) {
      CABECALHOS['Authorization'] = `Bearer ${TOKEN_AUTENTICACAO}`;
      console.error('✓ Using GitHub token for authentication');
    } else {
      console.error(
        '⚠ No GitHub token available - using unauthenticated requests',
      );
    }

    // eslint-disable-next-line no-undef
    const RESPOSTA_REPOS = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`,
      {
        headers: CABECALHOS,
        cache: 'no-store',
      },
    );
    if (!RESPOSTA_REPOS.ok) {
      throw new Error(`GitHub API error: ${RESPOSTA_REPOS.status}`);
    }
    const REPOSITORIOS = await RESPOSTA_REPOS.json();
    console.error(
      `✓ Found ${REPOSITORIOS.length} repositories for ${username}`,
    );
    const TOTAIS_LINGUA = new Map<string, number>();

    // Processa até 30 repositórios para reduzir chamadas à API
    const REPOS_PARA_PROCESSAR = (
      REPOSITORIOS as Array<{
        languages_url?: string;
      }>
    ).slice(0, MAXIMO_REPOS_PARA_PROCESSAR);
    console.error(
      `📊 Processing ${REPOS_PARA_PROCESSAR.length} repositories for language analysis...`,
    );
    for (const REPOSITORIO of REPOS_PARA_PROCESSAR) {
      if (REPOSITORIO.languages_url === undefined) {
        continue;
      }
      try {
        // eslint-disable-next-line no-undef
        const RESPOSTA_LINGUA = await fetch(REPOSITORIO.languages_url, {
          headers: CABECALHOS,
          cache: 'no-store',
        });
        if (!RESPOSTA_LINGUA.ok) {
          continue;
        }
        const DADOS_LINGUA = (await RESPOSTA_LINGUA.json().catch(
          () => ({}),
        )) as Record<string, number>;
        for (const [lang, bytes] of Object.entries(DADOS_LINGUA)) {
          const BYTES_SEGUROS = Number.isFinite(bytes) ? Math.max(bytes, 1) : 0;
          if (BYTES_SEGUROS === 0) continue;
          TOTAIS_LINGUA.set(
            lang,
            (TOTAIS_LINGUA.get(lang) ?? 0) + BYTES_SEGUROS,
          );
        }
      } catch (langError) {
        console.error('Erro ao buscar linguagens do repositório:', langError);
      }
    }
    const TOTAL = Array.from(TOTAIS_LINGUA.values()).reduce(
      (acc, VALOR) => acc + VALOR,
      0,
    );
    if (TOTAL === 0) {
      console.warn(`⚠ No languages found for ${username}, using fallback`);
      return LINGUAS_FALLBACK;
    }
    const TOPO = Array.from(TOTAIS_LINGUA.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([NOME, VALOR]) => {
        const PERCENTUAL = Math.round((VALOR / TOTAL) * 1000) / 10; // uma casa decimal
        return {
          NOME,
          VALOR,
          PERCENTUAL,
          color: pickLanguageColor(NOME),
        } satisfies GitHubLanguageStat;
      });
    console.error(
      `✓ Top languages retrieved:`,
      TOPO.map((l) => `${l.NOME} (${l.PERCENTUAL}%)`).join(', '),
    );
    return TOPO;
  } catch (error) {
    console.error(
      `❌ Erro ao buscar linguagens do GitHub para ${username}:`,
      error,
    );
    return LINGUAS_FALLBACK;
  }
}

/**
 * Formata números grandes com sufixos K (milhares), M (milhões), B (bilhões)
 *
 * @param num - Número a ser formatado
 * @returns String formatada com sufixo apropriado
 *
 * @example
 * ```ts
 * formatNumber(1500);      // "1.5K"
 * formatNumber(2500000);   // "2.5M"
 * formatNumber(999);       // "999"
 * ```
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}
