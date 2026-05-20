# Acciano Design System — Componentes

> Este arquivo reflete a estrutura real do arquivo Figma do Acciano.
> Os detalhes de variantes, estados e props de cada componente devem ser lidos via Figma MCP antes da implementação.

---

## Status

| Símbolo | Significado |
|---|---|
| ✅ | Implementado e documentado no Storybook |
| 🚧 | Em desenvolvimento |
| 📐 | Existe no Figma, ainda não implementado |
| ⬜ | Planejado, ainda não existe no Figma |

---

## Estrutura do arquivo Figma

```
Playground          → testes livres, não documentar
─────────────────────────────────────────────
EXAMPLES
  Made with Acciano → telas de exemplo, não são componentes
─────────────────────────────────────────────
BRAND
  Thumbnail         → frame de capa do Figma
  Logos             → logos do Acciano e exemplos externos
─────────────────────────────────────────────
FOUNDATIONS
  Colors
  Typography
  Spacing
  Elevation
  Layout grids
  Icons
─────────────────────────────────────────────
COMPONENTS
  All components    → compilação visual, não é fonte de implementação
  [componentes individuais — ver tabela abaixo]
─────────────────────────────────────────────
HIDDEN
  Primitives        → componentes internos (_), não expor como API pública
  Internal          → elementos internos (_), não expor como API pública
```

> **HIDDEN** segue a mesma convenção dos tokens: páginas prefixadas com `_` no código. Nunca devem ser importadas ou usadas diretamente por quem consome o design system.

---

## Foundations

Não são componentes — são a base visual do sistema. Todos mapeados no `04_TOKENS.md`.

| Item | Página no Figma | Status |
|---|---|---|
| Colors | FOUNDATIONS / Colors | ✅ |
| Typography | FOUNDATIONS / Typography | ✅ |
| Spacing | FOUNDATIONS / Spacing | ✅ |
| Elevation | FOUNDATIONS / Elevation | ✅ |
| Layout grids | FOUNDATIONS / Layout grids | ✅ |

---

## Ícones (`packages/icons`)

> Pacote independente, separado de componentes de UI e de logos.
> O Lucide Icons (`lucide-react`) é uma dependência externa — seus ícones não vivem neste pacote.

| Categoria | Página no Figma | Status | Story |
|---|---|---|---|
| Lucide (referência) | FOUNDATIONS / Icons / frame Lucide | — (dependência externa) | ✅ `Foundations/Icons/Lucide` |
| Custom icons | FOUNDATIONS / Icons / frame Custom | ✅ | ✅ `Foundations/Icons/Custom` |
| Brand icons | FOUNDATIONS / Icons / frame Brand | ✅ | ✅ `Foundations/Icons/Brand` |

### Ícones Custom implementados

Gerados via pipeline `svgs/custom/` → `build-icons.ts` → `src/generated/custom.tsx`. Exportados por `@acciano/icons`.

| Ícone(s) | Descrição |
|---|---|
| `CheckIcon`, `PartialIcon`, `RadioIcon` | Usados por Checkbox e RadioButton |
| `DotAwayIcon`, `DotBusyIcon`, `DotCriticalIcon`, `DotInfoIcon`, `DotOfflineIcon`, `DotOnlineIcon`, `DotSuccessIcon`, `DotWarningIcon` | Usados pelo componente `Dot` |
| `RatingStarEmptyIcon`, `RatingStarHalfIcon`, `RatingStarFullIcon` | Usados pelo componente `Rating` |
| `RatingHeartEmptyIcon`, `RatingHeartHalfIcon`, `RatingHeartFullIcon` | Usados pelo componente `Rating` |
| `RatingCircleEmptyIcon`, `RatingCircleHalfIcon`, `RatingCircleFullIcon` | Usados pelo componente `Rating` |

### Brand icons implementados

Gerados via pipeline `svgs/brand/` → `build-icons.ts` → `src/generated/brand.tsx`. Exportados por `@acciano/icons`. Usam `fill="currentColor"` (monocromáticos, herdam a cor do contexto).

| Ícone | Descrição |
|---|---|
| `FacebookIcon` | Facebook |
| `InstagramIcon` | Instagram |
| `LinkedinIcon` | LinkedIn |
| `XTwitterIcon` | X (Twitter) |
| `YoutubeIcon` | YouTube |

