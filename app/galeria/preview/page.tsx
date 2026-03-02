import Link from "next/link";
import CategoryNav from "../_components/CategoryNav";
import SVGGalleryInstructions from "../../components/ui/SVGGalleryInstructions";
import GitHubStatsPreview from "./_components/GitHubStatsPreview";
import GitHubTopLangsPreview from "./_components/GitHubTopLangsPreview";

export default function PreviewPage(): React.ReactElement {
  return (
    <>
      <div className="py-4 sm:py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md border border-[var(--accent-teal)] back-link-bg px-3 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-[var(--accent-cyan)] no-underline transition-all hover:-translate-x-1 hover:text-white"
        >
          <i className="fas fa-arrow-left" />
          <span className="hidden sm:inline">Voltar para Home</span>
          <span className="sm:hidden">Voltar</span>
        </Link>
      </div>

      <div className="mb-6 sm:mb-8 text-center">
        <h1 className="mb-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-bright)]">
          <i className="fas fa-images mr-2 sm:mr-3" />
          Galeria de SVGs
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)]">
          Escolha uma categoria ou navegue por todos os itens
        </p>
      </div>

      <CategoryNav />

      <div className="mb-8 sm:mb-12">
        <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--text-bright)]">
          <i className="fas fa-eye mr-2 sm:mr-3" />
          Preview de GitHub Cards
        </h2>
        <p className="mb-6 sm:mb-8 text-sm sm:text-base text-[var(--text-muted)]">
          Previsualize seus cards do GitHub antes de usar. Escolha o tema,
          tamanho e personalize com seu username.
        </p>

        <GitHubStatsPreview />

        <GitHubTopLangsPreview />
      </div>

      <SVGGalleryInstructions />
    </>
  );
}
