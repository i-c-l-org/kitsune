// Detectar tipo de vídeo pela URL
const YOUTUBE_COM = 'youtube.com';
const YOUTUBE_BE = 'youtu.be';
const VIMEO_COM = 'vimeo.com';
const LOOM_COM = 'loom.com';

function getEmbedUrl(videoUrl: string): string | null {
  let url: URL;
  try {
    url = new URL(videoUrl);
  } catch {
    return null;
  }

  const hostname = url.hostname.toLowerCase();
  const normalizedHost = hostname.startsWith('www.')
    ? hostname.substring(4)
    : hostname;
  const pathname = url.pathname;
  const searchParams = url.searchParams;

  // YouTube
  if (
    normalizedHost === YOUTUBE_COM ||
    normalizedHost === YOUTUBE_BE ||
    normalizedHost.endsWith('.' + YOUTUBE_COM)
  ) {
    let videoId: string | null = null;

    if (normalizedHost === YOUTUBE_BE) {
      const parts = pathname.split('/').filter(Boolean);
      if (parts[0]) videoId = parts[0];
    } else {
      const vParam = searchParams.get('v');
      if (vParam) {
        videoId = vParam;
      } else {
        const parts = pathname.split('/').filter(Boolean);
        const first = parts[0];
        const second = parts[1];
        if (
          parts.length >= 2 &&
          first &&
          second &&
          ['embed', 'v', 'e'].includes(first)
        ) {
          videoId = second;
        }
      }
    }

    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }

  // Vimeo
  if (
    normalizedHost === VIMEO_COM ||
    normalizedHost.endsWith('.' + VIMEO_COM)
  ) {
    const parts = pathname.split('/').filter(Boolean);
    const id = parts[0];
    if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
  }

  // Loom
  if (normalizedHost === LOOM_COM || normalizedHost.endsWith('.' + LOOM_COM)) {
    const parts = pathname.split('/').filter(Boolean);
    if (parts[0] === 'share' && parts[1]) {
      const id = parts[1];
      if (/^[a-zA-Z0-9]+$/.test(id)) return `https://www.loom.com/embed/${id}`;
    }
  }

  // Se já for uma URL embed conhecida, retorna direto
  if (
    (hostname === 'www.youtube.com' || hostname.endsWith('.youtube.com')) &&
    pathname.startsWith('/embed/')
  ) {
    return url.toString();
  }
  if (
    (hostname === 'player.vimeo.com' ||
      hostname.endsWith('.player.vimeo.com')) &&
    pathname.startsWith('/video/')
  ) {
    return url.toString();
  }
  if (
    (hostname === 'www.loom.com' || hostname.endsWith('.loom.com')) &&
    pathname.startsWith('/embed/')
  ) {
    return url.toString();
  }

  return null;
}

export default function VideoEmbed({
  url,
}: {
  url: string;
}): React.ReactElement | null {
  const embedUrl = getEmbedUrl(url);

  if (embedUrl === null) {
    return null;
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        src={embedUrl}
        className="absolute inset-0 size-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video"
      />
    </div>
  );
}
