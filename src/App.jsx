import './App.css'
import HomePage from './Pages/HomePage'
import { Routes, Route } from 'react-router-dom'
function App() {
   

  return (
    <>
        {/* <Routes> */}
        {/* <Route path="/" element={<Home />} ></Route> */}
        <Routes>
        <Route path="/" element={<HomePage />} ></Route>

      {/* </Routes> */}
      </Routes>
       
      
          
    </>
  )
}

export default App
