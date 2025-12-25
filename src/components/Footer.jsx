import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Footer() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <footer className="footer-section" style={{
            padding: '2rem 5%',
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            marginTop: '0',
            position: 'relative',
            zIndex: 10,
            background: '#050505'
        }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', margin: 0 }}>
                © {new Date().getFullYear()} MetaCreation Studio. All rights reserved.
                <span style={{ margin: '0 10px', opacity: 0.3 }}>|</span>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.6)',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        fontSize: 'inherit',
                        padding: 0,
                        transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#fff'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
                >
                    Terms & Conditions for clients (Must Read)
                </button>
            </p>

            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => setIsModalOpen(false)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                zIndex: 99998
                            }}
                        />
                        <motion.div
                            className="terms-modal"
                            initial={{ opacity: 0, scale: 0.95, y: 20, x: '-50%' }}
                            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
                            exit={{ opacity: 0, scale: 0.95, y: 20, x: '-50%' }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            style={{
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                width: '90%',
                                maxWidth: '500px',
                                maxHeight: '80vh',
                                background: '#0a0e12',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '24px',
                                padding: '2.5rem',
                                zIndex: 99999,
                                overflowY: 'auto',
                                color: '#fff',
                                boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.8)'
                            }}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: 'none',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    color: 'rgba(255,255,255,0.8)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = 'rgba(255,255,255,0.1)';
                                    e.target.style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'rgba(255,255,255,0.05)';
                                    e.target.style.color = 'rgba(255,255,255,0.8)';
                                }}
                            >
                                ✕
                            </button>

                            <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', fontFamily: 'var(--font-heading)' }}>Terms & Conditions</h2>

                            <div style={{ lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', textAlign: 'left' }}>
                                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '1.5rem 0 0.5rem' }}>1. Project Start</h3>
                                <p style={{ marginBottom: '1rem' }}>
                                    Work starts after the advance payment is received, along with project details, references, and timeline confirmation.
                                </p>

                                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '1.5rem 0 0.5rem' }}>2. Payment Terms</h3>
                                <ul style={{ marginBottom: '1rem', paddingLeft: '1.2rem' }}>
                                    <li>50% advance before the project begins.</li>
                                    <li>50% final payment after delivery, before the final export files.</li>
                                </ul>

                                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '1.5rem 0 0.5rem' }}>3. Timeline</h3>
                                <p style={{ marginBottom: '1rem' }}>
                                    Project delivery depends on the final brief, feedback speed, and workload. I always try to deliver within the committed timeline.
                                </p>

                                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '1.5rem 0 0.5rem' }}>4. Revisions</h3>
                                <p style={{ marginBottom: '1rem' }}>
                                    Video project includes 2 revisions & CGI project includes 1 revision. Additional revisions are possible with extra charges.
                                </p>

                                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '1.5rem 0 0.5rem' }}>5. Work Process</h3>
                                <p style={{ marginBottom: '0.5rem' }}>Please share:</p>
                                <ul style={{ marginBottom: '1rem', paddingLeft: '1.2rem' }}>
                                    <li>Clear brief</li>
                                    <li>Brand assets (logo, files, references)</li>
                                    <li>Text/script</li>
                                    <li>Any specific instructions</li>
                                </ul>

                                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '1.5rem 0 0.5rem' }}>6. Usage Rights</h3>
                                <p style={{ marginBottom: '1rem' }}>
                                    Once the final payment is completed, the work is yours for brand usage. Behind-the-scenes or project previews may be used in my portfolio/social media unless discussed otherwise.
                                </p>

                                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '1.5rem 0 0.5rem' }}>7. Delays</h3>
                                <p style={{ marginBottom: '1rem' }}>
                                    If feedback or approvals are delayed from the client side, timeline will extend. If I face delay, I’ll inform you in advance.
                                </p>

                                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '1.5rem 0 0.5rem' }}>8. Refunds</h3>
                                <p style={{ marginBottom: '1rem' }}>
                                    Refunds are not available once work has started. If the project is cancelled by the client mid-way, advance is non-refundable.
                                </p>

                                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '1.5rem 0 0.5rem' }}>9. Extra Work</h3>
                                <p style={{ marginBottom: '0.5rem' }}>Any work outside the original scope:</p>
                                <ul style={{ marginBottom: '1rem', paddingLeft: '1.2rem' }}>
                                    <li>New concepts</li>
                                    <li>Major direction change</li>
                                    <li>Additional variations</li>
                                </ul>
                                <p style={{ marginBottom: '1rem' }}>will be charged separately.</p>

                                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '1.5rem 0 0.5rem' }}>10. Communication</h3>
                                <p style={{ marginBottom: '1rem' }}>
                                    All communication will happen via WhatsApp/Email for clarity and record.
                                </p>

                                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '1.5rem 0 0.5rem' }}>11. Final Files</h3>
                                <p style={{ marginBottom: '0.5rem' }}>Final files will be shared after the final payment:</p>
                                <ul style={{ marginBottom: '1rem', paddingLeft: '1.2rem' }}>
                                    <li>High-quality export</li>
                                    <li>Proper formats (MP4, PNG, JPEG, MOV etc.)</li>
                                </ul>

                                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '1.5rem 0 0.5rem' }}>12. Confidentiality</h3>
                                <p style={{ marginBottom: '1rem' }}>
                                    All client data, branding, product information is treated confidentially.
                                </p>

                                <p style={{ marginTop: '2.5rem', fontSize: '0.8rem', opacity: 0.5, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                                    Last updated: {new Date().toLocaleDateString()}
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </footer>
    )
}
