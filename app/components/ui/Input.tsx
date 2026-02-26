import React from 'react';
import type { InputProps } from '@/tipos/ui';

export default function Input({
  className = '',
  ...props
}: InputProps): React.ReactElement {
  const base =
    'w-full rounded-md border border-[var(--vscode-border)] bg-[var(--vscode-bg)] px-3.5 py-2.5 font-mono text-[0.95rem] text-[var(--text-primary)] transition-all focus:border-[var(--accent-cyan)] focus:shadow-[0_0_0_3px_rgb(58_138_127_/_10%)] focus:outline-none';
  return <input {...props} className={`${base} ${className}`.trim()} />;
}
