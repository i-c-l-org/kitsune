"use client";

import { useState } from "react";

export default function FooterMobileExtras(): React.ReactElement | null {
  const [open, setOpen] = useState(false);

  return (
    <div className="footerMobileExtras mt-4">
      <button
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-controls="footer-extras"
        type="button"
        className="inline-flex items-center gap-2 rounded border border-[var(--vscode-border)] bg-transparent px-3 py-2 text-sm font-medium text-[var(--text-primary)]"
      >
        {open ? (
          <i className="fas fa-chevron-up" />
        ) : (
          <i className="fas fa-chevron-down" />
        )}{" "}
        Mais opções
      </button>

      <div id="footer-extras" className={`${open ? "mt-3 block" : "hidden"}`}>
        <div className="mb-4 text-sm text-[var(--text-secondary)]">
          <a
            href="/LICENSE.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-light hover:text-accent-bright underline-offset-2 transition-colors hover:underline"
          >
            Ver licença MIT
          </a>
        </div>
      </div>
    </div>
  );
}
