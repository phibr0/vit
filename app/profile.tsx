import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { Platform, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { useLocalStorage } from "./(tabs)";
import { Button } from "tamagui";

export default function ModalScreen() {
  const { data } = useLocalStorage("account", null);
  const [status, setStatus] = useState("profile");
  const [friendname, searchFriendname] = useState("");
  const [addFriend, handleAdd] = useState(false);

  const change = (attribute: boolean) => {
    if (attribute === true) {
      return false;
    }
    return true;
  };

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
        <View className="flex justify-center items-center">
          <View className="w-80 h-80 bg-white rounded-2xl shadow-xl flex flex-col justify-center items-center mt-14">
            <View>
              <AntDesign name="user" size={48} color="black" />
            </View>

            <View className="flex flex-row mt-8">
              <Text>Username: </Text>
              <Text>{data.name}</Text>
            </View>

            <View className="flex flex-row mt-2">
              <Text>Geschlecht: </Text>
              <Text>{data.gender}</Text>
            </View>

            <View className="flex flex-row mt-2">
              <Text>Gewicht: </Text>
              <Text>{data.weight.toFixed(1)}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View className="w-screen h-screen flex items-center">
          <View className="w-96 h-96 bg-white mt-14 rounded-2xl">
            <View className="flex flex-row justify-end mt-4">
              <TouchableOpacity onPress={() => handleAdd(change(addFriend))}>
                {addFriend === false ? (
                  <View className="flex flex-row mr-2">
                    <Text className="mr-1">Add Friends</Text>
                    <AntDesign name="adduser" size={16} color="black" />
                  </View>
                ) : (
                  <View className="flex flex-row mr-10 items-center">
                    <Text className="mr-1">Friends User: </Text>
                    <TextInput
                      className="w-32 border border-black mr-4"
                      value={friendname}
                      onChangeText={searchFriendname}
                    />
                    <Button size="$2">
                      <AntDesign name="plus" size={12} color="black" />
                    </Button>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <Text className="mt-6 text-xl text-center ">Friendlist</Text>
            <View className="flex flex-col mb-4 ml-5">
              <View className="flex flex-row ">
                <AntDesign name="user" size={16} color="black" />
                <Text className="ml-2">User1</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
