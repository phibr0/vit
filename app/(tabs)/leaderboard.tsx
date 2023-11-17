import { ScrollView } from "tamagui";
import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { DataTable } from "react-native-paper";

const data = [
  {
    name: "John",
    rank: 1,
    currentHealth: 80,
    level: 5,
    score: 1200,
  },
  {
    name: "Alice",
    rank: 2,
    currentHealth: 95,
    level: 7,
    score: 1800,
  },
  {
    name: "Alice",
    rank: 3,
    currentHealth: 95,
    level: 7,
    score: 1800,
  },
  {
    name: "Alice",
    rank: 4,
    currentHealth: 95,
    level: 7,
    score: 1800,
  },
  {
    name: "Alice",
    rank: 5,
    currentHealth: 95,
    level: 7,
    score: 1800,
  },
  {
    name: "Alice",
    rank: 6,
    currentHealth: 95,
    level: 7,
    score: 1800,
  },

  // ... Weitere Datenzeilen nach Bedarf hinzufügen (Api am besten mit den Daten der Freunde )
];

export default function TabOneScreen() {
  return (
    <SafeAreaView className="h-full">
      <ScrollView className="h-full">
        <View className="pb-80">
          <Text className="text-3xl ">Leaderboard</Text>
          <DataTable className="h-full">
            <DataTable.Header>
              <DataTable.Title>Rang</DataTable.Title>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Health</DataTable.Title>
              <DataTable.Title>Level</DataTable.Title>
              <DataTable.Title>Score</DataTable.Title>
            </DataTable.Header>

            {data.map((user: any) => (
              <DataTable.Row>
                <DataTable.Cell>{user.rank}</DataTable.Cell>
                <DataTable.Cell>{user.name}</DataTable.Cell>
                <DataTable.Cell>{user.currentHealth}</DataTable.Cell>
                <DataTable.Cell>{user.level}</DataTable.Cell>
                <DataTable.Cell>{user.score}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
