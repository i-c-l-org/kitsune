import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import PostContent from './PostContent';
import { getPostContent, getAllPosts } from '@/lib/posts';
import type { BlogSlugPageProps, BlogPostMetadata } from '@/tipos/blog';

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogSlugPageProps): Promise<BlogPostMetadata> {
  try {
    const { slug } = await params;
    const post = await getPostContent(slug);

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
    return {
      title: 'Post',
    };
  }
}

export default async function PostPage({
  params,
}: BlogSlugPageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const post = await getPostContent(slug);

  if (post === null) {
    notFound();
  }

  let mdxContent;
  try {
    mdxContent = await serialize(post.content);
  } catch (error) {
    notFound();
  }

  return <PostContent post={post} mdxContent={mdxContent} />;
}
