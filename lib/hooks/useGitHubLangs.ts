import { useQuery } from '@tanstack/react-query';
import { getBaseUrl } from '@/lib/getBaseUrl';

interface UseGitHubLangsOptions {
  username: string;
  theme?: string;
  enabled?: boolean;
}

async function fetchGitHubLangs(
  username: string,
  theme: string,
): Promise<string> {
  const baseUrl = getBaseUrl();
  const response = await fetch(
    `${baseUrl}/api/github-langs/${username}?theme=${theme}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub languages');
  }

  return response.text();
}

export function useGitHubLangs({
  username,
  theme = 'dark',
  enabled = true,
}: UseGitHubLangsOptions) {
  return useQuery({
    queryKey: ['github-langs', username, theme],
    queryFn: () => fetchGitHubLangs(username, theme),
    enabled: enabled && username.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGitHubLangsPreview(theme: string) {
  return useQuery({
    queryKey: ['github-langs-preview', theme],
    queryFn: async () => {
      const baseUrl = getBaseUrl();
      const response = await fetch(
        `${baseUrl}/api/github-langs/preview/${theme}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch preview');
      }

      return response.text();
    },
    staleTime: 10 * 60 * 1000,
  });
}
