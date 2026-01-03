import type { Message } from "@/modules/experiments/types";
import { MessageBubble } from "@/modules/ui/MessageBubble";
import { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";

interface MessageListProps {
  messages: Message[];
  ref: React.RefObject<FlatList<Message> | null>;  
}

export function MessageList({ messages, ref }: MessageListProps) {
  const renderItem = useCallback(({ item }: { item: Message }) => {
    return <MessageBubble message={item} />;
  }, []);

  const keyExtractor = useCallback((item: Message) => item.id, []);

  return (
    <FlatList
      ref={ref}
      data={messages}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      inverted
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingVertical: 16,
  },
});

