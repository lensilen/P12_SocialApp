import * as FileSystem from 'expo-file-system/legacy';

const DATA_URI = FileSystem.documentDirectory + 'socialapp-data.json';

export async function saveData(data) {
  await FileSystem.writeAsStringAsync(DATA_URI, JSON.stringify(data, null, 2), {
    encoding: FileSystem.EncodingType.UTF8,
  });
  return DATA_URI;
}

export async function loadData() {
  const info = await FileSystem.getInfoAsync(DATA_URI);
  if (!info.exists) return null;

  const text = await FileSystem.readAsStringAsync(DATA_URI);
  return JSON.parse(text);
}

export async function downloadAndCache(url) {
  const cleanName = url.split('/').pop()?.split('?')[0] || `post-${Date.now()}.jpg`;
  const fileName = cleanName.includes('.') ? cleanName : `${cleanName}.jpg`;
  const target = FileSystem.cacheDirectory + fileName;
  const info = await FileSystem.getInfoAsync(target);

  if (info.exists) return target;

  const result = await FileSystem.downloadAsync(url, target);
  return result.uri;
}

export async function deleteData() {
  await FileSystem.deleteAsync(DATA_URI, { idempotent: true });
}
