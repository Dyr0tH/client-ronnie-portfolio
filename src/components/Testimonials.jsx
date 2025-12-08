import ScrollStack, { ScrollStackItem } from './ScrollStack'

export default function Testimonials() {
    const testimonials = [
        { id: 1, image: "/testimonials/1.png" },
        { id: 2, image: "/testimonials/2.png" },
        { id: 3, image: "/testimonials/3.png" },
        { id: 4, image: "/testimonials/4.png" },
        { id: 5, image: "/testimonials/5.png" },
        { id: 6, image: "/testimonials/6.png" },
    ]

    return (
        <section className="testimonials-section" id="testimonial" style={{ minHeight: '100vh' }}>
            <div className="section-container">
                <div className="section-label">
                    <span className="dot"></span>
                    <span>Testimonial</span>
                </div>

                <h2 className="section-title">What our premium clients<br />are saying about us</h2>

                <div style={{ position: 'relative' }}>
                    <ScrollStack
                        useWindowScroll={true}
                        itemDistance={50}
                        stackPosition="20%"
                        scaleEndPosition="5%"
                    >
                        {testimonials.map((item) => (
                            <ScrollStackItem key={item.id}>
                                <div className="testimonial-image-card" style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    background: 'transparent',
                                    boxShadow: 'none',
                                    padding: '0',
                                    border: 'none',
                                    outline: 'none'
                                }}>
                                    <img
                                        src={item.image}
                                        alt="Client Testimonial"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block',
                                            borderRadius: '12px',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                            border: 'none',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </ScrollStackItem>
                        ))}
                    </ScrollStack>
                </div>
            </div>
        </section>
    )
}
