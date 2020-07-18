import React from 'react'

import useScreenSize from 'use-screen-size'

const App = () => {
  const size = useScreenSize()

  return (
    <>
      <h1>
        {size.width}px / {size.height}px
      </h1>
      <h1>{size.screen}</h1>
    </>
  )
}

export default App
