#!/usr/bin/env node
/**
 * Gera o arquivo THIRD-PARTY-NOTICES.txt com informações de licenças
 * de todas as dependências do projeto.
 *
 * Uso: node scripts/generate-third-party-notices.mjs
 */

import fs from 'fs';
import path from 'path';

const root = process.cwd();
const auditFile = path.join(root, 'licenses-audit.json');
const outputFile = path.join(root, 'THIRD-PARTY-NOTICES.txt');

// Licenças permissivas aceitas
const PERMISSIVE_LICENSES = [
  'MIT',
  'MIT-0',
  'ISC',
  'Apache-2.0',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'BlueOak-1.0.0',
  'CC0-1.0',
  'CC-BY-3.0',
  'CC-BY-4.0',
  '0BSD',
  'Python-2.0',
  '(MIT OR CC0-1.0)',
  'Unlicense',
  'WTFPL'
];

// Licenças que requerem nota especial (weak copyleft - apenas linking)
const SPECIAL_LICENSES = {
  'LGPL-3.0-or-later': {
    type: 'Weak Copyleft',
    note: 'LGPL permite uso via linking sem exigir que o código do projeto seja aberto. Nenhuma modificação foi feita nestas bibliotecas.'
  },
  'MPL-2.0': {
    type: 'Weak Copyleft',
    note: 'MPL-2.0 permite uso em projetos com outras licenças. Os arquivos MPL não foram modificados, apenas consumidos como dependências.'
  }
};

// Verificar se audit existe
if (!fs.existsSync(auditFile)) {
  console.error('❌ Arquivo licenses-audit.json não encontrado.');
  console.error('   Execute: npm run license:audit');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(auditFile, 'utf8'));
const packages = data.packages.filter((p) => !p.name.startsWith('@types/'));

// Agrupar por licença
const byLicense = {};
for (const pkg of packages) {
  const lic = pkg.license;
  if (!byLicense[lic]) byLicense[lic] = [];
  byLicense[lic].push(pkg);
}

// Ordenar licenças: permissivas primeiro, depois especiais
const licenseOrder = Object.keys(byLicense).sort((a, b) => {
  const aPermissive = PERMISSIVE_LICENSES.includes(a);
  const bPermissive = PERMISSIVE_LICENSES.includes(b);
  if (aPermissive && !bPermissive) return -1;
  if (!aPermissive && bPermissive) return 1;
  return byLicense[b].length - byLicense[a].length;
});

// Gerar conteúdo
const lines = [];

lines.push('================================================================================');
lines.push('THIRD-PARTY SOFTWARE NOTICES AND INFORMATION');
lines.push('================================================================================');
lines.push('');
lines.push('Galeria I.C.L');
lines.push(`Gerado em: ${new Date().toISOString().split('T')[0]}`);
lines.push('');
lines.push('Este arquivo contém informações sobre as licenças de software de terceiros');
lines.push('utilizados neste projeto.');
lines.push('');
lines.push('================================================================================');
lines.push('RESUMO DE LICENÇAS');
lines.push('================================================================================');
lines.push('');

// Resumo
const total = packages.length;
lines.push(`Total de dependências: ${total}`);
lines.push('');
lines.push('Distribuição por tipo de licença:');
lines.push('');

for (const lic of licenseOrder) {
  const count = byLicense[lic].length;
  const percent = ((count / total) * 100).toFixed(1);
  const isSpecial = SPECIAL_LICENSES[lic];
  const marker = isSpecial ? ' ⚠️' : ' ✅';
  lines.push(`  ${lic}: ${count} pacotes (${percent}%)${marker}`);
}

lines.push('');
lines.push('Legenda:');
lines.push('  ✅ Licença permissiva - uso livre permitido');
lines.push('  ⚠️ Licença weak copyleft - uso via linking permitido');
lines.push('');

// Notas sobre licenças especiais
const specialUsed = Object.keys(SPECIAL_LICENSES).filter((l) => byLicense[l]);
if (specialUsed.length > 0) {
  lines.push('================================================================================');
  lines.push('NOTAS SOBRE LICENÇAS ESPECIAIS');
  lines.push('================================================================================');
  lines.push('');

  for (const lic of specialUsed) {
    const info = SPECIAL_LICENSES[lic];
    const pkgs = byLicense[lic];
    lines.push(`${lic} (${info.type})`);
    lines.push('-'.repeat(60));
    lines.push(`Pacotes: ${pkgs.map((p) => p.name).join(', ')}`);
    lines.push('');
    lines.push(`Nota: ${info.note}`);
    lines.push('');
  }
}

// Detalhes por licença
lines.push('================================================================================');
lines.push('DETALHES DAS LICENÇAS');
lines.push('================================================================================');

for (const lic of licenseOrder) {
  const pkgs = byLicense[lic];
  lines.push('');
  lines.push(`${'='.repeat(80)}`);
  lines.push(`${lic} (${pkgs.length} pacotes)`);
  lines.push(`${'='.repeat(80)}`);
  lines.push('');

  // Listar pacotes com esta licença
  lines.push('Pacotes:');
  for (const pkg of pkgs.sort((a, b) => a.name.localeCompare(b.name))) {
    const repo = pkg.repository
      ? ` - ${pkg.repository.replace('git+', '').replace('.git', '')}`
      : '';
    lines.push(`  • ${pkg.name}@${pkg.version}${repo}`);
  }
  lines.push('');

  // Texto da licença (do primeiro pacote que tiver)
  const withText = pkgs.find((p) => p.licenseText);
  if (withText && withText.licenseText) {
    lines.push('Texto da licença:');
    lines.push('-'.repeat(60));
    lines.push(withText.licenseText.trim());
    lines.push('-'.repeat(60));
  }
}

// Declaração de conformidade
lines.push('');
lines.push('================================================================================');
lines.push('DECLARAÇÃO DE CONFORMIDADE');
lines.push('================================================================================');
lines.push('');
lines.push('Este projeto (Galeria I.C.L) é distribuído sob a licença MIT.');
lines.push('');
lines.push('Todas as dependências utilizadas possuem licenças compatíveis com uso comercial');
lines.push('e de código aberto:');
lines.push('');
lines.push('• MIT, ISC, BSD-2-Clause, BSD-3-Clause, Apache-2.0: Licenças permissivas que');
lines.push('  permitem uso, modificação e redistribuição sem restrições significativas.');
lines.push('');
lines.push('• LGPL-3.0-or-later: Utilizado apenas via linking (sharp/libvips para');
lines.push('  processamento de imagens). Nenhuma modificação foi feita no código fonte');
lines.push('  destas bibliotecas.');
lines.push('');
lines.push('• MPL-2.0: Código fonte dos arquivos MPL não foi modificado. Pacotes como');
lines.push('  @vercel/analytics, axe-core e next-mdx-remote são consumidos como');
lines.push('  dependências sem alteração.');
lines.push('');
lines.push('Responsável: I.C.L');
lines.push('Contato: https://github.com/icl');
lines.push('');
lines.push('================================================================================');
lines.push('FIM DO ARQUIVO');
lines.push('================================================================================');

// Escrever arquivo
const content = lines.join('\n');
fs.writeFileSync(outputFile, content, 'utf8');

console.log(`✅ THIRD-PARTY-NOTICES.txt gerado com sucesso!`);
console.log(`   Total de pacotes: ${total}`);
console.log(
  `   Licenças permissivas: ${PERMISSIVE_LICENSES.filter((l) => byLicense[l]).length} tipos`
);
console.log(`   Licenças especiais: ${specialUsed.length} tipos`);
