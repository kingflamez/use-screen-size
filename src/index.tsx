import { useState, useEffect, useCallback, useMemo } from 'react';

export enum BreakPoint {
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
}

export interface ScreenSize {
  width: number;
  height: number;
  screen: BreakPoint;
}

export interface BreakPointConfig {
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
}

export const DEFAULT_BREAKPOINTS: BreakPointConfig = {
  xs: 576,
  s: 768,
  m: 992,
  l: 1200,
  xl: Infinity,
};

export const useScreenSize = (
  breakpoints: BreakPointConfig = DEFAULT_BREAKPOINTS,
  debounceMs = 250,
): ScreenSize => {
  const isClient = typeof window === 'object';

  const getSize = useCallback((): ScreenSize => {
    const width = isClient ? window.innerWidth : 0;
    const height = isClient ? window.innerHeight : 0;

    let screen: BreakPoint = BreakPoint.xl;
    if (width < breakpoints.xs) screen = BreakPoint.xs;
    else if (width < breakpoints.s) screen = BreakPoint.s;
    else if (width < breakpoints.m) screen = BreakPoint.m;
    else if (width < breakpoints.l) screen = BreakPoint.l;

    return { width, height, screen };
  }, [isClient, breakpoints]);

  const [screenSize, setScreenSize] = useState<ScreenSize>(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    let timeoutId: NodeJS.Timeout;

    function handleResize(): void {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScreenSize(getSize());
      }, debounceMs);
    }

    window.addEventListener('resize', handleResize);
    return (): void => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [isClient, getSize, debounceMs]);

  const screen = useMemo(() => {
    const { width } = screenSize;
    if (width < breakpoints.xs) return BreakPoint.xs;
    if (width < breakpoints.s) return BreakPoint.s;
    if (width < breakpoints.m) return BreakPoint.m;
    if (width < breakpoints.l) return BreakPoint.l;
    return BreakPoint.xl;
  }, [screenSize.width, breakpoints]);

  return {
    ...screenSize,
    screen,
  };
};
