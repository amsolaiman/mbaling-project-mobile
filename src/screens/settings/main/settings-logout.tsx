import { router } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

// hooks
import { useAuthContext } from '@/auth/hooks';
// components
import useCustomAlert from '@/components/custom-alert';
import { ThemedText } from '@/components/themed-native';

// ----------------------------------------------------------------------

export default function SettingsLogout() {
  const { logout } = useAuthContext();

  const { alert } = useCustomAlert();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      const message =
        typeof error === 'string' ? error : (error as Error).message;

      alert({
        title: 'Unable to logout!',
        message: 'Please check your network and try again.',
      });
      // eslint-disable-next-line no-console
      console.error(message);
    }
  }, [logout, alert]);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Log out"
      onPress={handleLogout}
      style={styles.item}
    >
      <ThemedText font={600} numberOfLines={1} style={styles.title}>
        Log out
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
  },
});
