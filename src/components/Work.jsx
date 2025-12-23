import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LazyVideo = ({ src, style, forcedPause, ...props }) => {
    const videoRef = useRef(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '200px' }
        )

        if (videoRef.current) {
            observer.observe(videoRef.current)
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (isInView) {
            setIsLoaded(true)
        }
    }, [isInView])

    useEffect(() => {
        if (!isLoaded || !videoRef.current) return

        if (forcedPause || !props.autoPlay) {
            videoRef.current.pause()
        } else if (props.autoPlay) {
            videoRef.current.play().catch(() => { /* Autoplay prevented */ })
        }
    }, [isLoaded, props.autoPlay, forcedPause])

    return (
        <video
            ref={videoRef}
            src={isLoaded ? src : undefined}
            style={{
                ...style,
                opacity: isLoaded ? (style?.opacity !== undefined ? style.opacity : 1) : 0,
                transition: 'opacity 0.5s ease'
            }}
            {...props}
        />
    )
}

const HorizontalVideo = ({ src, className, style, isPaused }) => {
    const [isMuted, setIsMuted] = useState(true)

    return (
        <div className={className} style={{ ...style, position: 'relative' }}>
            <LazyVideo
                src={src}
                forcedPause={isPaused}
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
            {/* <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 50%)',
                backgroundSize: '100% 4px',
                pointerEvents: 'none',
                opacity: 0.2,
                zIndex: 1
            }} /> */}

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

const CGI_DATA = {
    basic: [
        { id: 1, type: 'vertical', src: '/cgi/basic/1~1.mp4' },
        { id: 2, type: 'horizontal', src: '/cgi/basic/2~1.mp4' },
        { id: 3, type: 'vertical', src: '/cgi/basic/3~1.mp4' },
        { id: 4, type: 'horizontal', src: '/cgi/basic/4~1.mp4' },
        { id: 5, type: 'vertical', src: '/cgi/basic/5~1.mp4' },
        { id: 6, type: 'vertical', src: '/cgi/basic/6~1.mp4' },
        { id: 7, type: 'horizontal', src: '/cgi/basic/7~1.mp4' },
    ],
    intermediate: [
        { id: 1, type: 'horizontal', src: '/cgi/intermediate/1~1.mp4' },
        { id: 2, type: 'vertical', src: '/cgi/intermediate/2~1.mp4' },
        { id: 3, type: 'horizontal', src: '/cgi/intermediate/3~1.mp4' },
        { id: 4, type: 'vertical', src: '/cgi/intermediate/4~1.mp4' },
        { id: 5, type: 'horizontal', src: '/cgi/intermediate/5~1.mp4' },
        { id: 6, type: 'vertical', src: '/cgi/intermediate/6~1.mp4' },
        { id: 7, type: 'horizontal', src: '/cgi/intermediate/7~1.mp4' },
    ],
    advance: [
        { id: 1, type: 'vertical', src: '/cgi/advance/1~1.mp4' },
        { id: 2, type: 'vertical', src: '/cgi/advance/2~1.mp4' },
        { id: 3, type: 'horizontal', src: '/cgi/advance/3~1.mp4' },
        { id: 4, type: 'vertical', src: '/cgi/advance/4~1.mp4' },
        { id: 5, type: 'horizontal', src: '/cgi/advance/5~1.mp4' },
        { id: 6, type: 'vertical', src: '/cgi/advance/6~1.mp4' },
        { id: 7, type: 'horizontal', src: '/cgi/advance/7 advance ~1.mp4' },
        { id: 8, type: 'vertical', src: '/cgi/advance/lens intro~1.mp4' },
    ]
}



const TechCard = ({ item, isPaused }) => {
    const [isHovered, setIsHovered] = useState(false)
    const isVertical = item.type === 'vertical'

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                flexShrink: 0,
                width: isVertical ? '300px' : '500px',
                height: '450px',
                background: '#050505',
                cursor: 'pointer',
                borderRadius: '4px',
                marginRight: '20px',
                overflow: 'hidden'
            }}
            whileHover={{
                scale: 1.02,
                filter: 'drop-shadow(0 0 20px rgba(47, 204, 239, 0.3))',
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

            {/* Corner Accents - All 4 Corners */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: '2px solid #2fccef', borderLeft: '2px solid #2fccef', zIndex: 3 }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderTop: '2px solid #2fccef', borderRight: '2px solid #2fccef', zIndex: 3 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '20px', height: '20px', borderBottom: '2px solid #2fccef', borderLeft: '2px solid #2fccef', zIndex: 3 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: '2px solid #2fccef', borderRight: '2px solid #2fccef', zIndex: 3 }} />

            {/* Video Content */}
            <LazyVideo
                src={item.src}
                forcedPause={isPaused}
                autoPlay={isHovered}
                loop
                muted
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.9
                }}
            />

            {/* Scanline Overlay */}
            {/* <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 50%)',
                backgroundSize: '100% 4px',
                pointerEvents: 'none',
                opacity: 0.2,
                zIndex: 1
            }} /> */}
        </motion.div>
    )
}

