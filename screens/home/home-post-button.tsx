import { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
// @expo
import { router } from 'expo-router';
// styles
import Colors from '@/styles/constants/Colors';
// assets
import { IconPin } from '@/assets/icons';

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
          color: Colors.common.black[20],
          borderless: false,
        }}
        style={styles.button}
      >
        <IconPin color={Colors.common.white.main} size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 8,
    right: 8,
    overflow: 'hidden',
    borderRadius: 50,
    zIndex: 999,
  },
  button: {
    flex: 1,
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});
