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
                            <h3>Have a question? Let's discuss it now!</h3>
                        </div>
                        <button className="btn-dark-pill">Book an appointment</button>
                    </motion.div>
                </div>

                {/* Right Column */}
                <div className="faq-right">
                    <div className="faq-list-sleek">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                className={`faq-item-sleek ${activeIndex === index ? 'active' : ''}`}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <button
                                    className="faq-trigger-sleek"
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={activeIndex === index}
                                >
                                    <span>{faq.question}</span>
                                    <motion.svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 15 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        className="faq-chevron"
                                    >
                                        <path d="M3.13523 6.15803C3.3241 5.95656 3.64057 5.94637 3.84203 6.13523L7.5 9.56464L11.158 6.13523C11.3594 5.94637 11.6759 5.95656 11.8648 6.15803C12.0536 6.35949 12.0434 6.67597 11.842 6.86484L7.84199 10.6148C7.64491 10.7996 7.35509 10.7996 7.15801 10.6148L3.15801 6.86484C2.95655 6.67597 2.94635 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                    </motion.svg>
                                </button>
                                <AnimatePresence initial={false}>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            className="faq-content-sleek"
                                        >
                                            <div className="faq-answer-inner">
                                                {faq.answer}
                                            </div>
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
