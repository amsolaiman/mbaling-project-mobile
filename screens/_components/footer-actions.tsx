import { StyleSheet, TouchableOpacity, View } from 'react-native';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import Colors from '@/styles/constants/Colors';

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

export default function FooterActions({ children, leftAction, rightAction }: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme].card,
          borderTopColor: colorScheme === 'light' ? Colors.grey[100] : Colors.common.white[40],
        },
      ]}
    >
      <View style={styles.actionLeft}>
        {leftAction && (
          <TouchableOpacity onPress={leftAction.function}>{leftAction.icon}</TouchableOpacity>
        )}
      </View>

      <View style={styles.main}>{children}</View>

      <View style={styles.actionLeft}>
        {rightAction && (
          <TouchableOpacity onPress={rightAction.function}>{rightAction.icon}</TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
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
    padding: 16,
    minWidth: 24,
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionRight: {
    padding: 16,
    minWidth: 24,
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
