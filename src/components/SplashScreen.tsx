import React, { useEffect, useState } from 'react';
import './SplashScreen.css'; // We will create this CSS file next

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  const handleAccess = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, 500); // Match transition duration
  };

  if (!isVisible) return null;

  return (
    <div className={`splash-container ${animateOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className="logos-container">
          <div className="logo-wrapper">
            <img
              src="/BADAN-CADANGAN-NASIONAL.png"
              alt="Badan Cadangan Nasional"
              className="logo"
            />
            <span className="logo-text">BADAN CADANGAN NASIONAL</span>
          </div>
          <div className="divider"></div>
          <div className="logo-wrapper">
            <img
              src="/KEMENTERIAN-PERTAHANAN.png"
              alt="Kementerian Pertahanan"
              className="logo"
            />
            <span className="logo-text">KEMENTERIAN PERTAHANAN</span>
          </div>
        </div>

        <div className="title-container">
          <div className="pill-badge">
            <span className="icon">🏛️</span> REPUBLIK INDONESIA
          </div>
          <h1 className="main-title">KEMENTERIAN<br />PERTAHANAN</h1>
          <h2 className="sub-title">REPUBLIK INDONESIA</h2>
          <div className="separator-line"></div>
          <p className="description">Portal Sistem Manajemen Dokumen</p>
        </div>

        <button className="access-button" onClick={handleAccess}>
          <span className="shield-icon">🛡️</span> AKSES RESMI
        </button>
      </div>

      {/* Background overlay for texture/gradient */}
      <div className="background-overlay"></div>
    </div>
  );
};

export default SplashScreen;
