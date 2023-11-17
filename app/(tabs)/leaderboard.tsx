import React from 'react';
import { ImageBackground, SafeAreaView, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { H1, ScrollView } from 'tamagui';

const data = [
  {
    name: 'John',
    rank: 1,
    currentHealth: 80,
    level: 5,
    score: 1200,
  },
  {
    name: 'Alice',
    rank: 2,
    currentHealth: 95,
    level: 7,
    score: 1800,
  },
  {
    name: 'Alice',
    rank: 3,
    currentHealth: 95,
    level: 7,
    score: 1800,
  },
  {
    name: 'Alice',
    rank: 4,
    currentHealth: 95,
    level: 7,
    score: 1800,
  },
  {
    name: 'Alice',
    rank: 5,
    currentHealth: 95,
    level: 7,
    score: 1800,
  },
  {
    name: 'Alice',
    rank: 6,
    currentHealth: 95,
    level: 7,
    score: 1800,
  },
];

export default function TabOneScreen() {
  return (
    <ImageBackground source={require('./leaderboard.png')}>
      <SafeAreaView className="h-full">
        <ScrollView className="h-full">
          <H1 mt="$4" textAlign="center">
            Leaderboard
          </H1>
          <View className="pb-80">
            <DataTable className="w-screen">
              {data
                .sort((a, b) => b.score - a.score)
                .map((user, index) => (
                  <DataTable.Row key={index}>
                    <View className="w-screen h-32 flex flex-row justify-between items-center rounded-2xl">
                      <View className="bg-white h-20 w-16 ml-4 shadow backdrop-blur-md rounded-2xl ">
                        <DataTable.Cell className="flex justify-center items-center rounded-2xl">
                          #{index + 1}
                        </DataTable.Cell>
                      </View>

                      <View className="bg-white flex flex-row w-72 h-20 mr-14 shadow-xl  rounded-2xl">
                        <DataTable.Cell className="flex justify-center items-center rounded-2xl">
                          {user.name}
                        </DataTable.Cell>
                        <DataTable.Cell className="flex justify-center items-center   rounded-2xl">
                          {user.score}
                        </DataTable.Cell>
                      </View>
                    </View>
                  </DataTable.Row>
                ))}
            </DataTable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
