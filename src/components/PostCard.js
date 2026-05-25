import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { downloadAndCache } from '../utils/fileSystem';
import { saveToAlbum } from '../utils/mediaLibrary';
import { openDeepLink, shareFile } from '../utils/sharing';

export default function PostCard({ post }) {
  const getLocalUri = async () => {
    if (post.image.startsWith('http')) {
      return downloadAndCache(post.image);
    }
    return post.image;
  };

  const handleSave = async () => {
    try {
      const uri = await getLocalUri();
      const saved = await saveToAlbum(uri);
      Alert.alert(saved ? 'Berhasil' : 'Gagal', saved ? 'Foto tersimpan di album SocialApp.' : 'Izin galeri ditolak.');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const handleShare = async () => {
    try {
      const uri = await getLocalUri();
      await shareFile(uri);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{post.user[0]}</Text>
        </View>
        <View>
          <Text style={styles.user}>{post.user}</Text>
          <Text style={styles.meta}>{post.place}</Text>
        </View>
        <Ionicons name="ellipsis-horizontal" size={20} color="#7c706a" style={styles.more} />
      </View>

      <Image source={{ uri: post.image }} style={styles.image} />
      <Text style={styles.caption}>
        <Text style={styles.captionUser}>{post.user} </Text>
        {post.caption}
      </Text>

      <View style={styles.actions}>
        <IconButton icon="download-outline" label="Save" onPress={handleSave} />
        <IconButton icon="share-social-outline" label="Share" onPress={handleShare} />
        <IconButton icon="link-outline" label="Link" onPress={() => openDeepLink(post.id)} />
      </View>
    </View>
  );
}

function IconButton({ icon, label, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Ionicons name={icon} size={18} color="#1f2937" />
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eadfd7',
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    padding: 12,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#ffd8cf',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  avatarText: {
    color: '#8c2e22',
    fontWeight: '700',
  },
  user: {
    color: '#26201d',
    fontWeight: '700',
  },
  meta: {
    color: '#7c706a',
    fontSize: 12,
  },
  more: {
    marginLeft: 'auto',
  },
  image: {
    aspectRatio: 1,
    backgroundColor: '#eee7df',
    width: '100%',
  },
  caption: {
    color: '#26201d',
    lineHeight: 20,
    padding: 12,
  },
  captionUser: {
    fontWeight: '700',
  },
  actions: {
    borderTopColor: '#f0e7e1',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  buttonText: {
    color: '#554943',
    fontSize: 12,
    fontWeight: '600',
  },
});
