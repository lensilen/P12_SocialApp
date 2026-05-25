import * as MediaLibrary from 'expo-media-library/legacy';

export async function saveToAlbum(uri) {
  const permission = await MediaLibrary.requestPermissionsAsync();
  if (permission.status !== 'granted') {
    return null;
  }

  const asset = await MediaLibrary.createAssetAsync(uri);
  const album = await MediaLibrary.getAlbumAsync('SocialApp');

  if (album) {
    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
  } else {
    await MediaLibrary.createAlbumAsync('SocialApp', asset, false);
  }

  return asset;
}
