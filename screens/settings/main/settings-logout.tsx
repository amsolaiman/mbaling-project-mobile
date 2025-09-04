import { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// @expo
import { router } from 'expo-router';
// hooks
import { useAuthContext } from '@/auth/hooks';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
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
      console.error(error);
      alert({ title: 'Unable to logout!', message: 'Please check your network and try again.' });
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
    paddingBottom: 24 + 76,
  },
  header: {
    marginBottom: 16,
    fontSize: 14,
    color: Colors.grey[600],
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
