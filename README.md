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

## Preview
<img width="330" height="586" alt="WhatsApp Image 2026-05-25 at 21 13 41" src="https://github.com/user-attachments/assets/e65f163b-d45e-4bfe-9923-3857379569e3" />
<img width="330" height="586" alt="WhatsApp Image 2026-05-25 at 21 13 42" src="https://github.com/user-attachments/assets/68394bce-548d-4a0c-9910-1faec54efb6f" />
<img width="330" height="586" alt="WhatsApp Image 2026-05-25 at 21 13 42 (1)" src="https://github.com/user-attachments/assets/d699db82-3cce-41e9-b652-3fc138b6566e" />
<img width="330" height="586" alt="WhatsApp Image 2026-05-25 at 21 13 42 (2)" src="https://github.com/user-attachments/assets/a0c44aca-dc84-42d3-8435-785b02a782f1" />
<img width="330" height="586" alt="WhatsApp Image 2026-05-25 at 21 13 43" src="https://github.com/user-attachments/assets/b2264bd6-88e9-4a13-a029-c4f5694f3198" />
<img width="330" height="586" alt="WhatsApp Image 2026-05-25 at 21 13 43 (1)" src="https://github.com/user-attachments/assets/97fe47c1-a952-4aad-ad9c-135c974fe2ea" />

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
