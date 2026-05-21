/**
 * Suprime a regra color-contrast do axe-core para stories que renderizam
 * elementos em estado disabled. Elementos disabled são isentos pelo WCAG 2.1
 * (critério 1.4.3) e os tokens --color-*-disabled refletem essa decisão de design.
 */
export const disabledA11y = {
  a11y: {
    config: {
      rules: [{ id: "color-contrast", enabled: false }],
    },
  },
};
