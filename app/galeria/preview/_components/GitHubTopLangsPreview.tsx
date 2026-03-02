"use client";

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  type ChangeEvent,
  type ReactElement,
} from "react";
import { useGitHubLangsPreview } from "@/lib/hooks";
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
  } = useGitHubLangsPreview(themeName);

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
  const codeUrl = `/api/github-langs/${username}?${codeParams.toString()}`;

  const handleCopy = useCallback((): void => {
    const markdown = `![GitHub Top Languages](${codeUrl})`;
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
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--accent-teal)] border-t-transparent md:h-6 md:w-6 md:border-3" />
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
          className="w-full [&_svg]:max-w-full [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      );
    }

    return null;
  };

  return (
    <Card className="svgCard cardSvg animateFadeInUp flex flex-col gap-2 p-3 md:gap-3 md:p-4">
      <div className="svgCardTitle text-base font-mono font-semibold text-[var(--text-bright)] truncate md:text-xl">
        {themeLabel}
      </div>

      <div className="bg-black max-h-[200px] mb-2 overflow-hidden rounded-md border border-[var(--border-default)] md:max-h-[300px] md:mb-3">
        {renderPreview()}
      </div>

      <div className="svgCardActions flex flex-col gap-2">
        <code className="overflow-x-auto rounded bg-[rgb(0_0_0_/_30%)] px-2 py-1 text-[10px] text-[var(--accent-cyan)] break-all md:text-xs">
          {codeUrl}
        </code>
        <Button
          variant="primary"
          size="sm"
          onClick={handleCopy}
          className="w-full text-xs md:text-sm"
        >
          <i className="fas fa-copy mr-1 md:mr-2" />
          {copied ? "Copiado!" : "Copiar Código"}
        </Button>
      </div>
    </Card>
  );
}

export default function GitHubTopLangsPreview(): ReactElement {
  const [username, setUsername] = useState("seu-usuario");
  const [width, setWidth] = useState("600");
  const [height, setHeight] = useState("320");

  const sizeWidth = width.trim() !== "" ? width.trim() : undefined;
  const sizeHeight = height.trim() !== "" ? height.trim() : undefined;

  return (
    <div className="flex flex-col gap-4 md:gap-6 mt-8 md:mt-12">
      <div>
        <h2 className="mb-2 text-xl font-semibold text-[var(--text-bright)] md:text-2xl">
          <i className="fas fa-chart-bar mr-2 md:mr-3" />
          GitHub Top Languages
        </h2>
        <p className="text-sm text-[var(--text-muted)] md:text-base">
          Mostra as 5 linguagens mais usadas nos seus repositórios públicos
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
          className="w-full rounded-lg border border-[var(--accent-teal)] bg-[rgb(15_23_42_/_50%)] px-3 py-2 text-sm text-[var(--text-bright)] placeholder-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] focus:ring-opacity-30 md:px-4 md:text-base"
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
            className="w-full rounded-lg border border-[var(--accent-teal)] bg-[rgb(15_23_42_/_50%)] px-3 py-2 text-sm text-[var(--text-bright)] placeholder-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] focus:ring-opacity-30 md:px-4 md:text-base"
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
            className="w-full rounded-lg border border-[var(--accent-teal)] bg-[rgb(15_23_42_/_50%)] px-3 py-2 text-sm text-[var(--text-bright)] placeholder-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] focus:ring-opacity-30 md:px-4 md:text-base"
          />
        </div>
      </div>

      <div className="mb-2">
        <h3 className="mb-3 text-base font-semibold text-[var(--text-bright)] md:mb-4 md:text-lg">
          <i className="fas fa-palette mr-1 md:mr-2" />
          Temas disponíveis
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
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
