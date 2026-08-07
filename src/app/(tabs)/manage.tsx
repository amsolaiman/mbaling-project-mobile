import { StyleSheet } from 'react-native';

// auth
import { RoleBasedGuard } from '@/auth/guard';
import { AuthUserRoles } from '@/auth/types';
// components
import { ThemedText, ThemedView } from '@/components/themed-native';

// ----------------------------------------------------------------------

export default function ManageScreen() {
  return (
    <RoleBasedGuard roles={[AuthUserRoles.LANDLORD]}>
      <ThemedView style={styles.container}>
        <ThemedText font={600} style={styles.title}>
          Manage
        </ThemedText>
      </ThemedView>
    </RoleBasedGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    lineHeight: 52,
    textAlign: 'center',
  },
});
