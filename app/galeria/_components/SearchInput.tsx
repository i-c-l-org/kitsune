/**
 * Campo de busca reutilizável para a galeria.
 */
import React from "react";
import type { SearchInputProps } from "@/tipos/galeria";

export default function SearchInput({
  value,
  onChange,
}: SearchInputProps): React.ReactElement {
  return (
    <div className="w-full">
      <input
        id="search-input-real"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Procurar"
        className="box-border h-[30px] w-full rounded-[15px] border-2 border-white bg-transparent px-3 text-center text-sm font-bold leading-none text-white placeholder-white/70 outline-none"
        tabIndex={0}
        aria-label="Procurar"
        autoComplete="off"
      />
    </div>
  );
}
