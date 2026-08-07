import { router } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';

// auth
import { useAuthContext } from '@/auth/hooks';
// components
import { ThemedText, ThemedView } from '@/components/themed-native';

// ----------------------------------------------------------------------

export default function SettingsScreen() {
  const { logout } = useAuthContext();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [logout]);

  return (
    <ThemedView style={styles.container}>
      <Pressable onPress={handleLogout}>
        <ThemedText font={600} style={styles.title}>
          Settings
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    lineHeight: 52,
    textAlign: 'center',
  },
});
