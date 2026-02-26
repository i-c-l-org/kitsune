/**
 * Tipos relacionados ao sistema de blog
 */

import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string | undefined;
  videoUrl?: string | undefined;
  readingTime?: string | undefined;
  published?: boolean;
}

export interface Post extends PostMetadata {
  content: string;
}

export interface BlogSlugPageProps {
  params: Promise<{ slug: string }>;
}

export interface BlogTagPageProps {
  params: Promise<{ tag: string }>;
}

export interface BlogCategoryPageProps {
  params: Promise<{ category: string }>;
}

export interface BlogPostMetadata {
  title: string;
  description?: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
    type: 'article';
    publishedTime: string;
    authors: string[];
    tags: string[];
  };
}

export interface ContentRendererProps {
  content: MDXRemoteSerializeResult;
}

export interface PostContentProps {
  post: Post;
  mdxContent: MDXRemoteSerializeResult;
}

export interface PostCardProps {
  post: PostMetadata;
  className?: string;
}
