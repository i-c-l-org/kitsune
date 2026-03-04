import { useQuery } from '@tanstack/react-query';
import { getBaseUrl } from '@/lib/getBaseUrl';
import type { GitHubStats } from '@/tipos/github';
import type { UseGitHubStatsOptions } from '@/tipos/hooks';

export type { GitHubStats };

async function fetchGitHubStats(
  username: string,
  theme: string,
  signal?: AbortSignal,
  width?: string,
  height?: string,
): Promise<string> {
  try {
    const baseUrl = getBaseUrl();
    const params = new URLSearchParams();
    params.set('username', username);
    params.set('theme', theme);
    if (width) params.set('width', width);
    if (height) params.set('height', height);

    const response = await fetch(
      `${baseUrl}/api/github-stats?${params.toString()}`,
      { signal: signal ?? null },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub stats');
    }

    return response.text();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Failed to fetch GitHub stats');
  }
}

export function useGitHubStats({
  username,
  theme = 'dark',
  width,
  height,
  enabled = true,
}: UseGitHubStatsOptions) {
  return useQuery({
    queryKey: ['github-stats', username, theme, width, height],
    queryFn: ({ signal }) =>
      fetchGitHubStats(username, theme, signal, width, height),
    enabled: enabled && username.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGitHubStatsPreview(
  theme: string,
  width?: string,
  height?: string,
) {
  return useQuery({
    queryKey: ['github-stats-preview', theme, width, height],
    queryFn: async ({ signal }) => {
      try {
        const baseUrl = getBaseUrl();
        const params = new URLSearchParams();
        if (width) params.set('width', width);
        if (height) params.set('height', height);

        const response = await fetch(
          `${baseUrl}/api/github-stats/preview/${theme}${params.toString() ? `?${params.toString()}` : ''}`,
          { signal: signal ?? null },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch preview');
        }

        return response.text();
      } catch (error) {
        throw error instanceof Error
          ? error
          : new Error('Failed to fetch preview');
      }
    },
    staleTime: 10 * 60 * 1000,
  });
}
