import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import PostContent from './PostContent';
import { getPostContent, getAllPosts } from '@/lib/posts';
import type { BlogSlugPageProps, BlogPostMetadata } from '@/tipos/blog';

export function generateStaticParams(): Array<{ slug: string }> {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// eslint-disable-next-line require-await
export async function generateMetadata({
  params,
}: BlogSlugPageProps): Promise<BlogPostMetadata> {
  try {
    const { slug } = await params;
    const post = getPostContent(slug);

    if (post === null) {
      return {
        title: 'Post não encontrado',
      };
    }

    return {
      title: `${post.title} | Blog I.C.L`,
      description: post.description,
      keywords: post.tags,
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
        tags: post.tags,
      },
    };
  } catch (error) {
    console.error('Erro ao gerar metadata do post:', error);
    return {
      title: 'Post',
    };
  }
}

export default async function PostPage({
  params,
}: BlogSlugPageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const post = getPostContent(slug);

  if (post === null) {
    notFound();
  }

  let mdxContent;
  try {
    mdxContent = await serialize(post.content);
  } catch (error) {
    console.error('Erro ao serializar MDX do post:', error);
    notFound();
  }

  return <PostContent post={post} mdxContent={mdxContent} />;
}
