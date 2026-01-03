import { getExperimentById } from "@/modules/experiments/registry";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ExperimentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const experiment = getExperimentById(id);

  if (!experiment) {
    return (
      <>
        <Stack.Screen options={{ title: "Not Found" }} />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Experiment not found</Text>
          <Text style={styles.notFoundSubtext}>ID: {id}</Text>
        </View>
      </>
    );
  }

  const { Screen, Layout } = experiment;

  return (
    <>
      <Stack.Screen options={{ title: experiment.name }} />
      <Layout>
        <Screen />
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  notFound: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 8,
  },
  notFoundSubtext: {
    fontSize: 14,
    color: "#666",
  },
});
