"use client";

/**
 * Componente client-side que mostra um botão para rolar de volta ao topo
 * quando o usuário ultrapassa um limiar definido.
 */

import { useEffect, useState } from "react";

// Limite de rolagem em pixels para mostrar o botão de voltar ao topo
const SCROLL_THRESHOLD = 300;

export default function ScrollToTop(): React.ReactElement | null {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameId: number | null = null;

    const toggleVisibility = (): void => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        setIsVisible(window.scrollY > SCROLL_THRESHOLD);
        frameId = null;
      });

      // Mostra o botão quando o usuário rolar mais de SCROLL_THRESHOLD px
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="scrollToTop"
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <i className="fas fa-arrow-up" />
    </button>
  );
}
