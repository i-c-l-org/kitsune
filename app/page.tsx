import Link from "next/link";
import Container from "./components/ui/Container";
import Card from "./components/ui/Card";
import Badge from "./components/ui/Badge";
import { svgItems } from "../lib/svgGalleryData";

export default function HomePage(): React.ReactElement {
  const totalSvgs = svgItems.length;

  return (
    <main className="homeMain flex min-h-screen flex-col items-center justify-center p-5 text-center">
      <div className="homeHeading mb-10">
        <h2
          className="homeSubtitle animateFadeInUp mb-10 text-xl font-light leading-relaxed text-[var(--accent-primary)]"
          style={{ animationDelay: "0.2s" }}
        >
          Recursos gratuitos e educativos para desenvolvedores. SVGs animados
          para seus projetos no GitHub e conteúdo exclusivo no blog.
        </h2>
        <div className="mt-4" />
      </div>

      <Container
        max="md"
        className="gridCardsHome animateFadeIn grid w-full gap-5"
        style={{ animationDelay: "0.4s" }}
      >
        <Link href="/galeria" className="no-underline">
          <Card
            as="article"
            className="homeCard cardHome flex flex-col items-center gap-5 px-7 py-10"
          >
            <i className="fas fa-images icon2xl text-[var(--accent-tertiary)]" />
            <h2 className="m-0 text-2xl font-semibold">Galeria SVG</h2>
            <p className="m-0 text-base font-light leading-relaxed text-[var(--text-secondary)]">
              Banners profissionais e badges modernos para seus projetos. Copie
              e use no seu README do GitHub!
            </p>
            <Badge>
              <i className="fas fa-check-circle iconWithMarginRight" />{" "}
              {totalSvgs} SVGs disponíveis
            </Badge>
          </Card>
        </Link>

        <Link href="/blog" className="no-underline">
          <Card
            as="article"
            className="homeCard cardHome flex flex-col items-center gap-5 bg-[rgb(10_61_44_/_8%)] px-7 py-10"
          >
            <i className="fas fa-blog icon2xl text-[var(--accent-purple)]" />
            <h2 className="m-0 text-2xl font-semibold">Blog</h2>
            <p className="m-0 text-base font-light leading-relaxed text-[var(--text-secondary)]">
              Artigos, tutoriais e dicas sobre desenvolvimento web, design e
              boas práticas.
            </p>
            <Badge className="badgePurple">
              <i className="fas fa-clock iconWithMarginRight" /> Em breve
            </Badge>
          </Card>
        </Link>
      </Container>

      {/* Footer removido: já renderizado globalmente em RootLayout */}
    </main>
  );
}
