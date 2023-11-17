import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Card, Checkbox, H1, H2, H3, ScrollView, Text } from 'tamagui';
import { useLocalStorage } from '.';

const QUESTS = {
  daily: [
    {
      categoryTitle: 'Sport',
      quests: [
        '30 Minuten Laufen oder Joggen',
        '10.000 Schritte',
        '20 Minuten Yoga',
        '30 Minuten Radfahren',
        '10-Minuten-Dehnübungen',
        '100 Liegestütze über den Tag verteilt',
        '30 Minuten Schwimmen',
        '10 Minuten Seilspringen',
      ],
    },
    {
      categoryTitle: 'Ernährung & Gesundheit',
      quests: [
        'Drei Portionen Gemüse',
        'Zwei Portionen Obst',
        'Ein gesundes Frühstück',
        'Ein gesundes Mittagessen',
        'Ein gesundes Abendessen',
        'Zuckerfreier Tag',
        'Ein Glas trinken',
        'Keine verarbeiteten Lebensmittel essen',
        'Ein vegetarischer Tag',
        'Einen Tag ohne Koffein',
        'Einen Tag ohne Milchprodukte',
        'Einen Smoothie als Mahlzeitenersatz',
        'Kein Koffein nach 16 Uhr',
        '8 Stunden Schlaf',
      ],
    },
    {
      categoryTitle: 'Videos & Rezepte',
      quests: [
        'Schaue ein Video',
        'Koche ein Rezept',
        'Zubereiten eines gesunden Snacks',
        'Backen eines gesunden Brotes',
        'Erstellen eines Wochen-Speiseplans mit den Rezepten',
        'Kochen einer neuen vegetarischen Mahlzeit',
        'Kochen einer Mahlzeit mit nur fünf Zutaten',
        'Ein gesundes Dessert zubereiten',
        'Eine neue Küche ausprobieren (z.B. asiatisch, mediterran)',
        'Kochen mit saisonalen Zutaten',
      ],
    },
    {
      categoryTitle: 'Verzicht',
      quests: [
        'Einen Tag ohne Alkohol',
        'Einen Tag ohne Rauchen',
        'Einen Tag ohne Süßigkeiten',
        'Verzicht auf Fast Food',
        'Keine zuckerhaltigen Getränke',
      ],
    },
    {
      categoryTitle: 'Allgemein',
      quests: [
        'Einen Tag ohne Social Media',
        'Verzicht auf Fernsehen für einen Abend',
        'Einen Tag ohne Auto (zu Fuß gehen, Radfahren)',
        'Einen Tag ohne Snacks zwischen den Mahlzeiten',
        'Drei ausgewogene Mahlzeiten pro Tag',
        'Kein Essen nach 20 Uhr',
        'Entspannungstechniken vor dem Schlafengehen',
        'Einen Kräutertee vor dem Schlafen trinken',
        'Morgens als erstes ein Glas Wasser trinken',
        'Tägliches Trinktagebuch führen',
      ],
    },
  ],
  weekly: [
    {
      categoryTitle: 'Sport',
      quests: [
        'Drei intensive Trainingseinheiten',
        'Drei mal Yoga für Flexibilität und Erholung',
        'Jeden Tag eine neue Sportart oder Übung ausprobieren',
        'Täglich 100 Liegestütze (über den Tag verteilt)',
        'Täglich 10000 Schritte',
        'individuelles Workout-Programm erstellen und ausführen',
      ],
    },
    {
      categoryTitle: 'Ernährung',
      quests: [
        'Täglich drei Portionen Gemüse integrieren',
        'Zwei gesunde, selbst gekochte Mahlzeiten pro Tag',
        'Ganze Woche vegetarisch essen',
        'Täglich ein neues gesundes Rezept ausprobieren',
        'Zuckerfreie Woche',
        'Kein Essen nach 20 Uhr',
        'Tägliche Smoothies als Mahlzeitenersatz',
        'Ausgewogene, regelmäßige Mahlzeiten',
        'Zuckerfreie Woche',
        'Jeden Tag ein Rezept',
        'Jeden Tag ein Video',
      ],
    },
    {
      categoryTitle: 'Schlaf',
      quests: [
        'Jeden Abend vor 23 Uhr ins Bett gehen',
        'Sieben Stunden Schlaf pro Nacht',
        'Jeden Tag zur gleichen Zeit aufstehen',
        'Tägliches Entspannungsritual vor dem Schlafengehen',
        '3mal Mittagsschlaf oder Powernapping',
        'Fester Schlafens- und Aufstehzeitpunkt',
      ],
    },
    {
      categoryTitle: 'Trinken',
      quests: [
        'Täglich 2 Liter Wasser trinken',
        'Täglicher Verzicht auf zuckerhaltige Getränke',
        'Grünen Tee statt Kaffee',
        'Kräutertee am Abend',
        'Jeden Morgen ein Glas Wasser vor dem Frühstück',
        'Tägliches Trinktagebuch führen.',
        'Tee und Wasser statt Softdrinks',
      ],
    },
    {
      categoryTitle: 'Verzicht',
      quests: [
        'Kein Fast Food',
        'Kein Alkohol',
        'Keine Süßigkeiten',
        'Reduzierung der Bildschirmzeit',
        'Kein Fernsehen für eine Woche',
        'Eine Woche ohne Rauchen',
      ],
    },
  ],
};

