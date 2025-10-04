import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import CreateService from './pages/CreateService'

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<Home />}/>
        </Route>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/signin' element={<Signin />}/>
            <Route path='/create-service' element={<CreateService />}/>
            <Route path='/create-service' element={<CreateService />}/>
    </Routes>
  )
}

export default App