import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const Loader = ({ onLoadingComplete, progress }) => {
    const [wordIndex, setWordIndex] = useState(0)
    const [showFinal, setShowFinal] = useState(false)
    const words = ["VISUAL", "LEGACIES", "MCS"]

    useEffect(() => {
        const timer = setInterval(() => {
            setWordIndex(prev => {
                if (prev === words.length - 1) {
                    clearInterval(timer)
                    // Wait for both the sequence and the actual progress to be somewhat high
                    return prev
                }
                return prev + 1
            })
        }, 600)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        // Trigger final sequence only if word sequence is done AND progress is 100
        if (wordIndex === words.length - 1 && progress === 100) {
            const timer = setTimeout(() => setShowFinal(true), 400)
            return () => clearTimeout(timer)
        }
    }, [wordIndex, progress, words.length])

    useEffect(() => {
        if (showFinal) {
            const finalTimer = setTimeout(() => {
                onLoadingComplete()
            }, 1200)
            return () => clearTimeout(finalTimer)
        }
    }, [showFinal, onLoadingComplete])

    return (
        <motion.div
            key="loader"
            exit={{
                y: '-100%',
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            style={{
                position: 'fixed',
                inset: 0,
                background: '#000',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >
            {/* Viewfinder Elements */}
            <div style={{ position: 'absolute', inset: '40px', pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '30px', height: '30px', borderTop: '1px solid rgba(255,255,255,0.3)', borderLeft: '1px solid rgba(255,255,255,0.3)' }} />
                <div style={{ position: 'absolute', top: 0, right: 0, width: '30px', height: '30px', borderTop: '1px solid rgba(255,255,255,0.3)', borderRight: '1px solid rgba(255,255,255,0.3)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '30px', borderBottom: '1px solid rgba(255,255,255,0.3)', borderLeft: '1px solid rgba(255,255,255,0.3)' }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', borderBottom: '1px solid rgba(255,255,255,0.3)', borderRight: '1px solid rgba(255,255,255,0.3)' }} />
            </div>

            {/* Pulsing Rec Dot */}
            <div style={{ position: 'absolute', top: '60px', left: '80px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ width: '12px', height: '12px', background: '#ff3b30', borderRadius: '50%' }}
                />
                <span style={{ color: '#fff', fontSize: '12px', fontFamily: 'monospace', letterSpacing: '2px' }}>REC</span>
            </div>

            {/* Timecode & Progress */}
            <div style={{
                position: 'absolute',
                bottom: '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px',
                width: '300px'
            }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontFamily: 'monospace', letterSpacing: '3px' }}>
                    00:00:0{wordIndex}:0{Math.floor(Math.random() * 9)} // {Math.round(progress)}%
                </div>

                {/* Minimal Progress Bar */}
                <div style={{
                    width: '100%',
                    height: '1px',
                    background: 'rgba(255,255,255,0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <motion.div
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: '100%',
                            background: '#2fccef',
                            boxShadow: '0 0 10px #2fccef'
                        }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {!showFinal ? (
                    <motion.h2
                        key={words[wordIndex]}
                        initial={{ opacity: 0, filter: 'blur(20px)', y: 20 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        exit={{ opacity: 0, filter: 'blur(20px)', y: -20 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            color: '#fff',
                            fontSize: 'clamp(2rem, 8vw, 5rem)',
                            fontWeight: 300,
                            letterSpacing: '0.2em',
                            margin: 0,
                            textAlign: 'center'
                        }}
                    >
                        {words[wordIndex]}
                    </motion.h2>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <h1 style={{
                            color: '#fff',
                            fontSize: 'clamp(2.5rem, 10vw, 7rem)',
                            fontWeight: 400,
                            letterSpacing: '0.1em',
                            margin: 0
                        }}>
                            MCS<span style={{ color: '#2fccef' }}>.</span>
                        </h1>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100px' }}
                            transition={{ delay: 0.3, duration: 1 }}
                            style={{ height: '1px', background: '#2fccef', marginTop: '20px' }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Flash Effect on Exit */}
            {showFinal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ delay: 1, duration: 0.2 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: '#fff',
                        zIndex: 10001,
                        pointerEvents: 'none'
                    }}
                />
            )}
        </motion.div>
    )
}

export default Loader
