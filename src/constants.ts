// constants.ts
export const BreakPoint = {
    xs: 'xs',
    s: 's',
    m: 'm',
    l: 'l',
    xl: 'xl',
  } as const;
  
  export type BreakPoint = typeof BreakPoint[keyof typeof BreakPoint];
  