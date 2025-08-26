import { Button } from 'react-native-paper';
// components
import { ThemedText, ThemedView } from '@/components/themed-native';

// ----------------------------------------------------------------------

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1 items-center justify-center">
      <ThemedText className="mb-6 text-4xl !text-primary !font-semibold">Welcome!</ThemedText>

      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Press me!
      </Button>
    </ThemedView>
  );
}
