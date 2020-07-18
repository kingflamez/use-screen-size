import { useState, useEffect, useCallback } from 'react'

enum ScreenSize {
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl'
}
// Hook
const useScreenSize = () => {
  const isClient = typeof window === 'object'

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
      screen: ScreenSize.s
    }
  }, [isClient])

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return
    }

    function handleResize () {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isClient, getSize]) // Empty array ensures that effect is only run on mount and unmount

  if (windowSize.width < 576) {
    windowSize.screen = ScreenSize.xs
  } else if (windowSize.width >= 576 && windowSize.width < 768) {
    windowSize.screen = ScreenSize.s
  } else if (windowSize.width >= 768 && windowSize.width < 992) {
    windowSize.screen = ScreenSize.m
  } else if (windowSize.width >= 992 && windowSize.width < 1200) {
    windowSize.screen = ScreenSize.l
  } else {
    windowSize.screen = ScreenSize.xl
  }

  return windowSize
}

export { ScreenSize, useScreenSize as default }
