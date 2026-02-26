// Link/Logo not required in the listing page (layout provides header)
import { getAllPosts, getAllCategories } from "@/lib/posts";
import Container from "../components/ui/Container";
import PostCard from "../components/ui/PostCard";
import Button from "../components/ui/Button";

const BLOG_TITLE = "Blog";
const BLOG_DESCRIPTION =
  "Tutoriais, artigos e recursos sobre desenvolvimento web";

export default function BlogPage(): React.ReactElement {
  const posts = getAllPosts();
  const categories = getAllCategories();
  return (
    <Container max="lg" className="prose prose-sm prose-invert px-0 py-10">
      <div className="mb-14 text-center">
        <h1 className="textGradientTealCyan mb-4 inline-flex items-center gap-4 text-5xl font-bold">
          <i className="fas fa-blog" /> {BLOG_TITLE}
        </h1>
        <p className="text-xl text-[var(--text-secondary)]">
          {BLOG_DESCRIPTION}
        </p>
      </div>

      {categories.length > 0 && (
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <Button href="/blog" variant="primary" size="sm">
            {" "}
            <i className="fas fa-th" /> Todos
          </Button>
          {categories.map((category) => (
            <Button
              href={`/blog/category/${category}`}
              key={category}
              variant="secondary"
              size="sm"
            >
              <i className="fas fa-folder" /> {category}
            </Button>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="px-5 py-20 text-center text-[var(--text-secondary)]">
          <i className="fas fa-file-alt text-[4rem] text-[var(--text-secondary)]" />
          <h2>Nenhum post ainda</h2>
          <p>Em breve teremos conteúdo incrível por aqui!</p>
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
