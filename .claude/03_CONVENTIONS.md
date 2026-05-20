# Acciano Design System — Convenções de Código

## Nomenclatura

### Componentes
- **PascalCase** para nomes de componentes e arquivos: `Button`, `InputField`, `CardHeader`
- Pastas com o mesmo nome do componente: `components/Button/Button.tsx`
- Props tipadas com interface nomeada: `ButtonProps`, `InputFieldProps`

### Arquivos
| Tipo | Convenção | Exemplo |
|---|---|---|
| Componente | PascalCase | `Button.tsx` |
| Estilos | PascalCase + module | `Button.module.css` |
| Story | PascalCase + stories | `Button.stories.tsx` |
| Teste | PascalCase + test | `Button.test.tsx` (opcional) |
| Barrel | lowercase | `index.ts` |
| Hooks | camelCase com `use` | `useToggle.ts` |
| Utilitários | camelCase | `formatClassName.ts` |
| Tokens | camelCase | `color.json`, `spacing.json` |

### Variáveis e funções
- **camelCase** para variáveis e funções
- **SCREAMING_SNAKE_CASE** para constantes globais
- Prefixo `handle` para event handlers: `handleClick`, `handleChange`
- Prefixo `is`/`has`/`can` para booleanos: `isDisabled`, `hasLabel`

---

## Componentes React

### Estrutura padrão de um componente

```tsx
import React from 'react';
import styles from './Button.module.css';
import { clsx } from 'clsx'; // utilitário permitido

export interface ButtonProps {
  /** Variante visual do botão */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Tamanho do botão */
  size?: 'sm' | 'md' | 'lg';
  /** Desabilita o botão */
  disabled?: boolean;
  /** Conteúdo do botão */
  children: React.ReactNode;
  /** Handler de clique */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[`variant--${variant}`],
        styles[`size--${size}`]
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### Regras de componentes
- Sempre exportar componentes como **named exports** (não default)
- Props sempre tipadas com `interface`, nunca `type` para props de componente
- Props opcionais com valor padrão via destructuring
- Comentários JSDoc nas props (aparece no Storybook e no IntelliSense)
- Nenhum valor visual hardcoded — sempre via CSS custom properties dos tokens

---

## CSS / Estilização

### CSS Modules
Estilos via **CSS Modules** (`.module.css`). Sem CSS-in-JS.

### Alinhamento com Tailwind CSS
A escala de valores do Acciano segue a **convenção de nomenclatura e escala do Tailwind CSS**. Isso significa:

- Espaçamentos nomeados como `1`, `2`, `3`, `4`... onde `1 = 4px`, `2 = 8px`, `4 = 16px`, etc.
- Tamanhos de fonte: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`...
- Border radius: `sm`, `md`, `lg`, `xl`, `full`
- Pesos de fonte: `thin`, `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`

> O Acciano **não usa Tailwind** — o alinhamento é de escala e nomenclatura apenas, para manter consistência e familiaridade. Os estilos são sempre via CSS Modules e tokens próprios.

### Tokens via custom properties
```css
/* ✅ Correto */
.button {
  background-color: var(--color-primary-500);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

/* ❌ Errado — valor hardcoded */
.button {
  background-color: #6366f1;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
}
```

### Variantes com modificadores
```css
/* Variantes usando seletor de atributo ou classe modificadora */
.variant--primary { ... }
.variant--secondary { ... }
.size--sm { ... }
.size--md { ... }
```

### `box-sizing` em elements com `width: 100%` + padding horizontal

Este projeto **não tem reset global de `box-sizing`**. Com o modelo padrão `content-box`, combinar `width: 100%` e `padding-inline` (ou `padding-left`/`padding-right`) no mesmo elemento causa overflow — o box total fica `100% + padding`.

**Sempre** declare `box-sizing: border-box` quando um elemento tiver ambos:

```css
/* ✅ Correto */
.content {
  width: 100%;
  box-sizing: border-box;
  padding: var(--spacing-64px) var(--spacing-32px) 0;
}

/* ❌ Errado — overflow: content box = 100%, total = 100% + 64px */
.content {
  width: 100%;
  padding: var(--spacing-64px) var(--spacing-32px) 0;
}
```

> Nota: `flex: 1 0 0` (sem `width` explícito) não tem esse problema — o flex container controla o tamanho. A regra se aplica especificamente a elementos com `width: 100%` explícito.

---

## Git e Commits

### Branches
```
main          → produção / versão estável
develop       → integração
feat/nome     → nova feature
fix/nome      → correção
chore/nome    → manutenção, config, docs
```

### Commits (Conventional Commits)
```
feat(button): adiciona variante ghost
fix(tokens): corrige valor de spacing-4
chore(storybook): atualiza configuração do preview
docs(readme): adiciona instruções de instalação
refactor(input): extrai hook de validação
```

**Formato:** `tipo(escopo): descrição em português, imperativo, minúsculas`

---

## TypeScript

- Sempre tipar props, retornos de funções e variáveis quando o tipo não for óbvio
- Evitar `any` — usar `unknown` quando necessário
- Preferir `interface` para shapes de objetos e props
- Usar `type` para unions, intersections e aliases simples
