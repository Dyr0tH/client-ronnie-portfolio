import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HorizontalVideo = ({ src, className, style }) => {
    const [isMuted, setIsMuted] = useState(true)

    return (
        <div className={className} style={{ ...style, position: 'relative' }}>
            <video
                src={src}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    setIsMuted(!isMuted)
                }}
                style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '15px',
                    background: 'rgba(0,0,0,0.6)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    zIndex: 10
                }}
            >
                {isMuted ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 5L6 9H2v6h4l5 4V5z" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 5L6 9H2v6h4l5 4V5z" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                )}
            </button>
        </div>
    )
}

const CGICard = ({ src, label, delay, isCenter = false }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                width: isCenter ? '340px' : '300px',
                height: isCenter ? '600px' : '530px',
                background: '#050505',
                cursor: 'pointer',
                borderRadius: '4px'
            }}
            animate={{
                scale: isHovered ? 1.02 : 1,
                filter: isHovered ? 'drop-shadow(0 0 20px rgba(47, 204, 239, 0.3))' : 'drop-shadow(0 0 0 rgba(0,0,0,0))',
                transition: { duration: 0.2 }
            }}
        >
            {/* Tech Border */}
            <div style={{
                position: 'absolute',
                inset: '2px',
                border: '1px solid rgba(47, 204, 239, 0.3)',
                zIndex: 2,
                pointerEvents: 'none'
            }} />

            {/* Corner Accents */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: '2px solid #2fccef', borderLeft: '2px solid #2fccef', zIndex: 3 }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderTop: '2px solid #2fccef', borderRight: '2px solid #2fccef', zIndex: 3 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '20px', height: '20px', borderBottom: '2px solid #2fccef', borderLeft: '2px solid #2fccef', zIndex: 3 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: '2px solid #2fccef', borderRight: '2px solid #2fccef', zIndex: 3 }} />

            {/* Video */}
            <video
                src={src}
                autoPlay
                loop
                muted={!isHovered}
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.9
                }}
            />

            {/* Scanline Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 50%)',
                backgroundSize: '100% 4px',
                pointerEvents: 'none',
                opacity: 0.2,
                zIndex: 1
            }} />

            {/* Label */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
                background: 'linear-gradient(to top, #000, transparent)',
                color: '#fff',
                textAlign: 'left',
                zIndex: 4
            }}>
                <div style={{
                    fontSize: isCenter ? '1.5rem' : '1.2rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 500,
                    textShadow: '0 0 10px rgba(0,0,0,0.5)'
                }}>
                    {label}
                </div>
            </div>
        </motion.div>
    )
}

