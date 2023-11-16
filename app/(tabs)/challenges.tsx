import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Card, Checkbox, H1, H2, Text } from 'tamagui';

const QuestItem = ({ quest, onToggleQuest }: any) => {
  return (
    <TouchableOpacity
      onPress={() => onToggleQuest(quest.id)}
      style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
    >
      <Checkbox checked={quest.completed}>
        <Checkbox.Indicator>
          <AntDesign name="check" size={16} color="black" />
        </Checkbox.Indicator>
      </Checkbox>
      <Text
        style={{
          marginLeft: 10,
          textDecorationLine: quest.completed ? 'line-through' : 'none',
        }}
      >
        {quest.title}
      </Text>
    </TouchableOpacity>
  );
};

export default function TabOneScreen() {
  const [quests, setQuests] = useState([
    { id: '1', title: 'Complete Tutorial', completed: false },
    { id: '2', title: 'Build a React Native App', completed: false },
    { id: '3', title: 'Learn Tamagui', completed: false },
  ]);

  const [goals, setGoals] = useState([
    { id: '1', title: 'Complete Tutorial', completed: false },
    { id: '2', title: 'Build a React Native App', completed: false },
    { id: '3', title: 'Learn Tamagui', completed: false },
  ]);

  const toggleQuest = (id: any) => {
    setQuests(
      quests.map((quest) =>
        quest.id === id ? { ...quest, completed: !quest.completed } : quest
      )
    );
  };

  const toggleGoal = (id: any) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  return (
    <SafeAreaView>
      <View className="px-4 pb-24 gap-4">
        <H1 textAlign="center" marginTop="$6">
          Challenges
        </H1>
        <Card bordered padded elevate>
          <H2 marginBottom="$2">Quests</H2>
          <FlatList
            data={quests}
            renderItem={({ item }) => (
              <QuestItem quest={item} onToggleQuest={toggleQuest} />
            )}
            keyExtractor={(item) => item.id}
          />
        </Card>

        <Card bordered padded elevate>
          <H2 marginBottom="$2">Goals</H2>
          <FlatList
            data={goals}
            renderItem={({ item }) => (
              <QuestItem quest={item} onToggleQuest={toggleGoal} />
            )}
            keyExtractor={(item) => item.id}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
}
