import React from 'react'
import '../stylesheets/Herosection.css'

const Herosection = () => {
  return (
    <div className="hero-section">

      {/* Dark Overlay */}
      <div className="hero-overlay"></div>

      <div className="hero-content">

        {/* Badge */}
        <div className="hero-badge">
          The Ultimate Hotel Experience
        </div>

        {/* Title */}
        <div className="hero-title-container">
          <h1 className="hero-title">Discover Your Perfect</h1>
          <h1 className="hero-title">Gateway Destination</h1>
          <p className="hero-subtitle">
            Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Herosection