export default function Work() {
    const [activeIndex, setActiveIndex] = useState(1)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [isCenterMuted, setIsCenterMuted] = useState(true)
    const pauseTimeoutRef = useRef(null)

    const videos = [
        { id: 1, src: '/vertical-vids/1.mp4', title: 'Video editing project 1' },
        { id: 2, src: '/vertical-vids/2.mp4', title: 'Video editing project 2' },
        { id: 3, src: '/vertical-vids/3.mp4', title: 'Video editing project 3' },
        { id: 4, src: '/vertical-vids/4.mp4', title: 'Video editing project 4' },
        { id: 5, src: '/vertical-vids/5.mp4', title: 'Video editing project 5' }
    ]

    const goToNext = useCallback(() => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setActiveIndex((prev) => (prev + 1) % videos.length)
        setTimeout(() => setIsTransitioning(false), 500)
    }, [isTransitioning, videos.length])

    const goToPrev = () => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length)
        setTimeout(() => setIsTransitioning(false), 500)
    }

    useEffect(() => {
        if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
        pauseTimeoutRef.current = setTimeout(goToNext, 2000)
        return () => clearTimeout(pauseTimeoutRef.current)
    }, [activeIndex, goToNext])

    const getCardStyle = (index) => {
        let diff = (index - activeIndex + videos.length) % videos.length
        if (diff > videos.length / 2) diff -= videos.length

        const isActive = diff === 0
        const xOffset = diff * 220
        const scale = isActive ? 1.2 : 0.8
        const opacity = isActive ? 1 : 0.5
        const rotateY = diff === 0 ? 0 : diff > 0 ? -15 : 15
        const zIndex = isActive ? 10 : 10 - Math.abs(diff)

        return {
            x: xOffset,
            scale,
            opacity,
            rotateY,
            zIndex,
            filter: isActive ? 'none' : 'brightness(0.5)'
        }
    }

    return (
        <section className="work-section" id="work">
            <div className="section-container">
                <div className="section-label">
                    <span className="dot"></span>
                    <span>Work</span>
                </div>

                <h2 className="section-title">Explore our video editing<br />work and projects</h2>

                <div className="video-carousel" style={{ perspective: '1000px', height: '600px' }}>
                    <button className="carousel-btn prev-btn" onClick={goToPrev} style={{ zIndex: 20 }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <div className="carousel-track" style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {videos.map((video, index) => {
                            const style = getCardStyle(index)
                            const isCenter = index === activeIndex
                            return (
                                <motion.div
                                    key={`${video.id}-${index}`}
                                    className="video-card"
                                    initial={false}
                                    animate={{
                                        x: style.x,
                                        scale: style.scale,
                                        opacity: style.opacity,
                                        rotateY: style.rotateY,
                                        zIndex: style.zIndex,
                                        filter: style.filter
                                    }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    style={{
                                        position: 'absolute',
                                        transformStyle: 'preserve-3d',
                                        width: '280px',
                                        height: '500px',
                                        left: '50%',
                                        marginLeft: '-140px'
                                    }}
                                >
                                    <video
                                        src={video.src}
                                        autoPlay
                                        muted={isCenter ? isCenterMuted : true}
                                        loop
                                        playsInline
                                        className="video-element"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '20px',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                        }}
                                    />
                                </motion.div>
                            )
                        })}
                    </div>

                    <button className="carousel-btn next-btn" onClick={goToNext} style={{ zIndex: 20 }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="explore-more-container" style={{ textAlign: 'center', margin: '4rem 0' }}>
                    <button
                        onClick={() => setIsCenterMuted(!isCenterMuted)}
                        className="btn-primary"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            minWidth: '140px',
                            justifyContent: 'center'
                        }}
                    >
                        {isCenterMuted ? (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                    <line x1="23" y1="9" x2="17" y2="15" />
                                    <line x1="17" y1="9" x2="23" y2="15" />
                                </svg>
                                Unmute Center
                            </>
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                                </svg>
                                Mute Center
                            </>
                        )}
                    </button>
                </div>

                <div className="featured-grid">
                    <motion.div
                        className="featured-card video-preview-card"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="yt-header">
                            <div className="channel-icon"></div>
                            <span className="video-title">Top SaaS Marketing Video Example | HeyMyra</span>
                            <span className="menu-dots">⋮</span>
                        </div>
                        <HorizontalVideo src="/horizontal-vids/1.mp4" className="featured-video" />
                    </motion.div>

                    <motion.div
                        className="featured-card graphic-card"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ background: '#000' }}
                    >
                        <HorizontalVideo src="/horizontal-vids/2.mp4" className="featured-video" />
                    </motion.div>
                </div>

                <div className="cgi-section" style={{ marginTop: '8rem' }}>
                    <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                        <span className="dot"></span>
                        <span>CGI Showcase</span>
                    </div>
                    <h3 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '4rem', textAlign: 'center' }}>
                        High-End CGI<br />Visualizations
                    </h3>

                    <div className="cgi-grid" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2rem',
                        flexWrap: 'wrap',
                        alignItems: 'center'
                    }}>
                        <CGICard src="/vertical-vids/1.mp4" label="Basic" delay={0} />
                        <CGICard src="/vertical-vids/3.mp4" label="Advance" delay={0.2} isCenter={true} />
                        <CGICard src="/vertical-vids/2.mp4" label="Intermediate" delay={0.4} />
                    </div>
                </div>
            </div>
        </section>
    )
}
