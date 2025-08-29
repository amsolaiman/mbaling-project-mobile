import { ScrollView, StyleSheet } from 'react-native';
// auth
import { useAuthContext } from '@/auth/hooks';
// components
import { ThemedKeyboardAvoidingView } from '@/components/themed-native';
//
import { UserBanner } from '@/screens/_components';
import AccountTabPanel from '../account-tab-panel';

// ----------------------------------------------------------------------

export default function AccountLandlordView() {
  const { user } = useAuthContext();

  const data = {
    username: user?.username,
    displayName: user?.housingDetails.housingName,
    detailLine1: `${user?.addressLine1}, ${user?.addressLine2}`,
    detailLine2: `${user?.addressLine3}, ${user?.addressLine4}`,
    avatarUrl: user?.avatarUrl,
  };

  return (
    <ThemedKeyboardAvoidingView>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
        <UserBanner info={data} />

        <AccountTabPanel />
      </ScrollView>
    </ThemedKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
