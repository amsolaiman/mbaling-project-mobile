import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// constants
import { COMMON_COLORS, GREY_COLORS } from '@/constants/theme';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/styles';
// styles

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
  leftAction?: {
    icon: React.ReactNode;
    function: VoidFunction;
  };
  rightAction?: {
    icon: React.ReactNode;
    function: VoidFunction;
  };
};

// ----------------------------------------------------------------------

export default function FooterActions({
  children,
  leftAction,
  rightAction,
}: Props) {
  const scheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            Colors[scheme === 'unspecified' ? 'light' : scheme].backgroundCard,
          borderTopColor:
            scheme === 'light' ? GREY_COLORS[100] : COMMON_COLORS.white[40],
        },
      ]}
    >
      <View style={styles.actionLeft}>
        {leftAction && (
          <TouchableOpacity onPress={leftAction.function}>
            {leftAction.icon}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.main}>{children}</View>

      <View style={styles.actionLeft}>
        {rightAction && (
          <TouchableOpacity onPress={rightAction.function}>
            {rightAction.icon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: Spacing.nine,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLeft: {
    padding: Spacing.four,
    minWidth: Spacing.five,
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionRight: {
    padding: Spacing.four,
    minWidth: Spacing.five,
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
