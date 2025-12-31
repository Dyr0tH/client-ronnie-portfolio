import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import { useRef } from 'react'
import GradientBlinds from './GradientBlinds'
import GlassSurface from './GlassSurface'
import Plasma from './Plasma'

export default function Hero() {
    const containerRef = useRef(null)
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 200])

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
        >
            {/* Video Background */}
            <div className="hero-gradient-bg">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0
                    }}
                >
                    <source src="/hero_BG.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="hero-content-centered">
                <motion.h1
                    className="hero-title-centered"
                    style={{ y }}
                >
                    <span className="line">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Visual
                        </motion.span>
                    </span>
                    <span className="line">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="pb-2"
                        >
                            Storytelling
                        </motion.span>
                    </span>
                    <span className="line">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            For <span className="highlight-text">Visionaries.</span>
                        </motion.span>
                    </span>
                </motion.h1>

                <motion.p
                    className="hero-subtitle-centered"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ textShadow: '0 4px 10px rgba(0,0,0,0.4)' }}
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
                            opacity={0.5}
                            backgroundOpacity={0.1}
                            borderWidth={0.2}
                            brightness={100}
                            mixBlendMode="overlay"
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
                        <div className="client-avatar" style={{ backgroundImage: 'url(/video-thumb-1.jpg)' }}></div>
                        <div className="client-avatar" style={{ backgroundImage: 'url(/video-thumb-2.jpg)' }}></div>
                        <div className="client-avatar" style={{ backgroundImage: 'url(/video-thumb-3.jpg)' }}></div>
                        <div className="client-avatar-more">+40</div>
                    </div>
                    <p className="trusted-label">Trusted by 50+ Creators</p>
                </motion.div>
            </div>
        </section>
    )
}
