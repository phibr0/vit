import React from 'react';
import { ImageBackground, SafeAreaView, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { H1, ScrollView } from 'tamagui';

const data = [
  {
    name: 'John',
    score: 2200,
  },
  {
    name: 'Alice',
    rank: 2,
    score: 2000,
  },
  {
    name: 'Kevin',
    score: 1900,
  },
  {
    name: 'Marvin',
    score: 1200,
  },
  {
    name: 'Peter',
    score: 1300,
  },
  {
    name: 'Günther',
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
                      <View className="bg-[#F5D1C1] h-20 w-16 ml-4 shadow backdrop-blur-md rounded-2xl ">
                        <DataTable.Cell className="flex justify-center items-center rounded-2xl">
                          #{index + 1}
                        </DataTable.Cell>
                      </View>

                      <View className="bg-[#F5D1C1] flex flex-row w-64 ml-6 h-20 mr-14 shadow-xl  rounded-2xl">
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
