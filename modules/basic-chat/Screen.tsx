import type { Message } from "@/modules/experiments/types";
import { ChatInput } from "@/modules/ui/ChatInput";
import { useCallback, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MessageList } from "./MessageList";

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Hello! How can I help you today?",
    role: "assistant",
    timestamp: new Date(),
  },
];

export function Screen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

  const listRef = useRef<FlatList<Message>>(null);

  const handleSend = useCallback((content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [userMessage, ...prev]);
    listRef.current?.scrollToIndex({ index: 0, animated: true, viewOffset:  16});
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "This is a simulated response. In a real implementation, this would connect to an AI API.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [assistantMessage, ...prev]);
    }, 1000);
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={-insets.bottom}>
      <MessageList ref={listRef} messages={messages} />
      <View style={[styles.chatInputContainer, { paddingBottom: styles.chatInputContainer.paddingVertical + insets.bottom }]}>
        <ChatInput onSend={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  chatInputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#000",
    borderTopWidth: 1,
    borderTopColor: "#1a1a1a",
  },
});

