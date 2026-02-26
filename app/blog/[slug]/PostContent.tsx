"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Tag from "../../components/ui/Tag";
import VideoEmbed from "@/app/components/VideoEmbed";
import type { PostContentProps } from "@/tipos/blog";

const ContentRenderer = dynamic(
  async () => {
    const module = await import("./MDXRenderer");
    return module;
  },
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-3/4 rounded bg-[var(--vscode-border)]" />
        <div className="h-4 w-full rounded bg-[var(--vscode-border)]" />
        <div className="h-4 w-5/6 rounded bg-[var(--vscode-border)]" />
      </div>
    ),
  },
);

export default function PostContent({
  post,
  mdxContent,
}: PostContentProps): React.ReactElement {
  return (
    <Container max="md" className="px-0 py-10">
      <article className="postArticle maxW72ch mx-auto rounded-none border-0 border-[var(--vscode-border)] bg-[var(--vscode-editor)] py-8 shadow-none">
        <div className="postHeader px-4">
          <div className="postMetaContainer mb-8 border-b-2 border-[var(--vscode-border)] pb-6">
            <div className="postMeta textSm mb-4 flex flex-wrap gap-3">
              <Link
                href={`/blog/category/${post.category}`}
                className="no-underline"
              >
                <Badge tone="info" className="inline-flex items-center gap-1.5">
                  <i className="fas fa-folder" /> {post.category}
                </Badge>
              </Link>
              <span className="inline-flex items-center gap-1.5 text-[var(--text-secondary)]">
                <i className="fas fa-calendar" />{" "}
                {new Date(post.date).toLocaleDateString("pt-BR")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[var(--text-secondary)]">
                <i className="fas fa-clock" /> {post.readingTime}
              </span>
            </div>
            <h1 className="postTitle m-0 mb-4 text-3xl font-bold leading-tight text-[var(--text-bright)]">
              {post.title}
            </h1>
            <p className="postDescription m-0 mb-4 text-base leading-relaxed text-[var(--text-secondary)]">
              {post.description}
            </p>
            <div className="postTags flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Tag key={tag} label={tag} href={`/blog/tag/${tag}`} />
              ))}
            </div>
          </div>

          {post.videoUrl !== undefined && post.videoUrl !== "" && (
            <div className="mb-8">
              <VideoEmbed url={post.videoUrl} />
            </div>
          )}

          <div className="postContent mb-10">
            <ContentRenderer content={mdxContent} />
          </div>

          <div className="postFooter flex flex-col gap-6 border-t-2 border-[var(--vscode-border)] pt-6">
            <div className="postAuthorInfo flex items-center gap-3">
              <i className="fas fa-user-circle iconXl text-[var(--accent-blue)]" />
              <div>
                <div className="postAuthorName text-base font-semibold text-[var(--text-bright)]">
                  {post.author}
                </div>
                <div className="postAuthorRole textSm text-[var(--text-secondary)]">
                  Desenvolvedor
                </div>
              </div>
            </div>
            <Button href="/blog" variant="secondary">
              {" "}
              <i className="fas fa-arrow-left" /> Voltar ao Blog
            </Button>
          </div>
        </div>
      </article>
    </Container>
  );
}