### Convenção de nomenclatura

| Categoria | Padrão | Exemplo |
|---|---|---|
| Lucide | nome original da lib | `Heart`, `ArrowRight`, `ChevronDown` |
| Custom | `[Grupo][Variante]Icon` | `DotAwayIcon`, `RatingStarFullIcon`, `CheckIcon` |

### Tipo dos componentes gerados

```tsx
React.FC<React.SVGProps<SVGSVGElement>>
```

### Uso do Lucide

Importar diretamente de `lucide-react` com os **nomes originais da biblioteca** — os mesmos do frame `Lucide` no Figma. Sem renomeação.

```tsx
// ✅ Correto
import { Heart, ArrowRight, ChevronDown } from 'lucide-react';

// ❌ Errado — não copiar SVGs do Lucide para packages/icons
```

---

## Logos (`packages/logos`)

> Pacote independente. Logos são marcas criadas para uso nos projetos — não são ícones.
> Organizados na seção **BRAND / Logos** do Figma.

### Convenção de `_Symbol`

Cada logo é composto por um `_Symbol` interno (símbolo isolado da marca) e o logotipo completo. O `_Symbol`:
- Tem prefixo `_` — é interno à pasta do seu logo pai
- **Não é exportado** pelo `index.ts` da pasta
- Nunca deve ser importado diretamente fora do seu `Logo`

### Inventário

| Logo | Status |
|---|---|
| `LogoAcciano` | ✅ — inline styles (sem CSS module, funciona do dist) |

---

## Componentes

> Variantes, estados e props de cada componente devem ser lidos via Figma MCP antes da implementação.
> A página "All components" é apenas compilação visual — a fonte de implementação é a página individual de cada componente.

---

### Accordion

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Accordion |
| Props | `children` (AccordionItem); `AccordionItem`: `title`, `children`, `open?`, `defaultOpen?`, `onToggle?`, `disabled?` |
| Notas | WAI-ARIA completo (aria-expanded, aria-controls, role=region, aria-labelledby); controlled/uncontrolled por item; state overlay via `::before` no `.item` com `:has(.trigger:hover)` cobre toda a área aberta; focus ring via `.trigger::after`; stories: Default, AllOpen, WithDisabled |

---

### Alert

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Alert |
| Props | `tone` (8 opções), `layout` (Horizontal\|Vertical), `size` (Large\|Small), `showBar?`, `showIcon?`, `showCapsule?`, `showClose?`, `icon?` (LucideIcon), `heading?`, `children`, `list?`, `link?` (ReactNode), `buttons?` (ReactNode), `onClose?` |
| Notas | Barra lateral via flex child com `background-color`; stroke via `box-shadow: inset` (não `border`) para o flex child sobrepor o traço; capsule = ícone dentro de círculo preenchido; Layout Vertical empilha ícone/capsule + content; Small: content em row (texto + link/buttons lado a lado); tones InvNeutral/InvBrand com paleta inversa |

---

### Alert Global

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Alert global |
| Props | `tone` (8 opções), `device` (Desktop\|Mobile), `showIcon?`, `showClose?`, `icon?` (LucideIcon), `children`, `buttons?` (ReactNode), `onClose?` |
| Notas | Banner full-width com `border-bottom` (sem border-radius); Desktop: `pl-24px`, items-center, botões ao lado do texto (fora do content); Mobile: `pl-32px`, items-start, botões abaixo do texto (dentro do content); tones inversos usam paleta inversa; story com `layout: 'fullscreen'` |

---

### Autocomplete

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Autocomplete |
| Props | `label`, `hideLabel`, `required`, `optional`, `placeholder`, `error`, `disabled`, `helperText`; Single: `value/defaultValue/onChange`; Multiple: `values/defaultValues/onValuesChange`, `maxVisibleTags` (default 2) |
| Notas | Field é `<div>` com Search icon + `<input type="text">`; Single filtra em tempo real; Multiple exibe tags + chip `+N`; X para clear-all; dropdown Single=itens simples, Multiple=Checkbox items; `options[]` com `value/label` |

---

