# Mobile App Asset Generation

This directory contains the source assets for generating app icons and splash screens.

## Files

- **icon.png** - Source image for app icons (1024x1024 recommended)
- **splash.png** - Source image for splash screens (2732x2732 recommended)

## Generating Assets

The app uses `@capacitor/assets` to automatically generate all required icon and splash screen sizes for Android and iOS.

### Generate All Assets

```bash
npm run resources
```

This will generate:
- **Android Icons**: `android/app/src/main/res/mipmap-*/ic_launcher.png`
- **Android Splash**: `android/app/src/main/res/drawable*/splash.png`
- **iOS Icons**: `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
- **iOS Splash**: `ios/App/App/Assets.xcassets/Splash.appiconset/`

### Manual Generation

If `npm run resources` is not configured, you can run:

```bash
npx @capacitor/assets generate --iconBackgroundColor '#ffffff' --iconBackgroundColorDark '#000000' --splashBackgroundColor '#ffffff' --splashBackgroundColorDark '#000000'
```

## Asset Requirements

### Icon (icon.png)
- **Size**: 1024x1024 pixels minimum
- **Format**: PNG with transparency
- **Content**: Should be centered, logo only (no text)
- **Safe Area**: Keep important content within 80% of the canvas

### Splash Screen (splash.png)
- **Size**: 2732x2732 pixels minimum
- **Format**: PNG with transparency
- **Content**: Logo centered
- **Safe Area**: Keep logo within center 50% of the canvas

## Current Assets

Both `icon.png` and `splash.png` are set to the **Badan Cadangan Nasional** logo from the Laravel project.

## Updating Assets

1. Replace `icon.png` and/or `splash.png` with new images
2. Run `npm run resources` to regenerate all sizes
3. Run `npx cap sync` to copy assets to native projects
4. Rebuild the app

## Notes

- Assets are automatically optimized for each platform
- Different sizes are generated for different screen densities
- Splash screens support both light and dark modes
