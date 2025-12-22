import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null)

    const faqs = [
        {
            question: "What is the edit process?",
            answer: "We start with a consultation to understand your vision, then move to drafting, revisions based on your feedback, and final delivery."
        },
        {
            question: "How will I send you the footage?",
            answer: "You can use Google Drive, Dropbox, or WeTransfer. We'll provide a dedicated upload link for your project."
        },
        {
            question: "What if I'm not satisfied?",
            answer: "We offer unlimited revisions until you are 100% happy with the result. Your satisfaction is our priority."
        },
        {
            question: "I need this video ASAP! Can you deliver in 24 hours?",
            answer: "Yes, we offer rush delivery services for urgent projects. Please contact us directly to confirm availability."
        },
        {
            question: "How do I get started?",
            answer: "Simply book a call using the button on the left, or fill out our contact form to discuss your project needs."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and bank transfers for larger projects."
        }
    ]

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <section className="faq-section" id="faq">
            <div className="faq-container-split">
                {/* Left Column */}
                <div className="faq-left">
                    <div className="section-label">
                        <span className="dot"></span>
                        <span>FAQ</span>
                    </div>

                    <h2 className="section-title">Frequently asked<br />questions about us</h2>

                    <motion.div
                        className="faq-cta-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="cta-text">
                            <h3 style={{ fontFamily: 'var(--font-primary)' }}>Have a question? Let's discuss it now!</h3>
                        </div>
                        <button className="btn-dark-pill" style={{ fontFamily: 'var(--font-primary)' }}>Book an appointment</button>
                    </motion.div>
                </div>

                {/* Right Column */}
                <div className="faq-right">
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                className={`faq-item-pill ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggleFAQ(index)}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="faq-question-pill">
                                    <span>{faq.question}</span>
                                    <div className="faq-icon-circle">
                                        {activeIndex === index ? '−' : '+'}
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            className="faq-answer-pill"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <p>{faq.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
