import { useQuery } from '@tanstack/react-query';
import { Image, SafeAreaView, StyleSheet } from 'react-native';
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
        <Image
          width={1000}
          height={1000}
          source={{
            uri: data.meals[0].strMealThumb,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
