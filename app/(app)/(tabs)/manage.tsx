// auth
import { RoleBasedGuard } from '@/auth/guard';
// components
import { ThemedText, ThemedView } from '@/components/themed-native';

// ----------------------------------------------------------------------

export default function ManageScreen() {
  return (
    <RoleBasedGuard roles={['landlord']}>
      <ThemedView className="flex-1 items-center justify-center">
        <ThemedText className="text-4xl">Manage</ThemedText>
      </ThemedView>
    </RoleBasedGuard>
  );
}
