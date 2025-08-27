// @expo
import { Stack } from 'expo-router';

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
