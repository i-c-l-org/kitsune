import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import './style/globals.css';
import './style/responsive.css';
import './style/components.css';

const SITE_TITLE_DEFAULT = 'Galeria I.C.L';
const SITE_TITLE_TEMPLATE = '%s | Galeria I.C.L';
const SITE_DESCRIPTION =
  'Recursos gratuitos para seus perfis no GitHub - SVGs e Blog';
const SITE_KEYWORDS = [
  'svg',
  'github',
  'galeria',
  'blog',
  'recursos gratuitos',
  'icl',
  'desenvolvimento',
];
const AUTHOR_NAME = 'I.C.L';
const AUTHOR_URL = 'https://github.com/icl';
const OG_TYPE = 'website';
const OG_LOCALE = 'pt_BR';
const OG_SITE_NAME = 'Galeria I.C.L';
const OG_DESCRIPTION = 'Recursos gratuitos para seus perfis no GitHub';
const TWITTER_CARD = 'summary_large_image';
const TWITTER_TITLE = 'Galeria I.C.L';
const TWITTER_DESCRIPTION = 'Recursos gratuitos para seus perfis no GitHub';
// icon file moved into /icons folder
const ICON_IMAGE = '/icons/i.c.l.jpg';
const TWITTER_IMAGE = ICON_IMAGE;
const MAX_VIDEO_PREVIEW = -1;
const MAX_IMAGE_PREVIEW = 'large';
const MAX_SNIPPET = -1;
const ICON_TYPE_PNG = 'image/png';
const ICON_SIZES_32 = '32x32';
const ICON_SIZES_192 = '192x192';
const ICON_SIZES_512 = '512x512';
const MANIFEST_PATH = '/manifest.json';
const VIEWPORT_WIDTH = 'device-width';
const INITIAL_SCALE = 1;
const MAXIMUM_SCALE = 5;
const HTML_LANG = 'pt-BR';
const SCROLL_BEHAVIOR = 'smooth';
const PRECONNECT_HREF = 'https://cdnjs.cloudflare.com';

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE_DEFAULT,
    template: SITE_TITLE_TEMPLATE,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  openGraph: {
    title: SITE_TITLE_DEFAULT,
    description: OG_DESCRIPTION,
    type: OG_TYPE,
    locale: OG_LOCALE,
    siteName: OG_SITE_NAME,
  },
  twitter: {
    card: TWITTER_CARD,
    title: TWITTER_TITLE,
    description: TWITTER_DESCRIPTION,
    images: [TWITTER_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': MAX_VIDEO_PREVIEW,
      'max-image-preview': MAX_IMAGE_PREVIEW,
      'max-snippet': MAX_SNIPPET,
    },
  },
  icons: {
    icon: [
      { url: ICON_IMAGE, type: ICON_TYPE_PNG },
      { url: ICON_IMAGE, sizes: ICON_SIZES_32 },
      {
        url: ICON_IMAGE,
        sizes: ICON_SIZES_192,
        type: ICON_TYPE_PNG,
      },
      {
        url: ICON_IMAGE,
        sizes: ICON_SIZES_512,
        type: ICON_TYPE_PNG,
      },
    ],
    apple: ICON_IMAGE,
  },
  manifest: MANIFEST_PATH,
};

export const viewport = {
  width: VIEWPORT_WIDTH,
  initialScale: INITIAL_SCALE,
  maximumScale: MAXIMUM_SCALE,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang={HTML_LANG} data-scroll-behavior={SCROLL_BEHAVIOR}>
      <head>
        {/* Preconnect para melhor performance */}
        <link rel="preconnect" href={PRECONNECT_HREF} />
        <link rel="dns-prefetch" href={PRECONNECT_HREF} />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* Harmoniza cor da UI do navegador com o background */}
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="m-0 min-h-screen p-0">
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
