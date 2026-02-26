import Link from "next/link";
import CategoryNav from "../_components/CategoryNav";
import GalleryGrid from "../_components/GalleryGrid";
import SVGGalleryInstructions from "../../components/ui/SVGGalleryInstructions";
import { getInfoItems, categoryLabels } from "@/lib/svgGalleryData";
import GitHubStatsPreview from "./_components/GitHubStatsPreview";
import GitHubTopLangsPreview from "./_components/GitHubTopLangsPreview";

export default function InfoPage(): React.ReactElement {
  const items = getInfoItems();
  const { title, icon, description } = categoryLabels.info;

  return (
    <>
      <div className="py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md border border-[var(--accent-teal)] back-link-bg px-5 py-2.5 font-medium text-[var(--accent-cyan)] no-underline transition-all hover:-translate-x-1 hover:text-white"
        >
          <i className="fas fa-arrow-left" /> Voltar para Home
        </Link>
      </div>

      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold text-[var(--text-bright)]">
          <i className="fas fa-images mr-3" />
          Galeria de SVGs
        </h1>
        <p className="text-[var(--text-muted)]">
          Escolha uma categoria ou navegue por todos os itens
        </p>
      </div>

      <CategoryNav />

      {/* GitHub Stats and Top Languages Preview Sections */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col">
          <GitHubStatsPreview />
        </div>
        <div className="flex flex-col">
          <GitHubTopLangsPreview />
        </div>
      </div>

      <GalleryGrid
        items={items}
        title={title}
        icon={icon}
        description={description}
      />

      <SVGGalleryInstructions />
    </>
  );
}