const GOALS = [
  {
    title: '1. Idealgewicht Erreichen und Gewicht Abnehmen',
    subgoals: [
      {
        title: 'Realistisches Zielgewicht festlegen',
        description: 'Basierend auf Körpergröße und Körpertyp',
      },
      {
        title: 'Wöchentliche Gewichtsverfolgung',
        description: 'Regelmäßiges Wiegen, um Fortschritte zu überwachen',
      },
      {
        title: 'Monatliches Abnahmeziel',
        description: ['0/1', '0/3', '0/6'],
      },
    ],
  },
  {
    title: '2. Gesunde Ernährung und Selbst Kochen',
    subgoals: [
      {
        title: 'Ernährungsplan erstellen',
        description:
          'Ausgewogene Mahlzeiten mit ausreichend Proteinen, Kohlenhydraten und Fetten',
      },
      {
        title: 'Gesundes Frühstück erstellen',
        description: {},
      },
      {
        title: 'Gesundes Mittagessen erstellen',
        description: {},
      },
      {
        title: 'Gesundes Abendessen erstellen',
        description: {},
      },
      {
        title: 'Gekochte Rezepte',
        description: ['0/1', '0/10', '0/50'],
      },
      {
        title: 'Kochkurs besuchen',
        description: 'Einen Kurs besuchen, um gesundes Kochen zu lernen',
      },
    ],
  },
  {
    title: '3. Sport',
    subgoals: [
      {
        title: 'Wöchentlicher Sport',
        description: ['0/1', '0/4', '0/12'],
      },
      {
        title: 'Vielfältige Sportarten ausprobieren',
        description: 'Finde eine passende Sportart 0/1',
      },
      {
        title: 'Sammle Schritte',
        description: ['0/1000', '0/10000', '0/100000'],
      },
      {
        title: '10000 Schritte pro Tag',
        description: ['0/3', '0/30', '0/90'],
      },
      {
        title: 'Schritte',
        description: 'Overall Count',
      },
      {
        title: 'Sammle Meter',
        description: ['0/1000', '0/10000', '0/100000'],
      },
      {
        title: 'Joggen pro Woche',
        description: {
          '1mal': ['0/1', '0/4', '0/12'],
          '3mal': ['0/1', '0/4', '0/12'],
          '5mal': ['0/1', '0/4', '0/12'],
        },
      },
      {
        title: 'Joggen',
        description: 'Overall Count',
      },
    ],
  },
  {
    title: '4. Regelmäßiges Trinken, Essen und Schlafen',
    subgoals: [
      {
        title: 'Wasserziel',
        description: ['0/7', '0/50', '0/300'],
      },
      {
        title: 'Wasser Streak',
        description: 'Getrunkene Gläser: X',
      },
      {
        title: 'Feste Essenszeiten einhalten',
        description: ['0/7', '0/50', '0/300'],
      },
      {
        title: 'Höchste Essenszeiten Streak',
        description: '',
      },
      {
        title: 'Schlafroutine entwickeln',
        description: ['0/7', '0/50', '0/300'],
      },
      {
        title: 'Höchste Schlafroutinen Streak',
        description: 'X',
      },
      {
        title: 'Schlafqualität verbessern',
        description: 'Schlafumgebung optimieren',
      },
    ],
  },
  {
    title: '5. Stress reduzieren und Entspannen',
    subgoals: [
      {
        title: 'Stresslevel reduzieren',
        description: ['0/1', '0/4', '0/12'],
      },
      {
        title: 'Entspannungstechniken ausprobieren',
        description: ['0/1', '0/4', '0/12'],
      },
      {
        title: 'Meditation',
        description: ['0/1', '0/4', '0/12'],
      },
      {
        title: 'Meditationszeit',
        description: ['0/1', '0/4', '0/12'],
      },
      {
        title: 'Meditationszeit',
        description: 'Overall Count',
      },
      {
        title: 'Meditation',
        description: 'Overall Count',
      },
    ],
  },
  {
    title: '6. Selbstbewusstsein und Selbstliebe',
    subgoals: [
      {
        title: 'Selbstbewusstsein steigern',
        description: ['0/1', '0/4', '0/12'],
      },
      {
        title: 'Selbstliebe steigern',
        description: ['0/1', '0/4', '0/12'],
      },
      {
        title: 'Selbstbewusstsein und Selbstliebe',
        description: 'Overall Count',
      },
    ],
  },
  {
    title: '7. Reisen und Orte Besuchen',
    subgoals: [
      {
        title: 'Reiseziele auswählen',
        description: ['0/1', '0/2', '0/4'],
      },
      {
        title: 'Kulturelle Aktivitäten einplanen',
        description: ['0/1', '0/5', '0/12'],
      },
      {
        title: 'Essen verschiedener Kulturen probieren',
        description: ['0/1', '0/5', '0/12'],
      },
    ],
  },
  {
    title: '8. Verzicht auf Ungesundes',
    subgoals: [
      {
        title: 'Reduzierung von Fastfood und Süßigkeiten',
        description: ['0/1', '0/4', '0/12'],
      },
      {
        title: 'Alkoholfrei/Wochen',
        description: ['0/1', '0/4', '0/12'],
      },
      {
        title: 'Rauchfrei/Tage',
        description: ['0/3', '0/14', '0/50'],
      },
    ],
  },
  {
    title: '9. Health',
    subgoals: [
      {
        title: 'Erreiche Prozent Health',
        description: ['50', '75', '100'],
      },
      {
        title: '100% Health für mehrere Tage',
        description: ['0/1', '0/14', '0/50'],
      },
      {
        title: 'Erreiche einen HealthScore von',
        description: ['0/1000', '0/10000', '0/250000'],
      },
      {
        title: 'Höchster HealthScore in einem Monat',
        description: 'X',
      },
    ],
  },
  {
    title: '10. Allgemeine Ziele',
    subgoals: [
      {
        title: 'Schließe Daily Quests ab',
        description: ['0/10', '0/100', '0/500'],
      },
      {
        title: 'Schließe Weekly Quests ab',
        description: ['0/3', '0/8', '0/12'],
      },
      {
        title: 'Daily Quests Counter',
        description: 'X',
      },
      {
        title: 'Weekly Quests Counter',
        description: 'X',
      },
      {
        title: 'Füge einen Freund hinzu',
        description: {},
      },
      {
        title: 'Empfehle die App einem Freund',
        description: {},
      },
    ],
  },
];

