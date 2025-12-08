import { motion } from 'framer-motion'

export default function Contact() {
    const contactMethods = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            ),
            label: "Email",
            value: "metacreationstudio@gmail.com",
            link: "mailto:metacreationstudio@gmail.com",
            color: "#2fccef"
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
            ),
            label: "Phone",
            value: "+91 9589500421",
            link: "tel:+919589500421",
            color: "#4ade80"
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
            ),
            label: "Instagram",
            value: "@metacreation_studio",
            link: "https://www.instagram.com/metacreation_studio",
            color: "#e1306c"
        }
    ]

    return (
        <section className="contact-section" id="contact">
            <div className="section-container">
                <div className="section-label">
                    <span className="dot"></span>
                    <span>Contact</span>
                </div>

                <h2 className="section-title">Ready to start your<br />next project?</h2>

                <div className="contact-grid">
                    {contactMethods.map((method, index) => (
                        <motion.a
                            key={index}
                            href={method.link}
                            className="contact-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            style={{ '--accent-color': method.color }}
                        >
                            <div className="contact-icon-wrapper">
                                {method.icon}
                            </div>
                            <div className="contact-info">
                                <span className="contact-label">{method.label}</span>
                                <span className="contact-value">{method.value}</span>
                            </div>
                            <div className="contact-arrow">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    )
}
