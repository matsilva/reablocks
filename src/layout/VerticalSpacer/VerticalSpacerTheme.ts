export interface VerticalSpacerTheme {
  base: string;
  size: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
}

const baseTheme: VerticalSpacerTheme = {
  base: '',
  size: {
    xs: 'h-0.5',
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-5',
    xl: 'h-6',
    xxl: 'h-8'
  }
};

export const lightVerticalSpacerTheme = {
  ...baseTheme
};

export const darkVerticalSpacerTheme = {
  ...baseTheme
};
