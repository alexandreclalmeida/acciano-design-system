# Acciano Design System — Design Tokens

> Estrutura e valores reais extraídos do Figma.
> Fonte da verdade para implementação com Style Dictionary.

---

## Arquitetura em camadas

```
_Primitive Color  ──┐
                    ├──▶  Theme  ──▶  Color         (light / dark)
_Tailwind CSS  ─────┘
                             └──▶  Foundations
                             └──▶  Typography       (desktop / mobile)
```

- **Collections com `_`** (`_Primitive Color`, `_Tailwind CSS`) são internas. Nunca referenciadas por componentes.
- **`_Content`** são dados de exemplo (nomes, iniciais, emails) para uso exclusivo no Figma. Não exportada, não documentada no DS.
- **`Theme`** é pública e customizável pelo usuário — é o ponto de entrada para personalização (ex: trocar a cor de `brand`). Não é consumida diretamente por componentes.
- **`Color`**, **`Foundations`** e **`Typography`** são públicas — única fonte de tokens para componentes.

---

## `_Tailwind CSS` _(interna — valores de referência)_

Escala numérica base. Todos os valores em `px` (números inteiros sem unidade no JSON).

### border-radius

| Token          | Valor |
| -------------- | ----- |
| `rounded-none` | 0px   |
| `rounded-xs`   | 2px   |
| `rounded-sm`   | 4px   |
| `rounded-md`   | 6px   |
| `rounded-lg`   | 8px   |
| `rounded-xl`   | 12px  |
| `rounded-2xl`  | 16px  |
| `rounded-3xl`  | 24px  |
| `rounded-full` | 999px |

### border-width

| Token      | Valor |
| ---------- | ----- |
| `border-0` | 0px   |
| `border-1` | 1px   |
| `border-2` | 2px   |
| `border-4` | 4px   |
| `border-8` | 8px   |

### font-size

| Token       | Valor |
| ----------- | ----- |
| `text-xs`   | 12px  |
| `text-sm`   | 14px  |
| `text-base` | 16px  |
| `text-lg`   | 18px  |
| `text-xl`   | 20px  |
| `text-2xl`  | 24px  |
| `text-3xl`  | 30px  |
| `text-4xl`  | 36px  |
| `text-5xl`  | 48px  |
| `text-6xl`  | 60px  |
| `text-7xl`  | 72px  |

### font-weight

| Token            | Valor |
| ---------------- | ----- |
| `font-light`     | 300   |
| `font-normal`    | 400   |
| `font-medium`    | 500   |
| `font-semibold`  | 600   |
| `font-bold`      | 700   |
| `font-extrabold` | 800   |

### letter-spacing

| Token              | Valor  |
| ------------------ | ------ |
| `tracking-tighter` | -0.8px |
| `tracking-tight`   | -0.4px |
| `tracking-normal`  | 0px    |
| `tracking-wide`    | 0.4px  |
| `tracking-wider`   | 0.8px  |
| `tracking-widest`  | 1.6px  |

### line-height

| Token        | Valor |
| ------------ | ----- |
| `leading-3`  | 12px  |
| `leading-4`  | 16px  |
| `leading-5`  | 20px  |
| `leading-6`  | 24px  |
| `leading-7`  | 28px  |
| `leading-8`  | 32px  |
| `leading-9`  | 36px  |
| `leading-10` | 40px  |

### sizing (espaçamento e tamanhos)

| Token      | Valor | Token     | Valor |
| ---------- | ----- | --------- | ----- |
| `size-0`   | 0px   | `size-8`  | 32px  |
| `size-px`  | 1px   | `size-9`  | 36px  |
| `size-0,5` | 2px   | `size-10` | 40px  |
| `size-1`   | 4px   | `size-11` | 44px  |
| `size-1,5` | 6px   | `size-12` | 48px  |
| `size-2`   | 8px   | `size-14` | 56px  |
| `size-2,5` | 10px  | `size-16` | 64px  |
| `size-3`   | 12px  | `size-20` | 80px  |
| `size-3,5` | 14px  | `size-24` | 96px  |
| `size-4`   | 16px  | `size-28` | 112px |
| `size-5`   | 20px  | `size-32` | 128px |
| `size-6`   | 24px  | `size-36` | 144px |
| `size-7`   | 28px  | `size-40` | 160px |

---

## `_Primitive Color` _(interna — paleta bruta)_

Cada cor tem variantes `light` e `dark`, com 4 níveis de opacidade: `50` (5%), `200` (20%), `800` (80%), `1000` (100%).

