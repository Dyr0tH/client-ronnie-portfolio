import { useState, useEffect } from 'react'
import ScrollStack, { ScrollStackItem } from './ScrollStack'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

export default function Testimonials() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const testimonials = [
        { id: 1, image: "/testimonials/1.png" },
        { id: 2, image: "/testimonials/2.png" },
        { id: 3, image: "/testimonials/3.png" },
        { id: 4, image: "/testimonials/4.png" },
        { id: 5, image: "/testimonials/5.png" },
        { id: 6, image: "/testimonials/6.png" },
    ]

    return (
        <section className="testimonials-section" id="testimonial">
            <div className="section-container">
                <div className="section-label">
                    <span className="dot"></span>
                    <span>Testimonial</span>
                </div>

                <h2 className="section-title">What our premium clients<br />are saying about us</h2>

                <div className="testimonials-wrapper">
                    {!isMobile ? (
                        <ScrollStack
                            useWindowScroll={true}
                            itemDistance={50}
                            stackPosition="20%"
                            scaleEndPosition="5%"
                        >
                            {testimonials.map((item) => (
                                <ScrollStackItem key={item.id}>
                                    <div className="testimonial-card-desktop">
                                        <img
                                            src={item.image}
                                            alt="Client Testimonial"
                                            className="testimonial-image"
                                        />
                                    </div>
                                </ScrollStackItem>
                            ))}
                        </ScrollStack>
                    ) : (
                        <div className="testimonials-mobile-slider">
                            <Swiper
                                modules={[Pagination, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1.1}
                                centeredSlides={true}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                className="testimonial-swiper"
                            >
                                {testimonials.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <div className="testimonial-card-mobile">
                                            <img
                                                src={item.image}
                                                alt="Client Testimonial"
                                                className="testimonial-image-mobile"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
