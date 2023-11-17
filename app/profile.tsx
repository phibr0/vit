import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, Image, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useLocalStorage } from './(tabs)';
import { Button } from 'tamagui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function ModalScreen() {
  const { data } = useLocalStorage('account', null);
  const [status, setStatus] = useState('profile');
  const [friendname, searchFriendname] = useState('');
  const [addFriend, handleAdd] = useState(false);

  const { data: list } = useQuery({
    queryKey: ['friends'],
    queryFn: async () => {
      const form = new FormData();
      form.append('username', data.name);
      form.append('password', data.password);
      const token = await fetch('http://192.168.127.66:5000/login', {
        method: 'POST',
        body: form,
      }).then((res) => res.text());
      const formData = new FormData();
      formData.append('token', token);
      formData.append('username', data.name);
      const response = await fetch('http://192.168.127.66:5000/friendget', {
        method: 'POST',
        body: formData,
      });
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Error');
    },
  });
  console.log(list);

  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      const form = new FormData();
      form.append('username', data.name);
      form.append('password', data.password);
      const token = await fetch('http://192.168.127.66:5000/login', {
        method: 'POST',
        body: form,
      }).then((res) => res.text());
      console.log(token);
      const formData = new FormData();
      formData.append('token', token);
      formData.append('username', data.name);
      formData.append('friend', friendname);
      const response = await fetch('http://192.168.127.66:5000/friendset', {
        body: formData,
        method: 'POST',
      }).then((res) => res.text());
      console.log(response);
      await client.invalidateQueries({ exact: true, queryKey: ['friends'] });
      if (response.startsWith('added')) {
        return response;
      }
      throw new Error(response);
    },
  });

  const { data: level } = useLocalStorage('exp', 0);

  const change = (attribute: boolean) => {
    if (attribute === true) {
      return false;
    }
    return true;
  };

  if (!data) return <Text>Loading</Text>;

  return (
    <ImageBackground source={require("./(tabs)/leaderboard.png")}>
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
            <View className="w-80 h-80 bg-white/80 rounded-2xl shadow-xl flex flex-col justify-center items-center mt-14">
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
                <Text>Geburstag</Text>
                <Text>{data.dob}</Text>
              </View>

              <View className="flex flex-row mt-2">
                <Text>Gewicht: </Text>
                <Text>{data.weight.toFixed(1)}</Text>
              </View>
            </View>

            <View>
              <Text className="text-7xl text-orange-800 font-bold mt-24 text-center">
                {(Math.sqrt(level + 10) - 3).toFixed(0)}
              </Text>
              <Text className="text-center text-orange-900 font-bold">
                Dein Level
              </Text>
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
                      <Button size="$2" onPress={() => mutate()}>
                        <AntDesign name="plus" size={12} color="black" />
                      </Button>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              <Text className="mt-6 text-xl text-center ">Friendlist</Text>
              <View className="flex flex-col mb-4 ml-5">
                {list &&
                  list.map((f: any) => (
                    <View className="flex flex-row">
                      <AntDesign name="user" size={16} color="black" />
                      <Text className="ml-2">{JSON.stringify(f)}</Text>
                    </View>
                  ))}
              </View>
            </View>
          </View>
        )}

        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </ImageBackground>
  );
}
