import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import MapScreen from './src/screens/MapScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const linking = {
  prefixes: ['socialapp://'],
  config: {
    screens: {
      Home: 'home',
      Camera: 'camera',
      Map: 'map',
      Profile: 'post/:id',
    },
  },
};

function iconName(routeName, focused) {
  const icons = {
    Home: focused ? 'home' : 'home-outline',
    Camera: focused ? 'camera' : 'camera-outline',
    Map: focused ? 'map' : 'map-outline',
    Profile: focused ? 'person' : 'person-outline',
  };
  return icons[routeName];
}

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fffaf7',
            borderBottomColor: '#eadfd7',
          },
          headerTitleStyle: {
            color: '#26201d',
            fontWeight: '800',
          },
          tabBarStyle: {
            backgroundColor: '#fffaf7',
            borderTopColor: '#eadfd7',
            height: 84,
            paddingBottom: 14,
            paddingTop: 8,
          },
          tabBarItemStyle: {
            borderRadius: 8,
            marginHorizontal: 4,
            marginVertical: 4,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '800',
          },
          tabBarActiveTintColor: '#d84f3a',
          tabBarInactiveTintColor: '#4f4641',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={iconName(route.name, focused)} size={focused ? size + 3 : size + 1} color={color} />
          ),
        })}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'SocialApp', tabBarLabel: 'Home' }} />
        <Tab.Screen name="Camera" component={CameraScreen} options={{ title: 'Camera' }} />
        <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Nearby' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Create Post' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
