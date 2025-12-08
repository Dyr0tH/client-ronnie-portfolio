import React from 'react';

export default function TechStrip() {
    const tools = [
        "BLENDER", "AFTER EFFECTS", "PREMIERE PRO",
        "UNREAL ENGINE", "CINEMA 4D", "DAVINCI RESOLVE", "PHOTOSHOP",
        "ILLUSTRATOR", "CANVA", "CAPCUT"
    ];

    // Duplicate list to ensure seamless looping
    const marqueeContent = [...tools, ...tools, ...tools, ...tools];

    return (
        <div className="tech-strip-container">
            <div className="tech-strip-track">
                {marqueeContent.map((tool, index) => (
                    <div key={index} className="tech-item">
                        <span className="tech-name">{tool}</span>
                        <span className="tech-separator">•</span>
                    </div>
                ))}
            </div>
            <div className="tech-strip-overlay"></div>
        </div>
    );
}
