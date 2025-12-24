import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
    <div className={`scroll-stack-card-content ${itemClassName}`.trim()}>{children}</div>
);

const CardWrapper = React.memo(({ children, index, total, scrollYProgress, positionOffset }) => {
    // Optimization: Map scroll progress to a value once per frame
    const current = useTransform(scrollYProgress, [0, 1], [0, total]);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const y = useTransform(
        current,
        [index - 1, index, index + 1],
        ['100vh', '0vh', isMobile ? '-5vh' : '-15vh']
    );

    const scale = useTransform(
        current,
        [index, index + 1],
        [1, 0.9]
    );

    const opacity = useTransform(
        current,
        [index, index + 1, index + 1.5],
        [1, 0.4, 0]
    );

    // Skip heavy blur filter if possible
    const blurValue = useTransform(
        current,
        [index, index + 0.5, index + 1],
        ['0px', '2px', '8px']
    );

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: positionOffset,
                left: 0,
                right: 0,
                margin: '0 auto',
                width: '100%',
                maxWidth: typeof window !== 'undefined' && window.innerWidth < 768 ? '90vw' : '600px',
                y,
                scale,
                opacity,
                filter: typeof window !== 'undefined' && window.innerWidth < 768 ? 'none' : useTransform(blurValue, (v) => v === '0px' ? 'none' : `blur(${v})`),
                zIndex: index,
                height: 'auto',
                display: 'flex',
                justifyContent: 'center',
                willChange: 'transform' // Focused on transform for maximum GPU accel
            }}
            className="scroll-stack-card-wrapper"
        >
            {children}
        </motion.div>
    );
});

const ScrollStack = ({
    children,
    className = '',
    stackPosition = '15%',
}) => {
    const containerRef = useRef(null);
    const items = useMemo(() => React.Children.toArray(children), [children]);
    const total = items.length;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    return (
        <div
            ref={containerRef}
            className={`scroll-stack-container ${className}`}
            style={{
                // Significantly increase scroll height (150vh per card) to ensure stickiness lasts
                height: typeof window !== 'undefined' && window.innerWidth < 768
                    ? `calc(${total * 80}vh + 100vh)`
                    : `calc(${total * 150}vh + 100vh)`,
                position: 'relative'
            }}
        >
            <div
                className="scroll-stack-sticky"
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center', // Changed to center for better focus
                    justifyContent: 'center'
                }}
            >
                <div className="scroll-stack-cards-inner" style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {items.map((child, i) => (
                        <CardWrapper
                            key={i}
                            index={i}
                            total={total}
                            scrollYProgress={scrollYProgress}
                            positionOffset={stackPosition}
                        >
                            {child}
                        </CardWrapper>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScrollStack;
