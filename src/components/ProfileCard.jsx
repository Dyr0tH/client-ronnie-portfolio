import React from 'react'

export default function ProfileCard() {
    return (
        <div className="profile-card-container">
            <div className="profile-image-wrapper">
                <img
                    src="/ronie.png"
                    alt="Ronit - Head of Visuals"
                    className="profile-card-img"
                />
                <div className="profile-name-overlay">
                    <h2 className="profile-name">
                        Ronit
                    </h2>
                </div>
            </div>

            <div className="profile-card-info">
                <div className="profile-card-content">
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
