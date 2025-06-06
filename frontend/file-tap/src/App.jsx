import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <>
      <Navbar />
      <Dashboard />
      <Footer />

    </>
  )
}

export default App
