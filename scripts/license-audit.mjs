#!/usr/bin/env node
/*
 * Script de auditoria de licenças sem depender de libraries deprecated.
 * Funcionalidades:
 *  - Varre node_modules coletando package.json
 *  - Extrai campo license / licenses / spdx
 *  - Detecta arquivo LICENSE/COPYING (primeiro que encontrar)
 *  - Gera saída JSON ou texto
 *  - --fail-on <lista> falha se alguma licença estiver na lista
 *  - --allow <lista> opcional para exigir somente licenças permitidas
 *  - Ignora @types/* nas estatísticas (normalmente MIT e não críticas)
 */

import fs from 'fs';
import path from 'path';
import process from 'process';

const args = process.argv.slice(2);
const getArg = (name) => {
    const idx = args.indexOf(`--${name}`);
    if (idx === -1) return null;
    const next = args[idx + 1];
    if (!next || next.startsWith('--')) return true; // flag booleana
    return next;
};

const format = getArg('format') || 'json';
const output = getArg('output');
const failOnRaw = getArg('fail-on');
const allowRaw = getArg('allow');

const failOn = failOnRaw && typeof failOnRaw === 'string' ? failOnRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
const allowList = allowRaw && typeof allowRaw === 'string' ? allowRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

const root = process.cwd();
const nmDir = path.join(root, 'node_modules');

function exists(p) { try { fs.accessSync(p); return true; } catch { return false; } }

if (!exists(nmDir)) {
    console.error('node_modules não encontrado. Execute npm install antes.');
    process.exit(1);
}

// Cache para não repetir leitura
const packages = [];

function readPackageJson(pkgPath) {
    try {
        const data = fs.readFileSync(pkgPath, 'utf8');
        return JSON.parse(data);
    } catch { return null; }
}

function findLicenseFile(dir) {
    const candidates = fs.readdirSync(dir).filter(f => /^(license|licence|copying)/i.test(f));
    if (candidates.length === 0) return null;
    // Prioriza LICENSE*
    const sorted = candidates.sort((a, b) => a.length - b.length);
    const file = sorted[0];
    const full = path.join(dir, file);
    try {
        const stat = fs.statSync(full);
        if (stat.isFile() && stat.size < 200 * 1024) { // evita arquivos enormes
            return { file, text: fs.readFileSync(full, 'utf8') };
        }
    } catch (e) { console.warn('Falha ao ler arquivo de licença:', e?.message || e); }
    return { file, text: null };
}

function collect(dir) {
    // Pacotes escopados (@scope)
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.name === '.bin') continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name.startsWith('@')) {
                // Escopo
                const scopeEntries = fs.readdirSync(full, { withFileTypes: true });
                for (const se of scopeEntries) {
                    if (!se.isDirectory()) continue;
                    processPackage(path.join(full, se.name));
                }
            } else {
                processPackage(full);
            }
        }
    }
}

function processPackage(pkgDir) {
    const pkgJsonPath = path.join(pkgDir, 'package.json');
    if (!exists(pkgJsonPath)) return;
    const data = readPackageJson(pkgJsonPath);
    if (!data) return;
    const name = data.name || path.basename(pkgDir);
    const version = data.version || '0.0.0';
    const licenseField = data.license || data.licenses || null;
    let licenseValue = null;
    if (typeof licenseField === 'string') {
        licenseValue = licenseField;
    } else if (Array.isArray(licenseField)) {
        licenseValue = licenseField.map(l => (typeof l === 'string' ? l : l.type)).filter(Boolean).join(' OR ');
    } else if (licenseField && typeof licenseField === 'object' && licenseField.type) {
        licenseValue = licenseField.type;
    }
    if (!licenseValue) licenseValue = 'UNKNOWN';
    const licenseFile = findLicenseFile(pkgDir);
    packages.push({
        name,
        version,
        license: licenseValue,
        repository: (data.repository && (typeof data.repository === 'string' ? data.repository : data.repository.url)) || null,
        private: !!data.private,
        licenseFile: licenseFile ? licenseFile.file : null,
        licenseText: licenseFile ? licenseFile.text : null
    });
}

collect(nmDir);

// Estatísticas
const filtered = packages.filter(p => !p.name.startsWith('@types/'));
const licenseCounts = {};
for (const p of filtered) {
    licenseCounts[p.license] = (licenseCounts[p.license] || 0) + 1;
}

const problematic = [];
if (failOn.length > 0) {
    for (const p of filtered) {
        if (failOn.includes(p.license)) problematic.push(p);
    }
}
if (allowList.length > 0) {
    for (const p of filtered) {
        if (!allowList.includes(p.license)) problematic.push(p);
    }
}

// Remover duplicados em problematic
const uniqueProblematic = [];
const seen = new Set();
for (const p of problematic) {
    const key = `${p.name}@${p.version}`;
    if (!seen.has(key)) { seen.add(key); uniqueProblematic.push(p); }
}

const result = {
    generatedAt: new Date().toISOString(),
    totalPackages: packages.length,
    totalFiltered: filtered.length,
    licenseCounts,
    packages,
    problematic: uniqueProblematic
};

function outputJson() {
    const json = JSON.stringify(result, null, 2);
    if (output) fs.writeFileSync(path.join(root, output), json);
    else process.stdout.write(json + '\n');
}

function outputText() {
    const lines = [];
    lines.push('# Resumo de Licenças');
    lines.push(`Gerado em: ${result.generatedAt}`);
    lines.push('');
    lines.push('## Contagem');
    Object.entries(licenseCounts).sort((a, b) => b[1] - a[1]).forEach(([lic, count]) => {
        lines.push(`- ${lic}: ${count}`);
    });
    lines.push('');
    if (uniqueProblematic.length > 0) {
        lines.push('## Problemáticas');
        uniqueProblematic.forEach(p => lines.push(`- ${p.name}@${p.version} (${p.license})`));
        lines.push('');
    }
    lines.push('## Pacotes (primeiros 50)');
    filtered.slice(0, 50).forEach(p => {
        lines.push(`- ${p.name}@${p.version} | ${p.license}`);
    });
    const text = lines.join('\n');
    if (output) fs.writeFileSync(path.join(root, output), text);
    else process.stdout.write(text + '\n');
}

if (format === 'json') outputJson();
else outputText();

if (uniqueProblematic.length > 0) {
    console.error(`\n❌ Licenças problemáticas detectadas: ${uniqueProblematic.length}`);
    process.exit(2);
}

console.warn('\n✅ Auditoria de licenças concluída com sucesso.');