### Avatar

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Avatar |
| Props | `type` (Photo\|Icon\|Initials), `size` (Small=32px\|Medium=48px\|Large=64px), `src`, `alt`, `initials`, `status?: DotType`, `showNotification?: boolean` |
| Notas | Photo: `<img object-fit:cover>`; Icon: Lucide `User`; Initials: SemiBold centrado; `overflow:visible` para badges; Status badge `bottom:-1px right:-1px`, Notification badge `top:-1px right:-1px`; usa instâncias `<Dot>` reais com `outline` |

### Avatar Stack

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Avatar (frame Avatar stack) |
| Props | `size` (Small\|Medium\|Large), `max` (default 5), `children` (Avatar elements) |
| Notas | `padding:2px + bg:background-base` cria o anel separador; margem negativa Small=-9px, Medium=-12px, Large=-16px; overflow chip: `fill/low` + `stroke/low` |

### Avatar Labelled

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Avatar (frame Avatar labelled) |
| Props | `size` (Small\|Medium\|Large), `name`, `email?`, `type?`, `src?`, `initials?`, `status?`, `showNotification?` |
| Notas | Small: nome só; Medium/Large: nome + email; email visível apenas em Medium e Large; gap Small=8px, Medium+Large=12px |

### Avatar Dropdown

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Avatar (frame Avatar dropdown) |
| Props | `type` (Button\|Navigation), `disabled?`, `isOpen?`, `name`, `avatarType?`, `src?`, `initials?`, `onClick?` |
| Notas | Button: `padding:8px 16px`, `border-radius:radius-lg`, ChevronDown/ChevronUp; Navigation: `width:100%`, `padding:12px 24px`, MoreVertical; state overlay via `::before`; disabled = `opacity:0.3` |

---

### Badge

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Badge |
| Props | `label`, `tone` (7 opções), `size` (Medium\|Small), `icon?` (LucideIcon), `dot?` (boolean), `dotType?` (DotType, default 'Info') |
| Notas | Usa componente `<Dot>` real com `size="Medium"`; `border: var(--border-1px) solid` (não hardcoded) |

---

### Breadcrumbs

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Breadcrumbs |
| Props | `items` (label/href/onClick), `collapsed` (mostra primeiro+ellipsis+último), `onEllipsisClick` |
| Notas | `<nav>+<ol>+<li>` semântico; separador ChevronRight 20px; ellipsis MoreHorizontal como button; usa `<LinkButton>` tone=neutral size=small underline=false + hover underline via className |

---

### Button

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Button |
| Variantes | Primary, Secondary, Tertiary |
| Tones | Brand, Neutral, Critical, Inverse |
| Tamanhos | Large (64px), Medium (48px), Small (32px) |
| Estados | default, hover, press, focus, disabled |

**Props principais:**
- `variant` — Primary / Secondary / Tertiary
- `tone` — Brand / Neutral / Critical / Inverse
- `size` — Large / Medium / Small
- `disabled`
- `leadingIcon` / `trailingIcon` — LucideIcon opcional

**Notas:**
- Secondary usa `box-shadow: inset` (não `border`) para não expandir o boundary
- Focus ring: `inset: -4px`, `border-radius: calc(var(--btn-radius) + 4px)`
- Hover/press via pseudo-elemento `::before`
- Ícones usam `--color-icon-*` (nunca `--color-text-*`)
- Secondary usa `--elevation-raised` combinado com inset stroke

---

### Button Group

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Button group |
| Props | `layout` (Horizontal\|Vertical), `order` (Default\|Reverse), `size` (Large\|Medium\|Small) |
| Notas | `inline-flex` com `gap: --spacing-16px`; Layout Vertical usa `align-items: stretch`; Order=Reverse via `flex-direction: row-reverse/column-reverse`; propaga `size` aos filhos via **React Context** (`ButtonGroupContext`) |

---

### Capsule

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Capsule |
| Props | `tone` (8 opções), `variant` (Filled\|Stroked), `icon` (LucideIcon, obrigatório), `label` |
| Notas | Filled: sem border; Stroked: `border: var(--border-1px) solid`; ícone usa `--color-icon-{tone}` |

---

