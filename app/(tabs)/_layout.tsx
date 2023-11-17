import { AntDesign } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useLocalStorage } from '.';

export default function TabLayout() {
  const { data, isSuccess } = useLocalStorage('account', null);
  const router = useRouter();

  useEffect(() => {
    if (!data && isSuccess) {
      setImmediate(() => router.replace('/accountCreator'));
    }
  }, [data, router, isSuccess]);

  if (!data) return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Challenges',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="flag" size={focused ? 36 : 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="barchart" size={focused ? 36 : 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Healthscore',
          lazy: true,
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="hearto" size={focused ? 36 : 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="book" size={focused ? 36 : 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: 'Videos',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="videocamera"
              size={focused ? 36 : 24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
