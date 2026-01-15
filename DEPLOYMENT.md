# Mobile Deployment Guide

## Prerequisites

- **Node.js** & **npm**
- **Android Studio** (for Android)
- **Xcode** (for iOS - Mac only)
- **CocoaPods** (for iOS dependencies)

## 1. Asset Generation (Splah Screen & Icon)

If you have updated the logo or splash screen in `resources/`, you must regenerate the native assets:

```bash
npm run resources
# This runs: capacitor-assets generate
```

This ensures both Android Studio and Xcode usage the correct icons and splash screens.

## 2. Syncing Projects

Whenever you make changes to the web code (`src/` folder), you must build and sync:

```bash
npm run build
npx cap sync
```

This copies the build assets to the native `android/` and `ios/` folders.

---

## 3. Android Deployment (Windows/Mac/Linux)

### Open in Android Studio
```bash
npx cap open android
```

### Manual Build & Run
1.  Open **Android Studio**.
2.  Wait for Gradle Sync to finish.
3.  Select your device/emulator locally.
4.  Click the **Run (Play)** button.

### Debugging
- Use **Logcat** in Android Studio to see logs.
- Filter by `WebConsole` to see browser console logs.

---

## 4. iOS Deployment (Mac Only)

### Open in Xcode
```bash
npx cap open ios
```

### Manual Build & Run
1.  Open the workspace file (not project file) if using CocoaPods, usually via the command above.
2.  Select your **Signing Team** in the Project Settings > Signing & Capabilities.
3.  Select a Simulator (e.g., iPhone 15) or connected Device.
4.  Press **Cmd + R** or click the **Play** button.

### Common iOS Issues
- **Pod Install Failed**: Run `cd ios && pod install && cd ..` manually.
- **Signing Error**: You need an Apple Developer Account (free or paid) configured in Xcode.

---

## Troubleshooting

### Splash Screen Not Showing (Native)
Check `capacitor.config.ts`:
```typescript
plugins: {
  SplashScreen: {
    launchShowDuration: 2000,
    backgroundColor: '#ffffff', // Ensure this matches your theming
    showSpinner: false,
    androidScaleType: 'CENTER_CROP',
    splashFullScreen: true,
    splashImmersive: true
  }
}
```

### Splash Screen Logic (Web)
The app has a secondary splash screen in `App.tsx` that ensures the app is ready before showing the content.
- **First Launch**: Logo -> Onboarding -> Home
- **Normal Launch**: Logo -> Home
