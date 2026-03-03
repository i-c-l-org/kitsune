import Link from "next/link";
import CategoryNav from "../_components/CategoryNav";
import SVGGalleryInstructions from "../../components/ui/SVGGalleryInstructions";
import GitHubStatsPreview from "./_components/GitHubStatsPreview";
import GitHubTopLangsPreview from "./_components/GitHubTopLangsPreview";

export default function PreviewPage(): React.ReactElement {
  return (
    <>
      <div className="previewPageSection">
        <Link href="/" className="previewBackLink">
          <i className="fas fa-arrow-left" />
          <span className="hidden sm:inline">Voltar para Home</span>
          <span className="inline sm:hidden">Voltar</span>
        </Link>
      </div>

      <div className="mb-6 sm:mb-8 text-center">
        <h1 className="previewPageTitle">
          <i className="previewPageTitleIcon fas fa-images" />
          Galeria de SVGs
        </h1>
        <p className="previewPageSubtitle">
          Escolha uma categoria ou navegue por todos os itens
        </p>
      </div>

      <CategoryNav />

      <div className="mb-8 sm:mb-12">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="previewSectionHeading">
            <i className="previewSectionHeadingIcon fas fa-eye" />
            Preview de GitHub Cards
          </h2>
          <p className="previewPageSubtitle max-w-2xl mx-auto">
            Previsualize seus cards do GitHub antes de usar. Escolha o tema,
            tamanho e personalize com seu username para ver o resultado em tempo
            real.
          </p>
        </div>

        <div className="previewCardsContainer">
          <section className="previewGradientWrapper">
            <div className="previewGradientBg" />
            <div className="previewGradientCard">
              <GitHubStatsPreview />
            </div>
          </section>

          <div className="previewDivider">
            <div className="previewDividerLine" />
            <div className="previewDividerIcon">
              <i className="fas fa-ellipsis-h" />
            </div>
            <div className="previewDividerLine" />
          </div>

          <section className="previewGradientWrapper">
            <div className="previewGradientBgAlt" />
            <div className="previewGradientCardAlt">
              <GitHubTopLangsPreview />
            </div>
          </section>
        </div>
      </div>

      <SVGGalleryInstructions />
    </>
  );
}
