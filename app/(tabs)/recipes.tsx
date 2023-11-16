import { useQuery } from '@tanstack/react-query';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useLocalStorage } from '.';
import { Accordion, Button } from 'tamagui';

function RecipeList({ recipeName, recipeContent, receipPicture }: any) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const { data, mutate } = useLocalStorage(recipeName, 0);
  const [checked, setChecked] = useState(false);

  return (
    <View className="rounded-2xl bg-white shadow mb-2 mx-4 py-2 px-4">
      <View className="flex flex-row gap-5 justify-between items-center">
        <Text className="w-[55%] text-ellipsis font-medium overflow-clip text-xl">
          {recipeName}
        </Text>
        <Image
          className="w-20 h-20 rounded-xl"
          source={{ uri: receipPicture }}
        />
        <TouchableOpacity onPress={toggleExpand}>
          <AntDesign
            name={isExpanded ? 'caretup' : 'caretdown'}
            size={16}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {isExpanded && (
        <>
          <Text className="px-2">{recipeContent}</Text>
          <Button
            className="mr-2"
            onPress={() => {
              mutate(data + 1);
            }}
          >
            <Text className="text-center text-xl shadow-xl">
              habe ich gekocht
            </Text>
          </Button>
        </>
      )}
    </View>
  );
}

export default function TabOneScreen() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['recipes', 'a'],
    queryFn: () =>
      Promise.all(
        ['a', 'b', 'c'].map((letter) =>
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
              key={recipe.idMeal}
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
('https://www.youtube.com/embed/APHoRW2FfIw');
