import { experiments } from "@/modules/experiments/registry";
import { Card } from "@/modules/ui/Card";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MenuScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Chat Experiments</Text>
          <Text style={styles.subtitle}>
            Exploring different chat UI implementations
          </Text>
        </View>

        <View style={styles.grid}>
          {experiments.map((experiment) => (
            <Card
              key={experiment.id}
              title={experiment.name}
              description={experiment.description}
              tags={experiment.tags}
              onPress={() => router.push(`/experiments/${experiment.id}`)}
            />
          ))}
        </View>

        {experiments.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No experiments yet</Text>
            <Text style={styles.emptySubtext}>
              Add experiments to modules/experiments/
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
  },
  grid: {
    gap: 16,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#444",
  },
});
