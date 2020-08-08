import React, { useState, useEffect } from 'react'

import useScreenSize, { BreakPoint } from 'use-screen-size'

const App = () => {
  const size = useScreenSize()
  const [color, setColor] = useState('')
  const [screenSize, setScreenSize] = useState('')

  useEffect(() => {
    if (size.screen == BreakPoint.xs) {
      setColor('red')
      setScreenSize('Extra Small Screen eg Mobile Phones(Portrait Mode)')
    } else if (size.screen === BreakPoint.s) {
      setColor('blue')
      setScreenSize('Small Screen eg Mobile Phones(Landscape Mode)')
    } else if (size.screen === BreakPoint.m) {
      setColor('orange')
      setScreenSize('Medium Screen eg Tablet')
    } else if (size.screen === BreakPoint.l) {
      setColor('yellowgreen')
      setScreenSize('Large Screen eg Laptop, PC')
    } else if (size.screen === BreakPoint.xl) {
      setColor('darkmagenta')
      setScreenSize('Extra Large Screen eg Laptop, PC')
    }
  }, [size])

  return (
    <>
      <h1>
        {size.width}px / {size.height}px
      </h1>
      <h1 style={{ color }}>
        {size.screen.toUpperCase()} {screenSize}
      </h1>
    </>
  )
}

export default App
