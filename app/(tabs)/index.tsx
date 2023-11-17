import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Svg from 'react-native-svg';
import { Image, Text } from 'tamagui';

const waterReduction = (weight: number) => {
  const max = weight * 35;
  const glasses = max / 250;
  return glasses;
};

const IMAGES = {
  female: {
    happy: require('../../assets/images/girl/girl-happy.png'),
    sad: require('../../assets/images/girl/girl-sad.png'),
    medium: require('../../assets/images/girl/girl-medium.png'),
  },
  male: {
    happy: require('../../assets/images/boy/boy-happy.png'),
    sad: require('../../assets/images/boy/boy-sad.png'),
    medium: require('../../assets/images/boy/boy-medium.png'),
  },
};

const getImage = (gender: 'female' | 'male' = 'female', health: number) => {
  if (!['female', 'male'].includes(gender)) {
    gender = 'female';
  }
  if (health > 80) {
    return IMAGES[gender].happy;
  } else if (health > 50) {
    return IMAGES[gender].medium;
  } else return IMAGES[gender].sad;
};

export default function TabOneScreen() {
  const { data } = useLocalStorage('account', null);
  const { data: level } = useLocalStorage('exp', 0);
  const { data: health } = useLocalStorage('health', 100);
  const gender = data?.gender === 'male' ? 'boy' : 'girl';

  return (
    <ImageBackground
      className="min-h-full"
      source={require('./healthscore.png')}
    >
      <SafeAreaView>
        <View className="flex flex-col h-full w-full justify-center items-center pt-2">
          <View className="px-4 flex justify-between flex-row w-full items-center">
            <Link href="/profile">
              <AntDesign name="user" size={24} color="black" />
            </Link>
            <View className="border-4 border-[#6EADB6] rounded-full w-20 flex items-center justify-center h-20">
              <Text fontSize="$10" fontWeight="$8" mb={'$1.5'}>
                {(Math.sqrt(level + 10) - 3).toFixed(0)}
              </Text>
            </View>
            <Link href="/settings">
              <AntDesign name="setting" size={24} color="blck" />
            </Link>
          </View>
          <View className="h-32" />
          <Image
            width={250}
            height={400}
            resizeMode="contain"
            className="mx-12"
            source={getImage(data.gender, health)}
          />
          <View className="flex flex-row w-full px-8 justify-between">
            <View className="flex items-center mt-[-24px] justify-center">
              <AntDesign name="heart" size={96} color="pink" />
              <Text fontWeight="bold" mt={-62}>
                {Math.min(Math.max(health, 0), 100)} %
              </Text>
            </View>

            <WaterLevel />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const WaterLevel = () => {
  const { data } = useQuery({
    queryKey: ['waterLevel'],
    queryFn: async () => {
      const current = await AsyncStorage.getItem('waterLevel');
      if (!current) {
        const tmp = {
          level: 100,
          date: new Date().toDateString(),
        };
        await AsyncStorage.setItem('waterLevel', JSON.stringify(tmp));
        return tmp;
      } else {
        const data = JSON.parse(current);
        if (data.date !== new Date().toDateString()) {
          const tmp = {
            level: 100,
            date: new Date().toDateString(),
          };
          await AsyncStorage.setItem('waterLevel', JSON.stringify(tmp));
          return tmp;
        } else return data;
      }
    },
  });
  const { data: account } = useLocalStorage('account', null);
  const [didIncreaseXP, setDidIncreaseXP] = useState(false);
  const client = useQueryClient();
  const { mutate: setHealth, data: health } = useLocalStorage('health', 100);
  const { mutate: setXP, data: xp } = useLocalStorage('exp', 0);
  const { mutate } = useMutation({
    mutationFn: async () => {
      const tmp = JSON.parse((await AsyncStorage.getItem('waterLevel'))!);
      const waterHeight =
        tmp.level - tmp.level / waterReduction(account?.weight ?? 88);
      if (waterHeight < 41) {
        if (!didIncreaseXP) {
          setDidIncreaseXP(true);
          setXP(xp + 10);
          setHealth(health + 1);
        }
        return;
      }
      AsyncStorage.setItem(
        'waterLevel',
        JSON.stringify({
          ...tmp,
          level: waterHeight,
        })
      );
      await client.invalidateQueries({ exact: true, queryKey: ['waterLevel'] });
    },
  });

  if (!data) {
    return <View />;
  }

  const currentWaterLevel = data?.level;

  return (
    <View>
      <TouchableOpacity
        onPress={() => mutate()}
        onLongPress={async () => {
          setDidIncreaseXP(false);
          await AsyncStorage.setItem(
            'waterLevel',
            JSON.stringify({
              level: 100,
              date: new Date().toDateString(),
            })
          );
          await client.invalidateQueries({
            exact: true,
            queryKey: ['waterLevel'],
          });
        }}
      >
        <Svg.Svg viewBox="0 0 74.06 122.88" height={100} width={100}>
          <Svg.Path
            fill="#48c1ec"
            y={0 - (currentWaterLevel - 100) * 1.3}
            d="M4.4,45.8c19,16,42.17-4.62,63.74,1l-5.06,65.06c-.4,5.17-4.24,9.43-9.42,9.43H21.08c-5.18,0-8.86-4.28-9.42-9.43L4.4,45.8Z"
          />
          <Svg.Path d="M0,14.11a1.47,1.47,0,0,1,0-.47A4.63,4.63,0,0,1,0,13c0-3.93,4.4-7.3,11.51-9.58C18.07,1.3,27.1,0,37,0S56,1.3,62.56,3.41c7.11,2.28,11.5,5.65,11.5,9.58a5.52,5.52,0,0,1-.32,1.84l-9,97.13a12.65,12.65,0,0,1-3.54,7.79h0a10.48,10.48,0,0,1-7.5,3.13H21.08a10.39,10.39,0,0,1-7.48-3.12A12.79,12.79,0,0,1,10,112L0,14.11ZM3.81,19l9.48,92.69a9.53,9.53,0,0,0,2.63,5.79,7.2,7.2,0,0,0,5.16,2.15H53.66a7.28,7.28,0,0,0,5.19-2.16,9.42,9.42,0,0,0,2.6-5.76l8.6-92.57a28.61,28.61,0,0,1-7.49,3.48C56,24.69,47,26,37,26s-19-1.3-25.52-3.41A28.08,28.08,0,0,1,3.81,19Zm66.7-4.86.07-.65a1.54,1.54,0,0,1,.19-.64c-.18-2.27-3.67-4.5-9.22-6.28C55.31,4.53,46.64,3.29,37,3.29S18.75,4.53,12.51,6.53C6.81,8.36,3.29,10.66,3.29,13s3.52,4.64,9.22,6.47c6.24,2,14.91,3.24,24.52,3.24s18.28-1.24,24.52-3.24c4.8-1.54,8-3.41,9-5.36Z" />
        </Svg.Svg>
      </TouchableOpacity>
    </View>
  );
};

export const useLocalStorage = (
  key: string = 'undefined',
  initialValue: any
) => {
  const client = useQueryClient();
  const { data, isSuccess } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const current = await AsyncStorage.getItem(key);
      if (!current) {
        await AsyncStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
      return JSON.parse(current);
    },
  });
  const { mutate } = useMutation({
    mutationFn: async (value: any) => {
      client.setQueryData([key], value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
      await client.invalidateQueries({ exact: true, queryKey: [key] });
      return value;
    },
  });

  return { data, mutate, isSuccess };
};
