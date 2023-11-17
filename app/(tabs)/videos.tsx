import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import { Text, TouchableOpacity, ScrollView, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function TabOneScreen() {
  return (
    <ImageBackground source={require('./videos.png')}>
      <SafeAreaView className="h-full">
        <ScrollView className="h-full">
          <View className="flex flex-col w-screen justify-center items-center">
            <View className="h-96 w-80 bg-orange-100/80 flex justify-center items-center rounded-2xl mt-10">
              <Text className="text-xl text-center text-black justify-center">
                Seil schwingen
              </Text>
              <View className=" h-60 flex w-3/4 items-center mt-4 mb-2">
                <Image
                  className="w-48 h-full rounded shadow-xl"
                  source={require('./pic1.jpg')}
                />
              </View>
              <TouchableOpacity className="">
                <Text className="text-center text-xl text-black">Done!</Text>
              </TouchableOpacity>
            </View>

            <View className="h-96 w-80 bg-cyan-100/80 flex justify-center items-center rounded-2xl mt-10">
              <Text className="text-xl text-center text-black justify-center">
                Krafttraining
              </Text>
              <View className=" h-60 flex w-3/4 items-center mt-4 mb-2">
                <Image
                  className="w-48 h-full rounded shadow-xl"
                  source={require('./pic2.jpg')}
                />
              </View>
              <TouchableOpacity className="">
                <Text className="text-center text-xl text-black">Done!</Text>
              </TouchableOpacity>
            </View>

            <View className="h-96 w-80 bg-green-50/80 flex justify-center items-center rounded-2xl mt-10">
              <Text className="text-xl text-center text-black justify-center">
                Schwimmen
              </Text>
              <View className=" h-60 flex w-3/4 items-center mt-4 mb-2">
                <Image
                  className="w-48 h-full rounded shadow-xl"
                  source={require('./pic3.jpg')}
                />
              </View>
              <TouchableOpacity className="">
                <Text className="text-center text-xl text-black">Done!</Text>
              </TouchableOpacity>
            </View>

            <View className="h-96 w-80 bg-cyan-50/80 flex justify-center items-center rounded-2xl mt-10">
              <Text className="text-xl text-center text-black justify-center">
                Fußball
              </Text>
              <View className=" h-60 flex w-3/4 items-center mt-4 mb-2">
                <Image
                  className="w-48 h-full rounded shadow-xl"
                  source={require('./pic4.jpg')}
                />
              </View>
              <TouchableOpacity className="">
                <Text className="text-center text-xl text-black">Done!</Text>
              </TouchableOpacity>
            </View>

            <View className="h-96 w-80 bg-orange-50/80 mb-24 flex justify-center items-center rounded-2xl mt-10">
              <Text className="text-xl text-center text-black justify-center">
                Yoga
              </Text>
              <View className="h-60 flex w-3/4 items-center mt-4 mb-2">
                <Image
                  className="w-48 h-full rounded shadow-xl"
                  source={require('./pic5.jpg')}
                />
              </View>
              <TouchableOpacity className="">
                <Text className="text-centerr text-xl text-black">Done!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