### Card

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Card |
| Props | `layout?` (Vertical\|Horizontal), `imageSrc?`, `imageAlt?`, `capsule?` (ReactNode), `label?`, `heading?`, `description?`, `link?` (ReactNode), `avatar?` (ReactNode), `tags?` (ReactNode), `children?`, `onClick?`, `className?` |
| Notas | Arquitetura 2 camadas: `.stateCard` (absolute inset-0, background-raised + elevation-raised) + `.container` (relative, `box-shadow: inset 0 0 0 1px --color-stroke-low`, padding 1px, border-radius 2xl); `ImageFrame` com `overflow: clip` + `::after` para divider pintado acima da img; hover/active em `.root` (todos os cards, não só interativos); cursor:pointer + focus ring condicionais em `.root--interactive` (requer onClick); `.linkSlot button/a:hover` → `text-decoration: underline` (hover underline no contexto do card, sem classe externa); stories: Default, Horizontal, WithTags, NoImage, Minimal |

---

### Checkbox

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Checkbox |
| Props | `checked`, `defaultChecked`, `onChange`, `indeterminate`, `size` (Large\|Small), `error`, `disabled`, `label`, `helperText?` |
| Notas | Controlled/uncontrolled; indeterminate via ref; ícones `CheckIcon`/`PartialIcon` em `packages/icons/svgs/custom/` (currentColor stroke); `CheckboxGroup` com Context propagando size/error |

---

### Combobox

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Combobox |
| Props | Igual ao Autocomplete mas sem text input e sem filtragem |
| Notas | Field é `<div tabIndex={0} role=combobox>`; Single: exibe label selecionado ou placeholder; Multiple: tags + separador auxiliar com right-border + X clear + ChevronDown/Up; dropdown mostra todos os itens sem filtro |

---

### Count

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Count |
| Props | `count`, `emphasis` (Strong\|Moderate\|Weak) |
| Notas | Pill circular com box-sizing correto |

---

### Date Picker

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Date picker |
| Props | `label`, `hideLabel?`, `required?`, `optional?`, `value?`, `defaultValue?`, `onChange?`, `error?`, `disabled?`, `helperText?`, `eventDates?` |
| Notas | Field é `<button>` com CalendarIcon trailing; CalendarPanel via React Portal + useDropdownPosition; CalendarDay com 5 tipos: Default/Weekend/Selected/Today/Other; event dot 8×8px; hover/press via `::before`; focus ring via `::after` inset -4px; dias prev/next month como `<div>` (não-interativos) |

---

### Divider

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Divider |
| Props | `contrast` (Low\|High) |

---

### Dot

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Dot |
| Props | `type` (9 tipos), `size` (Small\|Medium\|Large), `outline?` |
| Notas | Ícones SVG via `@acciano/icons`; dark mode; `outline` adiciona anel `background-base` |

---

### Drawer

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Drawer |
| Props | `open`, `onClose`, `size` (Small=400px\|Large=600px), `heading`, `children` (slot scrollável), `buttons?` (ReactNode via ButtonGroup), `showClose?` |
| Notas | Painel lateral direito; `.root` `position:fixed inset:0 flex justify-end` como containing block; backdrop `position:fixed inset:0` fill/overlay + `backdrop-filter: blur(4px)` + `-webkit-backdrop-filter`; panel: `height:100%`, `border` 4 lados stroke/low, elevation-overlay, `translateX(100%)→translateX(0)` 300ms; Mobile: `calc(100%-64px)`; `box-sizing:border-box` em header/content/footer; header: H4 + X button 28px condicional; content: `flex:1 0 0 overflow-y-auto`; footer: border-top + ButtonGroup; Escape + scroll-lock + focus no painel |

---

### Dropdown Menu

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Dropdown |
| Props | `trigger` (ReactNode), `items` (DropdownItem[]), `isOpen?`, `onClose?` |
| Notas | Triggers: Button (chevron toggle), Icon (IconButton Tertiary/Neutral), Avatar (AvatarDropdown); lista via React Portal + `position: fixed`; posição calculada por `useDropdownPosition` (getBoundingClientRect + rAF + scroll capture); itens: Single, Dual, Heading, Divider, Critical, Checkbox, Avatar, Switch; fecha ao clicar fora ou Escape |

---

### Empty State

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Empty state |
| Props | `capsule` (ReactNode), `heading`, `description`, `actions` (ReactNode) |
| Notas | Composição de Capsule + TextBlock interno (heading H5 + description) + actions slot; gap 24px |

---

