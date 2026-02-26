import Container from "../../../components/ui/Container";
import PostCard from "../../../components/ui/PostCard";
import { getPostsByTag, getAllTags } from "@/lib/posts";
import type { BlogTagPageProps } from "@/tipos/blog";

export function generateStaticParams(): Array<{ tag: string }> {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

// eslint-disable-next-line require-await
export async function generateMetadata({
  params,
}: BlogTagPageProps): Promise<{ title: string }> {
  const { tag } = await params;
  return { title: `#${tag} | Blog I.C.L` };
}

// eslint-disable-next-line require-await
export default async function TagPage({
  params,
}: BlogTagPageProps): Promise<React.ReactElement> {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <Container max="lg" className="prose prose-sm prose-invert px-0 py-10">
      <div className="mb-14 text-center">
        <h1 className="textGradientTealCyan mb-4 inline-flex items-center gap-4 text-5xl font-bold">
          <i className="fas fa-tags" /> {tag}
        </h1>
        <p className="text-xl text-[var(--text-secondary)]">
          Posts com esta tag
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="px-5 py-20 text-center text-[var(--text-secondary)]">
          <i className="fas fa-file-alt text-[4rem] text-[var(--text-secondary)]" />
          <h2>Nenhum post com esta tag</h2>
          <p>Tente outra tag ou volte ao blog.</p>
        </div>
      ) : (
        <div className="gridBlogPosts mt-10 grid gap-5">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </Container>
  );
}
