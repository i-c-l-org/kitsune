'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import CodeModal from '../../../components/ui/CodeModal';
import SVGGalleryNotification from '../../../components/ui/SVGGalleryNotification';
import type { VisitorVariant } from '@/tipos/visitor';

function toQueryString(params: Record<string, string> | undefined): string {
  if (params === undefined) return '';
  const sp = new URLSearchParams(params);
  const out = sp.toString();
  return out === '' ? '' : `?${out}`;
}

function getClientBaseUrl(): string {
  const origin =
    typeof window !== 'undefined' ? window.location?.origin : undefined;
  if (origin !== undefined && origin !== null && origin !== '') return origin;

  const envSiteUrl = process.env['NEXT_PUBLIC_SITE_URL'];
  if (envSiteUrl !== undefined && envSiteUrl !== null && envSiteUrl !== '') {
    return envSiteUrl.replace(/\/$/, '');
  }

  const envCanonicalUrl = process.env['NEXT_PUBLIC_CANONICAL_URL'];
  if (
    envCanonicalUrl !== undefined &&
    envCanonicalUrl !== null &&
    envCanonicalUrl !== ''
  ) {
    return envCanonicalUrl.replace(/\/$/, '');
  }

  // Último fallback: URL relativa (funciona para preview dentro do próprio site).
  return '';
}

const DEFAULT_VISITORS_BADGE_PATH = '/api/visitors/{id}/badge.svg';

