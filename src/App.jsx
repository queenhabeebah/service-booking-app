import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Layout />}>

        </Route>
    </Routes>
  )
}

export default App