### Cores semânticas

| Cor       | light/1000 | dark/1000 |
| --------- | ---------- | --------- |
| `red`     | `#B91C1C`  | `#F87171` |
| `amber`   | `#B45309`  | `#F59E0B` |
| `emerald` | `#065F46`  | `#10B981` |
| `sky`     | `#075985`  | `#0EA5E9` |
| `blue`    | `#1D4ED8`  | `#60A5FA` |
| `purple`  | `#7E22CE`  | `#C084FC` |

### UI

| Grupo    | Token   | Valor                                                    |
| -------- | ------- | -------------------------------------------------------- |
| `slate`  | 25–1000 | Tons azul-escuro com alpha (0.02 → 0.90) sobre `#020617` |
| `white`  | 25–1000 | Branco com alpha (0.03 → 1.00) sobre `#FFFFFF`           |
| `solids` | 0       | `#FFFFFF`                                                |
| `solids` | 50      | `#F5F6FA`                                                |
| `solids` | 800     | `#292B33`                                                |
| `solids` | 850     | `#1D1E26`                                                |
| `solids` | 900     | `#12131A`                                                |
| `solids` | 1000    | `#000000`                                                |
| `yellow` | 1000    | `#EAB308`                                                |

---

## `Theme` _(pública — customizável pelo usuário)_

Camada intermediária entre primitivos e tokens semânticos. É o **ponto de customização do design system** — o usuário pode sobrescrever valores aqui (ex: trocar `brand` de azul para verde) e a mudança se propaga automaticamente para `Color` via aliases, sem tocar nos componentes.

> ⚠️ `Theme` é customizável, mas **não é consumida diretamente por componentes**. Componentes sempre leem de `Color`.

| Papel          | light/1000            | dark/1000             | Origem        |
| -------------- | --------------------- | --------------------- | ------------- |
| `brand`        | `#1D4ED8`             | `#60A5FA`             | → `blue`      |
| `gray/light`   | alpha sobre `#020617` | —                     | → `ui/slate`  |
| `gray/dark`    | —                     | alpha sobre `#FFFFFF` | → `ui/white`  |
| `gray/solid`   | `#FFFFFF` → `#000000` | —                     | → `ui/solids` |
| `white/solid`  | `#FFFFFF`             | —                     | —             |
| `yellow/solid` | `#EAB308`             | —                     | —             |

---

## `Foundations` _(pública)_

### blur

| Token CSS     | Valor |
| ------------- | ----- |
| `--blur-none` | 0px   |
| `--blur-4px`  | 4px   |
| `--blur-8px`  | 8px   |
| `--blur-12px` | 12px  |
| `--blur-16px` | 16px  |
| `--blur-24px` | 24px  |
| `--blur-40px` | 40px  |
| `--blur-64px` | 64px  |

### border

| Token CSS       | Valor |
| --------------- | ----- |
| `--border-none` | 0px   |
| `--border-1px`  | 1px   |
| `--border-2px`  | 2px   |
| `--border-4px`  | 4px   |

### spacing

| Token CSS        | Valor | Token CSS        | Valor |
| ---------------- | ----- | ---------------- | ----- |
| `--spacing-none` | 0px   | `--spacing-16px` | 16px  |
| `--spacing-1px`  | 1px   | `--spacing-20px` | 20px  |
| `--spacing-2px`  | 2px   | `--spacing-24px` | 24px  |
| `--spacing-4px`  | 4px   | `--spacing-28px` | 28px  |
| `--spacing-6px`  | 6px   | `--spacing-32px` | 32px  |
| `--spacing-8px`  | 8px   | `--spacing-36px` | 36px  |
| `--spacing-10px` | 10px  | `--spacing-40px` | 40px  |
| `--spacing-12px` | 12px  | `--spacing-48px` | 48px  |
| `--spacing-14px` | 14px  | `--spacing-64px` | 64px  |

### grid

Tokens de layout grid por breakpoint. `columns` é unitless (count), `margin` e `gutter` em px.

| Token CSS                    | Valor  |
| ---------------------------- | ------ |
| `--grid-desktop-columns`     | 12     |
| `--grid-desktop-margin`      | 120px  |
| `--grid-desktop-gutter`      | 32px   |
| `--grid-tablet-columns`      | 8      |
| `--grid-tablet-margin`       | 48px   |
| `--grid-tablet-gutter`       | 24px   |
| `--grid-mobile-columns`      | 4      |
| `--grid-mobile-margin`       | 32px   |
| `--grid-mobile-gutter`       | 16px   |

