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

      <Stack.Screen name="post/new" options={{ headerShown: false }} />
      <Stack.Screen name="post/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="post/[id]/edit" options={{ headerShown: false }} />
      <Stack.Screen name="profile/[id]" options={{ headerShown: false }} />

      <Stack.Screen name="settings/profile" options={{ headerShown: false }} />
      <Stack.Screen name="settings/account" options={{ headerShown: false }} />
      <Stack.Screen name="settings/account/username" options={{ headerShown: false }} />
      <Stack.Screen name="settings/account/password" options={{ headerShown: false }} />
      <Stack.Screen name="settings/account/email" options={{ headerShown: false }} />
      <Stack.Screen name="settings/account/mobile" options={{ headerShown: false }} />
      <Stack.Screen name="settings/account/address" options={{ headerShown: false }} />
      <Stack.Screen name="settings/account/housing" options={{ headerShown: false }} />
    </Stack>
  );
}
