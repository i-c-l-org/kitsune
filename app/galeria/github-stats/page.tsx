"use client";

import { useState, type ReactElement } from "react";
import Link from "next/link";
import CategoryNav from "../_components/CategoryNav";
import SVGGalleryInstructions from "../../components/ui/SVGGalleryInstructions";
import GitHubStatsPreview from "./_components/GitHubStatsPreview";
import GitHubTopLangsPreview from "./_components/GitHubTopLangsPreview";

type PreviewTab = "stats" | "langs";

export default function GitHubStatsPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<PreviewTab>("stats");

  return (
    <>
      <div className="previewPageSection">
        <Link href="/" className="previewBackLink">
          <i className="fas fa-arrow-left" />
          <span className="previewBackLinkFull">Voltar para Home</span>
          <span className="previewBackLinkShort">Voltar</span>
        </Link>
      </div>

      <div className="previewHeroSection">
        <div className="previewHeroBadge">
          <i className="fas fa-sparkles" />
          <span>Preview em Tempo Real</span>
        </div>
        <h1 className="previewPageTitle">
          <span className="previewTitleGradient">GitHub Cards</span> Preview
        </h1>
        <p className="previewPageSubtitle previewHeroSubtitle">
          Visualize e personalize seus cards do GitHub com temas exclusivos.
          Escolha o estilo perfeito para o seu perfil.
        </p>
      </div>

      <CategoryNav />

      <div className="previewMainContent">
        {/* Tab Switcher */}
        <div className="previewTabContainer">
          <button
            type="button"
            className={`previewTab ${activeTab === "stats" ? "previewTabActive" : ""}`}
            onClick={() => setActiveTab("stats")}
          >
            <i className="fas fa-chart-line previewTabIcon" />
            <span>GitHub Stats</span>
            <span className="previewTabBadge">SVG</span>
          </button>
          <button
            type="button"
            className={`previewTab ${activeTab === "langs" ? "previewTabActive" : ""}`}
            onClick={() => setActiveTab("langs")}
          >
            <i className="fas fa-code previewTabIcon" />
            <span>Top Languages</span>
            <span className="previewTabBadge">SVG</span>
          </button>
          <div
            className="previewTabIndicator"
            style={{
              transform:
                activeTab === "stats" ? "translateX(0)" : "translateX(100%)",
            }}
          />
        </div>

        {/* Content Area */}
        <div className="previewContentArea">
          <div className="previewGlowOrb previewGlowOrbLeft" />
          <div className="previewGlowOrb previewGlowOrbRight" />

          <div className="previewContentInner">
            <div
              className="previewTabPanel"
              style={{ display: activeTab === "stats" ? "block" : "none" }}
            >
              <GitHubStatsPreview />
            </div>
            <div
              className="previewTabPanel"
              style={{ display: activeTab === "langs" ? "block" : "none" }}
            >
              <GitHubTopLangsPreview />
            </div>
          </div>
        </div>
      </div>

      <SVGGalleryInstructions />
    </>
  );
}
