import FontAwesome from '@expo/vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '@tamagui/core/reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router';
import { useEffect } from 'react';
import '../global.css';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import { TamaguiProvider } from 'tamagui';

import config from '../tamagui.config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
      gcTime: 100000000,
    },
  },
});

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

      const lastLoginStr = await AsyncStorage.getItem('lastLogin');
      if (!lastLoginStr)
        return await AsyncStorage.setItem(
          'lastLogin',
          new Date().toISOString()
        );
      const lastLogin = new Date(lastLoginStr);
      const daysSinceLastLogin = Math.floor(
        (new Date().getTime() - lastLogin.getTime()) / (1000 * 3600 * 24)
      );

      if (daysSinceLastLogin > 2) {
        const currentHealth = await AsyncStorage.getItem('health');
        await AsyncStorage.setItem(
          'health',
          (parseInt(currentHealth ?? '50') - daysSinceLastLogin * 3).toString()
        );
      }

      await AsyncStorage.setItem('lastLogin', new Date().toISOString());
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
          <Toast />
        </Stack>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
