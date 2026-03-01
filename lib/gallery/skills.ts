import type { SVGItem } from './types';
import { tecnologiasItems } from './tecnologias-items';
import { ferramentasItems } from './ferramentas-items';
import { langsItems } from './langs-items';

export const skillsItems: SVGItem[] = (() => {
  // concat all categories but ensure IDs are unique so React keys stay stable
  const combined: SVGItem[] = [
    ...tecnologiasItems,
    ...ferramentasItems,
    ...langsItems,
  ];

  const seen = new Set<string>();
  return combined.filter((item) => {
    if (seen.has(item.id)) {
      // duplicate found, skip
      return false;
    }
    seen.add(item.id);
    return true;
  });
})();
