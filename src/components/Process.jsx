import { motion } from 'framer-motion'
import ProfileCard from './ProfileCard'

export default function Process() {
    const steps = [
        {
            number: "01",
            title: "Submit Request",
            description: "Share your video needs and project details to get started."
        },
        {
            number: "02",
            title: "Editing Magic",
            description: "We transform your raw footage into engaging content."
        },
        {
            number: "03",
            title: "Review & Finalize",
            description: "Get unlimited revisions until you're 100% satisfied."
        }
    ]

    return (
        <section className="process-section" id="process">
            <div className="process-container-split">
                <motion.div
                    className="process-image-col"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <ProfileCard />
                </motion.div>

                <div className="process-content-col">
                    <motion.div
                        className="section-label"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="dot"></span>
                        <span>Process</span>
                    </motion.div>

                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        How our video editing<br />service works for you
                    </motion.h2>

                    <div className="process-steps-list">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="step-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + (index * 0.1) }}
                            >
                                <span className="step-number">{step.number}</span>
                                <div className="step-info">
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
