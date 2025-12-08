import React from 'react'
import GlassSurface from './GlassSurface'

export default function ProfileCard() {
    return (
        <div className="profile-card-container" style={{
            position: 'relative',
            height: '600px',
            width: '100%',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
            <img
                src="/ronie.png"
                alt="Ronit - Head of Visuals"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.9)'
                }}
            />

            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div style={{
                    padding: '30px',
                    textAlign: 'left',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}>
                    <h2 style={{
                        margin: 0,
                        fontSize: '3rem',
                        fontWeight: 900,
                        color: '#fff',
                        textTransform: 'uppercase',
                        lineHeight: 0.9,
                        letterSpacing: '0.05em',
                        textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    }}>
                        Ronit
                    </h2>
                    <p style={{
                        margin: 0,
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#00fcff',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}>
                        Creative Tech Director
                    </p>
                    <p style={{
                        margin: '10px 0 0 0',
                        fontSize: '1rem',
                        color: 'rgba(255,255,255,0.9)',
                        lineHeight: 1.6,
                        fontWeight: 400,
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}>
                        "Attention is a currency. I don't just edit videos; I engineer psychological hooks that force the brain to keep watching."
                    </p>
                </div>
            </div>
        </div>
    )
}
