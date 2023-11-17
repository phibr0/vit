import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';
import Slider from '@react-native-community/slider';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Platform, TextInput, View, Text } from 'react-native';

export default function ModalScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState('male');

  const { mutate, isError, isPending } = useMutation({
    onSuccess: async () => {
      await AsyncStorage.setItem(
        'account',
        JSON.stringify({
          name,
          weight,
        })
      );
      router.replace('/(tabs)');
    },
    mutationFn: async ({
      name,
      password,
      weight,
    }: {
      name: string;
      password: string;
      weight: number;
    }) => {
      const data = new FormData();
      data.append('username', name);
      data.append('password', password);
      data.append('gender', gender);
      data.append('weight', weight.toString());
      data.append('key', '1000101');
      const response = await fetch('http://192.168.127.66:5000/createAccount', {
        method: 'POST',
        body: data,
      });
      if (response.status !== 200) throw new Error('Error');
    },
  });

  return (
    <View className="px-8 mt-12 gap-4">
      {isError && (
        <View className="border border-red-500 px-4 py-2 bg-red-100 rounded-lg">
          <Text className="text-red-600">Ein Fehler ist aufgetreten</Text>
        </View>
      )}

      <View>
        <Text>Benutzername</Text>
        <TextInput
          placeholder="Benutzername"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View>
        <Text>Passwort</Text>
        <TextInput
          placeholder="Passwort"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View>
        <Text>Gewicht: {weight.toFixed(1)}</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={200}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={setWeight}
          value={weight}
        />
      </View>

      <RadioButtonGroup
        containerStyle={{ marginBottom: 10 }}
        selected={gender}
        onSelected={(value) => setGender(value)}
      >
        <RadioButtonItem value="male" label="Männlich" />
        <RadioButtonItem value="female" label="Weiblich" />
        <RadioButtonItem value="other" label="Sonstiges" />
      </RadioButtonGroup>

      <Button
        title={isPending ? 'Lädt...' : 'Account erstellen'}
        onPress={() =>
          mutate({
            name,
            password,
            weight,
          })
        }
      />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