const CGIGallery = ({ onVideoSelect, selectedVideo }) => {
    const [activeTab, setActiveTab] = useState('basic')

    // Duplicate items for infinite marquee (3x to ensure enough length)
    const items = [...CGI_DATA[activeTab], ...CGI_DATA[activeTab], ...CGI_DATA[activeTab]]

    return (
        <div className="cgi-gallery" style={{ width: '100%', position: 'relative' }}>
            {/* Tabs */}
            <div className="cgi-tabs-container">
                {Object.keys(CGI_DATA).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`cgi-tab-btn ${activeTab === tab ? 'active' : ''}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Marquee Gallery - CSS Animation for Pause on Hover */}
            {/* Optimization: Hide marquee when popup is open to save resources */}
            <div
                className="marquee-container"
                style={{
                    display: selectedVideo ? 'none' : 'flex',
                    width: '100%',
                    overflow: 'hidden',
                    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                }}
            >
                <div
                    className="marquee-track"
                    style={{
                        display: 'flex',
                        padding: '20px 0',
                        width: 'max-content',
                        animation: 'marquee 40s linear infinite'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                    onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
                >
                    {items.map((item, index) => (
                        <div key={`${activeTab}-${item.id}-${index}`} onClick={() => onVideoSelect(item)}>
                            <TechCard item={item} isPaused={!!selectedVideo} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Global Styles for Marquee */}
            <style>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-33.33%); }
                }
            `}</style>

            {/* Video Popup Modal moved to parent Work component for better control */}
        </div>
    )
}

export const PopupVideoPlayer = ({ src }) => {
    const [isMuted, setIsMuted] = useState(false) // Default Unmuted as per request context implication
    const videoRef = useRef(null)

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <video
                src={src}
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain', // Ensure no cuts
                    willChange: 'transform' // Optimization hint
                }}
            />

            {/* Mute/Unmute Toggle */}
            <button
                onClick={() => setIsMuted(!isMuted)}
                style={{
                    position: 'absolute',
                    bottom: '30px',
                    right: '30px',
                    padding: '10px 20px',
                    background: 'rgba(0,0,0,0.7)',
                    border: '1px solid #2fccef',
                    borderRadius: '30px',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    backdropFilter: 'blur(4px)'
                }}
            >
                {isMuted ? (
                    <>
                        <span style={{ color: '#ff4444' }}>🔇</span> Unmute
                    </>
                ) : (
                    <>
                        <span style={{ color: '#2fccef' }}>🔊</span> Mute
                    </>
                )}
            </button>
        </div>
    )
}

export default function Work({ selectedVideo, onVideoSelect }) {
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
        if (selectedVideo) {
            if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
            return
        }
        if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
        pauseTimeoutRef.current = setTimeout(goToNext, 2000)
        return () => clearTimeout(pauseTimeoutRef.current)
    }, [activeIndex, goToNext, selectedVideo])

    const getCardStyle = (index) => {
        let diff = (index - activeIndex + videos.length) % videos.length
        if (diff > videos.length / 2) diff -= videos.length

        const isActive = diff === 0
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
        const offsetMultiplier = isMobile ? 120 : 220
        const xOffset = diff * offsetMultiplier
        const scale = isActive ? (isMobile ? 1.1 : 1.2) : 0.8
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
                                        width: typeof window !== 'undefined' && window.innerWidth < 768 ? '180px' : '280px',
                                        height: typeof window !== 'undefined' && window.innerWidth < 768 ? '320px' : '500px',
                                        left: '50%',
                                        marginLeft: typeof window !== 'undefined' && window.innerWidth < 768 ? '-90px' : '-140px'
                                    }}
                                >
                                    <LazyVideo
                                        src={video.src}
                                        forcedPause={!!selectedVideo}
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
                        <HorizontalVideo
                            src="/horizontal-vids/1.mp4"
                            className="featured-video"
                            isPaused={!!selectedVideo}
                        />
                    </motion.div>

                    <motion.div
                        className="featured-card graphic-card"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ background: '#000' }}
                    >
                        <HorizontalVideo
                            src="/horizontal-vids/2.mp4"
                            className="featured-video"
                            isPaused={!!selectedVideo}
                        />
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

                    <CGIGallery
                        onVideoSelect={onVideoSelect}
                        selectedVideo={selectedVideo}
                    />
                </div>
            </div>
        </section>
    )
}