### File Upload

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / File upload |
| Props | `FileUpload`: `label`, `hideLabel?`, `required?`, `optional?`, `error?`, `helperText?`, `accept?`, `multiple?`, `maxSizeLabel?`, `disabled?`, `onChange?`; `FileUploadItem`: `name`, `size?`, `status` (uploading\|uploaded), `progress?` (0-100), `href?`, `onRemove?`; `FileList`: `children` |
| Notas | Drop zone com drag-over state; Browse button usa `Button Secondary/Brand/Small` (default) ou `Secondary/Neutral/Small` (error); hidden input; `FileUploadItem` usa `<LoadingBar>` real com showLabel=false; `FileList` = container flex-col |

---

### Footer

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Footer |
| Props | `size` (Small\|Large\|About), `device` (Desktop\|Tablet\|Mobile), `columns?` (ReactNode), `logo?` (ReactNode), `description?`, `socialLinks?`, `navLinks?`, `copyright?` |
| Notas | 3 sizes × 3 devices; brand icons via `@acciano/icons` (`FacebookIcon`, `InstagramIcon`, `LinkedinIcon`, `XTwitterIcon`, `YoutubeIcon`) com `currentColor`; About Desktop: logo+desc 400px fixo + colunas flex-1; About Tablet: logo+desc full-width empilhado acima das colunas; About Mobile: mesmo empilhamento + colunas 2-por-linha; Small: logo+social (justify-between Desktop, stacked Mobile) + nav links + copyright; Large: colunas + "Follow us" (icon+label) + bottom bar; stories: Default, Large, Tablet, Tablet/Large, Mobile, Mobile/Large |

---

### Hero

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Hero |
| Props | `type` (Horizontal\|Horizontal padded\|Vertical\|Vertical large\|Vertical small), `device` (Desktop\|Tablet\|Mobile), `label?`, `tag?` (ReactNode), `heading`, `description`, `emailSlot?` (ReactNode), `buttonsSlot?` (ReactNode), `socialSlot?` (ReactNode), `imageSrc?`, `imageAlt?`, `className?` |
| Notas | 5 tipos × 3 devices; slot-based API (emailSlot, buttonsSlot, socialSlot, tag); `TYPE_CLASS` map converte nomes com espaço (`'Horizontal padded'` → `type--HorizontalPadded`); Mobile/Tablet: `display: grid; grid-template-columns: 1fr` em `.emailRow` e `.buttonRow`; **obrigatório** `box-sizing: border-box` em `.content` nas regras de device que combinam `width: 100%` com padding horizontal — sem isso o content transborda o root; stories: Default, HorizontalPadded, Vertical, VerticalLarge, VerticalSmall, WithLabel, WithTag, Tablet, Mobile |

---

### Icon Button

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Icon button |
| Variantes | Primary, Secondary, Tertiary |
| Tones | Brand, Neutral, Critical, Inverse |
| Tamanhos | Large (64×64px), Medium (48×48px), Small (32×32px) |
| Shapes | Square (radius-xl/lg), Circle (radius-full) |
| Estados | default, hover, press, focus, disabled |

**Props principais:**
- `icon` — LucideIcon (obrigatório); tamanhos: Large=32px, Medium=24px, Small=16px
- `variant` / `tone` / `size` / `shape`
- `disabled`
- `showDot` — badge `<Dot type="Notification" size="Small" outline />`
- `showCount` + `count` — badge `<Count emphasis="Strong" />`

**Notas:**
- Dot e Count são instâncias reais dos componentes — não CSS manual
- Ícones usam `--color-icon-*` (nunca `--color-text-*`)
- Shape Circle sobrescreve `--ibtn-radius` para `var(--radius-full)`
- Secondary usa `--elevation-raised` + anel de separação no countBadge

---

### Link Button

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Link button |
| Props | `tone` (Brand\|Neutral\|Critical\|Inverse\|Link), `size` (base\|small), `weight` (Regular\|Bold), `underline?`, `disabled?`, `leadingIcon?`, `trailingIcon?`, `onClick?`, `href?` |
| Notas | Foco via `::after`; disabled semântico via `aria-disabled`; ícone usa `icon-{tone}` (não herda currentColor do texto); disabled usa `icon-disabled`; inverse+disabled usa `icon-inverse-disabled` |

---

### Loading Bar

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Loading bar |
| Props | `progress` (0–100), `indeterminate?` |

---

