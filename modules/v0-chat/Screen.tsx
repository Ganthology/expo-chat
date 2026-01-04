import { LegendList, LegendListRef } from '@legendapp/list';
import { use, useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { INITIAL_MESSAGES } from '../experiments/messages';
import { Message } from '../experiments/types';
import { BlankSizeContext } from './BlankSizeProvider';
import { ChatInputWithMeasure } from './ChatInputWithMeasure';
import { MessageBubbleWithMeasure } from './MessageBubbleWithMeasure';

export function Screen() {
  const listRef = useRef<LegendListRef>(null);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

  // const blankSizeSV = useSharedValue(0);

  const { blankSizeSV, composerHeightSV } = use(BlankSizeContext);

  const blankSizeStyle = useAnimatedStyle(() => ({
    height: blankSizeSV?.value ?? 0,
  }));

  const composerHeightStyle = useAnimatedStyle(() => ({
    height: composerHeightSV?.value ?? 0,
  }));

  const handleSend = useCallback((content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 0);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          'This is a simulated response. In a real implementation, this would connect to an AI API.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  }, []);

  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <LegendList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubbleWithMeasure message={item} />}
        ListFooterComponent={
          () => (
            <View>
              <Reanimated.View style={[blankSizeStyle, { backgroundColor: 'blue' }]} />
              {/* <Reanimated.View style={[composerHeightStyle, { backgroundColor: 'red' }]} /> */}
            </View>
          )
          // <FooterSpacer
          //   lastUserMessageHeight={lastUserMessageHeight}
          //   textInputHeight={textInputHeight}
          // />
        }
        recycleItems
      />
      <ChatInputWithMeasure onSend={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    // backgroundColor: "red",
  },
});
