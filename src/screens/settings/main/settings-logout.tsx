import { router } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// hooks
import { useAuthContext } from '@/auth/hooks';
// components
import useCustomAlert from '@/components/custom-alert';
import { ThemedText } from '@/components/themed-native';
// constants
import { GREY_COLORS } from '@/constants/theme';
// styles
import { BOTTOM_TAB_BAR_INSET, Fonts, Spacing } from '@/styles';

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
    <View style={styles.container}>
      <ThemedText style={styles.header}>Actions</ThemedText>

      <TouchableOpacity onPress={handleLogout} style={styles.item}>
        <ThemedText numberOfLines={1} style={styles.title}>
          Log out
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: BOTTOM_TAB_BAR_INSET + Spacing.five,
  },
  header: {
    marginBottom: Spacing.four,
    fontSize: 14,
    color: GREY_COLORS[600],
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...Fonts[600],
    flex: 1,
    fontSize: 18,
  },
});
