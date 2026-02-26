"use client";
import Link from "next/link";

import { useState } from "react";
import CategoryNav from "./_components/CategoryNav";
import GalleryGrid from "./_components/GalleryGrid";
import SearchInput from "./_components/SearchInput";
import SVGGalleryInstructions from "../components/ui/SVGGalleryInstructions";
import { svgItems } from "@/lib/svgGalleryData";

export default function GaleriaPage(): React.ReactElement {
  const [search, setSearch] = useState("");
  const filteredItems = svgItems.filter((item) => {
    const text = `${item.title} ${item.filename} ${item.alt}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

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

      <div className="mx-auto mb-8 max-w-xl">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <CategoryNav />

      <GalleryGrid
        items={filteredItems}
        title="Todos os Itens"
        icon="fas fa-th-large"
        description="Navegue por toda a coleção de SVGs disponíveis"
      />

      <SVGGalleryInstructions />
    </>
  );
}
