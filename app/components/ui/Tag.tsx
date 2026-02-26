import React from 'react';
import Button from './Button';
import type { TagProps } from '@/tipos/ui';

export default function Tag({
  label,
  href,
  className = '',
  ...props
}: TagProps): React.ReactElement {
  if (typeof href === 'string' && href.length > 0) {
    const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Button
        href={href}
        variant="ghost"
        size="sm"
        className={`text-[0.9rem] ${className}`}
        {...anchorProps}
      >
        #{label}
      </Button>
    );
  }

  const spanProps = props as React.HTMLAttributes<HTMLSpanElement>;
  return (
    <span
      className={`text-[0.9rem] font-medium text-[var(--accent-cyan)] ${className}`}
      {...spanProps}
    >
      #{label}
    </span>
  );
}
