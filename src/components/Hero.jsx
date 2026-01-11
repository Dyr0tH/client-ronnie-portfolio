import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import GlassSurface from './GlassSurface'
import Plasma from './Plasma'

// Hook to detect mobile device
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        // Initial check
        checkMobile()

        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return isMobile
}

export default function Hero() {
    const containerRef = useRef(null)
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 200])
    const isMobile = useIsMobile()

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <section
            className="hero-cinematic"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            style={{
                position: 'relative',
                background: '#000000ff',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh'
            }}
        >
            {/* Background Effect */}
            <div style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                opacity: 0.6 // Slight dim for better text readability
            }}>
                {isMobile ? (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: '#000',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0],
                                x: [0, 20, -20, 0],
                                y: [0, -20, 20, 0]
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{
                                position: 'absolute',
                                top: '20%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '300px',
                                height: '300px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #2fccef 0%, #006eff 100%)',
                                filter: 'blur(80px)',
                                opacity: 0.3
                            }}
                        />
                        <motion.div
                            animate={{
                                scale: [1.2, 1, 1.2],
                                rotate: [0, -10, 10, 0],
                                x: [0, -30, 30, 0],
                                y: [0, 30, -30, 0]
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{
                                position: 'absolute',
                                bottom: '20%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '350px',
                                height: '350px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #006eff 0%, #2fccef 100%)',
                                filter: 'blur(90px)',
                                opacity: 0.2
                            }}
                        />
                    </div>
                ) : (
                    <Plasma
                        color="#057affff"
                        speed={1}
                        direction="forward"
                        scale={1.8}
                        opacity={0.8}
                        mouseInteractive={false}
                    />
                )}
            </div>

            <div className="hero-content-centered" style={{ position: 'relative', zIndex: 10 }}>
                <motion.h1
                    className="hero-title-centered"
                    style={{ y, color: '#ffffff' }}
                >
                    <span className="line">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="highlight-text" style={{ textShadow: '0 22px 22px rgba(0, 0, 0, 0.3)' }}>Visual</span>
                        </motion.span>
                    </span>
                    <span className="line">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="pb-2"
                        >
                            <span className="" style={{ textShadow: '0 22px 22px rgba(0, 0, 0, 0.3)' }}>Storytelling</span>
                        </motion.span>
                    </span>
                    <span className="line">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            For <span className="" style={{ textShadow: '0 22px 22px rgba(0, 0, 0, 0.5)' }}>Visionaries.</span>
                        </motion.span>
                    </span>
                </motion.h1>

                <motion.p
                    className="hero-subtitle-centered"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}
                >
                    More than visuals, we engineer high-impact CGI and cinematic storytelling that stops the scroll, elevates brand perception, and drives growth.
                </motion.p>

                <motion.div
                    className="hero-actions-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <button
                        className="btn-primary-glow pointer-auto"
                        onClick={() => window.location.href = 'tel:+919589500421'}
                        style={{ background: '#ffffffff', color: '#000000ff' }}
                    >
                        <span>Call Me</span>
                        <div className="glow-effect"></div>
                    </button>

                    <div
                        className="pointer-auto"
                        style={{ cursor: 'pointer' }}
                        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <GlassSurface
                            width={200}
                            height={55}
                            borderRadius={50}
                            blur={5}
                            opacity={0.3}
                            backgroundOpacity={0.1}
                            borderWidth={0.2}
                            brightness={20}
                            mixBlendMode="screen"
                        >
                            <span style={{ fontWeight: 600, color: '#fff', fontSize: '1rem', letterSpacing: '0.02em' }}>View Our Work</span>
                        </GlassSurface>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-social-proof-centered"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <div className="client-logos">
                        <div className="client-avatar" style={{ backgroundImage: 'url(/video-thumb-1.jpg)', border: '2px solid rgba(255,255,255,0.2)' }}></div>
                        <div className="client-avatar" style={{ backgroundImage: 'url(/video-thumb-2.jpg)', border: '2px solid rgba(255,255,255,0.2)' }}></div>
                        <div className="client-avatar" style={{ backgroundImage: 'url(/video-thumb-3.jpg)', border: '2px solid rgba(255,255,255,0.2)' }}></div>
                        <div className="client-avatar-more" style={{ background: '#fff', color: '#000' }}>+40</div>
                    </div>
                    <p className="trusted-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Trusted by 50+ Creators</p>
                </motion.div>
            </div>
        </section>
    )
}
