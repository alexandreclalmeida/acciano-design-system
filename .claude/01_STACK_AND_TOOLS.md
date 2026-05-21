# Acciano Design System — Stack e Ferramentas

## Ferramentas de Design

| Ferramenta | Uso                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------- |
| **Figma**  | Fonte da verdade de design. UI Kit com foundations, componentes e variáveis já definidos. |

## Ferramentas de Desenvolvimento

| Ferramenta      | Uso                                         |
| --------------- | ------------------------------------------- |
| **VS Code**     | Editor principal                            |
| **Claude Code** | Assistente de desenvolvimento via terminal  |
| **Vite**        | Build tool e dev server (padrão do projeto) |
| **GitHub**      | Versionamento e repositório remoto          |
| **Storybook**   | Documentação interativa dos componentes     |

## Ferramentas de Teste

| Ferramenta                   | Uso                                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| **Vitest**                   | Test runner; configurado via `apps/storybook/vitest.config.ts`                      |
| **@storybook/addon-vitest**  | Plugin que executa stories como testes (inclui assertions a11y via `addon-a11y`)    |
| **Playwright (Chromium)**    | Browser headless para renderização real das stories durante os testes               |
| **axe-core** (via addon-a11y)| Motor de análise de acessibilidade; configurado globalmente com `test: "error"`     |

## Linguagem e Framework

| Item                      | Escolha                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| **Linguagem principal**   | TypeScript (preferir) / JavaScript                                                          |
| **Framework UI**          | React                                                                                       |
| **Estilização**           | CSS Modules (`.module.css`) com CSS custom properties dos tokens                            |
| **Escala de estilos**     | Alinhada ao Tailwind CSS (nomenclatura e escala de valores)                                 |
| **Tokens**                | Formato JSON → CSS custom properties                                                        |
| **Ícones (biblioteca)**   | Lucide Icons (`lucide-react`) — importados diretamente, sem pasta no repositório            |
| **Ícones (customizados)** | SVG exportados do Figma → componentes React gerados via script de build em `packages/icons` |
| **Logos**                 | Componentes React em `packages/logos` — pacote independente, separado dos ícones            |

## Restrições de bibliotecas

> ⚠️ **Regra crítica:** Nenhuma biblioteca de componentes de terceiros deve ser utilizada.

**Proibido usar:**

- Shadcn/UI
- Chakra UI
- Material UI (MUI)
- Ant Design
- Radix UI como base de componentes visuais
- Qualquer outra library de componentes prontos

**Permitido usar:**

- Radix UI **apenas** para primitivos de acessibilidade (ex: `@radix-ui/react-dialog` para gerenciar focus trap), desde que o visual seja 100% do Acciano
- Utilitários sem componentes visuais (ex: `clsx`, `class-variance-authority`)
- Ferramentas de build e DX (Vite, ESLint, Prettier, etc.)

## Razão da restrição

Os componentes do Acciano foram criados no Figma baseados no Practical UI, que não utiliza nenhum outro kit. O código deve refletir essa origem — cada componente é proprietário e representa o trabalho autoral do criador original.
