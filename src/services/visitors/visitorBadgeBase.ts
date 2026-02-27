/**
 * Template SVG base para badges de visitantes
 *
 * Contém placeholder que serão substituídos dinamicamente:
 * - __ARIA_LABEL__: Label para acessibilidade
 * - __RX__: Raio dos cantos (border-radius)
 * - __LABEL_BG__: Cor de fundo do label
 * - __VALUE_BG__: Cor de fundo do valor
 * - __TEXT_COLOR__: Cor do texto
 * - __LABEL__: Texto do label
 * - __VALUE__: Valor numérico
 */
export const VISITOR_BADGE_SVG_BASE = `<?xml version="1.0" encoding="UTF-8"?><svg viewBox="0 0 160 28" xmlns="http://www.w3.org/2000/svg" width="160" height="28" role="img" aria-label="__ARIA_LABEL__"><linearGradient id="g" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-opacity=".12"/></linearGradient><rect width="160" height="28" rx="__RX__" fill="__LABEL_BG__"/><rect x="86" width="74" height="28" rx="__RX__" fill="__VALUE_BG__"/><path fill="__VALUE_BG__" d="M86 0h6v28h-6z"/><rect width="160" height="28" rx="__RX__" fill="url(#g)"/><g fill="__TEXT_COLOR__" text-anchor="middle" font-family="Verdana,DejaVu Sans,sans-serif" font-size="12"><text x="43" y="19">__LABEL__</text><text x="123" y="19">__VALUE__</text></g></svg>`;
