import StyleDictionary from 'style-dictionary';
import { formattedVariables } from 'style-dictionary/utils';
import fs from 'fs';

// ─── Transformação: número → px ──────────────────────────────────────────────
StyleDictionary.registerTransform({
  name: 'acciano/size/px',
  type: 'value',
  filter: (token) => {
    const isNumber = token.$type === 'number' || typeof token.$value === 'number';
    const isWeight = token.path.some((p) => p.includes('weight'));
    const isColumns = token.path.some((p) => p === 'columns');
    return isNumber && !isWeight && !isColumns;
  },
  transform: (token) => {
    const value = parseFloat(token.$value ?? token.value);
    return `${value}px`;
  },
});

// ─── Transformação: cor com alpha → rgba() ───────────────────────────────────
StyleDictionary.registerTransform({
  name: 'acciano/color/rgba',
  type: 'value',
  filter: (token) => token.$type === 'color',
  transform: (token) => {
    const val = token.$value ?? token.value;
    if (typeof val === 'string') return val;
    const { hex, alpha, components } = val;
    const a = Math.round((alpha ?? 1) * 100) / 100;
    if (a >= 1) return hex;
    const [r, g, b] = (components ?? []).map((c) => Math.round(c * 255));
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  },
});

// ─── Grupo de transformações ──────────────────────────────────────────────────
StyleDictionary.registerTransformGroup({
  name: 'acciano/css',
  transforms: [
    'attribute/cti',
    'name/kebab',
    'acciano/color/rgba',
    'acciano/size/px',
  ],
});

// ─── Formato: typography com Google Fonts import ─────────────────────────────
// Lê as famílias e pesos diretamente dos tokens para construir a URL do Google
// Fonts automaticamente — ao trocar a fonte no JSON, o @import se atualiza.
StyleDictionary.registerFormat({
  name: 'acciano/css/typography',
  format: ({ dictionary, options }) => {
    const { selector = ':root' } = options;

    // Famílias únicas: tokens do grupo 'font' com profundidade 2
    // Em SD v5 com DTCG, strings sem transform ficam apenas em $value
    const families = [...new Set(
      dictionary.allTokens
        .filter(t => t.path[0] === 'font' && t.path.length === 2)
        .map(t => String(t.$value ?? t.value))
    )];

    // Pesos numéricos únicos e ordenados: tokens do grupo 'font-weight'
    const weights = [...new Set(
      dictionary.allTokens
        .filter(t => t.path[0] === 'font-weight')
        .map(t => Number(t.$value ?? t.value))
    )].sort((a, b) => a - b).join(';');

    const familyParams = families
      .map(f => `family=${f.replace(/ /g, '+')}:wght@${weights}`)
      .join('&');
    const importUrl = `https://fonts.googleapis.com/css2?${familyParams}&display=swap`;

    const vars = formattedVariables({
      format: 'css',
      dictionary,
      outputReferences: false,
      usesDtcg: true,
    });

    return [
      `/**\n * Do not edit directly, this file was auto-generated.\n */`,
      `@import url('${importUrl}');`,
      `${selector} {\n${vars}\n}`,
    ].join('\n\n') + '\n';
  },
});

// ─── Formato: media query wrapper ────────────────────────────────────────────
StyleDictionary.registerFormat({
  name: 'acciano/css/media-query',
  format: ({ dictionary, options }) => {
    const { mediaQuery, selector = ':root' } = options;
    const vars = formattedVariables({
      format: 'css',
      dictionary,
      outputReferences: false,
      usesDtcg: true,
      formatting: { indentation: '    ' },
    });
    return `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n${mediaQuery} {\n  ${selector} {\n${vars}\n  }\n}\n`;
  },
});

// ─── Helper: cria uma instância SD isolada e faz o build ─────────────────────
async function buildPlatform({ source, destination, selector, prefix, filter, format, formatOptions }) {
  const fileConfig = {
    destination,
    format: format ?? 'css/variables',
    options: {
      selector,
      outputReferences: false,
      ...(formatOptions ?? {}),
    },
  };

  if (filter) fileConfig.filter = filter;

  const sd = new StyleDictionary({
    source,
    platforms: {
      css: {
        transformGroup: 'acciano/css',
        buildPath: 'dist/',
        prefix,
        files: [fileConfig],
      },
    },
    log: { verbosity: 'silent' },
  });

  await sd.buildAllPlatforms();
  console.log(`✔︎ dist/${destination}`);
}

// ─── Builds ───────────────────────────────────────────────────────────────────
await buildPlatform({
  source: [
    'src/internal/_PrimitiveColor.tokens.json',
    'src/internal/_TailwindCSS.tokens.json',
    'src/public/Foundations.tokens.json',
  ],
  destination: 'foundations.css',
  selector: ':root',
  filter: (token) => token.filePath.includes('Foundations'),
});

await buildPlatform({
  source: [
    'src/internal/_TailwindCSS.tokens.json',
    'src/public/Typography.Desktop.tokens.json',
  ],
  destination: 'typography.css',
  selector: ':root',
  format: 'acciano/css/typography',
  filter: (token) => token.filePath.includes('Typography.Desktop'),
});

await buildPlatform({
  source: [
    'src/internal/_TailwindCSS.tokens.json',
    'src/public/Typography.Mobile.tokens.json',
  ],
  destination: 'typography.mobile.css',
  format: 'acciano/css/media-query',
  formatOptions: { mediaQuery: '@media (max-width: 768px)', selector: ':root' },
  filter: (token) => token.filePath.includes('Typography.Mobile'),
});

await buildPlatform({
  source: [
    'src/internal/_PrimitiveColor.tokens.json',
    'src/public/Theme.tokens.json',
    'src/public/Color.Light.tokens.json',
  ],
  destination: 'color.light.css',
  selector: ':root, [data-theme="light"]',
  prefix: 'color',
  filter: (token) => token.filePath.includes('Color.Light'),
});

await buildPlatform({
  source: [
    'src/internal/_PrimitiveColor.tokens.json',
    'src/public/Theme.tokens.json',
    'src/public/Color.Dark.tokens.json',
  ],
  destination: 'color.dark.css',
  selector: '[data-theme="dark"]',
  prefix: 'color',
  filter: (token) => token.filePath.includes('Color.Dark'),
});

await buildPlatform({
  source: ['src/public/Elevation.tokens.json'],
  destination: 'elevation.css',
  selector: ':root',
  filter: (token) => token.filePath.includes('Elevation'),
});

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync(
  'dist/base.css',
  `/**\n * Do not edit directly, this file was auto-generated.\n */\n\nhtml {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\nsvg {\n  shape-rendering: geometricPrecision;\n}\n`,
);
console.log('✔︎ dist/base.css');