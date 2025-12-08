import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Work', href: '#work' },
        { name: 'Process', href: '#process' },
        { name: 'Testimonials', href: '#testimonial' },
        { name: 'FAQ', href: '#faq' },
    ]

    return (
        <>
            <motion.nav
                className={`navbar ${isScrolled ? 'scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="nav-container">
                    <a href="#" className="nav-logo-link" onClick={() => window.scrollTo(0, 0)}>
                        <div className="nav-logo">
                            <img src="/logo.png" alt="MetaCreation Studio" className="nav-logo-img" />
                            <span className="logo-text">MetaCreation<span className="logo-accent">Studio</span></span>
                        </div>
                    </a>

                    {/* Desktop Menu */}
                    <div className="nav-desktop">
                        <ul className="nav-menu">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="nav-link">{link.name}</a>
                                </li>
                            ))}
                        </ul>
                        <a href="#contact" className="btn-primary nav-cta">Contact Us</a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="mobile-nav-links">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="#contact"
                                    className="btn-primary mobile-cta"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}