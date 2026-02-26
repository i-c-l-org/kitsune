'use client';

/**
 * Navegação por categorias da galeria (lista de filtros e ícones).
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { GalleryCategory } from '@/tipos/galeria';

const categories: GalleryCategory[] = [
  { slug: '', label: 'Todos', icon: 'fas fa-th-large' },
  { slug: 'banners', label: 'Banners', icon: 'fas fa-image' },
  { slug: 'skills', label: 'Skills', icon: 'fas fa-code' },
  { slug: 'social', label: 'Social', icon: 'fas fa-share-alt' },
  { slug: 'langs', label: 'Langs', icon: 'fas fa-language' },
  {
    slug: 'ferramentas',
    label: 'Ferramentas',
    icon: 'fas fa-screwdriver-wrench',
  },
  { slug: 'tecnologias', label: 'Tecnologias', icon: 'fas fa-microchip' },
  { slug: 'decorativos', label: 'Decorativos', icon: 'fas fa-star' },
  { slug: 'info', label: 'Info/Status', icon: 'fas fa-info-circle' },
  { slug: 'visitors', label: 'Visitors', icon: 'fas fa-users' },
];

export default function CategoryNav(): React.ReactElement {
  const pathname = usePathname();

  const isActive = (slug: string): boolean => {
    if (slug === '') {
      return pathname === '/galeria';
    }
    return pathname === `/galeria/${slug}`;
  };

  return (
    <nav className="mb-8">
      <div className="flex flex-wrap justify-center category-nav-gap">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.slug === '' ? '/galeria' : `/galeria/${cat.slug}`}
            className={`
              inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium
              no-underline transition-all duration-200
              ${
                isActive(cat.slug)
                  ? 'bg-[var(--accent-teal)] text-white shadow-lg'
                  : 'border border-[var(--vscode-border)] bg-[var(--vscode-editor)] text-[var(--text-muted)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]'
              }
            `}
          >
            <i className={cat.icon} />
            <span>{cat.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
