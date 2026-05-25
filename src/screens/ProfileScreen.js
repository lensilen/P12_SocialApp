import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

import { saveToAlbum } from '../utils/mediaLibrary';
import { shareFile } from '../utils/sharing';

const filters = [
  { id: 'normal', label: 'Clean', overlay: 'transparent' },
  { id: 'warm', label: 'Warm', overlay: 'rgba(216,79,58,0.15)' },
  { id: 'mint', label: 'Mint', overlay: 'rgba(22,133,111,0.14)' },
  { id: 'soft', label: 'Soft', overlay: 'rgba(111,91,216,0.12)' },
];

export default function ProfileScreen() {
  const [image, setImage] = useState(null);
  const [posted, setPosted] = useState(null);
  const [filter, setFilter] = useState(filters[0]);
  const [caption, setCaption] = useState('');

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Gallery', 'Izin galeri ditolak.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const selected = result.assets[0];
      const resized = await ImageManipulator.manipulateAsync(
        selected.uri,
        [{ resize: { width: 800 } }],
        { compress: 0.75, format: ImageManipulator.SaveFormat.JPEG }
      );

      setImage(resized.uri);
      setPosted(null);
    }
  }

  async function saveImage() {
    if (!image) return;
    const saved = await saveToAlbum(image);
    Alert.alert(saved ? 'Saved' : 'Failed', saved ? 'Foto tersimpan ke album SocialApp.' : 'Izin galeri ditolak.');
  }

  async function shareImage() {
    if (!image) return;
    await shareFile(image);
    if (caption.trim()) {
      Alert.alert('Caption', caption.trim());
    }
  }

  function postImage() {
    if (!image) {
      Alert.alert('Create Post', 'Pilih gambar dulu.');
      return;
    }

    setPosted({
      image,
      filter: filter.label,
      caption: caption.trim() || 'No caption',
      time: new Date().toLocaleString(),
    });
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileInitial}>L</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Leon S. Kennedy</Text>
          <Text style={styles.handle}>@rookie.day</Text>
        </View>
        <Pressable style={styles.addButton} onPress={pickImage}>
          <Ionicons name="add" size={22} color="#fff" />
        </Pressable>
      </View>

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <Text style={styles.title}>New Post</Text>
          <Text style={styles.counter}>{posted ? '1 draft posted' : 'draft ready'}</Text>
        </View>

        {image ? (
          <>
            <View style={styles.previewWrap}>
              <Image source={{ uri: image }} style={styles.preview} />
              <View style={[styles.filterOverlay, { backgroundColor: filter.overlay }]} />
            </View>

            <View style={styles.filterRow}>
              {filters.map((item) => (
                <Pressable
                  key={item.id}
                  style={[styles.filterButton, filter.id === item.id && styles.activeFilter]}
                  onPress={() => setFilter(item)}>
                  <Text style={[styles.filterText, filter.id === item.id && styles.activeFilterText]}>{item.label}</Text>
                </Pressable>
              ))}
            </View>

            <TextInput
              style={styles.captionInput}
              value={caption}
              onChangeText={setCaption}
              placeholder="Write a caption..."
              placeholderTextColor="#9b8d86"
              multiline
            />

            <View style={styles.actionRow}>
              <ActionButton icon="cloud-upload-outline" label="Post" primary onPress={postImage} />
              <ActionButton icon="download-outline" label="Save" onPress={saveImage} />
              <ActionButton icon="share-social-outline" label="Share" onPress={shareImage} />
            </View>
          </>
        ) : (
          <Pressable style={styles.emptyPicker} onPress={pickImage}>
            <Ionicons name="images-outline" size={36} color="#d84f3a" />
            <Text style={styles.emptyTitle}>Choose a photo</Text>
            <Text style={styles.emptyText}>Square crop and compression are applied before posting.</Text>
          </Pressable>
        )}
      </View>

      {posted && (
        <View style={styles.panel}>
          <Text style={styles.title}>Published Preview</Text>
          <Image source={{ uri: posted.image }} style={styles.postImage} />
          <Text style={styles.captionText}>{posted.caption}</Text>
          <Text style={styles.meta}>Filter: {posted.filter}</Text>
          <Text style={styles.meta}>Posted: {posted.time}</Text>
        </View>
      )}
    </ScrollView>
  );
}

function ActionButton({ icon, label, primary, onPress }) {
  return (
    <Pressable style={[styles.actionButton, primary && styles.primaryAction]} onPress={onPress}>
      <Ionicons name={icon} size={18} color={primary ? '#fff' : '#554943'} />
      <Text style={[styles.actionText, primary && styles.primaryActionText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffaf7',
    flex: 1,
  },
  content: {
    padding: 14,
    paddingBottom: 120,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#26201d',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
    padding: 14,
  },
  profileAvatar: {
    alignItems: 'center',
    backgroundColor: '#d84f3a',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  profileInitial: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
  },
  handle: {
    color: '#d8c8bf',
    marginTop: 2,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#16856f',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  panel: {
    backgroundColor: '#fff',
    borderColor: '#eadfd7',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    padding: 12,
  },
  panelHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    color: '#26201d',
    fontSize: 18,
    fontWeight: '800',
  },
  counter: {
    color: '#7c706a',
    fontSize: 12,
  },
  emptyPicker: {
    alignItems: 'center',
    backgroundColor: '#fff6f0',
    borderColor: '#efd4c8',
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 1,
    padding: 28,
  },
  emptyTitle: {
    color: '#26201d',
    fontWeight: '800',
    marginTop: 8,
  },
  emptyText: {
    color: '#7c706a',
    lineHeight: 18,
    marginTop: 4,
    textAlign: 'center',
  },
  previewWrap: {
    aspectRatio: 1,
    backgroundColor: '#eee7df',
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
  },
  preview: {
    height: '100%',
    width: '100%',
  },
  filterOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  captionInput: {
    backgroundColor: '#fffaf7',
    borderColor: '#eadfd7',
    borderRadius: 8,
    borderWidth: 1,
    color: '#26201d',
    marginTop: 12,
    minHeight: 74,
    padding: 10,
    textAlignVertical: 'top',
  },
  filterButton: {
    borderColor: '#eadfd7',
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  activeFilter: {
    backgroundColor: '#d84f3a',
    borderColor: '#d84f3a',
  },
  filterText: {
    color: '#554943',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#fff',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#fff6f0',
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    padding: 11,
  },
  primaryAction: {
    backgroundColor: '#d84f3a',
  },
  actionText: {
    color: '#554943',
    fontSize: 13,
    fontWeight: '700',
  },
  primaryActionText: {
    color: '#fff',
  },
  postImage: {
    aspectRatio: 1,
    backgroundColor: '#eee7df',
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
  },
  meta: {
    color: '#554943',
    marginTop: 8,
  },
  captionText: {
    color: '#26201d',
    fontWeight: '700',
    lineHeight: 20,
    marginTop: 10,
  },
});
