"use client";

/**
 * GitHubTopLangsPreview – Componente de pré-visualização para GitHub Top Languages SVG.
 *
 * Renderiza cards de temas com SVG dinâmico obtido pela API interna.
 * Cada tema possui uma cor accent personalizada e ícone temático.
 *
 * ⚠ dangerouslySetInnerHTML: Usado intencionalmente para injetar SVG retornado
 * pela própria API do Kitsune (/api/github-langs/preview/[theme]). O conteúdo
 * é gerado server-side e não provém de input do usuário final.
 */

import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  memo,
  type ChangeEvent,
  type ReactElement,
} from "react";
import { useGitHubLangsPreview } from "@/lib/hooks";
import Card from "../../../../app/components/ui/Card";
import Button from "../../../../app/components/ui/Button";
import type { ThemeCardProps } from "@/tipos/ui";

/* ---- Constantes de Configuração ---- */

/** Duração em ms que o texto "Copiado!" permanece visível. */
const COPY_FEEDBACK_DURATION_MS = 2000;

/** Cor accent padrão caso o tema não possua mapeamento. */
const DEFAULT_ACCENT_COLOR = "#4ea89a";

/** Cor verde usada no estado de sucesso do botão de cópia. */
const SUCCESS_GREEN_COLOR = "#2d7d6e";

/** Opacidades alpha (hex) usadas nos tons do accent. */
const ALPHA_MID = "80";
const ALPHA_LOW = "40";
const ALPHA_SUBTLE = "30";
const ALPHA_BG = "18";
const ALPHA_BORDER = "cc";

/** Configurações de exibição da Grid. */
const STAGGER_DELAY = 50;

/** Temas disponíveis para previsualização. */
const themes = [
  { name: "dark", label: "Dark", icon: "fa-moon" },
  { name: "light", label: "Light", icon: "fa-sun" },
  { name: "neon", label: "Neon", icon: "fa-bolt" },
  { name: "sunset", label: "Sunset", icon: "fa-cloud-sun" },
  { name: "ocean", label: "Ocean", icon: "fa-water" },
  { name: "forest", label: "Forest", icon: "fa-tree" },
  { name: "cyberpunk", label: "Cyberpunk", icon: "fa-robot" },
  { name: "aurora", label: "Aurora", icon: "fa-star" },
  { name: "cherry", label: "Cherry", icon: "fa-heart" },
  { name: "midnight", label: "Midnight", icon: "fa-moon" },
  { name: "dracula", label: "Dracula", icon: "fa-ghost" },
] as const;

/** Mapeamento de cor de fundo por tema. */
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

/** Mapeamento de cor accent por tema. */
const themeAccentMap: Record<string, string> = {
  dark: "#58a6ff",
  light: "#0969da",
  neon: "#00ff88",
  sunset: "#ff6b6b",
  ocean: "#00d2ff",
  forest: "#4caf50",
  cyberpunk: "#ff00ff",
  aurora: "#7c4dff",
  cherry: "#ff4081",
  midnight: "#536dfe",
  dracula: "#bd93f9",
};

/* ---- Sub-componentes ---- */

/**
 * ThemeCard renders a single theme preview card.
 * Memoized to prevent unnecessary re-renders when parent states change.
 */
