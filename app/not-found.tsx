import Container from "./components/ui/Container";
import Card from "./components/ui/Card";
import Button from "./components/ui/Button";

const ERROR_CODE = "404";
const ERROR_TITLE = "Página não encontrada";
const ERROR_MESSAGE =
  "A página que você está procurando não existe ou foi movida.";
const HOME_BUTTON_TEXT = "Voltar para Home";

export default function NotFound(): React.ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <Container max="sm">
        <Card className="shadowCardLg px-6 py-8 text-center">
          <h1 className="textGradientTertiaryLight mb-5 font-mono text-6xl font-bold">
            {ERROR_CODE}
          </h1>
          <i className="fas fa-search text-[3rem] text-[var(--accent-tertiary)]" />
          <h2 className="my-5 font-mono text-2xl text-[var(--text-bright)]">
            {ERROR_TITLE}
          </h2>
          <p className="mb-7 text-base leading-relaxed text-[var(--text-secondary)]">
            {ERROR_MESSAGE}
          </p>
          <Button href="/" variant="primary" size="md">
            <i className="fas fa-home" /> {HOME_BUTTON_TEXT}
          </Button>
        </Card>
      </Container>
    </div>
  );
}
