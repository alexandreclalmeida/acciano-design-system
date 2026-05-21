# Acciano Design System — Visão Geral do Projeto

## O que é o Acciano?

O **Acciano Design System**, originalmente criado como um estudo de engenharia de UI, evoluiu para um UI Kit escalável focado em consistência. O projeto transforma esse kit em um sistema de design completo, com tokens, componentes React reutilizáveis e documentação interativa via Storybook.

O Acciano serve como:

- **Base de design** para novos projetos
- **Vitrine de trabalho** em UI Design, Design System e uso de IA no desenvolvimento
- **Projeto de estudo** para explorar boas práticas de engenharia de front-end com design sistemático

## Objetivos

1. Converter o UI Kit do Figma em tokens de design estruturados
2. Criar componentes React reutilizáveis, acessíveis e fiéis ao Figma
3. Documentar tudo no Storybook
4. Publicar o resultado como portfólio e referência técnica

## Status atual

- ✅ UI Kit no Figma (foundations, componentes e variáveis bem avançados)
- ✅ Estrutura de monorepo com npm workspaces
- ✅ Tokens de design (Style Dictionary → 7 arquivos CSS: base, foundations, typography desktop+mobile, color light+dark, elevation)
- ✅ Layout grids (tokens em foundations.css + story de documentação no Storybook)
- ✅ 50+ componentes React implementados e documentados no Storybook
- ✅ Storybook configurado com addon-themes (light/dark), addon-a11y, addon-docs, DocsPage global
- ✅ Repositório público no GitHub
- ✅ Storybook publicado via Chromatic com deploy automático

---

## Estratégia de implementação

O projeto é construído em fases, do mais simples ao mais complexo. Cada fase estabelece a base para a seguinte — componentes simples são a matéria-prima dos compostos.

### Fase 1 — Setup e tokens ✅

- ✅ Estrutura do monorepo
- ✅ `packages/tokens` com build funcional (Style Dictionary)
- ✅ Storybook configurado e servindo em :6006
- ✅ Temas light/dark alternando via `data-theme`
- ✅ Tipografia responsiva via media query
- ✅ `base.css` com font-smoothing e shape-rendering
- ✅ `elevation.css` com tokens `--elevation-sunken/raised/overlay`
- ✅ Layout grids — tokens em `foundations.css` (`--grid-{desktop/tablet/mobile}-{columns/margin/gutter}`) + story de documentação `Foundations/Layout grids` no Storybook

### Fase 2 — Primitivos de composição ✅

Componentes sem dependência de outros componentes do DS.

- ✅ `Text` — 15 variantes tipográficas, prop polimórfica `as`
- ✅ `Dot` — 9 tipos × 3 tamanhos, outline, ícones SVG customizados
- ✅ `Count` — 3 emphasis (Strong/Moderate/Weak)
- ✅ `Divider` — 2 contrasts (Low/High)
- ✅ `Loading Bar`

### Fase 3 — Composição simples ✅

Componentes que dependem ou compõem outros elementos do DS.

- ✅ `Capsule` — 8 tones × 2 variants (Filled/Stroked)
- ✅ `Tag` + `TagGroup`
- ✅ `TextBlock`
- ✅ `Badge` — 7 tones × 2 sizes, usa `<Dot>` real
- ✅ `Slot` — placeholder de design-time

### Fase 4 — Controles interativos ✅

- ✅ `Slider` — controlled/uncontrolled
- ✅ `LinkButton` — 4 tones × 2 sizes × 2 weights
- ✅ `Switch` — 2 sizes

### Fase 5 — Ações e avatars ✅

- ✅ `Button` — Primary/Secondary/Tertiary × Brand/Neutral/Critical/Inverse × Large/Medium/Small
- ✅ `IconButton` — mesma estrutura + Shape (Square/Circle), badges Dot e Count
- ✅ `ButtonGroup` — Layout Horizontal/Vertical, Order Default/Reverse, propaga `size` via Context
- ✅ `Avatar` — Photo/Icon/Initials × Small/Medium/Large
- ✅ `AvatarStack` — overlap com anel separador
- ✅ `AvatarLabelled` — Avatar + nome/email
- ✅ `AvatarDropdown` — tipo Button (chevron) ou Navigation (MoreVertical)

### Fase 6 — Formulários básicos ✅

- ✅ `Text Input` — label, required/optional, hideLabel, size, error, disabled, leadingIcon, trailingIcon, helperText
- ✅ `Text Area` — sem size variants, grabber SVG inline, resize suprimido
- ✅ `Checkbox` + `CheckboxGroup` — controlled/uncontrolled, indeterminate via ref
- ✅ `Radio Button` + `RadioButtonGroup` — controlled/uncontrolled

### Fase 7 — Formulários compostos ✅

