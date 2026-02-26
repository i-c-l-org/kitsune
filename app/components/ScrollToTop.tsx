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
    const toggleVisibility = (): void => {
      // Mostra o botão quando o usuário rolar mais de SCROLL_THRESHOLD px
      if (window.scrollY > SCROLL_THRESHOLD) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
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
