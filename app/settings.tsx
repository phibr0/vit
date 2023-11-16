import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';
import Slider from '@react-native-community/slider';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Platform, TextInput, View, Text } from 'react-native';
import { useLocalStorage } from './(tabs)';

export default function SettingsModal() {
  const { data, mutate } = useLocalStorage('account', null);

  return (
    <View className="px-8 mt-12 gap-4">
      <View>
        <Text>Gewicht: {data.weight.toFixed(1)}</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={200}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={data.weight}
          onValueChange={(value) => mutate({ ...data, weight: value })}
        />
      </View>

      <RadioButtonGroup
        containerStyle={{ marginBottom: 10 }}
        selected={data.gender}
        onSelected={(value: any) => mutate({ ...data, gender: value })}
      >
        <RadioButtonItem value="male" label="Männlich" />
        <RadioButtonItem value="female" label="Weiblich" />
        <RadioButtonItem value="other" label="Sonstiges" />
      </RadioButtonGroup>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
