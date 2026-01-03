import type { Message } from "@/modules/experiments/types";
import { StyleSheet, Text, View } from "react-native";
import Reanimated, { FadeInDown } from "react-native-reanimated";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <Reanimated.View entering={FadeInDown} style={[styles.container, isUser && styles.containerUser]}>
      <View
        style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAssistant]}
      >
        <Text style={[styles.text, isUser && styles.textUser]}>
          {message.content}
        </Text>
      </View>
    </Reanimated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    alignItems: "flex-start",
  },
  containerUser: {
    alignItems: "flex-end",
  },
  bubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  bubbleUser: {
    backgroundColor: "#0a84ff",
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    backgroundColor: "#2a2a2a",
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 22,
  },
  textUser: {
    color: "#fff",
  },
});

