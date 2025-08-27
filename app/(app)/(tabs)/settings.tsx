import { useCallback } from 'react';
import { Pressable } from 'react-native';
// @expo
import { router } from 'expo-router';
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
      console.error(error);
    }
  }, [logout]);

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <Pressable onPress={handleLogout}>
        <ThemedText className="text-4xl">Settings</ThemedText>
      </Pressable>
    </ThemedView>
  );
}
