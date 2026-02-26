'use client';

import { MDXRemote } from 'next-mdx-remote';
import Button from '../../components/ui/Button';
import type { ContentRendererProps } from '@/tipos/blog';

const components = {
  Button,
};

export default function ContentRenderer({
  content,
}: ContentRendererProps): React.ReactElement {
  return (
    <div className="prose prose-invert max-w-none">
      <MDXRemote {...content} components={components} />
    </div>
  );
}
