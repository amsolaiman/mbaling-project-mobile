import { View } from 'react-native';
import { Button } from 'react-native-paper';
// components
import Logo from '@/components/logo';
import { ThemedText, ThemedView } from '@/components/themed-native';

// ----------------------------------------------------------------------

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1 items-center justify-center">
      <View className="mb-4">
        <Logo color="dark" />
      </View>

      <ThemedText className="mb-12 text-4xl !font-semibold">Welcome!</ThemedText>

      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Press me!
      </Button>
    </ThemedView>
  );
}