const ThemeCard = memo(function ThemeCard({
  themeName,
  themeLabel,
  username,
  width,
  height,
}: ThemeCardProps): ReactElement {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const themeInfo = themes.find((t) => t.name === themeName);
  const accentColor = themeAccentMap[themeName] || DEFAULT_ACCENT_COLOR;

  // Fetch SVG content using internal hook
  const {
    data: svgContent,
    isLoading,
    error,
  } = useGitHubLangsPreview(themeName);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      const currentRef = copyTimeoutRef.current;
      if (currentRef) clearTimeout(currentRef);
    };
  }, []);

  // Generate markdown URL string
  const codeUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (width) params.set("width", width);
    if (height) params.set("height", height);
    params.set("theme", themeName);
    params.set("compat", "github");
    return `/api/github-langs/${username}?${params.toString()}`;
  }, [username, width, height, themeName]);

  // Handle markdown copy to clipboard
  const handleCopy = useCallback(() => {
    const markdown = `![GitHub Top Languages](${codeUrl})`;
    void navigator.clipboard.writeText(markdown);
    setCopied(true);

    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    const timeout = setTimeout(
      () => setCopied(false),
      COPY_FEEDBACK_DURATION_MS,
    );
    copyTimeoutRef.current = timeout;
  }, [codeUrl]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const previewDataUri = useMemo(() => {
    if (!svgContent) return null;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
  }, [svgContent]);

  // CSS variables for dynamic accents
  const cardStyle = {
    "--theme-accent": accentColor,
    "--theme-accent-glow": `${accentColor}${ALPHA_SUBTLE}`,
  } as React.CSSProperties;

  const accentBarStyle = {
    background: `linear-gradient(90deg, ${accentColor}, ${accentColor}${ALPHA_MID}, ${accentColor})`,
    opacity: isHovered ? 1 : 0.5,
  };

  const tagPillStyle = {
    background: `${accentColor}${ALPHA_BG}`,
    color: accentColor,
    borderColor: `${accentColor}${ALPHA_SUBTLE}`,
  };

  const copyBtnStyle = {
    background: copied
      ? SUCCESS_GREEN_COLOR
      : `linear-gradient(135deg, ${accentColor}, ${accentColor}${ALPHA_BORDER})`,
  };

  const renderPreview = () => {
    if (isLoading) {
      return (
        <div className="previewThemeLoadingState">
          <div
            className="previewThemeSpinner"
            style={{
              borderColor: `${accentColor}${ALPHA_LOW}`,
              borderTopColor: accentColor,
            }}
          />
          <span className="previewThemeLoadingText">Carregando...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="previewThemeErrorState">
          <i className="fas fa-exclamation-triangle previewThemeErrorIcon" />
          <span>Falha ao carregar</span>
        </div>
      );
    }

    if (previewDataUri) {
      return (
        <img
          className="svgPreviewContainer svgPreviewAutoHeight"
          src={previewDataUri}
          alt={`Preview do tema ${themeLabel}`}
        />
      );
    }

    return null;
  };

  const bgColorClass = themeBackgroundMap[themeName] || "bg-[#0d1117]";

  return (
    <Card
      className="previewThemeCard"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
    >
      <div className="previewThemeAccentBar" style={accentBarStyle} />

      <div className="previewThemeHeader">
        <div className="previewThemeNameRow">
          <i
            className={`fas ${themeInfo?.icon || "fa-palette"} previewThemeIcon`}
            style={{ color: accentColor }}
          />
          <span className="previewThemeName">{themeLabel}</span>
        </div>
        <div className="previewThemeTagPill" style={tagPillStyle}>
          theme
        </div>
      </div>

      <div className={`${bgColorClass} previewThemeImageArea`}>
        {renderPreview()}
      </div>

      <div className="previewThemeCodeSection">
        <code className="previewThemeCodeUrl">{codeUrl}</code>
      </div>

      <Button
        variant="primary"
        size="sm"
        onClick={handleCopy}
        className="previewThemeCopyBtn"
        style={copyBtnStyle}
      >
        <i className={`fas ${copied ? "fa-check" : "fa-copy"} mr-1.5`} />
        {copied ? "Copiado!" : "Copiar Markdown"}
      </Button>
    </Card>
  );
});

/* ---- Componente Principal ---- */

export default function GitHubTopLangsPreview(): ReactElement {
  const [username, setUsername] = useState("seu-usuario");
  const [width, setWidth] = useState("600");
  const [height, setHeight] = useState("320");

  const sizeWidth = width.trim() !== "" ? width.trim() : undefined;
  const sizeHeight = height.trim() !== "" ? height.trim() : undefined;

  return (
    <div className="previewFlexCol">
      <div className="previewSectionHeader">
        <div className="previewSectionIconBox previewSectionIconBoxAlt">
          <i className="fas fa-code" />
        </div>
        <div>
          <h2 className="previewSectionTitle2">Top Languages</h2>
          <p className="previewSectionDesc">
            As 5 linguagens mais usadas nos seus repositórios públicos
          </p>
        </div>
      </div>

      <div className="previewSettingsPanel">
        <div className="previewSettingsPanelHeader">
          <i className="fas fa-sliders-h previewSettingsIcon" />
          <span>Configurações</span>
        </div>

        <div className="previewSettingsGrid">
          <div className="previewSettingsFieldFull">
            <label className="previewFieldLabel" htmlFor="langs-username">
              <i className="fas fa-user previewFieldLabelIcon" />
              Usuário GitHub
            </label>
            <input
              id="langs-username"
              type="text"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.currentTarget.value)
              }
              placeholder="seu-usuario"
              className="previewFieldInput"
            />
          </div>

          <div>
            <label className="previewFieldLabel" htmlFor="langs-width">
              <i className="fas fa-arrows-alt-h previewFieldLabelIcon" />
              Largura
            </label>
            <input
              id="langs-width"
              type="text"
              inputMode="numeric"
              value={width}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWidth(e.currentTarget.value)
              }
              placeholder="600"
              className="previewFieldInput"
            />
          </div>

          <div>
            <label className="previewFieldLabel" htmlFor="langs-height">
              <i className="fas fa-arrows-alt-v previewFieldLabelIcon" />
              Altura
            </label>
            <input
              id="langs-height"
              type="text"
              inputMode="numeric"
              value={height}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHeight(e.currentTarget.value)
              }
              placeholder="320"
              className="previewFieldInput"
            />
          </div>
        </div>
      </div>

      <div className="previewThemesSectionHeader">
        <h3 className="previewThemesSectionTitle">
          <i className="fas fa-palette previewThemesSectionIcon" />
          Temas Disponíveis
        </h3>
        <span className="previewThemesCount">{themes.length} temas</span>
      </div>

      <div className="previewThemesGrid">
        {themes.map((theme, index) => (
          <div
            key={theme.name}
            className="previewThemeCardWrapper"
            style={{ animationDelay: `${index * STAGGER_DELAY}ms` }}
          >
            <ThemeCard
              themeName={theme.name}
              themeLabel={theme.label}
              username={username}
              width={sizeWidth}
              height={sizeHeight}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
