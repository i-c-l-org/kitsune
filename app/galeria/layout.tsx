import type { Metadata } from 'next';
import Container from '../components/ui/Container';

export const metadata: Metadata = {
  title: 'Galeria SVG - I.C.L',
  description: 'SVGs animados gratuitos para seus projetos no GitHub',
};

export default function GaleriaLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <Container max="xl" className="p-5 pb-20">
      {children}
    </Container>
  );
}
