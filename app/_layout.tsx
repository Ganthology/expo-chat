import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <KeyboardProvider>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: "#000" },
            headerShown: false,
          }}
        />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
