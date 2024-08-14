import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFoundPage from './Pages/NotFoundPage'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import CourseList from './Pages/Courses/CourseList'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Courses/CourseDescription'
import RequireAuth from './components/Auth/RequireAuth'
import CreateCourse from './Pages/Courses/CreateCourse'





function App() {
  return (
    <>
      <Routes >
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/about" element={<AboutUs />} ></Route>
        <Route path="/signup" element={<Signup />} ></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/courses" element={<CourseList />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/course/description" element={<CourseDescription />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
        </Route>
        <Route path="*" element={<NotFoundPage/>} ></Route>
         

      </Routes>

    </>
  )
}

export default App