### Modal

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Modal |
| Props | `open`, `onClose`, `size` (Small=500px\|Large=700px), `capsule?` (ReactNode), `heading?`, `description?`, `image?`, `children?` (slot), `buttons?` (ReactNode), `showClose?` |
| Notas | Portal via `createPortal`; backdrop fill/overlay + `backdrop-filter: blur(8px)` + `-webkit-backdrop-filter`; dialog: `radius-2xl`, `padding-32px`, `elevation-overlay`, `stroke-low border`; Mobile (≤640px): bottom sheet (`align-end + p-16px`), buttons em coluna; heading `pr-48px` quando `showClose`; image: 245px altura `radius-lg cover`; Escape + backdrop click fecha; body scroll-lock; focus no dialog |

---

### Navigation Side

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Navigation side |
| Props | `NavigationSide`: `device` (Desktop\|MobileClosed\|MobileOpen), `logo?`, `topContent?`, `children?`, `bottomContent?`, `onMenuClick?`, `onCloseClick?`, `mobileBarRightSlot?`; `NavigationSideItem`: `type` (Default\|Header\|Divider\|DividerFull\|Slot\|Alert\|Button\|Search\|Avatar), `label?`, `icon?`, `selected?`, `disabled?`, `badge?`, `count?`, `href?`, `onClick?`, `alertHeading?`, `alertDescription?`, `children?` |
| Notas | Default item: state overlay via `::before` (hover/press/selected), focus ring via `::after`, selected = `fill-brand-low` + `border-left 4px stroke-selected`; `type="Button"` usa `display:flex; align-items:stretch` no `.fillContent` (botão fill, padrão ButtonGroup Vertical); MobileOpen = `position:fixed` overlay + panel; composição via slots (logo, topContent, children, bottomContent); stories: Default, WithSections, Mobile (interativo: useState alterna MobileClosed↔MobileOpen) |

---

### Navigation Header

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Navigation header |
| Props | `NavigationHeader`: `device` (Desktop\|MobileClosed\|MobileOpen), `logo?`, `tabs?`, `breadcrumbs?`, `search?`, `menuRight?`, `buttons?`, `avatar?`, `mobileBarRightSlot?`, `panelMiddle?`, `panelBottom?`, `onMenuClick?`, `onCloseClick?`; `NavigationHeaderItem`: `label`, `icon?`, `count?`, `selected?`, `disabled?`, `href?`, `onClick?` |
| Notas | Desktop: `px-32px gap-48px`, left flex-1 [logo+breadcrumbs slot+tabs], right [search+menuRight wrapper+buttons+avatar]; `menuRight` sempre em `.menuRight` flex sem gap interno; MobileClosed: hamburger+logo left, menuRight+mobileBarRightSlot right; MobileOpen: overlay fixed + panel 320px [panelTop close btn, panelMiddle slot, panelBottom slot com pb-24px]; tab item selecionado: `border-bottom 4px` + state overlay via `::before` com `inset 0 0 -4px 0`; Count Weak + border stroke/low; stories: Default, WithSearchBar, WithBreadcrumbs, Mobile |

---

### Pagination

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Pagination |
| Props | `currentPage`, `totalPages`, `onPageChange`, `device` (Desktop\|Mobile), `summaryText?`, `disabled?` |
| Notas | Desktop: LinkButton + ArrowLeft/Right + PageButton interno (40×40px); Mobile: IconButton + summaryText; `generatePages()` com current±1 + first/last + ellipsis; WAI-ARIA: nav+aria-label, aria-current="page" |

---

### Progress Indicator

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Progress indicator |
| Props | `currentStep` (0=not started), `totalSteps`, `label?` (default "Step X of Y"), `onBack?` |
| Notas | `_Step` interno (complete/incomplete); Back desabilitado em step=0; usa LinkButton tone=link size=small weight=bold; steps row flex: 1 0 0 com gap-4px; `--elevation-sunken` em ambos os estados do step |

---

### Radio Button

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Radio button |
| Props | `value`, `checked`, `onChange`, `size` (Large\|Small), `error`, `disabled`, `label` |
| Notas | Mesmo padrão do Checkbox (hidden input + visual box); `_Radio` SVG (circle stroke-width 6 em frame 24px); `RadioButtonGroup` com Context propagando name/size/error/value/onChange |