> Nota: `columns` é excluído do transform `acciano/size/px` no `sd.config.js` via filtro `isColumns`.

### radius

| Token CSS       | Valor |
| --------------- | ----- |
| `--radius-none` | 0px   |
| `--radius-xs`   | 2px   |
| `--radius-sm`   | 4px   |
| `--radius-md`   | 6px   |
| `--radius-lg`   | 8px   |
| `--radius-xl`   | 12px  |
| `--radius-15px` | 15px  |
| `--radius-2xl`  | 16px  |
| `--radius-20px` | 20px  |
| `--radius-3xl`  | 24px  |
| `--radius-full` | 999px |

### elevation

Gerado em `packages/tokens/dist/elevation.css`. Usado via `box-shadow`.

| Token CSS              | Valor                    | Uso |
| ---------------------- | ------------------------ | --- |
| `--elevation-sunken`   | `inset 0 1px 2px rgba(0,0,0,0.04)` | Campos recuados (Slider thumb, Switch thumb) |
| `--elevation-raised`   | `0 1px 2px rgba(0,0,0,0.08)` | Elementos elevados (Button Secondary, IconButton Secondary, card) |
| `--elevation-overlay`  | `0 4px 8px rgba(0,0,0,0.08)` | Overlays e dropdowns |

> Nota: Os valores `rgba()` são os valores reais gerados pelo Style Dictionary — `transparent` é keyword intencional, não substituto.

---

## `Color` _(pública — modos `light` e `dark`)_

**Única fonte de cor para componentes.** Todos os tokens são aliases de `Theme` ou `_Primitive Color`.
Gerados como CSS custom properties trocadas por `data-theme`.

### Convenção de nomenclatura CSS

```
--color-{categoria}-{papel}
--color-{categoria}-{papel}-{variante}
```

### `text`

| Token CSS                       | Light (→ alias)      | Dark (→ alias)      |
| ------------------------------- | -------------------- | ------------------- |
| `--color-text-high`             | → gray/light/1000    | → gray/dark/1000    |
| `--color-text-low`              | → gray/light/700     | → gray/dark/700     |
| `--color-text-disabled`         | → gray/light/100     | → gray/dark/100     |
| `--color-text-brand`            | → brand/light/1000   | → brand/dark/1000   |
| `--color-text-info`             | → sky/light/1000     | → sky/dark/1000     |
| `--color-text-success`          | → emerald/light/1000 | → emerald/dark/1000 |
| `--color-text-warning`          | → amber/light/1000   | → amber/dark/1000   |
| `--color-text-critical`         | → red/light/1000     | → red/dark/1000     |
| `--color-text-alter`            | → purple/light/1000  | → purple/dark/1000  |
| `--color-text-link`             | → blue/light/1000    | → blue/dark/1000    |
| `--color-text-inverse-high`     | → gray/dark/1000     | → gray/light/1000   |
| `--color-text-inverse-low`      | → gray/dark/700      | → gray/light/700    |
| `--color-text-inverse-disabled` | → gray/dark/100      | → gray/light/100    |

### `stroke`

| Token CSS                         | Light              | Dark              |
| --------------------------------- | ------------------ | ----------------- |
| `--color-stroke-high`             | → gray/light/500   | → gray/dark/500   |
| `--color-stroke-low`              | → gray/light/100   | → gray/dark/100   |
| `--color-stroke-selected`         | → brand/light/1000 | → brand/dark/1000 |
| `--color-stroke-focus`            | → brand/light/1000 | → brand/dark/1000 |
| `--color-stroke-disabled`         | → gray/light/100   | → gray/dark/100   |
| `--color-stroke-{role}-high`      | → {role}/light/800 | → {role}/dark/800 |
| `--color-stroke-{role}-low`       | → {role}/light/200 | → {role}/dark/200 |
| `--color-stroke-inverse-high`     | → gray/dark/500    | → gray/light/500  |
| `--color-stroke-inverse-low`      | → gray/dark/100    | → gray/light/100  |
| `--color-stroke-inverse-disabled` | → gray/dark/100    | → gray/light/100  |

_`{role}`: brand, info, success, warning, critical, alter, link_

### `icon`

