import { StyleSheet, View } from 'react-native';
// styles
import Fonts from '@/styles/constants/Fonts';
// components
import { ThemedText, ThemedView } from '@/components/themed-native';

// ----------------------------------------------------------------------

type Props = {
  title: string;
  actionLeft?: React.ReactNode;
  actionRight?: React.ReactNode;
};

// ----------------------------------------------------------------------

export default function SettingsHeader({ title, actionLeft, actionRight }: Props) {
  return (
    <ThemedView style={[styles.container, styles.fixed]}>
      <View style={styles.actionLeft}>{actionLeft}</View>

      <View style={styles.label}>
        <ThemedText numberOfLines={1} style={styles.title}>
          {title}
        </ThemedText>
      </View>

      <View style={styles.actionRight}>{actionRight}</View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fixed: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  },
  label: {
    padding: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  title: {
    ...Fonts[500],
    fontSize: 18,
    maxWidth: '50%',
  },
  actionLeft: {
    flex: 1,
    paddingLeft: 16,
    paddingVertical: 4,
    minHeight: 24,
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 2,
  },
  actionRight: {
    flex: 1,
    paddingRight: 16,
    paddingVertical: 4,
    minHeight: 24,
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 2,
  },
});