---

### Rating

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Rating |
| Props | `type` (Star\|Heart\|Circle), `layout` (Horizontal\|Vertical), `value` (0–5 com meias), `showNumber?`, `showReviews?`, `reviewCount?`, `onReviewsClick?` |
| Notas | Ícones via `@acciano/icons` (9 variantes: `Rating[Star\|Heart\|Circle][Empty\|Half\|Full]Icon`), selecionados por lookup `ICONS[type][state]`; cores tokenizadas nos SVGs fonte: Star=`--color-fill-yellow`/`--color-stroke-warning-high`, Heart=`--color-fill-critical-high`/`--color-stroke-critical-high`, Circle=`--color-fill-brand-high`/`--color-stroke-brand-high`; reviews usa `<LinkButton>` |

---

### Search Input

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Search input |
| Props | `value?`, `defaultValue?`, `onChange?`, `placeholder?`, `disabled?`, `size` (Medium\|Small) |
| Notas | Search icon leading; X button para clear quando há valor |

---

### Segmented Control

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Segmented control |
| Props | `options[]` (value/label/icon?), `value?`, `defaultValue?`, `onChange?`, `size` (Medium\|Small), `disabled?` |
| Notas | Container fill-low + stroke-low + overflow:hidden; selected = background-overlay + stroke-high + radius-lg + elevation-raised; WAI-ARIA radiogroup/radio; roving tabindex; ArrowLeft/Right/Home/End; Medium (48px) × Small (32px) |

---

### Select

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Select |
| Props | `label`, `hideLabel?`, `required?`, `optional?`, `placeholder?`, `value?`, `defaultValue?`, `onChange?`, `options[]` (value/label/icon?), `error?`, `disabled?`, `helperText?` |
| Notas | Field é `<button>` com ChevronDown/Up; foco via fieldWrap::after :has(button:focus-visible); dropdown via React Portal + useDropdownPosition; hidden input para form integration |

---

### Slider

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Slider |
| Props | `value?`, `defaultValue?`, `onChange?`, `min?`, `max?`, `step?`, `disabled?` |
| Notas | Controlled/uncontrolled; thumb usa `--elevation-raised`; tokens `fill/disabled`, `stroke/disabled`, `text/disabled` para estado disabled |

---

### Slot

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Slot |
| Notas | Placeholder de design-time; dashed border, fill-lower bg, radius-lg, texto monospace; representa espaço intercambiável em composições |

---

### Stepper

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Stepper |
| Props | `value?`, `defaultValue?`, `onChange?`, `min?`, `max?`, `step?`, `editable?`, `error?`, `disabled?`, `label?`, `helperText?` |
| Notas | `.field` (border + overflow:hidden) contém `.stepBtn--left` (border-right) + valor + `.stepBtn--right` (border-left); bordas internas dos botões servem de separadores; editable=true converte display em `<input type="text" inputMode="numeric">`; focus ring via fieldWrap::after |

---

### Summary List

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Summary list |
| Props | `children` (SummaryColumn\|SummaryItem nodes) |
| Notas | 3 componentes: `SummaryItem` (type: Term/Description/Link/Action icons/Action links; h-80px; border-bottom), `SummaryColumn` (flex-col; propaga type via React Context), `SummaryList` (flex-row; border-top); Term: semibold text/low pr-24px; Description: regular text/low pr-24px; Link: pr-24px slot para LinkButton; Action icons: pl-24px justify-end slot para IconButtons; Action links: pl-24px gap-16px justify-end slot para LinkButtons; stories: Default, WithLink, WithActionIcons, TwoColumns |

---

### Switch

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Switch |
| Props | `checked?`, `defaultChecked?`, `onChange?`, `size` (Large\|Small), `disabled?`, `label?` |
| Notas | Thumb/track como siblings; `box-sizing: border-box`; tokens: `stroke/selected` (selected+enabled), `stroke/disabled` (disabled), `fill/selected/high`, `fill/disabled`; thumb usa `--elevation-raised` |

---

