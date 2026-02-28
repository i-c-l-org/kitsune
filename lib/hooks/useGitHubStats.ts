import { useQuery } from '@tanstack/react-query';
import { getBaseUrl } from '@/lib/getBaseUrl';

export interface GitHubStats {
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalRepos: number;
  rank: string;
}

interface UseGitHubStatsOptions {
  username: string;
  theme?: string;
  width?: string;
  height?: string;
  enabled?: boolean;
}

async function fetchGitHubStats(
  username: string,
  theme: string,
  width?: string,
  height?: string,
): Promise<string> {
  const baseUrl = getBaseUrl();
  const params = new URLSearchParams();
  params.set('theme', theme);
  if (width) params.set('width', width);
  if (height) params.set('height', height);

  const response = await fetch(
    `${baseUrl}/api/github-stats/${username}?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub stats');
  }

  return response.text();
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
    queryFn: () => fetchGitHubStats(username, theme, width, height),
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
    queryFn: async () => {
      const baseUrl = getBaseUrl();
      const params = new URLSearchParams();
      if (width) params.set('width', width);
      if (height) params.set('height', height);

      const response = await fetch(
        `${baseUrl}/api/github-stats/preview/${theme}${params.toString() ? `?${params.toString()}` : ''}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch preview');
      }

      return response.text();
    },
    staleTime: 10 * 60 * 1000,
  });
}
