/**
 * Modal para exibir e copiar o código Markdown de um SVG/badge
 */
import type { CodeModalProps } from "@/tipos/ui";

const MODAL_TITLE = "Código Markdown";
const COPY_BUTTON_TEXT = "Copiar Código";

export default function CodeModal({
  code,
  isOpen,
  onClose,
  onCopy,
}: CodeModalProps): React.ReactElement | null {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div
        className="modalContent codeModal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2>
            <i className="fas fa-code" /> {MODAL_TITLE}
          </h2>
          <button
            className="iconLg inline-flex size-8 items-center justify-center rounded border border-[var(--vscode-border)] bg-[var(--error)] text-[var(--text-bright)] transition-all hover:scale-110 hover:shadow-[0_4px_12px_rgb(244_135_113_/_40%)]"
            onClick={onClose}
            type="button"
          >
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="overflow-x-auto rounded border border-[var(--vscode-border)] bg-[var(--vscode-bg)] p-5">
          <pre>{code}</pre>
        </div>
        <button
          className="iconSm mt-5 inline-flex w-full items-center justify-center gap-2 rounded border border-[var(--accent-teal)] copy-button-bg px-5 py-2.5 font-mono font-medium text-[var(--text-bright)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgb(45_125_110_/_50%)]"
          onClick={() => void onCopy()}
          type="button"
        >
          <i className="fas fa-copy" /> {COPY_BUTTON_TEXT}
        </button>
      </div>
    </div>
  );
}
