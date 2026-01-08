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
            preload='metadata'
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
    const [isPlaying, setIsPlaying] = useState(false)
    const videoRef = useRef(null)

    const togglePlayPause = (e) => {
        e.stopPropagation()
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play().catch(() => { /* Playback prevented */ })
            }
            setIsPlaying(!isPlaying)
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Video is in view, load it
                    if (videoRef.current && !videoRef.current.src) {
                        videoRef.current.src = src
                    }
                    observer.disconnect()
                }
            },
            { rootMargin: '200px' }
        )

        if (videoRef.current) {
            observer.observe(videoRef.current)
        }

        return () => observer.disconnect()
    }, [src])

    useEffect(() => {
        if (!videoRef.current) return

        if (isPaused || !isPlaying) {
            videoRef.current.pause()
        }
    }, [isPlaying, isPaused])

    return (
        <div className={className} style={{ ...style, position: 'relative' }}>
            <video
                ref={videoRef}
                muted={isMuted}
                preload='metadata'
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Play/Pause Button */}
            <button
                onClick={togglePlayPause}
                style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '60px',
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
                {isPlaying ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                    </svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                    </svg>
                )}
            </button>

            {/* Mute/Unmute Button */}
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

const CGI_DATA = [
    { id: 1, type: 'vertical', src: '/cgi/FVID1.mp4' },
    { id: 2, type: 'vertical', src: '/cgi/FVID2.mp4' },
    { id: 3, type: 'vertical', src: '/cgi/FVID3.mp4' },
    { id: 4, type: 'vertical', src: '/cgi/FVID4.mp4' },
    { id: 5, type: 'vertical', src: '/cgi/FVID5.mp4' },
]

import GlassSurface from './GlassSurface'

const CGIGallery = ({ onVideoSelect, selectedVideo }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const pauseTimeoutRef = useRef(null)

    const carouselItems = CGI_DATA

    const goToNext = useCallback(() => {
        if (isTransitioning || carouselItems.length === 0) return
        setIsTransitioning(true)
        setActiveIndex((prev) => (prev + 1) % carouselItems.length)
        setTimeout(() => setIsTransitioning(false), 500)
    }, [isTransitioning, carouselItems.length])

    const goToPrev = () => {
        if (isTransitioning || carouselItems.length === 0) return
        setIsTransitioning(true)
        setActiveIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
        setTimeout(() => setIsTransitioning(false), 500)
    }

    useEffect(() => {
        if (selectedVideo) {
            if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
            return
        }
        if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
        pauseTimeoutRef.current = setTimeout(goToNext, 5000)
        return () => clearTimeout(pauseTimeoutRef.current)
    }, [activeIndex, goToNext, selectedVideo])

    const getCardStyle = (index) => {
        let diff = (index - activeIndex + carouselItems.length) % carouselItems.length
        if (diff > carouselItems.length / 2) diff -= carouselItems.length

        const isActive = diff === 0
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
        const offsetMultiplier = isMobile ? 140 : 260
        const xOffset = diff * offsetMultiplier
        const scale = isActive ? (isMobile ? 1.05 : 1.1) : 0.75
        const opacity = isActive ? 1 : 0.4
        const rotateY = diff === 0 ? 0 : diff > 0 ? -20 : 20
        const zIndex = isActive ? 10 : 10 - Math.abs(diff)

        return {
            x: xOffset,
            scale,
            opacity,
            rotateY,
            zIndex,
            filter: isActive ? 'none' : 'blur(2px) brightness(0.4)'
        }
    }

    return (
        <div className="cgi-gallery" style={{ width: '100%', position: 'relative' }}>

            <p style={{
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '1rem',
                marginTop: '1rem',
                marginBottom: '2rem',
                fontStyle: 'italic'
            }}>
                Click the video to play
            </p>

            <div className="cgi-carousel-wrapper" style={{
                perspective: '1200px',
                height: typeof window !== 'undefined' && window.innerWidth < 768 ? '450px' : '650px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                width: '100%'
            }}>
                {/* Navigation Buttons */}
                <button className="carousel-btn prev-btn" onClick={goToPrev} style={{ zIndex: 21 }}>
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
                    {carouselItems.map((item, index) => {
                        const style = getCardStyle(index)
                        const isCenter = index === activeIndex
                        return (
                            <motion.div
                                key={`cgi-${item.id}-${index}`}
                                onClick={() => isCenter && onVideoSelect(item)}
                                initial={false}
                                animate={style}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    position: 'absolute',
                                    transformStyle: 'preserve-3d',
                                    width: typeof window !== 'undefined' && window.innerWidth < 768 ? '220px' : '400px',
                                    height: typeof window !== 'undefined' && window.innerWidth < 768 ? '350px' : '550px',
                                    cursor: isCenter ? 'pointer' : 'default',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: isCenter ? '1px solid #2fccef' : '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: isCenter ? '0 20px 50px rgba(47, 204, 239, 0.2)' : 'none'
                                }}
                            >
                                <LazyVideo
                                    src={item.src}
                                    forcedPause={!isCenter}
                                    autoPlay={isCenter}
                                    muted={true}
                                    loop
                                    playsInline
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />

                                {isCenter && (
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        padding: '20px',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                        color: '#fff',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>View Project</span>
                                    </div>
                                )}
                            </motion.div>
                        )
                    })}
                </div>

                <button className="carousel-btn next-btn" onClick={goToNext} style={{ zIndex: 21 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
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
                preload='metadata'
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
        pauseTimeoutRef.current = setTimeout(goToNext, 5000)
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
        <section className="work-section" id="work" style={{ paddingBottom: '0' }}>
            <div className="section-container">
                <div className="section-label">
                    <span className="dot"></span>
                    <span>Work</span>
                </div>

                <h2 className="section-title">Explore our video editing<br />work and projects</h2>

                <div className="video-carousel" style={{ perspective: '1000px', height: '600px' }}>
                    <button className="carousel-btn prev-btn" onClick={goToPrev}>
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
                                        forcedPause={!!selectedVideo || !isCenter}
                                        autoPlay={isCenter}
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

                    <button className="carousel-btn next-btn" onClick={goToNext}>
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

                <div className="cgi-section" style={{ marginTop: '8rem', marginBottom: 0 }}>
                    <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                        <span className="dot"></span>
                        <span>CGI Showcase</span>
                    </div>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 className="section-title" style={{ marginBottom: '1rem' }}>Visual storytelling<br />taken to the next level</h2>
                        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            We produce high-end CGI content that captivates and converts.
                        </p>
                    </div>

                    <CGIGallery
                        onVideoSelect={onVideoSelect}
                        selectedVideo={selectedVideo}
                    />
                </div>
            </div>
        </section>
    )
}
