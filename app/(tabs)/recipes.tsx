import { useQuery } from '@tanstack/react-query';
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

function RecipeList({ recipeName, recipeContent, receipPicture }: any) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <View className="flex flex-row gap-5 justify-between items-center mt-10 ml-2">
        <Text className="grow text-xl ml-2">{recipeName.slice(0, 26)}</Text>
        <Image
          className="w-20 h-20 rounded-xl"
          source={{ uri: receipPicture }}
        />
        <TouchableOpacity className="mr-2" onPress={toggleExpand}>
          <AntDesign
            name={isExpanded ? "caretup" : "caretdown"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {isExpanded && <Text className="m-5">{recipeContent}</Text>}
    </View>
  );
}

export default function TabOneScreen() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["recipes", "a"],
    queryFn: () =>
      Promise.all(
        ["a", "b", "c", "d", "e", "f"].map((letter) =>
          fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
          ).then((b) => b.json())
        )
      ).then((a) => a.flatMap((b) => b.meals)),
  });

  if (isLoading) return <Text>Loading...</Text>;

  if (isError || !data) return <Text>No Internet...</Text>;

  return (
    <SafeAreaView className="h-full">
      <ScrollView className="h-full">
        <Text className="text-3xl mt-2">Rezepte</Text>
        <View className="flex flex-col ">
          {data.map((recipe: any) => (
            <RecipeList
              recipeName={recipe.strMeal}
              recipeContent={recipe.strInstructions}
              receipPicture={recipe.strMealThumb}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
