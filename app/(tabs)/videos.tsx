import { openURL } from 'expo-linking';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function TabOneScreen() {
  return (
    <SafeAreaView className="h-full">
      <ScrollView className="h-full">
        <Text className="text-3xl">videos</Text>
        <View className="flex flex-col w-screen justify-center items-center">
          <TouchableOpacity
            onPress={() =>
              openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            }
          >
            <View className="h-96 w-80 bg-cyan-600 flex justify-center items-center rounded-2xl mt-10">
              <Text className="text-xl text-center text-white justify-center">
                Seil schwingen
              </Text>
              <View className=" h-60 flex w-3/4 items-center mt-4 mb-2">
                <Image
                  className="w-48 h-full rounded shadow-xl"
                  source={require('./pic1.jpg')}
                />
              </View>
              <TouchableOpacity className="">
                <Text className="text-center text-xl text-white">Done!</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            }
          >
            <View className="h-96 w-80 bg-teal-600 flex justify-center items-center rounded-2xl mt-10">
              <Text className="text-xl text-center text-white justify-center">
                Seil schwingen
              </Text>
              <View className=" h-60 flex w-3/4 items-center mt-4 mb-2">
                <Image
                  className="w-48 h-full rounded shadow-xl"
                  source={require('./pic2.jpg')}
                />
              </View>
              <TouchableOpacity className="">
                <Text className="text-center text-xl text-white">Done!</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            }
          >
            <View className="h-96 w-80 bg-cyan-600 flex justify-center items-center rounded-2xl mt-10">
              <Text className="text-xl text-center text-white justify-center">
                Seil schwingen
              </Text>
              <View className=" h-60 flex w-3/4 items-center mt-4 mb-2">
                <Image
                  className="w-48 h-full rounded shadow-xl"
                  source={require('./pic3.jpg')}
                />
              </View>
              <TouchableOpacity className="">
                <Text className="text-center text-xl text-white">Done!</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            }
          >
            <View className="h-96 w-80 bg-fuchsia-600 flex justify-center items-center rounded-2xl mt-10">
              <Text className="text-xl text-center text-white justify-center">
                Seil schwingen
              </Text>
              <View className=" h-60 flex w-3/4 items-center mt-4 mb-2">
                <Image
                  className="w-48 h-full rounded shadow-xl"
                  source={require('./pic4.jpg')}
                />
              </View>
              <TouchableOpacity className="">
                <Text className="text-center text-xl text-white">Done!</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            }
          >
            <View className="h-96 w-80 bg-cyan-600 flex justify-center items-center rounded-2xl mt-10">
              <Text className="text-xl text-center text-white justify-center">
                Seil schwingen
              </Text>
              <View className=" h-60 flex w-3/4 items-center mt-4 mb-2">
                <Image
                  className="w-48 h-full rounded shadow-xl"
                  source={require('./pic5.jpg')}
                />
              </View>
              <TouchableOpacity className="">
                <Text className="text-center text-xl text-white">Done!</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
