'use client';

import React from 'react';
import {
  BUTTON_BASE_CLASSES,
  VARIANT_CLASSES,
  SIZE_CLASSES,
} from './buttonStyles';
import type { ButtonProps, Variant, Size } from '@/tipos/ui';

export default function Button({
  children,
  className = '',
  variant = 'secondary',
  size = 'md',
  ...props
}: ButtonProps): React.ReactElement {
  const classes = [
    BUTTON_BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isAnchor = typeof (props as { href?: string }).href === 'string';

  if (isAnchor) {
    // render anchor when href provided (works with next/link or direct <a>)
    const { href, ...anchorProps } =
      props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchorProps} href={href} className={classes}>
        {children}
      </a>
    );
  }

  // Props can be a union of anchor | button attrs; narrow to button attributes for correct typing
  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    // live in client scope because many pages use onClick
    <button type="button" {...buttonProps} className={classes}>
      {children}
    </button>
  );
}

export function getButtonClasses(
  variant: Variant = 'secondary',
  size: Size = 'md',
  className = '',
): string {
  const base =
    'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)]';
  return [base, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className]
    .filter(Boolean)
    .join(' ');
}