| Token CSS                       | Light              | Dark              |
| ------------------------------- | ------------------ | ----------------- |
| `--color-icon-neutral`          | → gray/light/500   | → gray/dark/500   |
| `--color-icon-brand`            | → brand/light/800  | → brand/dark/800  |
| `--color-icon-disabled`         | → gray/light/100   | → gray/dark/100   |
| `--color-icon-{role}`           | → {role}/light/800 | → {role}/dark/800 |
| `--color-icon-inverse-high`     | → gray/dark/1000   | → gray/light/1000 |
| `--color-icon-inverse-low`      | → gray/dark/700    | → gray/light/700  |
| `--color-icon-inverse-disabled` | → gray/dark/100    | → gray/light/100  |

### `fill`

| Token CSS                       | Light               | Dark                |
| ------------------------------- | ------------------- | ------------------- |
| `--color-fill-high`             | → gray/light/1000   | → gray/dark/1000    |
| `--color-fill-low`              | → gray/light/50     | → gray/dark/50      |
| `--color-fill-lower`            | → gray/light/25     | → gray/dark/25      |
| `--color-fill-hover`            | → gray/light/50     | → gray/dark/50      |
| `--color-fill-press`            | → gray/light/100    | → gray/dark/100     |
| `--color-fill-disabled`         | → gray/light/100    | → gray/dark/100     |
| `--color-fill-overlay`          | → gray/light/500    | → gray/light/1000   |
| `--color-fill-white`            | → white/solid/1000  | → white/solid/1000  |
| `--color-fill-yellow`           | → yellow/solid/1000 | → yellow/solid/1000 |
| `--color-fill-selected-high`    | → brand/light/1000  | → brand/dark/1000   |
| `--color-fill-selected-low`     | → brand/light/200   | → brand/dark/200    |
| `--color-fill-{role}-high`      | → {role}/light/1000 | → {role}/dark/1000  |
| `--color-fill-{role}-low`       | → {role}/light/50   | → {role}/dark/50    |
| `--color-fill-inverse-high`     | → gray/solid/0      | → gray/solid/900    |
| `--color-fill-inverse-low`      | → gray/dark/50      | → gray/light/50     |
| `--color-fill-inverse-hover`    | → gray/dark/50      | → gray/light/50     |
| `--color-fill-inverse-press`    | → gray/dark/100     | → gray/light/100    |
| `--color-fill-inverse-disabled` | → gray/dark/100     | → gray/light/100    |

### `background`

| Token CSS                      | Light                          | Dark                          |
| ------------------------------ | ------------------------------ | ----------------------------- |
| `--color-background-base`      | → gray/solid/0 (`#FFFFFF`)     | → gray/solid/900 (`#12131A`)  |
| `--color-background-raised`    | → gray/solid/0 (`#FFFFFF`)     | → gray/solid/850 (`#1D1E26`)  |
| `--color-background-overlay`   | → gray/solid/0 (`#FFFFFF`)     | → gray/solid/800 (`#292B33`)  |
| `--color-background-sunken`    | → gray/solid/50 (`#F5F6FA`)    | → gray/solid/1000 (`#000000`) |
| `--color-background-alternate` | → gray/solid/50 (`#F5F6FA`)    | → gray/solid/850 (`#1D1E26`)  |
| `--color-background-brand`     | → brand/light/1000 (`#1D4ED8`) | → brand/dark/1000 (`#60A5FA`) |
| `--color-background-inverse`   | → gray/solid/900 (`#12131A`)   | → gray/solid/0 (`#FFFFFF`)    |

### `utilities`

| Token CSS                          | Valor (igual em ambos os modos)           |
| ---------------------------------- | ----------------------------------------- |
| `--color-utilities-alpha-0`        | transparent                               |
| `--color-utilities-alpha-1`        | rgba(0,0,0,0.01) / rgba(255,255,255,0.01) |
| `--color-utilities-black-solid`    | `#000000`                                 |
| `--color-utilities-black-alpha-50` | rgba(0,0,0,0.5)                           |
| `--color-utilities-white-solid`    | `#FFFFFF`                                 |
| `--color-utilities-white-alpha-50` | rgba(255,255,255,0.5)                     |

---

## `Typography` _(pública — modos `desktop` e `mobile`)_

### Famílias (igual em ambos os modos)

| Token CSS          | Valor       |
| ------------------ | ----------- |
| `--font-heading`   | Inter       |
| `--font-paragraph` | Inter       |
| `--font-code`      | Roboto Mono |

### font-size

