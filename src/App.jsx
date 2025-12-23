import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechStrip from './components/TechStrip'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Loader from './components/Loader'
import Work, { PopupVideoPlayer } from './components/Work'

import Lenis from 'lenis'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4ba6
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Add lenis class to html for CSS targeting
    document.documentElement.classList.add('lenis')

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Log to window for easier debugging if needed
    window.lenis = lenis

    // Simulate initial progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(timer)
          return prev >= 100 ? 100 : 90
        }
        const nextProgress = prev + Math.random() * 12
        return nextProgress >= 90 ? 90 : nextProgress
      })
    }, 150)

    const handleLoad = () => {
      clearInterval(timer)
      setProgress(100)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    // Fail-safe: Force load after 6 seconds even if event hasn't fired
    const failSafe = setTimeout(handleLoad, 6000)

    return () => {
      lenis.destroy()
      clearInterval(timer)
      clearTimeout(failSafe)
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader
            key="loader"
            progress={progress}
            onLoadingComplete={() => setIsLoading(false)}
          />
        ) : (
          <>
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Navbar />
              <Hero />
              <TechStrip />
              <Work selectedVideo={selectedVideo} onVideoSelect={setSelectedVideo} />
              <Process />
              <Testimonials />
              <Contact />
              <FAQ />
              <Footer />
            </motion.div>

            {/* Global Video Popup Modal - Outside the transform container */}
            <AnimatePresence>
              {selectedVideo && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 10000, // Above everything
                    background: 'rgba(0,0,0,0.95)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => setSelectedVideo(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: '90%',
                      maxWidth: '1200px',
                      height: '85vh',
                      position: 'relative',
                      background: '#000',
                      borderRadius: '8px',
                      border: '1px solid #333',
                      overflow: 'hidden',
                      boxShadow: '0 0 50px rgba(47, 204, 239, 0.2)'
                    }}
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedVideo(null)}
                      style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}
                    >
                      ✕
                    </button>

                    <PopupVideoPlayer src={selectedVideo.src} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