### Table

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Table |
| Props | `columns[]` (id/heading/align/sortable/width/minWidth/gap/cell), `rows[]`, `style` (Default\|Striped), `selectable?`, `selectedRows?`, `defaultSelectedRows?`, `onSelectionChange?`, `sortColumnId?`, `sortDirection?`, `defaultSortColumnId?`, `defaultSortDirection?`, `onSortChange?`, `pagination?` (currentPage/totalPages/onPageChange/summaryText/disabled), `className?` |
| Notas | Data-driven via `columns[]` + `rows[]`; `TableHeadingCell` (`<th>` com sort No/Yes/Up/Down, align left/right, full-cell button para keyboard); `TableDataCell` (`<td>` com alternate bg, align, gap sm/md); sort controlado/uncontrolled, ciclo 3 estados (asc→desc→null); seleção controlada/uncontrolled via checkbox column; `style=Striped` = linhas ímpares com fill/lower; Pagination integrada como prop (não componente paralelo); root = flex-col 24px gap; `overflow-x: auto` wrapper; **bug Safari**: `border-collapse: separate; border-spacing: 0` (não `collapse`) para evitar bordas mais escuras no limite thead/tbody; stories: Default, Striped |

---

### Tabs

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Tabs |
| Props | `items[]` (label/icon?/count?/disabled?), `value?`, `defaultValue?`, `onChange?` |
| Notas | WAI-ARIA completo (role=tablist/tab/tabpanel, aria-selected, roving tabindex); keyboard: ArrowLeft/Right/Home/End com auto-activation; underline indicator via margin-bottom: -3px + border-bottom |

---

### Tag

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Tag |
| Props | `label`, `size` (Medium\|Small), `selected?`, `disabled?`, `onDismiss?`, `onClick?` |

### Tag Group

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Tag (frame Tag group) |
| Notas | Wrapper flex-wrap com gap spacing-4px; recebe children |

---

### Testimonial

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Testimonial |
| Props | `align` (Left\|Center), `name`, `email?`, `avatarSrc?`, `quote`, `rating?` (0–5, default 5), `showAvatar?`, `showQuote?`, `showRating?` |
| Notas | Compõe `<AvatarLabelled>` (Photo/Medium) + `<Rating>` (Star, showNumber=false, showReviews=false); Center alinha tudo + text-align:center |

---

### Text

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Text |
| Variantes | Hero, H1, H2, H3, H4, H5, Lead, Large, Base, Small, Tiny, Nano, Link, Uppercase, Code |
| Estados | — (estático, sem estados interativos) |

**Props:**
- `variant` — variante tipográfica (15 opções)
- `as` — elemento HTML renderizado (padrão: `p`)
- `children`
- `className` — classe extra opcional

**Notas:**
- Token `--font-size-nano: 11px` adicionado para a variante `Nano`
- Fontes carregadas via `preview-head.html` no Storybook (Inter + Roboto Mono via Google Fonts)

---

### Text Area

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Text area |
| Props | `label`, `required?`, `optional?`, `hideLabel?`, `rows?` (default 4), `error?`, `disabled?`, `helperText?`, `value?`, `defaultValue?`, `onChange?` |
| Notas | Sem size variants; padding assimétrico pt-8 px-12 pb-16; grabber SVG inline posicionado em bottom/right:0; resize:none; fieldWrap pattern para focus ring; grabber usa `--color-icon-neutral`/`--color-icon-disabled` |

---

### Text Block

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Text block |
| Props | `align` (Left\|Center), `capsule?` (ReactNode slot), `heading`, `text`, `link?` (ReactNode slot) |

---

### Text Input

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Text input |
| Props | `label`, `required?`, `optional?`, `hideLabel?`, `size` (Medium\|Small), `error?`, `disabled?`, `leadingIcon?` (LucideIcon), `trailingIcon?` (LucideIcon), `helperText?`, `value?`, `defaultValue?`, `onChange?` |
| Notas | focus ring via `:has(input:focus-visible)`; fieldWrap pattern para isolar focus ring do overflow:hidden do campo |

---

### Tooltip

| Status | ✅ |
|---|---|
| Página Figma | COMPONENTS / Tooltip |
| Props | `content`, `direction` (Up\|Down\|Left\|Right), `size` (Default\|Large), `children` |
| Notas | SVG paths por direção (sem rotação CSS); mouse + focus; 100ms hide delay; box-shadow no balloon (não filter no container) |

---

## Como documentar um componente após implementação

Quando um componente for implementado, atualizar seu status e preencher as informações seguindo o padrão das entradas acima.
