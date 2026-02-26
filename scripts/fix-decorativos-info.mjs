#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const repoRoot = path.resolve(new URL(import.meta.url).pathname, '..', '..');
const svgRoot = path.join(repoRoot, 'public', 'svg');
const decorativosPath = path.join(repoRoot, 'lib', 'gallery', 'decorativos.ts');
const infoPath = path.join(repoRoot, 'lib', 'gallery', 'info.ts');

async function extractFilenames(filePath) {
    const txt = await fs.readFile(filePath, 'utf8');
    const arr = Array.from(txt.matchAll(/filename:\s*'([^']+)'/g)).map((m) => m[1]);
    return arr;
}

async function ensureDir(dir) {
    await fs.mkdir(dir, { recursive: true });
}

async function moveIfExists(baseName, fromDirs, toDir) {
    for (const d of fromDirs) {
        const p = path.join(svgRoot, d, baseName + '.svg');
        try {
            await fs.access(p);
            await ensureDir(path.join(svgRoot, toDir));
            const dest = path.join(svgRoot, toDir, baseName + '.svg');
            if (path.normalize(p) !== path.normalize(dest)) {
                await fs.rename(p, dest);
                console.log('moved', path.relative(svgRoot, p), '->', path.relative(svgRoot, dest));
            }
            return true;
        } catch (e) {
            // not found
        }
    }
    return false;
}

async function main() {
    const decorativosFilenames = await extractFilenames(decorativosPath);
    const infoFilenames = await extractFilenames(infoPath);

    const searchDirs = ['tecnologias', 'ferramentas', 'skills', 'decorativos', 'info'];

    for (const f of decorativosFilenames) {
        const base = path.basename(f, '.svg');
        await moveIfExists(base, searchDirs, path.join('badges', 'decorativos'));
    }
    for (const f of infoFilenames) {
        const base = path.basename(f, '.svg');
        await moveIfExists(base, searchDirs, path.join('badges', 'info'));
    }

    console.log('fix-decorativos-info done');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