const QuestItem = ({ quest, onToggleQuest }: any) => {
  const { data, mutate } = useLocalStorage(quest.title, {
    checked: false,
    done: 0,
  });
  if (!data) return null;
  if (Array.isArray(quest.description)) {
    const breakpoints = quest.description.map((d: any) =>
      parseInt(d.split('/')[1])
    );

    const current = breakpoints.indexOf(breakpoints.find((b) => b > data.done));
    const max = breakpoints[current];
    console.log(current, max);

    return (
      <TouchableOpacity
        onPress={() =>
          !(current === -1) && mutate({ ...data, done: data.done + 1 })
        }
      >
        <View className="flex items-center w-[90%] gap-1 flex-row">
          <Text className="mr-2">
            {quest.title} ({data.done}/{current === -1 ? data.done : max})
          </Text>
          {current === -1 ? (
            <Text> Alle Ziele erreicht</Text>
          ) : (
            <>
              {current > 0
                ? new Array(current)
                    .fill(0)
                    .map((_, i) => (
                      <AntDesign key={i} name="heart" size={16} color="red" />
                    ))
                : null}
              {3 - current > 0
                ? new Array(3 - current)
                    .fill(0)
                    .map((_, i) => (
                      <AntDesign key={i} name="heart" size={16} color="black" />
                    ))
                : null}
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => mutate({ ...data, checked: !data.checked })}
      style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
    >
      <Checkbox checked={data.checked}>
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
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-4 pb-24 gap-4">
          <TouchableOpacity>
            <H1 textAlign="center" marginTop="$6">
              Challenges
            </H1>
          </TouchableOpacity>

          <Card bordered padded elevate>
            <H2 marginBottom="$2">Quests</H2>
            {QUESTS.daily.map((quest) => (
              <QuestItem
                key={quest.categoryTitle}
                quest={
                  quest.quests[Math.floor(Math.random() * quest.quests.length)]
                }
              />
            ))}
          </Card>

          <Card bordered padded elevate>
            <H2 marginBottom="$2">Goals</H2>

            {GOALS.map((goal, i) => (
              <View key={goal.title + i}>
                <H3>{goal.title}</H3>
                {goal.subgoals.map((subgoal, i) => (
                  <QuestItem key={subgoal.title + i} quest={subgoal} />
                ))}
              </View>
            ))}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
