'use client';

import { useMemo, useState } from 'react';
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

export default function VisitorsBadgeGrid(): React.ReactElement {
  const [notification, setNotification] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentCode, setCurrentCode] = useState<string>('');

  const showNotificationMessage = (message: string): void => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const visitorIdPlaceholder = 'seu-usuario';

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
    ],
    [],
  );

  const generateMarkdownCode = (variant: VisitorVariant): string => {
    const baseUrl = getClientBaseUrl();
    const queryString = toQueryString(variant.query);
    const imageUrl = `${baseUrl}/api/visitors/${visitorIdPlaceholder}/badge.svg${queryString}`;
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
          Exemplos visuais do badge de visitors. Copie o código e troque{' '}
          <code>seu-usuario</code> pelo seu usuário.
        </p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Observação: os previews usam <code>increment=0</code> para não inflar
          o contador.
        </p>
      </div>

      <main className="galeriaGrid mx-auto grid w-full grid-cols-1 gap-5 px-4 pb-9">
        {variants.map((variant, index) => {
          const previewQuery = variant.previewQuery ?? variant.query;
          const previewQueryString = toQueryString(previewQuery);
          const previewSrc = `/api/visitors/${visitorIdPlaceholder}/badge.svg${previewQueryString}`;

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