- ✅ `Search Input`
- ✅ `Select` — dropdown via React Portal, hidden input para form integration
- ✅ `Autocomplete` — mode Single/Multiple, filtragem em tempo real, maxVisibleTags
- ✅ `Combobox` — mode Single/Multiple, sem filtragem, mesma API do Autocomplete

### Fase 8 — Navegação e estrutura ✅

- ✅ `Tabs` — WAI-ARIA completo, roving tabindex, keyboard navigation
- ✅ `Stepper` — controlled/uncontrolled, editable mode
- ✅ `Breadcrumbs` — semântico `nav>ol>li`, collapsed mode
- ✅ `Segmented Control` — WAI-ARIA radiogroup/radio, roving tabindex
- ✅ `Pagination` — Desktop e Mobile, generatePages com ellipsis

### Fase 9 — Overlays e feedback ✅

- ✅ `Tooltip` — 4 direções × 2 tamanhos, SVG paths por direção
- ✅ `Dropdown Menu` — triggers: Button/Icon/Avatar; itens: Single/Dual/Heading/Divider/Critical/Checkbox/Avatar/Switch
- ✅ `Alert` — 8 tones × Large/Small × Horizontal/Vertical; bar, icon, capsule, close, list, link, buttons slots
- ✅ `Alert Global` — banner full-width com border-bottom; 8 tones × Desktop/Mobile; buttons slot
- ✅ `Modal` — Small (500px) / Large (700px) / Mobile (bottom sheet); backdrop com blur/8px; props: capsule, heading, description, image, children, buttons, showClose
- ✅ `Drawer` — painel lateral direito; Small (400px) / Large (600px) / Mobile (calc(100%-64px)); backdrop com blur/4px; props: heading, children (flex-1 scroll), buttons (ButtonGroup), showClose

### Fase 10 — Conteúdo ✅

- ✅ `Progress Indicator` — steps com estado complete/incomplete, back button
- ✅ `Rating` — Star/Heart/Circle, meias estrelas, horizontal/vertical; ícones via `@acciano/icons`
- ✅ `Card` — arquitetura 2 camadas (stateCard + container), hover/active elevation, inside stroke via box-shadow: inset
- ✅ `Accordion` — WAI-ARIA completo, controlled/uncontrolled por item
- ✅ `Table`
- ✅ `Summary List`
- ✅ `Date Picker` — field button + CalendarPanel via Portal, eventDates
- ✅ `File Upload` — FileUpload + FileUploadItem (LoadingBar) + FileList

### Fase 11 — Página ✅

- ✅ `Empty State` — Capsule + TextBlock + actions slot
- ✅ `Testimonial` — AvatarLabelled + Rating, align Left/Center
- ✅ `Navigation Side` — NavigationSideItem (9 types) + NavigationSide (Desktop/MobileClosed/MobileOpen)
- ✅ `Navigation Header` — NavigationHeaderItem + NavigationHeader (Desktop/MobileClosed/MobileOpen)
- ✅ `Footer` — 3 sizes (Small/Large/About) × 3 devices; brand icons SVG inline
- ✅ `Hero` — 5 tipos × 3 devices; slot-based API (emailSlot, buttonsSlot, socialSlot, tag)

### Fase 12 — Infraestrutura e publicação ✅

- ✅ `.gitignore` configurado (projeto + alinhado com `.gitignore_global` do macOS/Windows)
- ✅ Repositório público no GitHub — `github.com/alexandreclalmeida/acciano-design-system`
- ✅ README público com links para Figma, Storybook e LinkedIn
- ✅ `packages/tokens/dist/` versionado intencionalmente (force include no `.gitignore`)
- ✅ Chromatic configurado — Storybook publicado em `https://main--6a0dbefde23c1c4677b98a9e.chromatic.com`
- ✅ GitHub Actions — workflow `chromatic.yml` com deploy automático a cada push para `main`
- ✅ `CHROMATIC_PROJECT_TOKEN` configurado como secret no GitHub (não exposto no código)
- ✅ docs/decisions/ — pasta criada para ADRs (Architecture Decision Records)
- ✅ ADRs escritas (14): 001 monorepo npm workspaces, 002 tokens as independent package, 003 css modules no css in js, 004 no third party component libraries, 005 token layered architecture, 006 icons as independent package, 007 dropdowns via react portal, 008 storybook deploy chromatic, 009 color tokens light/dark, 010 typography via media query, 011 logos as independent package, 012 elevation tokens, 013 storybook with vite, 014 tokens dist versioned
- ✅ Ordem de build corrigida no monorepo: `tokens → icons → logos → components`
- ✅ Auditoria de `title` nas stories (2026-05-20): todos os 56 `.stories.tsx` em `packages/components/src` têm `title:` explícito no meta

---

> **Nota:** A ordem das fases é uma referência, não uma regra rígida. Um componente pode ser antecipado se houver necessidade específica — o importante é que suas dependências já estejam implementadas.
