import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import { Text, View } from 'react-native';

export default function ModalScreen() {
  return (
    <View className="">
      <Text className="">Profile</Text>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
