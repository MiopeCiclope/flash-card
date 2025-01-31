import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/components/useColorScheme';
import AddDeck from '@/components/AddDeck';
import EditDeck from '@/components/EditDeck';
import Providers from '@/components/Providers';
import { useSelector } from 'react-redux';
import { Deck } from '@/models/decks';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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

  return (<Providers>
    <RootLayoutNav />
  </Providers>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const selectedDeck = useSelector((state: any) => state?.deckReducer.selectedDeck) as Deck | null;
  const deckScreenTitle = !selectedDeck ? "Deck" : selectedDeck.name
  const deckDetailTitle = !selectedDeck ? "New Deck" : selectedDeck.name

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{
          headerTitle: 'List',
          headerRight: () => (<AddDeck />),
        }} />
        <Stack.Screen name="(tabs)" options={{
          headerTitle: deckScreenTitle, headerShown: true,
          headerRight: () => (<EditDeck />),
        }} />
        <Stack.Screen name="deck-detail" options={{ headerShown: true, headerTitle: deckDetailTitle }} />
        <Stack.Screen name="export-data" options={{ headerShown: true, headerTitle: "Export" }} />
      </Stack>
    </ThemeProvider>
  );
}
