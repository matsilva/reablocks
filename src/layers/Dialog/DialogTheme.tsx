export interface DialogTheme {
  base: string;
  inner: string;
  content: string;
  footer: string;
}

const baseTheme: DialogTheme = {
  base: 'justify-center items-center flex pointer-events-none top-0 left-0 w-full h-full fixed will-change-transform will-change-opacity',
  inner:
    'flex flex-col box-border outline-0 pointer-events-auto overflow-auto max-w-[80vw] max-h-[80vw]',
  content: 'p-[20px] pt-[10px] flex-auto overflow-auto',
  footer: 'flex p-[20px] pb-[10px]'
};

export const lightDialogTheme: DialogTheme = {
  ...baseTheme,
  inner: [baseTheme.inner, 'bg-light-background text-black'].join(' ')
};

export const darkDialogTheme: DialogTheme = {
  ...baseTheme,
  inner: [baseTheme.inner, 'bg-dark-background text-white'].join(' ')
};
