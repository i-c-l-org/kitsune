"use client";

import Container from "./components/ui/Container";
import Card from "./components/ui/Card";
import Button from "./components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <Container max="sm">
        <Card className="shadowCardLg px-6 py-8 text-center">
          <i className="fas fa-exclamation-triangle icon2xl text-[var(--error)]" />
          <h1 className="my-5 font-mono text-2xl text-[var(--text-bright)]">
            Algo deu errado!
          </h1>
          <p className="mb-7 text-base leading-relaxed text-[var(--text-secondary)]">
            {error.message !== ""
              ? error.message
              : "Ocorreu um erro inesperado."}
          </p>
          <Button onClick={() => reset()} variant="primary" size="md">
            <i className="fas fa-redo" /> Tentar novamente
          </Button>
        </Card>
      </Container>
    </div>
  );
}
