import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/components/useColorScheme';
import AddDeck from '@/components/AddDeck';
import EditDeck from '@/components/EditDeck';
import Providers from '@/components/Providers';
import { useSelector } from 'react-redux';
import { Deck } from '@/models/decks';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RouteProvider from '@/contexts/RouterProvider';
import CustomDrawerContent from '@/components/custom-drawer';
import { UserProvider } from '@/contexts/UserContext';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchToken, fetchUserData, login } from '@/utils/github';
import { UserData } from '@/models/git-user';
import { View } from '@/components/Themed';
import { ActivityIndicator } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Providers>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </Providers>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const selectedDeck = useSelector((state: any) => state?.deckReducer.selectedDeck) as Deck | null;
  const deckScreenTitle = !selectedDeck ? "Deck" : selectedDeck.name;
  const deckDetailTitle = !selectedDeck ? "New Deck" : selectedDeck.name;

  const [userData, setUserData] = useState<UserData | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const url = Linking.useURL();

  // Load the token from AsyncStorage on app load
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('github_access_token');
      if (token) {
        setAccessToken(token);
        const userData = await fetchUserData(token);
        setUserData(userData);
      }
      setLoading(false);
    };

    loadToken();
  }, []);

  // Handle GitHub OAuth callback
  useEffect(() => {
    if (url) {
      const params = new URLSearchParams(new URL(url).search);
      const urlCode = params.get('code');

      if (urlCode) {
        fetchUser(urlCode);
      }
    }
  }, [url]);

  const fetchUser = async (code: string) => {
    const accessToken = await fetchToken(code);

    if (accessToken) {
      setAccessToken(accessToken);
      await AsyncStorage.setItem('github_access_token', accessToken);
      const userData = await fetchUserData(accessToken);
      setUserData(userData);
    }
  };

  const handleLogout = async () => {
    // Clear the token and user data
    setAccessToken(null);
    setUserData(null);
    await AsyncStorage.removeItem('github_access_token');
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <UserProvider>
        <RouteProvider>
          <Drawer drawerContent={(props) => <CustomDrawerContent {...props}
            userData={userData}
            onLogin={() => login()}
            onLogout={handleLogout}
          />}>
            <Drawer.Screen
              name="index"
              options={{
                headerTitle: 'Deck List',
                title: 'Deck List',
                headerRight: () => <AddDeck />,
              }}
            />
            <Drawer.Screen
              name="card-display"
              options={{
                headerTitle: deckScreenTitle,
                headerRight: () => <EditDeck />,
                drawerItemStyle: { display: 'none' },
              }}
            />
            <Drawer.Screen
              name="deck-detail"
              options={{
                headerTitle: deckDetailTitle,
                drawerItemStyle: { display: 'none' },
              }}
            />
            <Drawer.Screen
              name="modal"
              options={{
                drawerItemStyle: { display: 'none' },
              }}
            />
            <Drawer.Screen
              name="import-data"
              options={{
                headerTitle: 'Restore',
                title: 'Restore',
              }}
            />
            <Drawer.Screen
              name="+not-found"
              options={{
                drawerItemStyle: { display: 'none' },
              }}
            />
            <Drawer.Screen
              name="export-data"
              options={{
                headerTitle: 'Backup',
                title: 'Backup',
              }}
            />
            <Drawer.Screen
              name="test"
              options={{
                drawerItemStyle: { display: 'none' },
              }}
            />
            <Drawer.Screen
              name="playground"
              options={{
                drawerItemStyle: { display: 'none' },
              }}
            />
          </Drawer>
        </RouteProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
