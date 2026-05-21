# Acciano Design System — Arquitetura e Estrutura de Pastas

## Visão geral da arquitetura

O Acciano é um **monorepo de design system**, organizado para separar tokens, componentes, ícones, logos e documentação. A estrutura abaixo é a referência canônica — qualquer desvio deve ser justificado.

```
acciano-design-system/
├── .github/                        # CI/CD e configurações do GitHub
│   └── workflows/
│       └── chromatic.yml
│
├── packages/
│   ├── tokens/                     # Design tokens (fonte da verdade)
│   │   ├── src/
│   │   │   ├── internal/
│   │   │   │   ├── _PrimitiveColor.tokens.json
│   │   │   │   └── _TailwindCSS.tokens.json
│   │   │   ├── public/
│   │   │   │   ├── Theme.tokens.json
│   │   │   │   ├── Color.Light.tokens.json
│   │   │   │   ├── Color.Dark.tokens.json
│   │   │   │   ├── Foundations.tokens.json
│   │   │   │   ├── Typography.Desktop.tokens.json
│   │   │   │   ├── Typography.Mobile.tokens.json
│   │   │   │   └── Elevation.tokens.json
│   │   │   └── Grid.stories.tsx    # Story de documentação de layout grids
│   │   ├── dist/                   # CSS custom properties geradas
│   │   └── package.json
│   │
│   ├── components/                 # Componentes React de UI
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.module.css
│   │   │   │   │   ├── Button.stories.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── [OutroComponente]/
│   │   │   ├── storybook/          # Utilitários exclusivos para stories
│   │   │   │   ├── lucide-icons.ts # Mapping de ícones Lucide para argTypes
│   │   │   │   └── a11y.ts         # disabledA11y — suprime color-contrast em disabled
│   │   │   ├── hooks/              # Hooks utilitários dos componentes
│   │   │   ├── utils/              # Funções auxiliares
│   │   │   └── index.ts            # Barrel export
│   │   └── package.json
│   │
│   ├── icons/                      # Ícones como componentes React
│   │   ├── src/
│   │   │   ├── generated/          # Gerado automaticamente pelo build script
│   │   │   │   ├── custom.tsx      # Ícones custom (não editar manualmente)
│   │   │   │   └── brand.tsx       # Ícones de marcas (não editar manualmente)
│   │   │   ├── utils/              # Tipos e utilitários compartilhados
│   │   │   └── index.ts            # Barrel export geral (regravado pelo build)
│   │   ├── svgs/                   # SVGs brutos exportados do Figma (fonte da verdade)
│   │   │   ├── custom/             # SVGs dos ícones custom
│   │   │   └── brand/              # SVGs dos ícones de marcas externas
│   │   ├── scripts/
│   │   │   └── build-icons.ts      # Converte SVGs em componentes React
│   │   └── package.json
│   │
│   └── logos/                      # Logos como componentes React
│       ├── src/
│       │   ├── LogoAcciano/
│       │   │   ├── _Symbol.tsx     # Símbolo interno — não exportado diretamente
│       │   │   ├── LogoAcciano.tsx # Compõe _Symbol + logotipo
│       │   │   └── index.ts        # Exporta apenas LogoAcciano
│       │   ├── [OutraLogo]/
│       │   ├── utils/              # Tipos compartilhados (LogoProps, etc.)
│       │   │   └── types.ts
│       │   └── index.ts            # Barrel export geral
│       ├── svgs/                   # SVGs brutos exportados do Figma
│       └── package.json
│
├── apps/
│   └── storybook/                  # Documentação interativa
│       ├── .storybook/
│       │   ├── main.ts
│       │   ├── preview.ts
│       │   └── globals.d.ts        # declare module "*.css" — suprime erros TS nos imports de CSS
│       ├── vitest.config.ts        # storybookTest plugin + Playwright Chromium headless
│       ├── vitest.shims.d.ts       # /// <reference types="@vitest/browser-playwright" />
│       └── package.json
│
├── docs/                           # Documentação interna do projeto
│   └── decisions/                  # ADRs (Architecture Decision Records)
│
├── .claude/                        # Contexto para o Claude (este conjunto de arquivos)
│   ├── 00_PROJECT_OVERVIEW.md
│   ├── 01_STACK_AND_TOOLS.md
│   ├── 02_ARCHITECTURE.md          # Este arquivo
│   ├── 03_CONVENTIONS.md
│   ├── 04_TOKENS.md
│   ├── 05_COMPONENTS.md
│   └── 06_CLAUDE_INSTRUCTIONS.md
│
├── package.json                    # Root (workspaces npm)
└── README.md
```

## Decisões arquiteturais

### Monorepo

O projeto usa estrutura de monorepo com **npm workspaces** para separar claramente tokens, componentes e documentação, permitindo que cada pacote evolua de forma independente. Sem Turborepo ou outras ferramentas de orquestração — a simplicidade é intencional.

### Tokens como pacote independente

Os tokens vivem em `packages/tokens` e são a única fonte de verdade para valores visuais. Componentes **nunca** usam valores hardcoded — sempre referenciam tokens via CSS custom properties.

### Componentes por pasta

Cada componente tem sua própria pasta com:

- O componente em si (`.tsx`)
- Estilos (`.module.css`)
- Story do Storybook (`.stories.tsx`)
- Barrel export (`index.ts`)

### Ícones como pacote independente

Ícones vivem em `packages/icons`, separados dos componentes de UI.

O Lucide Icons (`lucide-react`) é uma dependência externa usada diretamente pelos componentes — seus ícones **não** são copiados para `packages/icons`.

O fluxo de build dos ícones custom é:

1. SVG exportado do Figma → salvo em `svgs/custom/`
2. `npm run build` no pacote → `scripts/build-icons.ts` lê os SVGs e gera `src/generated/custom.tsx`
3. O `index.ts` é regravado automaticamente — exporta tudo de `generated/custom`

**Nunca editar `src/generated/custom.tsx` manualmente** — o arquivo é sobrescrito a cada build. Para alterar um ícone, editar o SVG em `svgs/custom/` e rodar o build.

Os ícones de marcas externas (Instagram, Facebook, etc.) seguem o mesmo pipeline — SVGs em `svgs/brand/` geram `src/generated/brand.tsx`. O `Footer/_BrandIcons.tsx` é um arquivo fino que importa de `@acciano/icons` e reexporta com os mapas `BRAND_ICONS` e `BRAND_LABELS` usados pelo Footer.

### Logos como pacote independente

Logos vivem em `packages/logos`, separados dos ícones. Cada logo é um componente público que compõe internamente um `_Symbol` — o símbolo isolado da marca. O `_Symbol` não é exportado pelo `index.ts` da pasta e não deve ser usado diretamente fora do seu logo pai.

### Figma como origem

Toda decisão visual tem origem no Figma. Quando houver dúvida sobre um valor (cor, espaçamento, tipografia, ícone, logo), o Figma é a referência — consultar via MCP antes de assumir.
