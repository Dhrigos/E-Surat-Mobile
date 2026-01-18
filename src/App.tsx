import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Onboarding from './components/Onboarding';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';

import { useEffect } from 'react';
import { Camera } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Filesystem } from '@capacitor/filesystem';

setupIonicReact();

import { PrivacyScreen } from '@capacitor-community/privacy-screen';

const App: React.FC = () => {
  // Check if user has seen onboarding
  const [showOnboarding, setShowOnboarding] = useState(!localStorage.getItem('hasSeenOnboarding'));
  const [showSplash, setShowSplash] = useState(true);



  useEffect(() => {
    const enablePrivacy = async () => {
      try {
        await PrivacyScreen.enable();
      } catch (e) {
        console.error('Failed to enable privacy screen:', e);
      }
    };
    enablePrivacy();

    // Permissions are now requested in Onboarding for new users
    // For existing users, permissions should already be granted or will be requested on demand
  }, []);

  return (
    <IonApp>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : showOnboarding ? (
        <Onboarding onFinish={() => setShowOnboarding(false)} />
      ) : (
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      )}
    </IonApp>
  );
};

export default App;
