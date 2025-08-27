// auth
import { RoleBasedGuard } from '@/auth/guard';
// components
import { ThemedText, ThemedView } from '@/components/themed-native';

// ----------------------------------------------------------------------

export default function SearchScreen() {
  return (
    <RoleBasedGuard roles={['student']}>
      <ThemedView className="flex-1 items-center justify-center">
        <ThemedText className="text-4xl">Search</ThemedText>
      </ThemedView>
    </RoleBasedGuard>
  );
}
