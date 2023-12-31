import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

// @ts-expect-error
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';
import Slider from '@react-native-community/slider';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Platform, TextInput, View, Text } from 'react-native';
import { ScrollView, Select, debounce } from 'tamagui';

export default function Modal() {
  const [mode, setMode] = useState('signup');
  return (
    <View>
      <View className="flex flex-row items-center gap-2">
        <Button title="Account erstellen" onPress={() => setMode('signup')} />
        <Button title="Einloggen" onPress={() => setMode('signin')} />
      </View>

      {mode === 'signup' ? <Signup /> : <Signin />}
    </View>
  );
}

function Signin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  const onSignIn = async () => {
    const formData = new FormData();
    formData.append('username', name);
    formData.append('password', password);
    formData.append('key', '1000101');
    const response = await fetch('http://172.31.47.60:5000/login', {
      method: 'POST',
      body: formData,
    });
    if (response.status !== 200) {
      setHasError(true);
      return;
    }
    await AsyncStorage.setItem('account', JSON.stringify({ name, password }));
    router.replace('/(tabs)');
  };

  return (
    <View>
      {hasError && (
        <View>
          <Text>Ein Fehler ist aufgetreten</Text>
        </View>
      )}
      <TextInput
        placeholder="Benutzername"
        placeholderTextColor={'#000000'}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Passwort"
        placeholderTextColor={'#000000'}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Einloggen" onPress={onSignIn} />
    </View>
  );
}

const funktion = async (currentHealth: number, level: number) => {
  const day = new Date().getDay() + 1;
  let days = 7;
  let healthscore = 0;
  let weeklyHealth = currentHealth;
  let counter = 0;
  0 - 100;
  if (currentHealth >= weeklyHealth) {
    healthscore =
      (healthscore + (100 + weeklyHealth) / 100) * Math.pow(1.3, days);
  } else {
  }
};

