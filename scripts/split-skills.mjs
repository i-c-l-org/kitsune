#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const repoRoot = path.resolve(new URL(import.meta.url).pathname, '..', '..');
const skillsPath = path.join(repoRoot, 'lib', 'gallery', 'skills.ts');
const outDir = path.join(repoRoot, 'lib', 'gallery');

function fmtArray(name, items) {
    return `import type { SVGItem } from './types';\n\nexport const ${name}: SVGItem[] = [\n${items.join(',\n')}\n];\n`;
}

async function main() {
    const txt = await fs.readFile(skillsPath, 'utf8');
    const m = txt.match(/export const skillsItems:[\s\S]*?=\s*\[([\s\S]*?)\]\s*;/m);
    if (!m) throw new Error('skillsItems array not found');
    const inside = m[1];
    const objs = Array.from(inside.matchAll(/\{[\s\S]*?\}\s*,?/g)).map((r) => r[0].trim().replace(/,$/, ''));

    const langs = [];
    const ferramentas = [];
    const tecnologias = [];

    for (const obj of objs) {
        const fn = (obj.match(/filename:\s*'([^']+)'/) || [])[1] || '';
        if (fn.includes('/langs/') || fn.includes("badges/langs/")) langs.push(obj);
        else if (fn.includes('/ferramentas/') || fn.includes("badges/ferramentas/")) ferramentas.push(obj);
        else tecnologias.push(obj);
    }

    // write files
    await fs.writeFile(path.join(outDir, 'langs-items.ts'), fmtArray('langsItems', langs), 'utf8');
    await fs.writeFile(path.join(outDir, 'ferramentas-items.ts'), fmtArray('ferramentasItems', ferramentas), 'utf8');
    await fs.writeFile(path.join(outDir, 'tecnologias-items.ts'), fmtArray('tecnologiasItems', tecnologias), 'utf8');

    // rewrite skills.ts to import the new arrays
    const newSkills = `import type { SVGItem } from './types';\nimport { tecnologiasItems } from './tecnologias-items';\nimport { ferramentasItems } from './ferramentas-items';\nimport { langsItems } from './langs-items';\n\nexport const skillsItems: SVGItem[] = [\n  ...tecnologiasItems,\n  ...ferramentasItems,\n  ...langsItems,\n];\n`;

    await fs.writeFile(skillsPath, newSkills, 'utf8');
    console.log('Split complete: wrote langs-items, ferramentas-items, tecnologias-items and updated skills.ts');
}

main().catch((e) => { console.error(e); process.exit(1); });
