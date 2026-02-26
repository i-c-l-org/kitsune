#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const repoRoot = path.resolve(new URL(import.meta.url).pathname, '..', '..');
const svgRoot = path.join(repoRoot, 'public', 'svg');
const svgGalleryDataPath = path.join(repoRoot, 'lib', 'svgGalleryData.ts');
const skillsFilePath = path.join(repoRoot, 'lib', 'gallery', 'skills.ts');

async function extractSet(name, content) {
    const re = new RegExp(`const\\s+${name}\\s*=\\s*new\\s+Set<string>\\s*\\(\\s*\\[([\\s\\S]*?)\\]\\s*\\)\\s*;`, 'm');
    const m = content.match(re);
    if (!m) return new Set();
    const inside = m[1];
    // extract quoted strings
    const ids = Array.from(inside.matchAll(/'([a-z0-9-_]*)'/g)).map((r) => r[1]);
    return new Set(ids);
}

async function walk(dir) {
    let results = [];
    const list = await fs.readdir(dir, { withFileTypes: true });
    for (const d of list) {
        const res = path.join(dir, d.name);
        if (d.isDirectory()) results = results.concat(await walk(res));
        else results.push(res);
    }
    return results;
}

async function ensureDir(dir) {
    await fs.mkdir(dir, { recursive: true });
}

async function main() {
    const galleryText = await fs.readFile(svgGalleryDataPath, 'utf8');
    const langsSet = await extractSet('SKILLS_LANGS_IDS', galleryText);
    const ferramentasSet = await extractSet('SKILLS_FERRAMENTAS_IDS', galleryText);

    const allFiles = await walk(svgRoot);
    const badgeFiles = allFiles.filter((p) => p.includes(path.join('badges')) && p.endsWith('.svg'));

    for (const file of badgeFiles) {
        const rel = path.relative(svgRoot, file).replace(/\\\\/g, '/');
        // consider basename without extension as id
        const base = path.basename(file, '.svg');
        let destSub = 'tecnologias';
        if (langsSet.has(base)) destSub = 'langs';
        else if (ferramentasSet.has(base)) destSub = 'ferramentas';

        // new path: public/svg/badges/<destSub>/<basename>.svg
        const destDir = path.join(svgRoot, 'badges', destSub);
        const destPath = path.join(destDir, base + '.svg');
        if (path.normalize(file) === path.normalize(destPath)) continue;
        await ensureDir(destDir);
        try {
            await fs.rename(file, destPath);
            console.log('moved', rel, '->', path.relative(svgRoot, destPath));
        } catch (err) {
            console.error('failed move', file, err);
        }
    }

    // update skills.ts paths
    let skillsText = await fs.readFile(skillsFilePath, 'utf8');
    skillsText = skillsText.replace(/badges\/skills\/langs\//g, 'badges/langs/');
    skillsText = skillsText.replace(/badges\/skills\/ferramentas\//g, 'badges/ferramentas/');
    skillsText = skillsText.replace(/badges\/skills\/tecnologias\//g, 'badges/tecnologias/');
    // remaining badges/skills/ -> badges/tecnologias/
    skillsText = skillsText.replace(/badges\/skills\//g, 'badges/tecnologias/');
    await fs.writeFile(skillsFilePath, skillsText, 'utf8');
    console.log('updated', path.relative(repoRoot, skillsFilePath));

    console.log('done');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
