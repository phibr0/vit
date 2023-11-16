import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { Platform } from "react-native";

import { Text, View, TouchableOpacity } from "react-native";
import { useLocalStorage } from "./(tabs)";

export default function ModalScreen() {
  const { data } = useLocalStorage("account", null);
  const [status, setStatus] = useState("profile");

  if (!data) return <Text>Loading</Text>;

  return (
    <View className="h-screen w-screen">
      <View className="flex flex-row justify-between mt-4">
        <TouchableOpacity onPress={() => setStatus("profile")}>
          <Text className="text-xl ml-4">Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStatus("friends")}>
          <Text className="text-xl mr-4">Friends</Text>
        </TouchableOpacity>
      </View>

      {status === "profile" ? (
        <View className="flex flex-col">
          <View className="flex flex-row">
            <Text>Name: </Text>
            <Text>{data.name}</Text>
          </View>

          <View className="flex flex-row">
            <Text>Geschlecht: </Text>
            <Text>{data.gender}</Text>
          </View>

          <View className="flex flex-row">
            <Text>Gewicht :</Text>
            <Text>{data.weight}</Text>
          </View>
        </View>
      ) : (
        <View>
          <Text>Friends</Text>
        </View>
      )}

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
