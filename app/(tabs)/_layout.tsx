import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

export default function TabLayout() {
  return (
    
    <Tabs
      screenOptions={{

        headerShown: false
      }}
    >
      <Tabs.Screen
        name="challenges"
        options={{
          title: "challenges",
          tabBarIcon: ({ color }) => (
            <AntDesign name="flag" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "leaderboard",
          tabBarIcon: ({ color }) => (
            <AntDesign name="barchart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="healthscore"
        options={{
          title: "healthscore",
          tabBarIcon: ({ color }) => (
            <AntDesign name="hearto" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: "recipes",
          tabBarIcon: ({ color }) => (
            <AntDesign name="book" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: "videos",
          tabBarIcon: ({ color }) => (
            <AntDesign name="videocamera" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
