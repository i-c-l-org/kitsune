import { useQuery } from '@tanstack/react-query';
import { getBaseUrl } from '@/lib/getBaseUrl';
import type { UseGitHubLangsOptions } from '@/tipos/hooks';

async function fetchGitHubLangs(
  username: string,
  theme: string,
  signal?: AbortSignal,
): Promise<string> {
  try {
    const baseUrl = getBaseUrl();
    const params = new URLSearchParams({ username, theme });
    const response = await fetch(
      `${baseUrl}/api/github-langs?${params.toString()}`,
      { signal: signal ?? null },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub languages');
    }

    return response.text();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Failed to fetch GitHub languages');
  }
}

export function useGitHubLangs({
  username,
  theme = 'dark',
  enabled = true,
}: UseGitHubLangsOptions) {
  return useQuery({
    queryKey: ['github-langs', username, theme],
    queryFn: ({ signal }) => fetchGitHubLangs(username, theme, signal),
    enabled: enabled && username.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGitHubLangsPreview(theme: string) {
  return useQuery({
    queryKey: ['github-langs-preview', theme],
    queryFn: async ({ signal }) => {
      try {
        const baseUrl = getBaseUrl();
        const response = await fetch(
          `${baseUrl}/api/github-langs/preview/${theme}`,
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
