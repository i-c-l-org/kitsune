/**
 * Tipos compartilhados para componentes de UI
 */

import type React from 'react';

export type BadgeTone = 'default' | 'info' | 'muted' | 'accent';

export interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string | undefined;
}

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'article' | 'section';
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article';
}

export interface FeatureItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode;
}

export interface CodeModalProps {
  code: string;
  isOpen: boolean;
  onClose: () => void;
  onCopy: () => Promise<void>;
}

export interface SVGGalleryNotificationProps {
  message: string;
}

export type TagProps =
  | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        label: string;
      })
  | ({ href?: undefined } & React.HTMLAttributes<HTMLSpanElement> & {
        label: string;
      });

export type Variant = 'primary' | 'secondary' | 'ghost';
export type Size = 'sm' | 'md' | 'lg';

export type ButtonProps = (
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
) & {
  variant?: Variant;
  size?: Size;
  href?: string | undefined;
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface SVGCardProps {
  id: string;
  title: string;
  filename: string;
  alt: string;
  index: number;
  onCopy: (filename: string) => Promise<void>;
  onDownload: (filename: string) => void;
  onViewCode: (filename: string) => void;
}

// Gallery and blog specific props live in their domain types (galeria.ts, blog.ts)