| Token CSS             | Desktop | Mobile |
| --------------------- | ------- | ------ |
| `--font-size-display` | 60px    | 48px   |
| `--font-size-h1`      | 48px    | 36px   |
| `--font-size-h2`      | 36px    | 30px   |
| `--font-size-h3`      | 30px    | 24px   |
| `--font-size-h4`      | 24px    | 20px   |
| `--font-size-h5`      | 20px    | 20px   |
| `--font-size-lead`    | 20px    | 20px   |
| `--font-size-large`   | 18px    | 18px   |
| `--font-size-base`    | 16px    | 16px   |
| `--font-size-small`   | 14px    | 14px   |
| `--font-size-tiny`    | 12px    | 12px   |
| `--font-size-nano`    | 11px    | 11px   |

### line-height

| Token CSS               | Desktop | Mobile |
| ----------------------- | ------- | ------ |
| `--line-height-display` | 72px    | 56px   |
| `--line-height-h1`      | 56px    | 40px   |
| `--line-height-h2`      | 40px    | 36px   |
| `--line-height-h3`      | 36px    | 32px   |
| `--line-height-h4`      | 32px    | 28px   |
| `--line-height-h5`      | 28px    | 28px   |
| `--line-height-lead`    | 28px    | 28px   |
| `--line-height-large`   | 28px    | 28px   |
| `--line-height-base`    | 24px    | 24px   |
| `--line-height-small`   | 20px    | 20px   |
| `--line-height-tiny`    | 16px    | 16px   |

### letter-spacing (igual em ambos os modos)

| Token CSS                  | Valor  |
| -------------------------- | ------ |
| `--letter-spacing-tighter` | -0.8px |
| `--letter-spacing-tight`   | -0.4px |
| `--letter-spacing-normal`  | 0px    |
| `--letter-spacing-wide`    | 0.4px  |
| `--letter-spacing-wider`   | 0.8px  |
| `--letter-spacing-widest`  | 1.6px  |

### font-weight (igual em ambos os modos)

| Token CSS                | Nome semântico | Valor |
| ------------------------ | -------------- | ----- |
| `--font-weight-weak`     | light          | 300   |
| `--font-weight-normal`   | normal         | 400   |
| `--font-weight-emphasis` | medium         | 500   |
| `--font-weight-strong`   | semibold       | 600   |
| `--font-weight-stronger` | bold           | 700   |

---

## CSS custom properties — estrutura de saída esperada

### Color (por tema)

```css
:root,
[data-theme="light"] {
  --color-text-high: rgba(2, 6, 23, 0.9);
  --color-background-base: #ffffff;
  /* ... todos os tokens de Color */
}

[data-theme="dark"] {
  --color-text-high: #ffffff;
  --color-background-base: #12131a;
  /* ... todos os tokens de Color */
}
```

### Typography (por viewport)

```css
:root {
  /* Valores desktop (padrão) */
  --font-size-display: 60px;
  --font-size-h1: 48px;
  --line-height-display: 72px;
  /* ... */
}

@media (max-width: 768px) {
  :root {
    /* Valores mobile */
    --font-size-display: 48px;
    --font-size-h1: 36px;
    --line-height-display: 56px;
    /* ... */
  }
}
```

---

## Regras de uso

1. Componentes **nunca** usam tokens de `_Primitive Color` ou `_Tailwind CSS`
2. Componentes **nunca** usam tokens de `Theme` diretamente — `Theme` é para customização do usuário, não para consumo interno
3. Toda cor referencia tokens de `Color` — ex: `var(--color-text-high)`, não `var(--color-brand-light-1000)`
4. Toda tipografia referencia tokens de `Typography` — ex: `var(--font-size-base)`
5. Espaçamento, radius e borda vêm de `Foundations` — ex: `var(--spacing-16px)`, `var(--radius-md)`
6. A troca de tema é responsabilidade do CSS — o componente não conhece o modo atual
7. Se um token necessário não existir, sinalizar antes de usar valor arbitrário

---

## Build: Style Dictionary

Os JSONs exportados do Figma são processados pelo **Style Dictionary**.
A configuração deve:

- Excluir apenas `_Primitive Color` e `_Tailwind CSS` da saída pública
- Incluir `Theme` na saída pública (customizável pelo usuário)
- Gerar dois blocos de CSS para `Color` (`[data-theme="light"]` e `[data-theme="dark"]`)
- Gerar `@media (max-width: 768px)` para os valores `mobile` de `Typography`
- Resolver aliases entre collections na ordem correta: `_Primitive → Theme → Color`
