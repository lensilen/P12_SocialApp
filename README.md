# SocialApp

SocialApp adalah aplikasi praktikum React Native + Expo untuk materi Native Features & Device APIs. Tampilan dibuat seperti social app sederhana dengan tema karakter Resident Evil.

## Identitas Mahasiswa

Nama : Benita Aryani  
NIM : 2410501023  
Kelas : B

## Fitur

- Bottom tab navigation: Home, Camera, Nearby, Create Post.
- Feed Home dengan post dari Ada Wong dan Claire Redfield.
- Camera memakai `expo-camera`, countdown, crop square, resize 800px, dan tombol save ke galeri.
- Create Post bisa pilih foto dari galeri, resize 800px, pilih filter, tambah caption, post preview, save, dan share.
- Nearby memakai `expo-location` dan `react-native-maps` untuk posisi user dan marker dummy Jill Valentine, Claire Redfield, Chris Redfield.
- File System untuk simpan dan baca data feed JSON.
- Sensor accelerometer/gyroscope tetap tersedia di hook.
- Notification package tetap disiapkan, tetapi logic-nya placeholder agar aman dibuka di Android Expo Go.

## Menjalankan

```bash
npm install
npx expo start
```

Scan QR dengan Expo Go. Untuk kamera, lokasi, sensor, dan simpan galeri, test paling baik memakai HP nyata.

## Catatan Notifikasi

`expo-notifications` masih ada di dependency dan `app.json`, tetapi tidak dijalankan di Expo Go Android karena push notification remote tidak didukung di Expo Go. Jika ingin mengaktifkan fitur notifikasi asli, gunakan development/native build.

## Package Utama

- expo-camera
- expo-image-picker
- expo-image-manipulator
- expo-location
- react-native-maps
- expo-media-library
- expo-file-system
- expo-sharing
- expo-sensors
- expo-notifications
