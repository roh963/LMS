import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'





function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} ></Route>

      </Routes>

    </>
  )
}

export default App
