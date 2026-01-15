import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import React, { useEffect } from 'react';
import './Home.css';

const Home: React.FC = () => {
  useEffect(() => {
    // Give a small delay for the spinner to be seen, then redirect
    const timer = setTimeout(() => {
      window.location.href = 'https://bacadnas.com';
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen className="redirect-container">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          background: '#ffffff'
        }}>
          <div className="logo-circle" style={{ marginBottom: '20px' }}>
            <img src="/BADAN-CADANGAN-NASIONAL.png" alt="Logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
          </div>
          <IonSpinner name="crescent" color="danger" style={{ transform: 'scale(1.5)', marginBottom: '20px' }} />
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            fontFamily: 'Inter, sans-serif'
          }}>
            Menghubungkan ke Sistem...
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '14px',
            marginTop: '8px'
          }}>
            Mohon tunggu sebentar
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
