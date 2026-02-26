/**
 * Componente de instruções que explica como usar os SVGs e badges
 * e mostra exemplos de uso no GitHub README.
 */
import FeatureItem from "./FeatureItem";
import Panel from "./Panel";
import { getBaseUrl } from "@/lib/getBaseUrl";

export default function SVGGalleryInstructions(): React.ReactElement {
  const baseUrl = getBaseUrl();

  return (
    <section className="svgInstructions maxW900 shadowInstructions mx-auto mt-14 rounded-lg border border-l-[3px] border-[var(--vscode-border)] border-l-[var(--accent-blue)] bg-[var(--vscode-editor)] p-10">
      <h2 className="svgInstructionsTitle text4xl mb-8 flex items-center justify-center gap-3 text-center font-mono text-[var(--text-bright)]">
        <i className="fas fa-rocket" /> Como usar no GitHub?
      </h2>
      <ul className="flex list-none flex-col gap-5 p-0">
        <FeatureItem icon={<i className="fas fa-mouse-pointer" />}>
          Clique em &quot;Copiar Código&quot; no SVG desejado
        </FeatureItem>
        <FeatureItem icon={<i className="fas fa-paste" />}>
          Cole no seu README.md do GitHub
        </FeatureItem>
        <FeatureItem icon={<i className="fas fa-check-circle" />}>
          Pronto! Seu perfil está mais bonito{" "}
          <i className="fas fa-star text-[var(--accent-yellow)]" />
        </FeatureItem>
      </ul>

      <Panel className="mt-7 flex items-center justify-center text-center">
        <i className="fas fa-lightbulb mr-2 text-[var(--accent-yellow)]" />
        <strong>Exemplo básico:</strong>
      </Panel>
      <Panel className="mt-2.5 overflow-x-auto">
        <code className="whitespace-nowrap text-sm">
          {`![Badge](${baseUrl}/api/svg/badge-entusiasta.svg)`}
        </code>
      </Panel>

      <div className="mt-5 flex items-center justify-center rounded border border-[var(--vscode-border)] bg-[var(--vscode-bg)] p-5 text-center">
        <i className="fas fa-sliders-h mr-2 text-[var(--accent-green)]" />
        <strong>Customizar tamanho:</strong>
      </div>
      <Panel className="mt-2.5 overflow-x-auto">
        <code className="whitespace-nowrap text-sm">
          {`![Badge](${baseUrl}/api/svg/badge-devops.svg?width=300)`}
        </code>
      </Panel>
      <Panel className="mt-2.5 overflow-x-auto">
        <code className="whitespace-nowrap text-sm">
          {`![Banner](${baseUrl}/api/svg/capa-4.svg?width=800)`}
        </code>
      </Panel>
      <Panel className="mt-2.5 overflow-x-auto">
        <code className="whitespace-nowrap text-sm">
          {`![Banner 100%](${baseUrl}/api/svg/capa-4.svg?width=100%)`}
        </code>
      </Panel>

      <div className="mt-5 flex items-center justify-center rounded border border-[var(--vscode-border)] bg-[var(--vscode-bg)] p-5 text-center">
        <i className="fas fa-info-circle mr-2 text-[var(--accent-blue)]" />
        <strong>Parâmetros disponíveis:</strong>
      </div>
      <div className="mt-2.5 flex flex-col items-start justify-center overflow-x-auto rounded border border-[var(--vscode-border)] bg-[var(--vscode-bg)] p-5 text-center">
        <code className="mb-1.5">
          ?width=500 ou ?w=500 - Define largura em pixels
        </code>
        <code className="mb-1.5">?width=100% - Largura 100% (responsivo)</code>
        <code className="mb-1.5">?height=200 ou ?h=200 - Define altura</code>
        <code>?width=600&height=300 - Define ambos explicitamente</code>
      </div>

      <div className="mt-6 flex items-center justify-center rounded border border-[var(--vscode-border)] bg-[var(--vscode-bg)] p-5 text-center">
        <i className="fas fa-users mr-2 text-[var(--accent-purple)]" />
        <strong>Visitors no perfil (contador de visitas):</strong>
      </div>

      <Panel className="mt-2.5 overflow-x-auto">
        <code className="whitespace-nowrap text-sm">
          {`![Visitors](${baseUrl}/api/visitors/seu-usuario/badge.svg)`}
        </code>
      </Panel>

      <Panel className="mt-2.5 overflow-x-auto">
        <code className="whitespace-nowrap text-sm">
          {`<img src="${baseUrl}/api/visitors/seu-usuario/badge.svg" alt="Visitors" />`}
        </code>
      </Panel>

      <div className="mt-2.5 flex flex-col items-start justify-center overflow-x-auto rounded border border-[var(--vscode-border)] bg-[var(--vscode-bg)] p-5 text-left">
        <div className="mb-2 text-sm text-[var(--text-muted)]">
          Dicas rápidas (substitua <code>seu-usuario</code> pelo seu username do
          GitHub, por exemplo
          <code>lopos</code>):
        </div>
        <div className="mb-1 text-sm text-[var(--text-muted)]">
          Você pode escolher o texto livremente via <code>label</code> (ex.:
          visitors, views, visitantes).
        </div>
        <code className="mb-1.5">{`![Visitors](${baseUrl}/api/visitors/seu-usuario/badge.svg?label=visitors)`}</code>
        <code className="mb-1.5">{`![Views](${baseUrl}/api/visitors/seu-usuario/badge.svg?label=views)`}</code>
        <code className="mb-1.5">{`![Visitantes](${baseUrl}/api/visitors/seu-usuario/badge.svg?label=visitantes)`}</code>
        <code>{`![Sem incrementar](${baseUrl}/api/visitors/seu-usuario/badge.svg?label=visitas&increment=0)`}</code>
      </div>

      <div className="mt-2.5 flex flex-col items-start justify-center overflow-x-auto rounded border border-[var(--vscode-border)] bg-[var(--vscode-bg)] p-5 text-left">
        <div className="mb-2 text-sm text-[var(--text-muted)]">
          Cores e formatos (hex com 3 ou 6 dígitos; com ou sem <code>#</code>):
        </div>
        <code className="mb-1.5">{`![Pill azul](${baseUrl}/api/visitors/seu-usuario/badge.svg?label=views&shape=pill&labelColor=111111&valueColor=2563eb&textColor=ffffff)`}</code>
        <code className="mb-1.5">{`![Square verde](${baseUrl}/api/visitors/seu-usuario/badge.svg?label=visitors&shape=square&labelColor=111111&valueColor=22c55e&textColor=ffffff)`}</code>
        <code className="mb-1.5">{`![Rounded roxo](${baseUrl}/api/visitors/seu-usuario/badge.svg?label=visitantes&shape=rounded&labelColor=0f172a&valueColor=7c3aed&textColor=ffffff)`}</code>
        <code>{`![Sem incrementar](${baseUrl}/api/visitors/seu-usuario/badge.svg?label=views&increment=0&shape=pill&labelColor=111111&valueColor=f97316&textColor=ffffff)`}</code>
      </div>
    </section>
  );
}
