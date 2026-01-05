import { createContext, use, useRef } from 'react';
import { LayoutChangeEvent, useWindowDimensions, View } from 'react-native';
import { SharedValue, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Message } from '../experiments/types';
import { useMessageList } from './MessageListProvider';

export const BlankSizeContext = createContext<{
  blankSizeSV: SharedValue<number> | null;
  composerHeightSV: SharedValue<number> | null;
  lastSentUserMessageHeightSV: SharedValue<number> | null;
}>({ blankSizeSV: null, composerHeightSV: null, lastSentUserMessageHeightSV: null });

export function BlankSizeProvider({ children }: { children: React.ReactNode }) {
  const blankSizeSV = useSharedValue(0);
  const composerHeightSV = useSharedValue(0);
  const lastSentUserMessageHeightSV = useSharedValue(0);

  return (
    <BlankSizeContext.Provider
      value={{ blankSizeSV, composerHeightSV, lastSentUserMessageHeightSV }}
    >
      {children}
    </BlankSizeContext.Provider>
  );
}

export function useMessageBlankSize(message: Message) {
  const blankSizeRef = useRef<View>(null);
  const { blankSizeSV, composerHeightSV, lastSentUserMessageHeightSV } = use(BlankSizeContext);
  const { listRef } = useMessageList();

  const { height: windowHeight } = useWindowDimensions();

  const { top, bottom } = useSafeAreaInsets();

  const availableHeight = windowHeight - top;

  return {
    onLayout: (event: LayoutChangeEvent) => {
      if (message.role === 'user' && blankSizeSV && lastSentUserMessageHeightSV) {
        const userSentMessageHeight = event.nativeEvent.layout.height;

        const newBlankSize =
          availableHeight - userSentMessageHeight - (composerHeightSV?.value ?? 0);
        blankSizeSV.value = newBlankSize;
        console.log('user message layout triggered', newBlankSize);
        lastSentUserMessageHeightSV.value = userSentMessageHeight;

        // setTimeout(() => {
        //   console.log('scroll triggered', -newBlankSize);
        //   listRef.current?.scrollToEnd({ animated: true, viewOffset: -newBlankSize });
        // }, 0);

        // listRef.current?.scrollToEnd({ animated: true });
        console.log('scroll to end triggered with view offset', -newBlankSize);
        listRef.current?.scrollToEnd({ animated: true, viewOffset: -newBlankSize });
      }

      if (message.role === 'assistant' && blankSizeSV) {
        const assistantMessageHeight = event.nativeEvent.layout.height;

        const newBlankSize =
          availableHeight -
          (lastSentUserMessageHeightSV?.value ?? 0) -
          (composerHeightSV?.value ?? 0) -
          assistantMessageHeight;
        console.log('assistant message layout triggered', newBlankSize);

        blankSizeSV.value = newBlankSize;
      }
    },
    ref: blankSizeRef,
  };
}
