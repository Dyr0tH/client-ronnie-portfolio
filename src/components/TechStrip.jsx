import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function TechStrip() {
    const isMobile = useIsMobile()
    const [activeIndex, setActiveIndex] = useState(0)

    const tools = [
        { name: "BLENDER", logo: "/software-logos/cvbn bnm.png" },
        { name: "AFTER EFFECTS", logo: "/software-logos/vbnbnm.png" },
        { name: "PREMIERE PRO", logo: "/software-logos/premier epro.png" },
        { name: "UNREAL ENGINE", logo: "/software-logos/Unreal_Engine-Logo.wine.png" },
        { name: "CINEMA 4D", logo: "/software-logos/Cinema-4D-Logo.png" },
        { name: "DAVINCI RESOLVE", logo: "/software-logos/DaVinci_Resolve_Studio.png" },
        { name: "PHOTOSHOP", logo: "/software-logos/Adobe_Photoshop_CC_icon.svg.png" },
        { name: "ILLUSTRATOR", logo: "/software-logos/Adobe_Illustrator_CC_icon.svg.png" },
        { name: "CANVA", logo: "/software-logos/canva.png" },
        { name: "CAPCUT", logo: "/software-logos/capcut.png" }
    ];

    // Cycle through pairs on mobile
    useEffect(() => {
        if (!isMobile) return
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 2) % tools.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [isMobile, tools.length])

    // Duplicate list only for desktop marquee looping
    const marqueeContent = isMobile ? tools : [...tools, ...tools, ...tools, ...tools];
    const currentPair = [tools[activeIndex], tools[(activeIndex + 1) % tools.length]]

    if (isMobile) {
        return (
            <div className="tech-strip-container" style={{
                minHeight: '120px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
            }}>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                            display: 'flex',
                            gap: '3rem',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {currentPair.map((tool, i) => (
                            <div key={`${activeIndex}-${i}`} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}>
                                <img
                                    src={tool.logo}
                                    alt={tool.name}
                                    style={{
                                        height: '36px',
                                        width: 'auto',
                                        objectFit: 'contain',
                                        filter: 'none' // Full color
                                    }}
                                />
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    letterSpacing: '0.05em',
                                    color: 'rgba(255,255,255,0.8)',
                                    textAlign: 'center'
                                }}>
                                    {tool.name}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        )
    }

    return (
        <div className="tech-strip-container">
            <div className="tech-strip-track">
                {marqueeContent.map((tool, index) => (
                    <div key={index} className="tech-item">
                        <img
                            src={tool.logo}
                            alt={tool.name}
                            style={{
                                height: '28px',
                                width: 'auto',
                                marginRight: '15px',
                                objectFit: 'contain',
                                filter: 'grayscale(1) brightness(1.5)',
                                transition: 'all 0.3s ease'
                            }}
                            className="tech-logo"
                        />
                        <span className="tech-name">{tool.name}</span>
                        <span className="tech-separator">•</span>
                    </div>
                ))}
            </div>
            <div className="tech-strip-overlay"></div>
        </div>
    );
}
