import { ScrollView } from "tamagui";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { DataTable } from "react-native-paper";
import React, { useState, useEffect } from "react";

const data = [
  {
    name: "John",
    score: 1200,
  },
  {
    name: "Alice",
    score: 1800,
  },
  {
    name: "Alec",
    score: 1400,
  },
  {
    name: "Alina",
    score: 1850,
  },
  {
    name: "Ami",
    score: 2000,
  },
  {
    name: "Kamil",
    score: 1400,
  },
];

export default function TabOneScreen() {
  return (
    <SafeAreaView className="h-full">
      <ScrollView className="h-full">
        <View className="pb-80">
          <DataTable className="w-screen">
            {data
              .sort((a, b) => b.score - a.score)
              .map((user, index) => (
                <DataTable.Row key={index}>
                  <View className="w-screen h-32 flex flex-row justify-between items-center rounded-2xl">
                    <View className="bg-white h-20 w-16 ml-4 shadow-xl rounded-2xl ">
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
  );
}
