import React from 'react';
import { Title, Subtitle, Primary, Controls, Stories } from '@storybook/addon-docs/blocks';

export const DocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Primary />
    <Controls />
    <hr />
    <Stories includePrimary />
  </>
);
