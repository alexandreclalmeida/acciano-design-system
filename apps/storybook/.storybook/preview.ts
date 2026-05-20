import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { DocsPage } from "./DocsPage";

import "../../../packages/tokens/dist/base.css";
import "../../../packages/tokens/dist/foundations.css";
import "../../../packages/tokens/dist/typography.css";
import "../../../packages/tokens/dist/typography.mobile.css";
import "../../../packages/tokens/dist/color.light.css";
import "../../../packages/tokens/dist/color.dark.css";
import "../../../packages/tokens/dist/elevation.css";

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    withThemeByDataAttribute({
      themes: { Light: "light", Dark: "dark" },
      defaultTheme: "Light",
      attributeName: "data-theme",
    }),
  ],
  parameters: {
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Brands", "Foundations", "Components", "*"],
      },
    },
    docs: {
      page: DocsPage,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
