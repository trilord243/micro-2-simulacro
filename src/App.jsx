import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Navbar from './Components/Navbar'
import Protected from './Components/Protected'
import TransaccionExitosa from './Components/TransaccionExitosa'
import Estudiante from './pages/Estudiante'


export default function App() {
  return (


    <BrowserRouter>
      <Routes>






        <Route element={<Navbar />}>

          <Route path='/' element={<Home />} />


          <Route element={<Protected />}>


            <Route path='profile' element={<Profile />} />
            <Route path='estudiante' element={<Estudiante />} />


          </Route>
          <Route path='login' element={<Login />} />

          <Route path='register' element={<Register />} />
          <Route path='exitosa' element={<TransaccionExitosa />} />
          <Route path='*' element={<NotFound />} />




        </Route>
      </Routes>

    </BrowserRouter>



  )
}


