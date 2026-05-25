import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Circle, Marker } from 'react-native-maps';

import { useLocation } from '../hooks/useLocation';

function nearbyUsers(loc) {
  if (!loc) return [];

  return [
    { id: 'u1', name: 'Jill Valentine', latitude: loc.latitude + 0.006, longitude: loc.longitude + 0.004 },
    { id: 'u2', name: 'Claire Redfield', latitude: loc.latitude - 0.008, longitude: loc.longitude + 0.003 },
    { id: 'u3', name: 'Chris Redfield', latitude: loc.latitude + 0.003, longitude: loc.longitude - 0.007 },
  ];
}

export default function MapScreen() {
  const { loc, error, loading, refreshLocation } = useLocation();
  const [sheetOpen, setSheetOpen] = useState(true);
  const center = loc || { latitude: -6.2, longitude: 106.8 };

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.reloadButton} onPress={refreshLocation}>
          <Ionicons name="refresh-outline" size={18} color="#fff" />
          <Text style={styles.reloadText}>Reload Map</Text>
        </Pressable>
      </View>
    );
  }

  const users = nearbyUsers(center);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        region={{
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}>
        <Marker
          coordinate={{ latitude: center.latitude, longitude: center.longitude }}
          title="Leon S. Kennedy"
          description={loc ? 'Current location' : 'Default location'}
        />

        <Circle
          center={{ latitude: center.latitude, longitude: center.longitude }}
          radius={5000}
          fillColor="rgba(216,79,58,0.13)"
          strokeColor="#d84f3a"
          strokeWidth={2}
        />

        {users.map((user) => (
          <Marker
            key={user.id}
            coordinate={{ latitude: user.latitude, longitude: user.longitude }}
            pinColor="#16856f"
            title={user.name}
            description="Nearby profile"
          />
        ))}
      </MapView>

      <View style={styles.sheet}>
        <Pressable style={styles.sheetHandleButton} onPress={() => setSheetOpen((value) => !value)}>
          <View style={styles.sheetHandle} />
        </Pressable>
        <View style={styles.sheetTitleRow}>
          <Pressable style={styles.titleButton} onPress={() => setSheetOpen((value) => !value)}>
            <Text style={styles.sheetTitle}>Nearby People</Text>
            <Ionicons name={sheetOpen ? 'chevron-down-outline' : 'chevron-up-outline'} size={18} color="#26201d" />
          </Pressable>
          <View style={styles.sheetActions}>
            <Text style={styles.sheetCount}>{loading ? 'loading' : `${users.length} online`}</Text>
            <Pressable style={styles.inlineReload} onPress={refreshLocation}>
              <Ionicons name="refresh-outline" size={16} color="#26201d" />
            </Pressable>
          </View>
        </View>
        {sheetOpen && (
          <View>
            {users.map((user) => (
              <View key={user.id} style={styles.userRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{user.name[0]}</Text>
                </View>
                <Text style={styles.userName}>{user.name}</Text>
                <Ionicons name="location-outline" size={17} color="#7c706a" />
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    color: '#26201d',
    marginBottom: 12,
    textAlign: 'center',
  },
  reloadButton: {
    alignItems: 'center',
    backgroundColor: '#d84f3a',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  reloadText: {
    color: '#fff',
    fontWeight: '800',
  },
  sheet: {
    backgroundColor: '#fffaf7',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1,
    borderColor: '#eadfd7',
    bottom: 10,
    left: 0,
    padding: 14,
    position: 'absolute',
    right: 0,
  },
  sheetHandleButton: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  sheetHandle: {
    alignSelf: 'center',
    backgroundColor: '#d8c8bf',
    borderRadius: 2,
    height: 4,
    width: 38,
  },
  sheetTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sheetTitle: {
    color: '#26201d',
    fontSize: 18,
    fontWeight: '800',
  },
  titleButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  sheetCount: {
    color: '#16856f',
    fontSize: 12,
    fontWeight: '700',
  },
  sheetActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  inlineReload: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#eadfd7',
    borderRadius: 16,
    borderWidth: 1,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 7,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#ffd8cf',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  avatarText: {
    color: '#8c2e22',
    fontWeight: '800',
  },
  userName: {
    color: '#26201d',
    flex: 1,
    fontWeight: '700',
  },
});
