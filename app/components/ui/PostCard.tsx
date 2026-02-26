"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Card from "./Card";
import Badge from "./Badge";
import Tag from "./Tag";
import type { PostCardProps } from "@/tipos/blog";

export default function PostCard({
  post,
  className = "",
}: PostCardProps): React.ReactElement {
  const router = useRouter();

  const handleCardClick = (): void => {
    router.push(`/blog/${post.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter" || e.key === " ") {
      handleCardClick();
    }
  };

  const handleTagsClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  return (
    <Card
      className={`cardHoverLift relative flex flex-col gap-4 overflow-hidden ${className}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="textSm flex flex-wrap items-center justify-between gap-3">
        <Badge tone="info">
          <i className="fas fa-folder iconWithMarginRight" /> {post.category}
        </Badge>
        <span className="inline-flex items-center gap-1.5 text-[var(--text-secondary)]">
          <i className="fas fa-calendar" />{" "}
          {new Date(post.date).toLocaleDateString("pt-BR")}
        </span>
      </div>
      <h2 className="m-0 break-words">{post.title}</h2>
      <p className="m-0 break-words">{post.description}</p>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--vscode-border)] pt-4">
        <span className="textSm inline-flex items-center gap-1.5 text-[var(--text-secondary)]">
          <i className="fas fa-clock" /> {post.readingTime}
        </span>
        <span className="flex flex-wrap gap-2" onClick={handleTagsClick}>
          {post.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} label={tag} href={`/blog/tag/${tag}`} />
          ))}
        </span>
      </div>
    </Card>
  );
}
