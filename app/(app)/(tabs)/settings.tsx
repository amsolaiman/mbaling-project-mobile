// @expo
import { Link } from 'expo-router';
// components
import { ThemedText, ThemedView } from '@/components/themed-native';

// ----------------------------------------------------------------------

export default function SettingsScreen() {
  return (
    <ThemedView className="flex-1 items-center justify-center">
      <Link href="/login">
        <ThemedText className="text-4xl">Settings</ThemedText>
      </Link>
    </ThemedView>
  );
}
