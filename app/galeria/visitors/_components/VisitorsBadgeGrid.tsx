'use client';

import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
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
        id: 'visitors-blue',
        title: 'Visitors',
        alt: 'Badge de visitors com label preto e value azul',
        labelForMarkdown: 'Visitors',
        query: {
          label: 'visitors',
          labelColor: '0f172a',
          valueColor: '1d4ed8',
        },
        previewQuery: {
          label: 'visitors',
          labelColor: '0f172a',
          valueColor: '1d4ed8',
          increment: '0',
        },
      },
      {
        id: 'visitors-violet-gradient',
        title: 'Visitors',
        alt: 'Badge de visitors com gradiente violeta no label e preto no value',
        labelForMarkdown: 'Visitors',
        query: {
          label: 'visitors',
          labelGradientStart: '4c1d95',
          labelGradientEnd: '7c3aed',
          valueGradientStart: '0f172a',
          valueGradientEnd: '1e293b',
        },
        previewQuery: {
          label: 'visitors',
          labelGradientStart: '4c1d95',
          labelGradientEnd: '7c3aed',
          valueGradientStart: '0f172a',
          valueGradientEnd: '1e293b',
          increment: '0',
        },
      },
      {
        id: 'clones-blue',
        title: 'Clones',
        alt: 'Badge de clones com label preto e value azul',
        labelForMarkdown: 'Clones',
        path: '/api/clones/{owner}/{repo}/badge.svg',
        query: {
          labelColor: '0f172a',
          valueColor: '1d4ed8',
        },
        previewQuery: {
          labelColor: '0f172a',
          valueColor: '1d4ed8',
        },
      },
      {
        id: 'clones-violet-gradient',
        title: 'Clones',
        alt: 'Badge de clones com gradiente violeta no label e preto no value',
        labelForMarkdown: 'Clones',
        path: '/api/clones/{owner}/{repo}/badge.svg',
        query: {
          labelGradientStart: '4c1d95',
          labelGradientEnd: '7c3aed',
          valueGradientStart: '0f172a',
          valueGradientEnd: '1e293b',
        },
        previewQuery: {
          labelGradientStart: '4c1d95',
          labelGradientEnd: '7c3aed',
          valueGradientStart: '0f172a',
          valueGradientEnd: '1e293b',
        },
      },
      {
        id: 'uniques-blue',
        title: 'Unique Visits',
        alt: 'Badge de unique visits com label preto e value azul',
        labelForMarkdown: 'Unique Visits',
        path: '/api/unique-visits/{owner}/{repo}/badge.svg',
        query: {
          labelColor: '0f172a',
          valueColor: '1d4ed8',
        },
        previewQuery: {
          labelColor: '0f172a',
          valueColor: '1d4ed8',
        },
      },
      {
        id: 'uniques-violet-gradient',
        title: 'Unique Visits',
        alt: 'Badge de unique visits com gradiente violeta no label e preto no value',
        labelForMarkdown: 'Unique Visits',
        path: '/api/unique-visits/{owner}/{repo}/badge.svg',
        query: {
          labelGradientStart: '4c1d95',
          labelGradientEnd: '7c3aed',
          valueGradientStart: '0f172a',
          valueGradientEnd: '1e293b',
        },
        previewQuery: {
          labelGradientStart: '4c1d95',
          labelGradientEnd: '7c3aed',
          valueGradientStart: '0f172a',
          valueGradientEnd: '1e293b',
        },
      },
    ],
    [repoNamePlaceholder, repoOwnerPlaceholder],
  );

  const resolveBadgePath = useCallback(
    (variant: VisitorVariant): string => {
      const pathTemplate = variant.path ?? DEFAULT_VISITORS_BADGE_PATH;
      if (pathTemplate.includes('{id}')) {
        return pathTemplate.replace('{id}', visitorIdPlaceholder);
      }
      if (pathTemplate.includes('{owner}') && pathTemplate.includes('{repo}')) {
        return pathTemplate
          .replace('{owner}', repoOwnerPlaceholder)
          .replace('{repo}', repoNamePlaceholder);
      }
      return pathTemplate;
    },
    [visitorIdPlaceholder, repoOwnerPlaceholder, repoNamePlaceholder],
  );

  const generateMarkdownCode = useCallback(
    (variant: VisitorVariant): string => {
      const baseUrl = getClientBaseUrl();
      const queryString = toQueryString(variant.query);
      const imageUrl = `${baseUrl}${resolveBadgePath(variant)}${queryString}`;
      return `![${variant.labelForMarkdown}](${imageUrl})`;
    },
    [resolveBadgePath],
  );

  const viewCode = useCallback(
    (variant: VisitorVariant): void => {
      setCurrentCode(generateMarkdownCode(variant));
      setShowModal(true);
    },
    [generateMarkdownCode],
  );

  const copyCode = useCallback(
    async (variant: VisitorVariant): Promise<void> => {
      try {
        const code = generateMarkdownCode(variant);
        await navigator.clipboard.writeText(code);
        showNotificationMessage('✓ Código copiado com sucesso!');
      } catch {
        showNotificationMessage(
          '✗ Não foi possível copiar (permissão do navegador).',
        );
      }
    },
    [generateMarkdownCode, showNotificationMessage],
  );

  const copyModalCode = useCallback(async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(currentCode);
      showNotificationMessage('✓ Código copiado!');
    } catch {
      showNotificationMessage(
        '✗ Não foi possível copiar (permissão do navegador).',
      );
    }
  }, [currentCode, showNotificationMessage]);

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
