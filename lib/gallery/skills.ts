import type { SVGItem } from './types';
import { tecnologiasItems } from './tecnologias-items';
import { ferramentasItems } from './ferramentas-items';
import { langsItems } from './langs-items';

export const skillsItems: SVGItem[] = [
  ...tecnologiasItems,
  ...ferramentasItems,
  ...langsItems,
];
