"use client";

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  type ChangeEvent,
  type ReactElement,
} from "react";
import { useGitHubStatsPreview } from "@/lib/hooks";
import Card from "../../../../app/components/ui/Card";
import Button from "../../../../app/components/ui/Button";
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

const themeBackgroundMap: Record<string, string> = {
  dark: "bg-[#0d1117]",
  light: "bg-[#ffffff]",
  neon: "bg-[#0a0e27]",
  sunset: "bg-[#1a0f1f]",
  ocean: "bg-[#0f1419]",
  forest: "bg-[#0d1b0f]",
  cyberpunk: "bg-[#0a0a1a]",
  aurora: "bg-[#0f1620]",
  cherry: "bg-[#1a0f1a]",
  midnight: "bg-[#0a0f2c]",
  dracula: "bg-[#282a36]",
};

function ThemeCard({
  themeName,
  themeLabel,
  username,
  width,
  height,
}: ThemeCardProps): ReactElement {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    data: svgContent,
    isLoading,
    error,
  } = useGitHubStatsPreview(themeName, width, height);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const codeParams = new URLSearchParams();
  if (width) codeParams.set("width", width);
  if (height) codeParams.set("height", height);
  codeParams.set("theme", themeName);
  const codeUrl = `/api/github-stats/${username}?${codeParams.toString()}`;

  const handleCopy = useCallback((): void => {
    const markdown = `![GitHub Stats](${codeUrl})`;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }
    copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
  }, [codeUrl]);

  const renderPreview = () => {
    if (isLoading) {
      return (
        <div className="flex h-24 items-center justify-center md:h-32">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent border-[var(--accent-teal)] md:h-6 md:w-6 md:border-[3px]" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex h-24 items-center justify-center text-red-400 md:h-32">
          <span className="text-xs">Falha ao carregar</span>
        </div>
      );
    }

    if (svgContent) {
      return (
        <div
          className="svgPreviewContainer svgPreviewAutoHeight"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      );
    }

    return null;
  };

  const bgColor = themeBackgroundMap[themeName] || "bg-[#0d1117]";

  return (
    <Card className="relative rounded-lg border border-[var(--border-default)] bg-[var(--bg-tertiary)] p-4 transition-all hover:border-[var(--accent-light)] hover:shadow-[var(--shadow-card-hover-svg)] hover:-translate-y-1">
      <div className="mb-2 font-mono text-base font-semibold text-[var(--text-bright)] md:mb-3 md:text-lg">
        {themeLabel}
      </div>

      <div
        className={`${bgColor} relative mb-3 overflow-hidden rounded-md border border-[var(--border-default)] md:mb-4`}
      >
        {renderPreview()}
      </div>

      <div className="flex flex-col gap-2">
        <code className="overflow-x-auto rounded bg-[rgb(0_0_0_/_30%)] px-2 py-1 text-xs text-[var(--accent-light)] md:text-sm">
          {codeUrl}
        </code>
        <Button
          variant="primary"
          size="sm"
          onClick={handleCopy}
          className="w-full rounded-md bg-[var(--accent-teal)] px-3 py-2 text-xs font-medium text-white transition-all hover:bg-[var(--accent-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] md:text-sm"
        >
          <i className="fas fa-copy mr-1 md:mr-2" />
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
    <div className="flex flex-col gap-4 md:gap-6">
      <div>
        <h2 className="mb-2 text-xl font-semibold text-[var(--text-bright)] md:text-2xl">
          <i className="fas fa-chart-line mr-2 md:mr-3" />
          GitHub Stats SVG
        </h2>
        <p className="text-sm text-[var(--text-muted)] md:text-base">
          Previsualize seu status de commits, PRs e contribuições em tempo real.
        </p>
      </div>

      <div className="mb-2 md:mb-4">
        <label className="mb-2 block text-sm font-semibold text-[var(--text-bright)] md:mb-3">
          Nome de usuário do GitHub
        </label>
        <input
          type="text"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.currentTarget.value)
          }
          placeholder="seu-usuario"
          className="w-full rounded-lg border border-[var(--accent-teal)] bg-[rgb(15_23_42)] px-4 py-2 text-sm text-[var(--text-bright)] placeholder-[var(--text-muted)] transition-colors focus:border-[var(--accent-cyan)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)] md:text-base"
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 md:mb-6 md:gap-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-[var(--text-bright)] md:mb-2 md:text-sm">
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
            className="w-full rounded-lg border border-[var(--accent-teal)] bg-[rgb(15_23_42)] px-3 py-2 text-sm text-[var(--text-bright)] placeholder-[var(--text-muted)] transition-colors focus:border-[var(--accent-cyan)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[var(--text-bright)] md:mb-2 md:text-sm">
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
            className="w-full rounded-lg border border-[var(--accent-teal)] bg-[rgb(15_23_42)] px-3 py-2 text-sm text-[var(--text-bright)] placeholder-[var(--text-muted)] transition-colors focus:border-[var(--accent-cyan)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]"
          />
        </div>
      </div>

      <div className="mb-2">
        <h3 className="mb-3 text-base font-semibold text-[var(--text-bright)] md:mb-4 md:text-lg">
          <i className="fas fa-palette mr-1 md:mr-2" />
          Temas disponíveis
        </h3>
        <p className="text-xs text-[var(--text-muted)] md:text-sm">
          Escolha entre 11 temas diferentes para customizar o visual do seu
          card.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
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
    </div>
  );
}
