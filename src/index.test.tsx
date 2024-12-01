import { renderHook, act } from '@testing-library/react-hooks';
import useScreenSize, { BreakPoint, DEFAULT_BREAKPOINTS } from './index';

describe('useScreenSize', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 768,
    });
  });

  const resizeWindow = (width: number, height: number): void => {
    act(() => {
      window.innerWidth = width;
      window.innerHeight = height;
      window.dispatchEvent(new Event('resize'));
    });
  };

  it('should return initial screen size', async () => {
    const { result } = renderHook(() => useScreenSize());
    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
    expect(result.current.screen).toBe(BreakPoint.l);
  });

  it('should update screen size on window resize', async () => {
    const { result } = renderHook(() => useScreenSize());
    jest.useFakeTimers();
    const debounceMs = 500;

    act(() => resizeWindow(500, 700)); // xs breakpoint
    act(() => {
      jest.advanceTimersByTime(debounceMs); // Before debounce completes
    });
    expect(result.current.width).toBe(500);
    expect(result.current.height).toBe(700);
    expect(result.current.screen).toBe(BreakPoint.xs);

    act(() => resizeWindow(700, 700)); // s breakpoint
    act(() => {
      jest.advanceTimersByTime(debounceMs); // Before debounce completes
    });
    expect(result.current.width).toBe(700);
    expect(result.current.height).toBe(700);
    expect(result.current.screen).toBe(BreakPoint.s);

    act(() => resizeWindow(1100, 800)); // l breakpoint
    act(() => {
      jest.advanceTimersByTime(debounceMs); // Before debounce completes
    });
    expect(result.current.width).toBe(1100);
    expect(result.current.height).toBe(800);
    expect(result.current.screen).toBe(BreakPoint.l);
  });

  it('should debounce updates with provided debounceMs', async () => {
    jest.useFakeTimers();
    const debounceMs = 500;
    const { result } = renderHook(() =>
      useScreenSize(DEFAULT_BREAKPOINTS, debounceMs),
    );

    act(() => resizeWindow(700, 700));
    expect(result.current.width).toBe(1100); // Not updated yet

    act(() => {
      jest.advanceTimersByTime(debounceMs); // Complete debounce
    });

    expect(result.current.width).toBe(700); // Updated after debounce
    jest.useRealTimers();
  });
});
