---
description: Workflow untuk setup dan monitoring build iOS via GitHub Actions
---

# iOS Build Pipeline (Windows -> GitHub Actions)

Workflow ini menjelaskan cara melakukan setup CI/CD agar **Windows laptop** Anda cukup melakukan coding & push, lalu **GitHub Actions** akan menangani build iOS (yang membutuhkan macOS).

## Prasyarat

1. Project sudah memiliki `ios` folder yang valid (Capacitor project).
2. Memiliki akun GitHub dan Repository.

## Langkah-Langkah

### 1. Setup GitHub Actions (Otomatis)

Workflow file `.github/workflows/ios-build.yml` akan otomatis dibuatkan. File ini berisi instruksi untuk server GitHub:

- Menggunakan mesin visual `macos-latest`.
- Install Node.js & Dependencies.
- Build Web Assets (`npm run build`).
- Sync Capacitor (`npx cap sync ios`).
- Build Xcode Project (opsional: memerlukan sertifikat untuk signed build).

### 2. Push Code

Setiap kali Anda selesai coding di Windows:
// turbo-all

```powershell
git add .
git commit -m "update fitur X"
git push origin main
```

### 3. Monitoring Build

1. Buka halaman Repository di GitHub.
2. Klik tab **Actions**.
3. Pilih workflow **Build iOS**.
4. Lihat proses build berjalan real-time.

## Catatan Penting

- **Signing**: Workflow dasar ini akan mengecek apakah code "bisa di-build" (compile success). Untuk menghasilkan `.ipa` yang bisa diinstall di HP, Anda perlu setup **Apple Certificate & Provisioning Profile** di GitHub Secrets.
- **Podfile**: Pastikan file `ios/App/Podfile` sudah ada agar workspace ter-generate dengan benar.
