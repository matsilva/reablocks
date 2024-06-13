export interface CommandPaletteItemTheme {
  base: string;
  active: string;
  clickable: string;
}

const baseTheme: CommandPaletteItemTheme = {
  base: 'transition-colors ease-in-out duration-200',
  active: '',
  clickable: 'cursor-pointer'
};

export const commandPaletteItemTheme: CommandPaletteItemTheme = {
  ...baseTheme,
  active: [baseTheme.active, 'bg-primary text-text-content-primary'].join(' '),
  clickable: [
    baseTheme.clickable,
    'hover:bg-primary-hover/70 dark:hover:bg-primary-hover hover:dark:text-white'
  ].join(' ')
};

export const cssVarsCommandPaletteItemTheme: CommandPaletteItemTheme = {
  ...baseTheme,
  clickable: [
    baseTheme.clickable,
    'hover:bg-[var(--primary-background)] text-[var(--primary-color-hover)]'
  ].join(' ')
};
