import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CUSTOM_SVG_DIR = join(ROOT, 'svgs', 'custom');
const BRAND_SVG_DIR = join(ROOT, 'svgs', 'brand');
const OUT_DIR = join(ROOT, 'src', 'generated');

function toComponentName(filename: string): string {
  return basename(filename, '.svg')
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('') + 'Icon';
}

function svgToJsx(svg: string): string {
  return svg
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/vector-effect=/g, 'vectorEffect=');
}

function parseSvg(content: string) {
  const viewBox = content.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 16 16';
  const width = content.match(/<svg[^>]+width="([^"]+)"/)?.[1] ?? '16';
  const height = content.match(/<svg[^>]+height="([^"]+)"/)?.[1] ?? '16';
  const fill = content.match(/<svg[^>]+fill="([^"]+)"/)?.[1] ?? 'none';
  const openTagEnd = content.indexOf('>');
  const lastCloseTag = content.lastIndexOf('</svg>');
  const body = openTagEnd !== -1 && lastCloseTag !== -1
    ? content.slice(openTagEnd + 1, lastCloseTag).trim()
    : '';
  return { viewBox, width, height, fill, body };
}

function generateIconFile(svgDir: string, outputFile: string) {
  const files = readdirSync(svgDir)
    .filter((f) => f.endsWith('.svg'))
    .sort();

  const lines: string[] = [`import React from 'react';`, ``];

  for (const file of files) {
    const name = toComponentName(file);
    const { viewBox, width, height, fill, body } = parseSvg(
      readFileSync(join(svgDir, file), 'utf-8'),
    );
    const jsxBody = svgToJsx(body).replace(/\n/g, '\n    ');

    lines.push(
      `export const ${name}: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (`,
      `  <svg width="${width}" height="${height}" viewBox="${viewBox}" fill="${fill}" xmlns="http://www.w3.org/2000/svg" {...props}>`,
      `    ${jsxBody}`,
      `  </svg>`,
      `);`,
      ``,
    );
  }

  writeFileSync(join(OUT_DIR, outputFile), lines.join('\n'));
  console.log(`Generated ${files.length} icon components → src/generated/${outputFile}`);
}

mkdirSync(OUT_DIR, { recursive: true });

generateIconFile(CUSTOM_SVG_DIR, 'custom.tsx');
generateIconFile(BRAND_SVG_DIR, 'brand.tsx');

writeFileSync(
  join(ROOT, 'src', 'index.ts'),
  `export * from './generated/custom';\nexport * from './generated/brand';\n`,
);
