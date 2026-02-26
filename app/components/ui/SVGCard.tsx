import Button from "./Button";
import Card from "./Card";
import type { SVGCardProps } from "@/tipos/ui";

export default function SVGCard({
  id,
  title,
  filename,
  alt,
  index,
  onCopy,
  onDownload,
  onViewCode,
}: SVGCardProps): React.ReactElement {
  return (
    <Card
      key={id}
      className="svgCard cardSvg animateFadeInUp"
      style={{ "--animation-delay": `${index * 0.1}s` } as React.CSSProperties}
    >
      <div className="svgCardTitle text3xl mb-4 font-mono font-semibold text-[var(--text-bright)]">
        {title}
      </div>

      <div className="bg-black maxH300 mb-3 overflow-hidden rounded-md border border-[var(--border-default)]">
        <img
          className="size-full object-cover"
          src={`/api/svg/${filename}`}
          alt={alt}
        />
      </div>

      <div className="svgCardActions flex flex-wrap gap-2">
        <Button
          className="svgCardButton iconSm font-mono"
          variant="primary"
          onClick={() => void onCopy(filename)}
          type="button"
        >
          <i className="fas fa-copy" /> Copiar Código
        </Button>

        <Button
          className="svgCardButton iconSm font-mono"
          variant="secondary"
          onClick={() => onDownload(filename)}
          type="button"
        >
          <i className="fas fa-download" /> Download
        </Button>

        <Button
          className="svgCardButton iconSm font-mono"
          variant="secondary"
          onClick={() => onViewCode(filename)}
          type="button"
        >
          <i className="fas fa-code" /> Ver Código
        </Button>
      </div>
    </Card>
  );
}
