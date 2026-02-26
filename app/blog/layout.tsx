import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/ui/Container";
import { getButtonClasses } from "../components/ui/buttonStyles";

export const metadata: Metadata = {
  title: "Blog - Galeria I.C.L",
  description: "Blog com artigos e tutoriais",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <Container max="xl" className="p-5 pb-20">
      <header className="blogHeader maxW1400 shadowHeader mx-auto mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--vscode-border)] bg-[var(--vscode-editor)] px-4 py-6 backdrop-blur-md">
        <h1 className="blogTitle m-0 flex items-center gap-2 font-mono text-lg font-semibold text-[var(--text-bright)]">
          <i className="fas fa-blog" /> Blog
        </h1>
        <Link
          href="/"
          className={getButtonClasses("secondary", "md")}
          title="Voltar para Home"
        >
          <i className="fas fa-arrow-left" />{" "}
          <span className="headerBackTextFull">Voltar para Home</span>
          <span className="headerBackTextShort">Voltar</span>
        </Link>
      </header>
      {children}
    </Container>
  );
}
