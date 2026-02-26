/**
 * Subconjunto: Langs (delegado a lib/svgGalleryData)
 * Mantém os dados organizados em arquivo dedicado sem duplicar a fonte de verdade.
 */

export * from './langs-items';

import { langsItems } from './langs-items';
export { langsItems };

export default langsItems;
