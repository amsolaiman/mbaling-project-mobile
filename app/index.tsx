import { View } from 'react-native';
import { Button } from 'react-native-paper';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// components
import Logo from '@/components/logo';
import { ThemedText, ThemedView } from '@/components/themed-native';

// ----------------------------------------------------------------------

export default function HomeScreen() {
  const loading = useBoolean(false);

  const handleClick = () => {
    loading.onTrue();
    setTimeout(() => {
      loading.onFalse();
    }, 2000);
  };

  return (
    <ThemedView loadingState={loading.value} className="flex-1 items-center justify-center">
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
