import { Alert, Linking } from 'react-native';
import * as Sharing from 'expo-sharing';

export async function shareFile(uri) {
  const available = await Sharing.isAvailableAsync();
  if (!available) {
    Alert.alert('Info', 'Sharing tidak tersedia di perangkat ini.');
    return;
  }

  await Sharing.shareAsync(uri, {
    mimeType: 'image/jpeg',
    dialogTitle: 'Bagikan post',
  });
}

export async function openDeepLink(id) {
  const url = `socialapp://post/${id}`;
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert('Deep Link', url);
  }
}
