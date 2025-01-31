import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/components/useColorScheme';
import AddDeck from '@/components/AddDeck';
import EditDeck from '@/components/EditDeck';
import Providers from '@/components/Providers';
import { useSelector } from 'react-redux';
import { Deck } from '@/models/decks';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            headerTitle: 'Deck List',
            title: 'Deck List',
            headerRight: () => <AddDeck />,
          }}
        />
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerTitle: deckScreenTitle,
            headerRight: () => <EditDeck />,
            drawerItemStyle: { display: 'none' }
          }}
        />
        <Drawer.Screen
          name="deck-detail"
          options={{
            headerTitle: deckDetailTitle,
            drawerItemStyle: { display: 'none' }
          }}
        />
        <Drawer.Screen
          name="modal"
          options={{
            drawerItemStyle: { display: 'none' }
          }}
        />
        <Drawer.Screen
          name="import-data"
          options={{
            headerTitle: "Restore",
            title: "Restore",
          }}
        />
        <Drawer.Screen
          name="+not-found"
          options={{
            drawerItemStyle: { display: 'none' }
          }}
        />
        <Drawer.Screen
          name="export-data"
          options={{
            headerTitle: "Backup",
            title: "Backup",
          }} />
      </Drawer>
    </ThemeProvider>
  );
}
