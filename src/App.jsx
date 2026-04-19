import { useState, useEffect } from 'react'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Home from './sections/Home'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import { motion, AnimatePresence } from 'framer-motion'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fallsback if loader fails
    const t = setTimeout(() => setLoading(false), 5000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (loading) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <SmoothScroll isLocked={loading}>
      <div className="noise-overlay" />
      
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Cursor />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        <Navbar />
        <main>
          <Home />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </SmoothScroll>
  )
}

