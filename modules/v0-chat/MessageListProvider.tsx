import { LegendListRef } from '@legendapp/list';
import { createContext, use, useCallback, useRef } from 'react';
import { InteractionManager } from 'react-native';
import { BlankSizeContext } from './BlankSizeProvider';

interface MessageListContextValue {
  listRef: React.RefObject<LegendListRef | null>;
  scrollToEndWithOffset: () => void;
}

export const MessageListContext = createContext<MessageListContextValue | null>(null);

export function MessageListProvider({ children }: { children: React.ReactNode }) {
  const listRef = useRef<LegendListRef | null>(null);
  const { blankSizeSV } = use(BlankSizeContext);

  const scrollToEndWithOffset = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        // Reading .value here in an async callback is safe
        const viewOffset = -(blankSizeSV?.value ?? 0);
        listRef.current?.scrollToEnd({
          animated: true,
          viewOffset: 0,
        });
      }, 50);
    });
  }, [blankSizeSV]);

  return (
    <MessageListContext.Provider value={{ listRef, scrollToEndWithOffset }}>
      {children}
    </MessageListContext.Provider>
  );
}

export function useMessageList() {
  const context = use(MessageListContext);
  if (!context) {
    throw new Error('useMessageList must be used within a MessageListProvider');
  }
  return context;
}
