import React from 'react';
import { StyleSheet, View } from 'react-native';

// components
import { ThemedText, ThemedView } from '@/components/themed-native';
// styles
import { Fonts, Spacing } from '@/styles';

// ----------------------------------------------------------------------

type Props = {
  title: string;
  actionLeft?: React.ReactNode;
  actionRight?: React.ReactNode;
};

// ----------------------------------------------------------------------

export default function SettingsHeader({
  title,
  actionLeft,
  actionRight,
}: Props) {
  return (
    <ThemedView style={styles.container}>
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
    minHeight: Spacing.eight,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    padding: Spacing.four,
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
    paddingLeft: Spacing.four,
    paddingVertical: Spacing.one,
    minHeight: Spacing.five,
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 2,
  },
  actionRight: {
    flex: 1,
    paddingRight: Spacing.four,
    paddingVertical: Spacing.one,
    minHeight: Spacing.five,
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 2,
  },
});
