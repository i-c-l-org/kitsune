/**
 * Tipos compartilhados para a galeria de SVGs
 */

import type { CategoryType, SVGItem, CategoryInfo } from '@/tipos/galeria';

// Re-export para manter compatibilidade
export type { CategoryType, SVGItem, CategoryInfo };

export const categoryLabels: Record<CategoryType, CategoryInfo> = {
  banner: {
    title: 'Banners',
    icon: 'fas fa-image',
    description: 'Banners decorativos para o topo do seu perfil GitHub',
  },
  skills: {
    title: 'Skills & Tecnologias',
    icon: 'fas fa-code',
    description: 'Badges de linguagens, frameworks e ferramentas',
  },
  decorativos: {
    title: 'Decorativos',
    icon: 'fas fa-star',
    description: 'Badges de roles, profissões e títulos',
  },
  info: {
    title: 'Info & Status',
    icon: 'fas fa-info-circle',
    description: 'Badges de status do projeto, versão, licença, etc.',
  },
  social: {
    title: 'Social & Contato',
    icon: 'fas fa-share-alt',
    description: 'Badges de redes sociais, mensagens e contato',
  },
  langs: {
    title: 'Langs',
    icon: 'fas fa-language',
    description: 'Top linguagens e badges de linguagens',
  },
  ferramentas: {
    title: 'Ferramentas',
    icon: 'fas fa-screwdriver-wrench',
    description: 'Ferramentas e utilidades para o perfil',
  },
  tecnologias: {
    title: 'Tecnologias',
    icon: 'fas fa-microchip',
    description: 'Stacks e tecnologias em destaque',
  },
  visitors: {
    title: 'Visitors',
    icon: 'fas fa-users',
    description: 'Badges de contagem e variantes para visitantes',
  },
};
