import FontAwesome from '@expo/vector-icons/FontAwesome';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import '../global.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '@tamagui/core/reset.css';

import { TamaguiProvider } from 'tamagui';

import config from '../tamagui.config';

const queryClient = new QueryClient();

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

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

  useEffect(() => {
    const fn = async () => {
      const isSignedUp = await AsyncStorage.getItem('account');
      if (!isSignedUp) {
        router.replace('/accountCreator');
      }
    };
    if (loaded) fn();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <TamaguiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen name="profile" options={{ presentation: 'modal' }} />
          <Stack.Screen
            name="accountCreator"
            options={{ presentation: 'modal', title: 'Account erstellen' }}
          />
          <Stack.Screen
            name="settings"
            options={{ presentation: 'modal', title: 'Einstellungen' }}
          />
        </Stack>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
