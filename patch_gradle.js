const fs = require('fs');
const path = 'android/capacitor-cordova-android-plugins/build.gradle';

try {
    let content = fs.readFileSync(path, 'utf8');
    // Regex to remove the repositories block containing flatDir
    // Looks for repositories { flatDir { ... } }
    // This is a simple heuristic replace
    const newContent = content.replace(/repositories\s*\{\s*flatDir\s*\{[^}]+\}\s*\}/g, '// repositories { flatDir { ... } } removed to fix warning');

    if (content !== newContent) {
        fs.writeFileSync(path, newContent);
        console.log('Successfully patched flatDir warning.');
    } else {
        console.log('flatDir not found or already patched.');
    }
} catch (e) {
    console.error('Error patching file:', e);
}
