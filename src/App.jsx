import { useState } from 'react'
import { motion } from 'framer-motion'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechStrip from './components/TechStrip'
import Work from './components/Work'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <TechStrip />
      <Work />
      <Process />
      <Testimonials />
      <Contact />
      <FAQ />
      <Footer />
    </div>
  )
}

export default App
