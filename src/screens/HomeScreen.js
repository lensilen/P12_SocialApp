import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PostCard from '../components/PostCard';
import { loadData, saveData } from '../utils/fileSystem';
import { useSensor } from '../hooks/useSensor';

const feedPosts = [
  {
    id: '201',
    user: 'Ada Wong',
    place: 'Raccoon City',
    caption: 'Keeping things quiet, clean, and one step ahead.',
    likes: 74,
    image: 'https://picsum.photos/id/1062/900/900',
  },
  {
    id: '202',
    user: 'Claire Redfield',
    place: 'Police Station',
    caption: 'Another long night, another reason to keep moving.',
    likes: 91,
    image: 'https://picsum.photos/id/1011/900/900',
  },
];

export default function HomeScreen() {
  const { shaking } = useSensor();

  const handleSaveFeed = async () => {
    await saveData({
      savedAt: new Date().toISOString(),
      posts: feedPosts.map((post) => ({ id: post.id, caption: post.caption })),
    });
    Alert.alert('Saved', 'Feed tersimpan ke file lokal.');
  };

  const handleLoadFeed = async () => {
    const data = await loadData();
    Alert.alert('Archive', data ? `${data.posts.length} post tersimpan.` : 'Belum ada arsip lokal.');
  };

  const handleNotificationPlaceholder = () => {
    Alert.alert(
      'Notifications',
      'Fitur notifikasi disiapkan untuk build native/development build. Di Expo Go Android sengaja tidak dijalankan agar app tetap aman dibuka.'
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.statusTitle}>Feed</Text>
          <Text style={styles.status}>{shaking ? 'Refreshing...' : `${feedPosts.length} posts nearby`}</Text>
        </View>
        <Pressable style={styles.bellButton} onPress={handleNotificationPlaceholder}>
          <Ionicons name="notifications-outline" size={22} color="#26201d" />
        </Pressable>
      </View>

      <View style={styles.composer}>
        <View style={styles.composerAvatar}>
          <Text style={styles.composerInitial}>L</Text>
        </View>
        <View style={styles.composerText}>
          <Text style={styles.composerTitle}>Leon S. Kennedy</Text>
          <Text style={styles.composerHint}>Create your first post from the Create tab</Text>
        </View>
        <Pressable style={styles.iconPill} onPress={handleSaveFeed}>
          <Ionicons name="bookmark-outline" size={18} color="#d84f3a" />
        </Pressable>
        <Pressable style={styles.iconPill} onPress={handleLoadFeed}>
          <Ionicons name="folder-open-outline" size={18} color="#16856f" />
        </Pressable>
      </View>

      {feedPosts.length === 0 ? (
        <View style={styles.emptyFeed}>
          <View style={styles.emptyIcon}>
            <Ionicons name="images-outline" size={34} color="#d84f3a" />
          </View>
          <Text style={styles.emptyTitle}>No posts yet</Text>
          <Text style={styles.emptyText}>Add a post when you need content.</Text>
        </View>
      ) : (
        feedPosts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </ScrollView>
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
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusTitle: {
    color: '#26201d',
    fontSize: 22,
    fontWeight: '800',
  },
  status: {
    color: '#7c706a',
    fontSize: 13,
    marginTop: 2,
  },
  bellButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#eadfd7',
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  composer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#eadfd7',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
    padding: 12,
  },
  composerAvatar: {
    alignItems: 'center',
    backgroundColor: '#d84f3a',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  composerInitial: {
    color: '#fff',
    fontWeight: '800',
  },
  composerText: {
    flex: 1,
  },
  composerTitle: {
    color: '#26201d',
    fontWeight: '700',
  },
  composerHint: {
    color: '#7c706a',
    fontSize: 12,
    marginTop: 2,
  },
  iconPill: {
    alignItems: 'center',
    backgroundColor: '#fff6f0',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  emptyFeed: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#eadfd7',
    borderRadius: 8,
    borderWidth: 1,
    padding: 28,
  },
  emptyIcon: {
    alignItems: 'center',
    backgroundColor: '#fff6f0',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    marginBottom: 12,
    width: 60,
  },
  emptyTitle: {
    color: '#26201d',
    fontSize: 18,
    fontWeight: '800',
  },
  emptyText: {
    color: '#7c706a',
    lineHeight: 20,
    marginTop: 6,
    textAlign: 'center',
  },
});
