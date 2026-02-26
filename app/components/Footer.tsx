/**
 * Footer — componente com links, créditos e ações rápidas do rodapé do site.
 */
import FooterMobileExtras from "./FooterMobileExtras";
import Link from "next/link";
import Logo from "./Logo";
import Container from "./ui/Container";
import Button from "./ui/Button";

export default function Footer(): React.ReactElement {
  return (
    <footer className="footerContainer mt-10 w-full border-t border-[var(--vscode-border)]">
      <Container max="xl" className="text-center">
        <div className="mb-6 flex flex-col items-center gap-5">
          <Logo size={48} showText />
        </div>

        <p className="textBase mb-5 leading-relaxed text-[var(--text-secondary)]">
          Feito por{" "}
          <Link
            href="https://github.com/mg-5.5.5-37"
            target="_blank"
            rel="noopener noreferrer"
            className="linkAccent"
          >
            <i className="fab fa-github" /> I.C.L
          </Link>
        </p>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-2.5">
          <Button
            href="https://github.com/mg-5.5.5-37"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Repositório GitHub"
            variant="secondary"
            size="sm"
            className="inline-flex items-center gap-1.5"
          >
            <i className="fab fa-github" /> GitHub
          </Button>

          <Button
            href="https://wa.me/5537998553430"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar via WhatsApp"
            variant="secondary"
            size="sm"
            className="inline-flex items-center gap-1.5"
          >
            <i className="fab fa-whatsapp" /> WhatsApp
          </Button>

          <Button
            href="mailto:ossmoralus@gmail.com"
            aria-label="Enviar email"
            variant="secondary"
            size="sm"
            className="inline-flex items-center gap-1.5"
          >
            <i className="fas fa-envelope" /> Email
          </Button>
        </div>

        {/* Mobile: collapsible extras */}
        <FooterMobileExtras />

        <p className="textXs m-0 leading-relaxed tracking-wide text-[var(--text-secondary)]">
          <i className="fas fa-graduation-cap mr-1 text-[var(--accent-light)]" />{" "}
          Educativo •{" "}
          <i className="fas fa-code-branch mr-1 text-[var(--accent-light)]" />{" "}
          Open Source •{" "}
          <i className="fas fa-balance-scale mr-1 text-[var(--accent-light)]" />
          <a
            href="/LICENSE.txt"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver licença MIT"
            className="linkAccent underline-offset-2 hover:underline"
          >
            MIT License
          </a>
        </p>
      </Container>
    </footer>
  );
}
