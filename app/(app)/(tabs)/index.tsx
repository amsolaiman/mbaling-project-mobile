// components
import { ThemedText, ThemedView } from '@/components/themed-native';

// ----------------------------------------------------------------------

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1 items-center justify-center">
      <ThemedText className="text-4xl">Welcome!</ThemedText>
    </ThemedView>
  );
}
