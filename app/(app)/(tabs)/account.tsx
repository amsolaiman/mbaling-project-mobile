// auth
import { useAuthContext } from '@/auth/hooks';
// components
import { ThemedText, ThemedView } from '@/components/themed-native';
// screens
import { AccountStudentView } from '@/screens/account/view';

// ----------------------------------------------------------------------

export default function AccountScreen() {
  const { isStudent } = useAuthContext();

  if (isStudent) {
    return <AccountStudentView />;
  }

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <ThemedText className="text-4xl">Account</ThemedText>
    </ThemedView>
  );
}