function Signup() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState('male');
  const [form, setForm] = useState({
    sport: '2x',
    cigarettes: 'Neutral',
    alcohol: 'Neutral',
    junkfood: 'Neutral',
    sleepQuality: 'Neutral',
    timeOutside: 'Neutral',
    dob: '2000-01-01',
  });

  const { mutate, isError, isPending } = useMutation({
    onSuccess: async () => {
      await AsyncStorage.setItem(
        'account',
        JSON.stringify({
          name,
          password,
          gender,
          weight,
          dob: form.dob,
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
      const response = await fetch('http://172.31.47.60:5000/createAccount', {
        method: 'POST',
        body: data,
      });
      let health = 50;
      const sportMap = {
        'Gar nicht': -5,
        '1x': 1,
        '2x': 5,
        '3x': 9,
        '5+': 15,
      };
      const cigarettesMap = {
        'Trifft nicht zu': 15,
        'Trifft eher nicht zu': -5,
        Neutral: -15,
        'Trifft eher zu': -25,
        'Trifft zu': -30,
      };
      const alcoholMap = {
        'Trifft nicht zu': 15,
        'Trifft eher nicht zu': -5,
        Neutral: -15,
        'Trifft eher zu': -25,
        'Trifft zu': -30,
      };
      const map = {
        'Trifft nicht zu': -10,
        'Trifft eher nicht zu': -5,
        Neutral: 3,
        'Trifft eher zu': 9,
        'Trifft zu': 15,
      };
      // @ts-expect-error
      health += map[form.sleepQuality];
      // @ts-expect-error
      health += map[form.timeOutside];
      // @ts-expect-error
      health += map[form.junkfood];
      // @ts-expect-error
      health += cigarettesMap[form.cigarettes];
      // @ts-expect-error
      health += alcoholMap[form.alcohol];
      // @ts-expect-error
      health += sportMap[form.sport];

      await AsyncStorage.setItem('health', JSON.stringify(health));
      if (response.status !== 200) throw new Error('Error');
    },
  });

  const [showPicker, setShowPicker] = useState(false);

  return (
    <ScrollView>
      <View className="px-8 mt-12 gap-4 pb-32">
        {isError && (
          <View className="border border-red-500 px-4 py-2 bg-red-100 rounded-lg">
            <Text className="text-red-600">Ein Fehler ist aufgetreten</Text>
          </View>
        )}

        <View>
          <TextInput
            placeholder="Benutzername"
            placeholderTextColor={'#000000'}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View>
          <TextInput
            placeholder="Passwort"
            value={password}
            placeholderTextColor={'#000000'}
            onChangeText={setPassword}
          />
        </View>

        <View>
          <Text>Gewicht: {weight.toFixed(1)}</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={20}
            maximumValue={200}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onValueChange={debounce(setWeight, 100)}
            value={weight}
          />
        </View>

        <View>
          <Text>Geburstag: {new Date(form.dob).toLocaleDateString()}</Text>
          <Button onPress={() => setShowPicker(true)} title="Auswählen" />
          {showPicker && (
            <DateTimePicker
              value={new Date(form.dob)}
              onChange={(_, date) => {
                setShowPicker(false);
                setForm({ ...form, dob: date?.toDateString() ?? '' });
              }}
            />
          )}
        </View>

        <RadioButtonGroup
          radioBackground="#D9622B"
          containerStyle={{ marginBottom: 10 }}
          selected={gender}
          onSelected={(value: any) => setGender(value)}
        >
          <RadioButtonItem value="male" label="Männlich" />
          <RadioButtonItem value="female" label="Weiblich" />
          <RadioButtonItem value="other" label="Sonstiges" />
        </RadioButtonGroup>

        <View>
          <Text>Wie oft Sport pro Woche?</Text>
          <RadioButtonGroup
            radioBackground="#D9622B"
            containerStyle={{ marginBottom: 10 }}
            selected={form.sport}
            onSelected={(value: any) => setForm({ ...form, sport: value })}
          >
            {['Gar nicht', '1x', '2x', '3x', '5+'].map((label) => (
              <RadioButtonItem value={label} label={label} />
            ))}
          </RadioButtonGroup>
        </View>

        <View>
          <Text>Regelmäßiger Zigarettenkonsum</Text>
          <RadioButtonGroup
            radioBackground="#D9622B"
            containerStyle={{ marginBottom: 10 }}
            selected={form.cigarettes}
            onSelected={(value: any) => setForm({ ...form, cigarettes: value })}
          >
            {[
              'Trifft nicht zu',
              'Trifft eher nicht zu',
              'Neutral',
              'Trifft eher zu',
              'Trifft zu',
            ].map((label) => (
              <RadioButtonItem value={label} label={label} />
            ))}
          </RadioButtonGroup>
        </View>

        <View>
          <Text>wie oft am saufen</Text>
          <RadioButtonGroup
            radioBackground="#D9622B"
            containerStyle={{ marginBottom: 10 }}
            selected={form.alcohol}
            onSelected={(value: any) => setForm({ ...form, alcohol: value })}
          >
            {[
              'Trifft nicht zu',
              'Trifft eher nicht zu',
              'Neutral',
              'Trifft eher zu',
              'Trifft zu',
            ].map((label) => (
              <RadioButtonItem value={label} label={label} />
            ))}
          </RadioButtonGroup>
        </View>

        <View>
          <Text>wie oft bei mcces</Text>
          <RadioButtonGroup
            radioBackground="#D9622B"
            containerStyle={{ marginBottom: 10 }}
            selected={form.junkfood}
            onSelected={(value: any) => setForm({ ...form, junkfood: value })}
          >
            {[
              'Trifft nicht zu',
              'Trifft eher nicht zu',
              'Neutral',
              'Trifft eher zu',
              'Trifft zu',
            ].map((label) => (
              <RadioButtonItem value={label} label={label} />
            ))}
          </RadioButtonGroup>
        </View>

        <View>
          <Text>Ausgewogener Schlaf</Text>
          <RadioButtonGroup
            radioBackground="#D9622B"
            containerStyle={{ marginBottom: 10 }}
            selected={form.sleepQuality}
            onSelected={(value: any) =>
              setForm({ ...form, sleepQuality: value })
            }
          >
            {[
              'Trifft nicht zu',
              'Trifft eher nicht zu',
              'Neutral',
              'Trifft eher zu',
              'Trifft zu',
            ].map((label) => (
              <RadioButtonItem value={label} label={label} />
            ))}
          </RadioButtonGroup>
        </View>

        <View>
          <Text>Regelmäßig rausgehen</Text>
          <RadioButtonGroup
            radioBackground="#D9622B"
            containerStyle={{ marginBottom: 10 }}
            selected={form.timeOutside}
            onSelected={(value: any) =>
              setForm({ ...form, timeOutside: value })
            }
          >
            {[
              'Trifft nicht zu',
              'Trifft eher nicht zu',
              'Neutral',
              'Trifft eher zu',
              'Trifft zu',
            ].map((label) => (
              <RadioButtonItem value={label} label={label} />
            ))}
          </RadioButtonGroup>
        </View>

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
    </ScrollView>
  );
}
