import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  stories: [
    '../../../packages/logos/src/**/*.stories.@(ts|tsx)',
    '../../../packages/icons/src/**/*.stories.@(ts|tsx)',
    '../../../packages/tokens/src/**/*.stories.@(ts|tsx)',
    '../../../packages/components/src/**/*.stories.@(ts|tsx)',
    '../../../packages/components/src/**/*.mdx',
  ],

  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest'
  ],

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: join(__dirname, '../tsconfig.json'),
    },
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          // Resolve pelo source para que o Vite processe CSS modules corretamente
          '@acciano/logos': join(__dirname, '../../../packages/logos/src'),
        },
      },
      server: {
        fs: {
          allow: [join(__dirname, '../../..')],
        },
      },
    });
  },
};

export default config;
