"use client";

import { useState, type ChangeEvent, type ReactElement } from "react";
import { getBaseUrl } from "@/lib/getBaseUrl";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

const themes = [
  { name: "dark", label: "🌙 Dark" },
  { name: "light", label: "☀️ Light" },
  { name: "neon", label: "⚡ Neon" },
  { name: "sunset", label: "🌅 Sunset" },
  { name: "ocean", label: "🌊 Ocean" },
  { name: "forest", label: "🌲 Forest" },
];

export default function GitHubStatsPreview(): ReactElement {
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [username, setUsername] = useState("seu-usuario");
  const [copied, setCopied] = useState(false);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const baseUrl = getBaseUrl();

  const sizeParams = new URLSearchParams();
  if (width.trim() !== "") {
    sizeParams.set("width", width.trim());
  }
  if (height.trim() !== "") {
    sizeParams.set("height", height.trim());
  }
  const sizeQuery = sizeParams.toString();

  const codeParams = new URLSearchParams(sizeQuery);
  codeParams.set("theme", selectedTheme);
  const codeUrl = `${baseUrl}/api/github-stats/${username}?${codeParams.toString()}`;

  const querySuffix = sizeQuery === "" ? "" : `?${sizeQuery}`;
  const previewUrl = `${baseUrl}/api/github-stats/preview/${selectedTheme}${querySuffix}`;

  const handleCopy = (): void => {
    const markdown = `![GitHub Stats](${codeUrl})`;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card as="article" className="homeCard cardHome flex flex-col gap-6 p-6">
      <div>
        <h2 className="mb-2 text-2xl font-semibold text-[var(--text-bright)]">
          <i className="fas fa-chart-line mr-3" />
          GitHub Stats SVG
        </h2>
        <p className="text-[var(--text-muted)]">
          Previsualize seu status de commits, PRs e contribuições do GitHub em
          tempo real
        </p>
      </div>

      {/* Input para username */}
      <div className="mb-8">
        <label className="mb-3 block text-sm font-semibold text-[var(--text-bright)]">
          Nome de usuário do GitHub
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.currentTarget.value)
            }
            placeholder="seu-usuario"
            className="flex-1 rounded-lg border border-[var(--accent-teal)] bg-[rgb(15_23_42_/_50%)] px-4 py-2 text-[var(--text-bright)] placeholder-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] focus:ring-opacity-30"
          />
        </div>
      </div>

      {/* Tamanho opcional */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--text-bright)]">
            Largura (px ou %)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={width}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setWidth(e.currentTarget.value)
            }
            placeholder="600"
            className="w-full rounded-lg border border-[var(--accent-teal)] bg-[rgb(15_23_42_/_50%)] px-4 py-2 text-[var(--text-bright)] placeholder-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] focus:ring-opacity-30"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--text-bright)]">
            Altura (px)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={height}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setHeight(e.currentTarget.value)
            }
            placeholder="320"
            className="w-full rounded-lg border border-[var(--accent-teal)] bg-[rgb(15_23_42_/_50%)] px-4 py-2 text-[var(--text-bright)] placeholder-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] focus:ring-opacity-30"
          />
        </div>
      </div>

      {/* Seleção de tema */}
      <div className="mb-8">
        <label className="mb-3 block text-sm font-semibold text-[var(--text-bright)]">
          Escolha um tema
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {themes.map((theme) => (
            <button
              key={theme.name}
              type="button"
              onClick={() => setSelectedTheme(theme.name)}
              className={`rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-all ${
                selectedTheme === theme.name
                  ? "border-[var(--accent-cyan)] bg-[var(--accent-teal)] text-white"
                  : "border-[var(--accent-teal)] bg-transparent text-[var(--text-muted)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
              }`}
            >
              {theme.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="mb-8 overflow-x-auto rounded-lg border border-[var(--accent-teal)] bg-[rgb(15_23_42_/_50%)] p-4">
        <div className="flex justify-center">
          <img
            src={previewUrl}
            alt="GitHub Stats Preview"
            className="max-w-full"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              // eslint-disable-next-line no-param-reassign
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>

      {/* Instruções de uso */}
      <div className="mb-8 rounded-lg border border-[var(--accent-teal)] bg-[rgb(26_77_92_/_15%)] p-4">
        <h3 className="mb-3 font-semibold text-[var(--text-bright)]">
          Como usar:
        </h3>
        <ol className="space-y-2 text-sm text-[var(--text-muted)]">
          <li>
            <strong className="text-[var(--text-bright)]">1.</strong> Adicione
            este código no seu README.md do GitHub:
          </li>
          <li className="ml-6 flex items-center gap-3 rounded bg-[rgb(15_23_42_/_50%)] px-3 py-2 font-mono text-xs">
            <code className="flex-1 overflow-x-auto">
              ![GitHub Stats]({codeUrl})
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 rounded px-2 py-1 text-xs font-semibold transition-all hover:bg-[var(--accent-teal)]"
              title="Copiar código"
            >
              {copied ? "✓ Copiado" : "📋 Copiar"}
            </button>
          </li>
          <li className="mt-3">
            <strong className="text-[var(--text-bright)]">2.</strong> Substitua{" "}
            <code className="text-[var(--accent-cyan)]">seu-usuario</code> pelo
            seu username do GitHub
          </li>
          <li className="mt-3">
            <strong className="text-[var(--text-bright)]">3.</strong> Escolha o
            tema que prefere (dark, light, neon, sunset, ocean, forest)
          </li>
          <li className="mt-3">
            <strong className="text-[var(--text-bright)]">4.</strong> Cole no
            seu README e o SVG será atualizado automaticamente a cada hora
          </li>
        </ol>
      </div>

      {/* Código Markdown */}
      <div>
        <h3 className="mb-2 font-semibold text-[var(--text-bright)]">
          Markdown Preview:
        </h3>
        <div className="mb-3 overflow-x-auto rounded bg-[rgb(0_0_0_/_30%)] p-3">
          <code className="text-xs text-[var(--accent-cyan)]">{`![GitHub Stats](${codeUrl})`}</code>
        </div>
        <div className="mt-2">
          <Badge>
            <i className="fas fa-code iconWithMarginRight" /> Copiar Markdown
          </Badge>
        </div>
      </div>
    </Card>
  );
}
