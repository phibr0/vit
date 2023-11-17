import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-expect-error
import Slider from '@react-native-community/slider';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View } from 'react-native';
import { Button } from 'tamagui';
import { useLocalStorage } from './(tabs)';

const debounce = (fn: any, time: number) => {
  let timeout: any;
  return function (this: any, ...args: any[]) {
    const functionCall = () => fn.apply(this, args);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

export default function SettingsModal() {
  const { data, mutate } = useLocalStorage('account', null);

  return (
    <View className="px-8 pt-12 gap-4 bg-[#F5D1C1] h-full">
      <View>
        <Text>Gewicht: {data.weight?.toFixed(1)}</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={200}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={data.weight}
          onValueChange={debounce(
            (value: any) => mutate({ ...data, weight: value }),
            100
          )}
        />
      </View>

      <RadioButtonGroup
        containerStyle={{ marginBottom: 10 }}
        selected={data.gender}
        onSelected={(value: any) => mutate({ ...data, gender: value })}
        radioBackground="#D9622B"
      >
        <RadioButtonItem value="male" label="Männlich" />
        <RadioButtonItem value="female" label="Weiblich" />
        <RadioButtonItem value="other" label="Sonstiges" />
      </RadioButtonGroup>

      <Button
        onPress={async () => {
          await AsyncStorage.clear();
          router.replace('/accountCreator');
        }}
      >
        Logout
      </Button>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
