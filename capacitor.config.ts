import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.bacadnas.app',
  appName: 'E-Surat | Bacadnas',
  webDir: 'dist',
  appendUserAgent: ' e-surat',
  server: {
    // url: 'https://bacadnas.com', // Commented out to load local app first
    cleartext: true,
    androidScheme: 'https',
    allowNavigation: [
      'bacadnas.com',
      '*.bacadnas.com'
    ],
    // Add custom header to identify app requests
    headers: {
      'X-Capacitor-App': 'true'
    }
  },
  plugins: {
    Camera: {
      presentationStyle: 'fullscreen'
    },
    Geolocation: {
      requestPermissions: true
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
