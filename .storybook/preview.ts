import type { Preview } from '@storybook/react';
import '../packages/core/src/styles/tailwind.css';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
};

export default preview;


