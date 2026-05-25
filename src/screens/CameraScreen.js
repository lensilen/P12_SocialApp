import { useRef, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { Ionicons } from '@expo/vector-icons';

import { saveToAlbum } from '../utils/mediaLibrary';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [flash, setFlash] = useState('off');
  const [photo, setPhoto] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const cameraRef = useRef(null);

  const cropToSquare = (picture) => {
    const ratio = 1;
    const currentRatio = picture.width / picture.height;

    if (currentRatio > ratio) {
      const width = picture.height * ratio;
      return {
        originX: (picture.width - width) / 2,
        originY: 0,
        width,
        height: picture.height,
      };
    }

    const height = picture.width / ratio;
    return {
      originX: 0,
      originY: (picture.height - height) / 2,
      width: picture.width,
      height,
    };
  };

  const takePicture = async () => {
    if (!cameraRef.current || countdown) return;

    let value = 3;
    setCountdown(value);

    const timer = setInterval(async () => {
      value -= 1;

      if (value > 0) {
        setCountdown(value);
        return;
      }

      clearInterval(timer);
      setCountdown(null);

      try {
        const picture = await cameraRef.current.takePictureAsync({ quality: 0.8 });
        const cropped = await ImageManipulator.manipulateAsync(
          picture.uri,
          [{ crop: cropToSquare(picture) }, { resize: { width: 800 } }],
          { compress: 0.75, format: ImageManipulator.SaveFormat.JPEG }
        );
        setPhoto(cropped.uri);
      } catch (err) {
        Alert.alert('Kamera', err.message);
      }
    }, 1000);
  };

  const savePhoto = async () => {
    if (!photo) return;
    const saved = await saveToAlbum(photo);
    Alert.alert(saved ? 'Saved' : 'Failed', saved ? 'Foto tersimpan ke album SocialApp.' : 'Izin galeri ditolak.');
  };

  if (!permission) {
    return <View style={styles.center}><Text>Memeriksa izin kamera...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>Akses kamera diperlukan untuk mengambil foto.</Text>
        <Pressable style={styles.primaryButton} onPress={requestPermission}>
          <Text style={styles.primaryText}>Izinkan Kamera</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrap}>
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing={facing}
          flash={flash}
          ratio="16:9"
        />
        {countdown && <Text style={styles.countdown}>{countdown}</Text>}
        <View style={styles.controls}>
          <IconButton
            icon="camera-reverse-outline"
            onPress={() => setFacing((value) => (value === 'back' ? 'front' : 'back'))}
          />
          <IconButton
            icon={flash === 'off' ? 'flash-off-outline' : 'flash-outline'}
            onPress={() => setFlash((value) => (value === 'off' ? 'on' : 'off'))}
          />
          <IconButton icon="radio-button-on-outline" onPress={takePicture} />
        </View>
      </View>

      {photo && (
        <View style={styles.previewBox}>
          <Image source={{ uri: photo }} style={styles.preview} />
          <View style={styles.previewCopy}>
            <Text style={styles.previewTitle}>Photo Preview</Text>
            <Text style={styles.previewMeta}>Square crop, resized to 800px.</Text>
            <Pressable style={styles.saveButton} onPress={savePhoto}>
              <Ionicons name="download-outline" size={17} color="#fff" />
              <Text style={styles.saveText}>Save to Gallery</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

function IconButton({ icon, onPress }) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <Ionicons name={icon} size={26} color="#fff" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffaf7',
    flex: 1,
  },
  cameraWrap: {
    backgroundColor: '#111',
    flex: 1,
    overflow: 'hidden',
  },
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  permissionText: {
    marginBottom: 12,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#d84f3a',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  primaryText: {
    color: '#fff',
    fontWeight: '700',
  },
  controls: {
    bottom: 24,
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(38,32,29,0.72)',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  countdown: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 72,
    fontWeight: '800',
    marginTop: 140,
  },
  previewBox: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: '#eadfd7',
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    paddingBottom: 18,
  },
  previewTitle: {
    color: '#26201d',
    fontWeight: '700',
  },
  previewCopy: {
    flex: 1,
  },
  previewMeta: {
    color: '#7c706a',
    fontSize: 12,
    marginTop: 3,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#16856f',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  saveText: {
    color: '#fff',
    fontWeight: '800',
  },
  preview: {
    aspectRatio: 1,
    backgroundColor: '#eee7df',
    borderRadius: 8,
    height: 104,
  },
});
