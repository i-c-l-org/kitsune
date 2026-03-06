'use client';

/**
 * Grid de exibição da galeria — gerencia ações de copiar, download e visualização.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import SVGCard from '../../components/ui/SVGCard';
import CodeModal from '../../components/ui/CodeModal';
import SVGGalleryNotification from '../../components/ui/SVGGalleryNotification';
import type { GalleryGridProps } from '@/tipos/galeria';

const NOTIFICATION_TIMEOUT = 3000;

export default function GalleryGrid({
  items,
  title,
  icon,
  description,
}: GalleryGridProps): React.ReactElement {
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

  const showNotificationMessage = useCallback((message: string): void => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setNotification(message);
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification('');
    }, NOTIFICATION_TIMEOUT);
  }, []);

  const getBaseUrl = useCallback((): string => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }

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

    return '';
  }, []);

  const generateMarkdownCode = useCallback(
    (filename: string): string => {
      const baseUrl = getBaseUrl();
      const imageUrl = `${baseUrl}/api/svg/${filename}`;
      return `![${filename}](${imageUrl})`;
    },
    [getBaseUrl],
  );

  const copyCode = useCallback(
    async (filename: string): Promise<void> => {
      const markdownCode = generateMarkdownCode(filename);

      try {
        await navigator.clipboard.writeText(markdownCode);
        showNotificationMessage('✓ Código copiado com sucesso!');
      } catch {
        showNotificationMessage('Não foi possível copiar o código.');
      }
    },
    [generateMarkdownCode, showNotificationMessage],
  );

  const downloadSVG = useCallback(
    (filename: string): void => {
      const link = document.createElement('a');
      link.href = `/api/svg/${filename}`;
      link.download = filename;
      link.click();
      showNotificationMessage('✓ Download iniciado!');
    },
    [showNotificationMessage],
  );

  const viewCode = useCallback(
    (filename: string): void => {
      const markdownCode = generateMarkdownCode(filename);
      setCurrentCode(markdownCode);
      setShowModal(true);
    },
    [generateMarkdownCode],
  );

  const closeModal = useCallback((): void => {
    setShowModal(false);
  }, []);

  const copyModalCode = useCallback(async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(currentCode);
      showNotificationMessage('✓ Código copiado!');
    } catch {
      showNotificationMessage('Não foi possível copiar o código.');
    }
  }, [currentCode, showNotificationMessage]);

  return (
    <>
      {(title !== null || description !== null) && (
        <div className="mb-8 text-center">
          {title !== null && (
            <h1 className="mb-2 text-3xl font-bold text-[var(--text-bright)]">
              {icon !== undefined && <i className={`${icon} mr-2`} />}
              {title}
            </h1>
          )}
          {description !== null && (
            <p className="text-[var(--text-muted)]">{description}</p>
          )}
          <p className="mt-2 text-sm text-[var(--accent-cyan)]">
            {items.length} {items.length === 1 ? 'item' : 'itens'} disponíveis
          </p>
        </div>
      )}

      {items.length === 0 ? (
        <div className="py-16 text-center">
          <i className="fas fa-folder-open mb-4 text-4xl text-[var(--text-muted)]" />
          <p className="text-[var(--text-muted)]">
            Nenhum item encontrado nesta categoria.
          </p>
        </div>
      ) : (
        <main className="galeriaGrid mx-auto grid w-full grid-cols-1 gap-5 px-4 pb-9">
          {items.map((item, index) => (
            <SVGCard
              key={item.id}
              id={item.id}
              title={item.title}
              filename={item.filename}
              alt={item.alt}
              index={index}
              onCopy={copyCode}
              onDownload={downloadSVG}
              onViewCode={viewCode}
            />
          ))}
        </main>
      )}

      <CodeModal
        code={currentCode}
        isOpen={showModal}
        onClose={closeModal}
        onCopy={copyModalCode}
      />

      {notification !== '' && <SVGGalleryNotification message={notification} />}
    </>
  );
}
