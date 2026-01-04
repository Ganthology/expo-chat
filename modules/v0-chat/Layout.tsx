import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlankSizeProvider } from './BlankSizeProvider';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout for the v0-chat experiment.
 * Add experiment-specific providers here if needed.
 */
export function Layout({ children }: LayoutProps) {
  const { top } = useSafeAreaInsets();

  return (
    <BlankSizeProvider>
      <View style={[styles.container, { paddingTop: top }]}>{children}</View>
    </BlankSizeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
