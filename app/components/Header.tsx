"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Container from "./ui/Container";

export default function Header(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  return (
    <header className="headerContainer z-[100] border-b border-[var(--vscode-border)] bg-[var(--vscode-editor)] p-4 backdrop-blur-md">
      <Container max="xl" className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Logo size={48} showText />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="headerNavDesktop hidden">
          <Link href="/galeria" className="navSecondaryDesktop">
            <i className="fas fa-images" /> Galeria
          </Link>
          <Link href="/blog" className="navSecondaryDesktop">
            <i className="fas fa-book" /> Blog
          </Link>
          <Link href="/parcerias" className="navSecondaryDesktop">
            <i className="fas fa-handshake" /> Parceria
          </Link>
          <Link href="/termos-de-uso" className="navSecondaryDesktop">
            <i className="fas fa-file-contract" /> Termos
          </Link>
          <Link href="/politica-de-privacidade" className="navSecondaryDesktop">
            <i className="fas fa-user-shield" /> Privacidade
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="headerMobileControls flex items-center gap-2">
          <button
            ref={toggleRef}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((s) => !s)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            type="button"
            className="navGhost"
          >
            <i className={`fas ${open ? "fa-times" : "fa-bars"} text-lg`} />
          </button>
        </div>

        {/* Mobile nav (dropdown) */}
        <div
          className={`headerMobileNav ${open ? "open" : "closed"}`}
          aria-hidden={!open}
        >
          <div className="maxW1100 mx-auto p-4">
            <div className="flex flex-col gap-2">
              <Link href="/galeria" className="navSecondaryMobile">
                <i className="fas fa-images" /> Galeria
              </Link>
              <Link href="/blog" className="navSecondaryMobile">
                <i className="fas fa-book" /> Blog
              </Link>
              <Link href="/parcerias" className="navSecondaryMobile">
                <i className="fas fa-handshake" /> Parceria
              </Link>
              <Link href="/termos-de-uso" className="navSecondaryMobile">
                <i className="fas fa-file-contract" /> Termos de Uso
              </Link>
              <Link
                href="/politica-de-privacidade"
                className="navSecondaryMobile"
              >
                <i className="fas fa-user-shield" /> Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
