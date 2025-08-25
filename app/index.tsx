import { Button } from 'react-native-paper';
// components
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// ----------------------------------------------------------------------

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1 items-center justify-center">
      <ThemedText font="600" className="mb-6 text-4xl">
        Welcome!
      </ThemedText>

      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Press me!
      </Button>
    </ThemedView>
  );
}
