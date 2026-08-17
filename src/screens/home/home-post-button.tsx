import { router } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

// assets
import { IconPin } from '@/assets/icons';
// constants
import { COLOR_PRIMARY, COMMON_COLORS } from '@/constants/theme';
// styles
import { Spacing } from '@/styles';

// ----------------------------------------------------------------------

export default function HomePostButton() {
  const handlePress = useCallback(() => {
    router.push('/post/new');
  }, []);

  return (
    <View style={[styles.container, styles.shadow]}>
      <Pressable
        onPress={handlePress}
        android_ripple={{
          color: COMMON_COLORS.black[20],
          borderless: false,
        }}
        style={styles.button}
      >
        <IconPin color={COMMON_COLORS.white.main} size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Spacing.two,
    right: Spacing.two,
    overflow: 'hidden',
    borderRadius: '50%',
    zIndex: 999,
  },
  button: {
    flex: 1,
    height: Spacing.eight,
    width: Spacing.eight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_PRIMARY,
  },
  shadow: {
    shadowColor: COMMON_COLORS.black.main,
    shadowOffset: {
      width: 0,
      height: Spacing.one,
    },
    shadowOpacity: 0.25,
    shadowRadius: Spacing.one,
    elevation: Spacing.one,
  },
});
