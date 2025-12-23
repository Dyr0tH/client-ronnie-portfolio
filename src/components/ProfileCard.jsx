import React from 'react'

export default function ProfileCard() {
    return (
        <div className="profile-card-container">
            <img
                src="/ronie.png"
                alt="Ronit - Head of Visuals"
                className="profile-card-img"
            />

            <div className="profile-card-overlay">
                <div className="profile-card-content">
                    <h2 className="profile-name">
                        Ronit
                    </h2>
                    <p className="profile-role">
                        Creative Tech Director
                    </p>
                    <p className="profile-quote">
                        "Attention is a currency. I don't just edit videos; I engineer psychological hooks that force the brain to keep watching."
                    </p>
                </div>
            </div>
        </div>
    )
}