export default function VisitorsBadgeGrid(): React.ReactElement {
  const [notification, setNotification] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentCode, setCurrentCode] = useState<string>('');
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  const showNotificationMessage = (message: string): void => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setNotification(message);
    notificationTimeoutRef.current = setTimeout(
      () => setNotification(''),
      3000,
    );
  };

  const visitorIdPlaceholder = 'seu-usuario';
  const repoOwnerPlaceholder = 'seu-owner';
  const repoNamePlaceholder = 'seu-repo';

  const variants = useMemo<VisitorVariant[]>(
    () => [
      {
        id: 'visitors-default',
        title: 'Visitors (padrão)',
        alt: 'Badge de visitors padrão',
        labelForMarkdown: 'Visitors',
        query: { label: 'visitors' },
        previewQuery: { label: 'visitors', increment: '0' },
      },
      {
        id: 'views',
        title: 'Views',
        alt: 'Badge de views',
        labelForMarkdown: 'Views',
        query: { label: 'views' },
        previewQuery: { label: 'views', increment: '0' },
      },
      {
        id: 'visitantes',
        title: 'Visitantes (PT-BR)',
        alt: 'Badge de visitantes',
        labelForMarkdown: 'Visitantes',
        query: { label: 'visitantes' },
        previewQuery: { label: 'visitantes', increment: '0' },
      },
      {
        id: 'pill-blue',
        title: 'Pill azul',
        alt: 'Badge pill azul',
        labelForMarkdown: 'Visitors',
        query: {
          label: 'views',
          shape: 'pill',
          labelColor: '111111',
          valueColor: '2563eb',
          textColor: 'ffffff',
        },
        previewQuery: {
          label: 'views',
          shape: 'pill',
          labelColor: '111111',
          valueColor: '2563eb',
          textColor: 'ffffff',
          increment: '0',
        },
      },
      {
        id: 'square-green',
        title: 'Square verde',
        alt: 'Badge square verde',
        labelForMarkdown: 'Visitors',
        query: {
          label: 'visitors',
          shape: 'square',
          labelColor: '111111',
          valueColor: '22c55e',
          textColor: 'ffffff',
        },
        previewQuery: {
          label: 'visitors',
          shape: 'square',
          labelColor: '111111',
          valueColor: '22c55e',
          textColor: 'ffffff',
          increment: '0',
        },
      },
      {
        id: 'rounded-purple',
        title: 'Rounded roxo',
        alt: 'Badge rounded roxo',
        labelForMarkdown: 'Visitantes',
        query: {
          label: 'visitantes',
          shape: 'rounded',
          labelColor: '0f172a',
          valueColor: '7c3aed',
          textColor: 'ffffff',
        },
        previewQuery: {
          label: 'visitantes',
          shape: 'rounded',
          labelColor: '0f172a',
          valueColor: '7c3aed',
          textColor: 'ffffff',
          increment: '0',
        },
      },
      {
        id: 'clones-default',
        title: 'GitHub Clones',
        alt: 'Badge de clones oficiais',
        labelForMarkdown: 'Clones',
        path: '/api/github-traffic/clones/badge.svg',
        query: { owner: repoOwnerPlaceholder, repo: repoNamePlaceholder },
        previewQuery: { owner: 'i-c-l-org', repo: 'kitsune' },
      },
      {
        id: 'clones-custom-repo',
        title: 'GitHub Clones (repo customizado)',
        alt: 'Badge de clones com owner/repo customizados',
        labelForMarkdown: 'Clones',
        path: '/api/github-traffic/clones/badge.svg',
        query: { owner: repoOwnerPlaceholder, repo: repoNamePlaceholder },
        previewQuery: { owner: 'vercel', repo: 'next.js' },
      },
      {
        id: 'clones-unique-visits',
        title: 'GitHub Unique Visits',
        alt: 'Badge de unique visits (parte preta) com clones (parte azul)',
        labelForMarkdown: 'Unique Visits',
        path: '/api/github-traffic/clones/badge.svg',
        query: {
          owner: repoOwnerPlaceholder,
          repo: repoNamePlaceholder,
          type: 'uniques',
        },
        previewQuery: {
          owner: 'i-c-org',
          repo: 'kitsune',
          type: 'uniques',
        },
      },
      {
        id: 'clones-unique-visits-gradient',
        title: 'GitHub Unique Visits (Gradiente)',
        alt: 'Badge de unique visits com gradiente',
        labelForMarkdown: 'Unique Visits',
        path: '/api/github-traffic/clones/badge.svg',
        query: {
          owner: repoOwnerPlaceholder,
          repo: repoNamePlaceholder,
          type: 'uniques',
          labelGradientStart: '0f172a',
          labelGradientEnd: '1e293b',
          valueGradientStart: '1d4ed8',
          valueGradientEnd: '3b82f6',
        },
        previewQuery: {
          owner: 'i-c-l-5-5-5',
          repo: 'kitsune',
          type: 'uniques',
          labelGradientStart: '0f172a',
          labelGradientEnd: '1e293b',
          valueGradientStart: '1d4ed8',
          valueGradientEnd: '3b82f6',
        },
      },
      {
        id: 'clones-unique-combined',
        title: 'GitHub Clones + Unique Visits',
        alt: 'Badge de clones (azul) com unique visits (preto)',
        labelForMarkdown: 'Clones + Unique',
        path: '/api/github-traffic/clones/badge.svg',
        query: {
          owner: repoOwnerPlaceholder,
          repo: repoNamePlaceholder,
          type: 'combined',
        },
        previewQuery: {
          owner: 'i-c-l-org',
          repo: 'kitsune',
          type: 'combined',
        },
      },
      {
        id: 'gradient-purple-blue',
        title: 'Gradient Purple-Blue',
        alt: 'Badge com gradiente roxo para azul',
        labelForMarkdown: 'Visitors',
        query: {
          label: 'visitors',
          labelGradientStart: '1e1b4b',
          labelGradientEnd: '312e81',
          valueGradientStart: '7c3aed',
          valueGradientEnd: '2563eb',
          textColor: 'ffffff',
        },
        previewQuery: {
          label: 'visitors',
          labelGradientStart: '1e1b4b',
          labelGradientEnd: '312e81',
          valueGradientStart: '7c3aed',
          valueGradientEnd: '2563eb',
          textColor: 'ffffff',
          increment: '0',
        },
      },
      {
        id: 'gradient-sunset',
        title: 'Gradient Sunset',
        alt: 'Badge com gradiente laranja para vermelho',
        labelForMarkdown: 'Views',
        query: {
          label: 'views',
          labelGradientStart: '451a03',
          labelGradientEnd: '7c2d12',
          valueGradientStart: 'f97316',
          valueGradientEnd: 'dc2626',
          textColor: 'ffffff',
        },
        previewQuery: {
          label: 'views',
          labelGradientStart: '451a03',
          labelGradientEnd: '7c2d12',
          valueGradientStart: 'f97316',
          valueGradientEnd: 'dc2626',
          textColor: 'ffffff',
          increment: '0',
        },
      },
      {
        id: 'gradient-emerald',
        title: 'Gradient Emerald',
        alt: 'Badge com gradiente verde esmeralda',
        labelForMarkdown: 'Visitors',
        query: {
          label: 'visitors',
          labelGradientStart: '022c22',
          labelGradientEnd: '064e3b',
          valueGradientStart: '10b981',
          valueGradientEnd: '059669',
          textColor: 'ffffff',
        },
        previewQuery: {
          label: 'visitors',
          labelGradientStart: '022c22',
          labelGradientEnd: '064e3b',
          valueGradientStart: '10b981',
          valueGradientEnd: '059669',
          textColor: 'ffffff',
          increment: '0',
        },
      },
      {
        id: 'gradient-cyan',
        title: 'Gradient Cyan',
        alt: 'Badge com gradiente ciano',
        labelForMarkdown: 'Visitantes',
        query: {
          label: 'visitantes',
          labelGradientStart: '164e63',
          labelGradientEnd: '0e7490',
          valueGradientStart: '06b6d4',
          valueGradientEnd: '3b82f6',
          textColor: 'ffffff',
        },
        previewQuery: {
          label: 'visitantes',
          labelGradientStart: '164e63',
          labelGradientEnd: '0e7490',
          valueGradientStart: '06b6d4',
          valueGradientEnd: '3b82f6',
          textColor: 'ffffff',
          increment: '0',
        },
      },
    ],
    [repoNamePlaceholder, repoOwnerPlaceholder],
  );

  const resolveBadgePath = (variant: VisitorVariant): string => {
    const pathTemplate = variant.path ?? DEFAULT_VISITORS_BADGE_PATH;
    return pathTemplate.replace('{id}', visitorIdPlaceholder);
  };

  const generateMarkdownCode = (variant: VisitorVariant): string => {
    const baseUrl = getClientBaseUrl();
    const queryString = toQueryString(variant.query);
    const imageUrl = `${baseUrl}${resolveBadgePath(variant)}${queryString}`;
    return `![${variant.labelForMarkdown}](${imageUrl})`;
  };

  const viewCode = (variant: VisitorVariant): void => {
    setCurrentCode(generateMarkdownCode(variant));
    setShowModal(true);
  };

  const copyCode = async (variant: VisitorVariant): Promise<void> => {
    try {
      const code = generateMarkdownCode(variant);
      await navigator.clipboard.writeText(code);
      showNotificationMessage('✓ Código copiado com sucesso!');
    } catch {
      showNotificationMessage(
        '✗ Não foi possível copiar (permissão do navegador).',
      );
    }
  };

  const copyModalCode = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(currentCode);
      showNotificationMessage('✓ Código copiado!');
    } catch {
      showNotificationMessage(
        '✗ Não foi possível copiar (permissão do navegador).',
      );
    }
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-[var(--text-bright)]">
          <i className="fas fa-users mr-2" />
          Visitors
        </h1>
        <p className="text-[var(--text-muted)]">
          Exemplos visuais de badges de visitors e de clones do GitHub (14d).
          Copie o código e ajuste os placeholders conforme seu
          perfil/repositório.
        </p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Observação: os previews de visitors usam <code>increment=0</code> para
          não inflar o contador.
        </p>
      </div>

      <main className="galeriaGrid mx-auto grid w-full grid-cols-1 gap-5 px-4 pb-9">
        {variants.map((variant, index) => {
          const previewQuery = variant.previewQuery ?? variant.query;
          const previewQueryString = toQueryString(previewQuery);
          const previewSrc = `${resolveBadgePath(variant)}${previewQueryString}`;

          return (
            <Card
              key={variant.id}
              className="svgCard cardSvg animateFadeInUp"
              style={
                {
                  '--animation-delay': `${index * 0.1}s`,
                } as React.CSSProperties
              }
            >
              <div className="svgCardTitle text3xl mb-4 font-mono font-semibold text-[var(--text-bright)]">
                {variant.title}
              </div>

              <div className="bg-black maxH300 mb-3 overflow-hidden rounded-md border border-[var(--border-default)] p-5">
                <img className="h-9" src={previewSrc} alt={variant.alt} />
              </div>

              <div className="svgCardActions flex flex-wrap gap-2">
                <Button
                  className="svgCardButton iconSm font-mono"
                  variant="primary"
                  onClick={() => void copyCode(variant)}
                  type="button"
                >
                  <i className="fas fa-copy" /> Copiar Código
                </Button>

                <Button
                  className="svgCardButton iconSm font-mono"
                  variant="secondary"
                  onClick={() => viewCode(variant)}
                  type="button"
                >
                  <i className="fas fa-code" /> Ver Código
                </Button>
              </div>
            </Card>
          );
        })}
      </main>

      <CodeModal
        code={currentCode}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCopy={copyModalCode}
      />

      {notification !== '' && <SVGGalleryNotification message={notification} />}
    </>
  );
}
