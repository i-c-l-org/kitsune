import type { MetadataRoute } from 'next';

const MANIFEST_NAME = 'Galeria I.C.L';
const MANIFEST_SHORT_NAME = 'Galeria I.C.L';
const MANIFEST_DESCRIPTION =
  'Recursos gratuitos para seus perfis no GitHub - SVGs e Blog';
const START_URL = '/';
const DISPLAY_MODE = 'standalone';
const BACKGROUND_COLOR = '#000000';
const THEME_COLOR = '#007acc';
const ICON_TYPE_ICO = 'image/x-icon';
const ICON_TYPE_PNG = 'image/png';
const ICON_SIZE_32 = '32x32';
const ICON_SIZE_192 = '192x192';
const ICON_SIZE_512 = '512x512';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: MANIFEST_NAME,
    short_name: MANIFEST_SHORT_NAME,
    description: MANIFEST_DESCRIPTION,
    start_url: START_URL,
    display: DISPLAY_MODE,
    background_color: BACKGROUND_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      {
        src: '/icons/i.c.l.jpg',
        sizes: ICON_SIZE_32,
        type: ICON_TYPE_ICO,
      },
      {
        src: '/icons/i.c.l.jpg',
        sizes: ICON_SIZE_192,
        type: ICON_TYPE_PNG,
      },
      {
        src: '/icons/i.c.l.jpg',
        sizes: ICON_SIZE_512,
        type: ICON_TYPE_PNG,
      },
    ],
  };
}
