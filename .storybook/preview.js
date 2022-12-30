import theme from './theme';

const order = [
  'docs-intro-',
  'docs-getting-started-setup--page',
  'docs-getting-started-philosophy--page',
  'docs-getting-started-storybook--page',
  'design-tokens-',
  'design-tokens-getting-started',
  'components-',
  'layout-',
  'data-',
  'utils-'
];

export const parameters = {
  layout: 'centered',
  options: {
    storySort: (a, b) => {
      const aName = a[0];
      const bName = b[0];

      if (aName.includes('docs-') || bName.includes('docs-')) {
        const aIdx = order.findIndex(i => aName.indexOf(i) > -1);
        const bIdx = order.findIndex(i => bName.indexOf(i) > -1);
        return aIdx - bIdx;
      }

      return aName < bName ? -1 : 1;
    }
  },
  docs: {
    theme
  },
  controls: {
    hideNoControlsWarning: true
  }
};
