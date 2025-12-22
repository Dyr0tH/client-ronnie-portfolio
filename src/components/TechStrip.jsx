import React from 'react';

export default function TechStrip() {
    const tools = [
        { name: "BLENDER", logo: "/software-logos/cvbn bnm.png" },
        { name: "AFTER EFFECTS", logo: "/software-logos/vbnbnm.png" },
        { name: "PREMIERE PRO", logo: "/software-logos/premier epro.png" },
        { name: "UNREAL ENGINE", logo: "/software-logos/Unreal_Engine-Logo.wine.png" },
        { name: "CINEMA 4D", logo: "/software-logos/Cinema-4D-Logo.png" },
        { name: "DAVINCI RESOLVE", logo: "/software-logos/DaVinci_Resolve_Studio.png" },
        { name: "PHOTOSHOP", logo: "/software-logos/Adobe_Photoshop_CC_icon.svg.png" },
        { name: "ILLUSTRATOR", logo: "/software-logos/Adobe_Illustrator_CC_icon.svg.png" },
        { name: "CANVA", logo: "/software-logos/canva.png" },
        { name: "CAPCUT", logo: "/software-logos/capcut.png" }
    ];

    // Duplicate list to ensure seamless looping
    const marqueeContent = [...tools, ...tools, ...tools, ...tools];

    return (
        <div className="tech-strip-container">
            <div className="tech-strip-track">
                {marqueeContent.map((tool, index) => (
                    <div key={index} className="tech-item">
                        <img
                            src={tool.logo}
                            alt={tool.name}
                            style={{
                                height: '28px',
                                width: 'auto',
                                marginRight: '15px',
                                objectFit: 'contain',
                                filter: 'grayscale(1) brightness(1.5)',
                                transition: 'all 0.3s ease'
                            }}
                            className="tech-logo"
                        />
                        <span className="tech-name">{tool.name}</span>
                        <span className="tech-separator">•</span>
                    </div>
                ))}
            </div>
            <div className="tech-strip-overlay"></div>
        </div>
    );
}
