import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './Onboarding.css';
import { Camera } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Filesystem } from '@capacitor/filesystem';

interface OnboardingProps {
    onFinish: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [permissions, setPermissions] = useState({
        camera: false,
        location: false,
        storage: false
    });

    // Check permissions on load
    useEffect(() => {
        const loadPermissions = async () => {
            try {
                const cameraStatus = await Camera.checkPermissions();
                const geoStatus = await Geolocation.checkPermissions();
                const fsStatus = await Filesystem.checkPermissions();

                setPermissions({
                    camera: cameraStatus.camera === 'granted' || cameraStatus.photos === 'granted',
                    location: geoStatus.location === 'granted',
                    storage: fsStatus.publicStorage === 'granted'
                });
            } catch (e) {
                console.warn("Error checking permissions", e);
            }
        };
        loadPermissions();
    }, []);

    const requestPermission = async (type: 'camera' | 'location' | 'storage') => {
        try {
            let result;
            if (type === 'camera') {
                result = await Camera.requestPermissions();
                if (result.camera === 'granted' || result.photos === 'granted') {
                    setPermissions(prev => ({ ...prev, camera: true }));
                }
            } else if (type === 'location') {
                result = await Geolocation.requestPermissions();
                if (result.location === 'granted') {
                    setPermissions(prev => ({ ...prev, location: true }));
                }
            } else if (type === 'storage') {
                result = await Filesystem.requestPermissions();
                if (result.publicStorage === 'granted') {
                    setPermissions(prev => ({ ...prev, storage: true }));
                }
            }
        } catch (error) {
            console.error(`Error requesting ${type} permission:`, error);
        }
    };

    const handleNext = () => {
        swiperRef.current?.slideNext();
    };

    const handleFinish = () => {
        localStorage.setItem('hasSeenOnboarding', 'true');
        onFinish();
    };

    return (
        <div className="onboarding-container">
            <Swiper
                modules={[Pagination, EffectFade]}
                effect="fade"
                pagination={{ clickable: false, el: '.swiper-pagination' }}
                allowTouchMove={false} // Disable swipe, enforce button navigation
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="onboarding-swiper"
            >
                {/* Slide 1: Welcome */}
                <SwiperSlide>
                    <div className="onboarding-slide fade-in">
                        <div className="logo-circle">
                            <img src="/BADAN-CADANGAN-NASIONAL.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <h1 className="wizard-title">Selamat Datang</h1>
                        <p className="wizard-subtitle">E-Surat Badan Cadangan Nasional</p>

                        <div className="spacer"></div>

                        <div className="feature-list">
                            <div className="feature-item">
                                <span className="feature-icon">📝</span>
                                <div className="feature-text">
                                    <h3>Manajemen Surat</h3>
                                    <p>Kelola surat masuk dan keluar dengan mudah.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🔒</span>
                                <div className="feature-text">
                                    <h3>Aman & Terpercaya</h3>
                                    <p>Sistem keamanan terintegrasi tingkat nasional.</p>
                                </div>
                            </div>
                        </div>

                        <div className="spacer"></div>

                        <button className="wizard-button primary" onClick={handleNext}>
                            Mulai Pengaturan <span className="arrow">→</span>
                        </button>
                    </div>
                </SwiperSlide>

                {/* Slide 2: Permissions */}
                <SwiperSlide>
                    <div className="onboarding-slide">
                        <h2 className="wizard-title secondary">Izin Akses</h2>
                        <p className="wizard-subtitle">Aplikasi memerlukan izin berikut untuk berfungsi optimal.</p>

                        <div className="permission-list">
                            <div className="permission-item" onClick={() => requestPermission('camera')}>
                                <div className={`status-dot ${permissions.camera ? 'active' : ''}`}></div>
                                <div className="perm-icon">📸</div>
                                <div className="perm-content">
                                    <h3>Kamera</h3>
                                    <p>Untuk memindai dokumen fisik.</p>
                                </div>
                                <button className={`perm-btn ${permissions.camera ? 'granted' : ''}`}>
                                    {permissions.camera ? 'Diizinkan' : 'Izinkan'}
                                </button>
                            </div>

                            <div className="permission-item" onClick={() => requestPermission('location')}>
                                <div className={`status-dot ${permissions.location ? 'active' : ''}`}></div>
                                <div className="perm-icon">📍</div>
                                <div className="perm-content">
                                    <h3>Lokasi</h3>
                                    <p>Verifikasi lokasi penandatangan.</p>
                                </div>
                                <button className={`perm-btn ${permissions.location ? 'granted' : ''}`}>
                                    {permissions.location ? 'Diizinkan' : 'Izinkan'}
                                </button>
                            </div>

                            <div className="permission-item" onClick={() => requestPermission('storage')}>
                                <div className={`status-dot ${permissions.storage ? 'active' : ''}`}></div>
                                <div className="perm-icon">📂</div>
                                <div className="perm-content">
                                    <h3>Penyimpanan</h3>
                                    <p>Menyimpan dokumen offline.</p>
                                </div>
                                <button className={`perm-btn ${permissions.storage ? 'granted' : ''}`}>
                                    {permissions.storage ? 'Diizinkan' : 'Izinkan'}
                                </button>
                            </div>
                        </div>

                        <div className="spacer"></div>

                        <button className="wizard-button primary" onClick={handleNext}>
                            Lanjut <span className="arrow">→</span>
                        </button>
                    </div>
                </SwiperSlide>

                {/* Slide 3: Finish */}
                <SwiperSlide>
                    <div className="onboarding-slide">
                        <div className="success-encircle">
                            <img src="/KEMENTERIAN-PERTAHANAN.png"
                                className="success-logo" alt="Kemhan" />
                        </div>

                        <h2 className="wizard-title">Siap Digunakan</h2>
                        <p className="wizard-subtitle">
                            Anda telah menyelesaikan pengaturan awal.<br />
                            Selamat bertugas.
                        </p>

                        <div className="spacer"></div>

                        <div className="user-id-card">
                            <div className="id-header">BADAN CADANGAN NASIONAL</div>
                            <div className="id-body">
                                <span>STATUS SISTEM</span>
                                <strong>ONLINE</strong>
                            </div>
                        </div>

                        <div className="spacer"></div>

                        <button className="wizard-button success pulse" onClick={handleFinish}>
                            MASUK DASHBOARD
                        </button>
                    </div>
                </SwiperSlide>
            </Swiper>

            <div className="swiper-pagination"></div>
        </div>
    );
};

export default Onboarding;
