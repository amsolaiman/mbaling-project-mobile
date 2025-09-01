// @expo
import { Redirect, Stack } from 'expo-router';
// auth
import { useAuthContext } from '@/auth/hooks';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { unauthenticated } = useAuthContext();

  if (unauthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="post/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
