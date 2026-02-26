import type { FitMode } from '@/tipos/svg';

export function isValidDimension(input: string | null): {
  ok: boolean;
  isPercent: boolean;
} {
  if (input === null) return { ok: false, isPercent: false };
  if (/^\d+%$/.test(input)) return { ok: true, isPercent: true };
  if (/^\d+$/.test(input))
    return { ok: parseInt(input, 10) > 0, isPercent: false };
  return { ok: false, isPercent: false };
}

export function manipulateSvgDimensions(
  svgContent: string,
  widthParam: string | null,
  heightParam: string | null,
  fitParam: string | null = null,
): string {
  const widthInfo = isValidDimension(widthParam);
  const heightInfo = isValidDimension(heightParam);

  if (widthParam !== null && widthInfo.ok === false) return svgContent;
  if (heightParam !== null && heightInfo.ok === false) return svgContent;

  // Normalizar dimensões para garantir que apenas valores seguros sejam usados
  const normalizeDimensionOrNull = (input: string | null): string | null => {
    if (input === null) return null;
    const info = isValidDimension(input);
    if (!info.ok) return null;
    // Aceita apenas dígitos ou dígitos seguidos de '%'
    if (/^\d+$/.test(input)) return input;
    if (/^\d+%$/.test(input)) return input;
    return null;
  };

  const safeWidth = normalizeDimensionOrNull(widthParam);
  const safeHeight = normalizeDimensionOrNull(heightParam);

  // Encontrar a tag <svg> de abertura
  const svgTagMatch = svgContent.match(/<svg([^>]*)>/);
  if (svgTagMatch === null) return svgContent;

  const [originalTag, attributesStr] = svgTagMatch;
  if (attributesStr === undefined) return svgContent;

  // Função auxiliar para extrair valor de atributo
  const getAttr = (name: string): string | null => {
    const match = attributesStr.match(new RegExp(`${name}=["']([^"']+)["']`));
    return match?.[1] ?? null;
  };

  let viewBox = getAttr('viewBox');
  const originalWidth = getAttr('width') ?? '100%';
  const originalHeight = getAttr('height') ?? '100%';
  const preserveAspectRatio = getAttr('preserveAspectRatio');

  // Se não tem viewBox, tenta criar baseado nas dimensões originais
  if (viewBox === null) {
    const parsedW = parseFloat(originalWidth.replace(/[^\d.]/g, ''));
    const parsedH = parseFloat(originalHeight.replace(/[^\d.]/g, ''));
    const origW = !Number.isNaN(parsedW) && parsedW !== 0 ? parsedW : 1000;
    const origH = !Number.isNaN(parsedH) && parsedH !== 0 ? parsedH : 1000;
    viewBox = `0 0 ${origW} ${origH}`;
  }

  let newWidth = safeWidth ?? originalWidth;
  let newHeight = safeHeight ?? originalHeight;

  // Lógica de redimensionamento proporcional se apenas uma dimensão for fornecida
  const vbValues = viewBox.split(/[\s,]+/).map(Number);
  if (vbValues.length === 4) {
    const [, , vbWRaw, vbHRaw] = vbValues;
    const hasVbW =
      vbWRaw !== undefined && Number.isFinite(vbWRaw) && vbWRaw !== 0;
    const hasVbH =
      vbHRaw !== undefined && Number.isFinite(vbHRaw) && vbHRaw !== 0;

    if (hasVbW && hasVbH) {
      if (widthParam !== null && heightParam === null && !widthInfo.isPercent) {
        const widthValue = parseInt(widthParam, 10);
        if (Number.isFinite(widthValue) && widthValue > 0) {
          const ratio = vbHRaw / vbWRaw;
          newHeight = `${Math.round(widthValue * ratio)}`;
        }
      }
      if (
        heightParam !== null &&
        widthParam === null &&
        !heightInfo.isPercent
      ) {
        const heightValue = parseInt(heightParam, 10);
        if (Number.isFinite(heightValue) && heightValue > 0) {
          const ratio = vbWRaw / vbHRaw;
          newWidth = `${Math.round(heightValue * ratio)}`;
        }
      }
    }
  }

  // Lógica de preserveAspectRatio baseada no fitParam
  let newPreserveAspectRatio = preserveAspectRatio;
  let normalizedFit: FitMode | null = null;
  if (fitParam !== null) {
    normalizedFit = ['fill', 'cover', 'contain'].includes(fitParam)
      ? (fitParam as FitMode)
      : null;
  }

  if (normalizedFit !== null) {
    switch (normalizedFit) {
      case 'fill':
        newPreserveAspectRatio = 'none';
        break;
      case 'cover':
        newPreserveAspectRatio = 'xMidYMid slice';
        break;
      case 'contain':
        newPreserveAspectRatio = 'xMidYMid meet';
        break;
    }
  } else if (preserveAspectRatio === null) {
    // Default se não existir e nenhum fitParam for passado
    newPreserveAspectRatio = 'xMidYMid meet';
  }

  // Reconstruir a tag com os novos atributos
  let newAttributes = attributesStr;

  // Helper para substituir ou adicionar atributo
  const setAttr = (name: string, value: string): void => {
    const regex = new RegExp(`${name}=["'][^"']+["']`);
    if (regex.test(newAttributes)) {
      newAttributes = newAttributes.replace(regex, `${name}="${value}"`);
    } else {
      newAttributes += ` ${name}="${value}"`;
    }
  };

  setAttr('width', newWidth);
  setAttr('height', newHeight);
  setAttr('viewBox', viewBox);

  if (newPreserveAspectRatio !== null) {
    setAttr('preserveAspectRatio', newPreserveAspectRatio);
  }

  // Limpar espaços extras que podem ter sido criados
  newAttributes = newAttributes.replace(/\s+/g, ' ');

  const newTag = `<svg${newAttributes}>`;
  return svgContent.replace(originalTag, newTag);
}
