import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
    <div className={`scroll-stack-card-content ${itemClassName}`.trim()}>{children}</div>
);

const CardWrapper = ({ children, index, total, scrollYProgress, positionOffset }) => {
    // Map scroll progress (0..1) to a value (0..total)
    const current = useTransform(scrollYProgress, [0, 1], [0, total]);

    // Y Position Logic:
    // index - 1: Card is at bottom (waiting to enter)
    // index: Card is at stack position (active)
    // index + 1: Card is moving up/behind (next card is active)
    const y = useTransform(
        current,
        [index - 1, index, index + 1],
        ['150vh', '0vh', '-10vh']
    );

    // Scale Logic:
    // index: Scale 1
    // index + 1: Scale down
    const scale = useTransform(
        current,
        [index, index + 1],
        [1, 0.85]
    );

    // Opacity Logic:
    // Fade out slightly as it goes back
    const opacity = useTransform(
        current,
        [index, index + 1],
        [1, 0.4]
    );

    // Blur Logic:
    // Blur as it goes back
    const blur = useTransform(
        current,
        [index, index + 1],
        ['0px', '5px']
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
                maxWidth: '600px',
                y,
                scale,
                opacity,
                filter: useTransform(blur, (v) => `blur(${v})`),
                zIndex: index,
                height: 'auto',
                display: 'flex',
                justifyContent: 'center',
                willChange: 'transform, opacity, filter'
            }}
            className="scroll-stack-card-wrapper"
        >
            {children}
        </motion.div>
    );
};

const ScrollStack = ({
    children,
    className = '',
    itemDistance = 50, // Not used in this logic but kept for API compat
    stackPosition = '20%', // Top offset
    useWindowScroll = true, // Ignored, we handle our own container
}) => {
    const containerRef = useRef(null);

    // Extract children array
    const items = React.Children.toArray(children);
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
                height: `${total * 60 + 50}vh`, // Dynamic height based on items
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
                    alignItems: 'flex-start', // Align to top so we can use stackPosition
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
