import { useQuery } from '@tanstack/react-query';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

export default function TabOneScreen() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['recipes', 'a'],
    queryFn: () =>
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a').then(
        (a) => a.json()
      ),
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <SafeAreaView>
      <View className="">
        <Text className="">Data</Text>
      </View>
    </SafeAreaView>
  );
}
