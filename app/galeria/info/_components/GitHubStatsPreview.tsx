"use client";

import {
  useState,
  useCallback,
  type ChangeEvent,
  type ReactElement,
} from "react";
import { useGitHubStatsPreview } from "@/lib/hooks";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import type { ThemeCardProps } from "@/tipos/ui";

const themes = [
  { name: "dark", label: "Dark" },
  { name: "light", label: "Light" },
  { name: "neon", label: "Neon" },
  { name: "sunset", label: "Sunset" },
  { name: "ocean", label: "Ocean" },
  { name: "forest", label: "Forest" },
  { name: "cyberpunk", label: "Cyberpunk" },
  { name: "aurora", label: "Aurora" },
  { name: "cherry", label: "Cherry" },
  { name: "midnight", label: "Midnight" },
  { name: "dracula", label: "Dracula" },
];

function ThemeCard({
  themeName,
  themeLabel,
  username,
  width,
  height,
}: ThemeCardProps): ReactElement {
  const [copied, setCopied] = useState(false);

  const {
    data: svgContent,
    isLoading,
    error,
  } = useGitHubStatsPreview(themeName, width, height);

  const codeParams = new URLSearchParams();
  if (width) codeParams.set("width", width);
  if (height) codeParams.set("height", height);
  codeParams.set("theme", themeName);
  const codeUrl = `/api/github-stats/${username}?${codeParams.toString()}`;

  const handleCopy = useCallback((): void => {
    const markdown = `![GitHub Stats](${codeUrl})`;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [codeUrl]);

  const renderPreview = () => {
    if (isLoading) {
      return (
        <div className="flex h-32 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-3 border-[var(--accent-teal)] border-t-transparent" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex h-32 items-center justify-center text-red-400">
          <span className="text-xs">Falha ao carregar</span>
        </div>
      );
    }

    if (svgContent) {
      return (
        <div
          className="w-full"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      );
    }

    return null;
  };

  return (
    <Card className="flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[var(--text-bright)]">
          {themeLabel}
        </h3>
      </div>

      <div className="overflow-hidden rounded-md border border-[var(--border-default)] bg-[rgb(0_0_0_/_30%)]">
        {renderPreview()}
      </div>

      <div className="flex flex-col gap-2">
        <code className="overflow-x-auto rounded bg-[rgb(0_0_0_/_30%)] px-2 py-1 text-xs text-[var(--accent-cyan)]">
          {codeUrl}
        </code>
        <Button
          variant="primary"
          size="sm"
          onClick={handleCopy}
          className="w-full"
        >
          <i className="fas fa-copy mr-2" />
          {copied ? "Copiado!" : "Copiar Código"}
        </Button>
      </div>
    </Card>
  );
}

export default function GitHubStatsPreview(): ReactElement {
  const [username, setUsername] = useState("seu-usuario");
  const [width, setWidth] = useState("600");
  const [height, setHeight] = useState("320");

  const sizeWidth = width.trim() !== "" ? width.trim() : undefined;
  const sizeHeight = height.trim() !== "" ? height.trim() : undefined;

  return (
    <Card as="article" className="homeCard cardHome flex flex-col gap-6 p-6">
      <div>
        <h2 className="mb-2 text-2xl font-semibold text-[var(--text-bright)]">
          <i className="fas fa-chart-line mr-3" />
          GitHub Stats SVG
        </h2>
        <p className="text-[var(--text-muted)]">
          Previsualize seu status de commits, PRs e contribuições.
        </p>
      </div>

      <div className="mb-4">
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

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
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

      <div className="mb-2">
        <h3 className="mb-4 text-lg font-semibold text-[var(--text-bright)]">
          <i className="fas fa-palette mr-2" />
          Temas disponíveis
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.name}
            themeName={theme.name}
            themeLabel={theme.label}
            username={username}
            width={sizeWidth}
            height={sizeHeight}
          />
        ))}
      </div>
    </Card>
  );
}
