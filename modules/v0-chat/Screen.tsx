import { LegendList } from '@legendapp/list';
import { use, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import Reanimated, { useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Message } from '../experiments/types';
import { BlankSizeContext } from './BlankSizeProvider';
import { ChatInputWithMeasure } from './ChatInputWithMeasure';
import { MessageBubbleWithMeasure } from './MessageBubbleWithMeasure';
import { useMessageList } from './MessageListProvider';

const AnimatedLegendList = Reanimated.createAnimatedComponent(LegendList<Message>);

export function Screen() {
  // const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [messages, setMessages] = useState<Message[]>([]);
  const { listRef, scrollToEndWithOffset } = useMessageList();
  const { blankSizeSV, composerHeightSV } = use(BlankSizeContext);

  const animatedProps = useAnimatedProps(() => {
    return {
      contentInset: {
        // bottom: blankSizeSV?.value ?? 0,
        bottom: 0,
      },
    };
  });

  const blankSizeStyle = useAnimatedStyle(() => {
    return {
      height: blankSizeSV?.value ?? 0,
      backgroundColor: 'yellow',
    };
  });

  const handleSend = (content: string) => {
    const messageId = Date.now().toString();
    const userMessage: Message = {
      id: messageId,
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Scroll after React renders and layout completes
    // scrollToEndWithOffset();

    console.log('scroll to end triggered');
    listRef.current?.scrollToEnd({ animated: true });

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          'This is a simulated response. In a real implementation, this would connect to an AI API.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // listRef.current?.scrollToEnd({ animated: true, viewOffset: 0 });
    }, 1000);
  };

  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: composerHeightSV?.value ?? 0 }]}>
      {/* <View> */}
      <AnimatedLegendList
        // @ts-expect-error - animatedProps type mismatch with LegendList
        animatedProps={animatedProps}
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubbleWithMeasure message={item} />}
        recycleItems
        showsVerticalScrollIndicator
        showsHorizontalScrollIndicator
        indicatorStyle="white"
        contentContainerStyle={{
          backgroundColor: 'green',
        }}
        ListFooterComponent={() => <Reanimated.View style={blankSizeStyle} />}
        style={{
          backgroundColor: 'red',
        }}
        scrollEnabled
      />
      {/* </View> */}
      <KeyboardStickyView
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 16,
          // backgroundColor: 'blue',
        }}
        offset={{
          opened: -8,
          // closed: -bottom,
        }}
      >
        <ChatInputWithMeasure onSend={handleSend} />
      </KeyboardStickyView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // minHeight: '100%',
    backgroundColor: '#000',
    // backgroundColor: "red",
  },
});
