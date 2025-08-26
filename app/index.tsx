import { View } from 'react-native';
import { Button } from 'react-native-paper';
// components
import Logo from '@/components/logo';
import { ThemedText, ThemedView } from '@/components/themed-native';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <ThemedView loadingState={loading} className="flex-1 items-center justify-center">
      <View className="mb-4">
        <Logo color="dark" />
      </View>

      <ThemedText className="mb-12 text-4xl !font-semibold">Welcome!</ThemedText>

      <Button mode="contained" onPress={handleClick}>
        Press me!
      </Button>
    </ThemedView>
  );
}
