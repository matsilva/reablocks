export interface CommandPaletteInputTheme {
  base: string;
  input: string;
  icon: string;
}

const baseTheme: CommandPaletteInputTheme = {
  base: 'flex w-full items-center border-b-2',
  input:
    'flex-1 border-0 box-border p-2.5 focus-within:outline-none focus-visible:outline-none',
  icon: 'w-4 h-4 ml-2.5'
};

export const commandPaletteInputTheme: CommandPaletteInputTheme = {
  ...baseTheme,
  base: [
    baseTheme.base,
    'bg-background-level4 dark:border-zinc-700 light:border-zinc-400'
  ].join(' '),
  input: [
    baseTheme.input,
    'bg-background-level4 text-typography placeholder:text-slate-500'
  ].join(' ')
};

export const cssVarsCommandPaletteInputTheme: CommandPaletteInputTheme = {
  ...baseTheme,
  base: [baseTheme.base, 'border-[var(--body-background)]'].join(' '),
  input: [
    baseTheme.input,
    'text-[var(--input-color)] placeholder:text-[var(--input-color-placeholder)] [padding:_var(--spacing-md)] [font-family:_var(--font-family)]'
  ].join(' ')
};
