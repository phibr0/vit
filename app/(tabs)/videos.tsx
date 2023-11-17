import { SafeAreaView, StyleSheet } from "react-native";
import { Text, TouchableOpacity, ScrollView, View, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function TabOneScreen() {
  return (
    <SafeAreaView className="h-full">
      <ScrollView className="h-full">
        <View className="flex flex-col w-screen justify-center items-center">
          <View className="h-96 w-80 bg-cyan-600 flex justify-center items-center rounded-2xl mt-10">
            <Text className="text-xl text-center text-white justify-center">
              Seil schwingen
            </Text>
            <View className=" h-60 flex w-3/4 items-center mt-4 mb-2">
              <Image
                className="w-48 h-full rounded shadow-xl"
                source={require("./pic1.jpg")}
              />
            </View>
            <TouchableOpacity className="">
              <Text className="text-center text-xl text-white">Done!</Text>
            </TouchableOpacity>
          </View>

          <View className="h-96 w-80 bg-teal-600 flex justify-center items-center rounded-2xl mt-10">
            <Text className="text-xl text-center text-white justify-center">
              Krafttraining
            </Text>
            <View className=" h-60 flex w-3/4 items-center mt-4 mb-2">
              <Image
                className="w-48 h-full rounded shadow-xl"
                source={require("./pic2.jpg")}
              />
            </View>
            <TouchableOpacity className="">
              <Text className="text-center text-xl text-white">Done!</Text>
            </TouchableOpacity>
          </View>

          <View className="h-96 w-80 bg-cyan-600 flex justify-center items-center rounded-2xl mt-10">
            <Text className="text-xl text-center text-white justify-center">
              Schwimmen
            </Text>
            <View className=" h-60 flex w-3/4 items-center mt-4 mb-2">
              <Image
                className="w-48 h-full rounded shadow-xl"
                source={require("./pic3.jpg")}
              />
            </View>
            <TouchableOpacity className="">
              <Text className="text-center text-xl text-white">Done!</Text>
            </TouchableOpacity>
          </View>

          <View className="h-96 w-80 bg-fuchsia-600 flex justify-center items-center rounded-2xl mt-10">
            <Text className="text-xl text-center text-white justify-center">
              Fußball
            </Text>
            <View className=" h-60 flex w-3/4 items-center mt-4 mb-2">
              <Image
                className="w-48 h-full rounded shadow-xl"
                source={require("./pic4.jpg")}
              />
            </View>
            <TouchableOpacity className="">
              <Text className="text-center text-xl text-white">Done!</Text>
            </TouchableOpacity>
          </View>

          <View className="h-96 w-80 bg-cyan-600 flex justify-center items-center rounded-2xl mt-10">
            <Text className="text-xl text-center text-white justify-center">
              Yoga
            </Text>
            <View className=" h-60 flex w-3/4 items-center mt-4 mb-2">
              <Image
                className="w-48 h-full rounded shadow-xl"
                source={require("./pic5.jpg")}
              />
            </View>
            <TouchableOpacity className="">
              <Text className="text-centerr text-xl text-white">Done!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
