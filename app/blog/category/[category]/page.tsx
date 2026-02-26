import Container from "../../../components/ui/Container";
import PostCard from "../../../components/ui/PostCard";
import { getPostsByCategory, getAllCategories } from "@/lib/posts";
import type { BlogCategoryPageProps } from "@/tipos/blog";

export function generateStaticParams(): Array<{ category: string }> {
  const categories = getAllCategories();
  return categories.map((category) => ({ category }));
}

// eslint-disable-next-line require-await
export async function generateMetadata({
  params,
}: BlogCategoryPageProps): Promise<{ title: string }> {
  const { category } = await params;
  return { title: `${category} | Blog I.C.L` };
}

// eslint-disable-next-line require-await
export default async function CategoryPage({
  params,
}: BlogCategoryPageProps): Promise<React.ReactElement> {
  const { category } = await params;
  const posts = getPostsByCategory(category);

  return (
    <Container max="lg" className="prose prose-sm prose-invert px-0 py-10">
      <div className="mb-14 text-center">
        <h1 className="textGradientTealCyan mb-4 inline-flex items-center gap-4 text-5xl font-bold">
          <i className="fas fa-folder" /> {category}
        </h1>
        <p className="text-xl text-[var(--text-secondary)]">
          Posts da categoria selecionada
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="px-5 py-20 text-center text-[var(--text-secondary)]">
          <i className="fas fa-file-alt text-[4rem] text-[var(--text-secondary)]" />
          <h2>Nenhum post nesta categoria</h2>
          <p>Tente outra categoria ou volte ao blog.</p>
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
