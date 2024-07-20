import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFoundPage from './Pages/NotFoundPage'





function App() {
  return (
    <>
      <Routes >
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/about" element={<AboutUs />} ></Route>
        <Route path="*" element={<NotFoundPage/>} ></Route>


      </Routes>

    </>
  )
}

export default App
