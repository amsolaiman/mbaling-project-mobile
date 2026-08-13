import { ScrollView, StyleSheet } from 'react-native';

// auth
import { useAuthContext } from '@/auth/hooks';
// components
import { ThemedKeyboardAvoidingView } from '@/components/themed-native';
// styles
import { Spacing } from '@/styles';
// types
import { UserLandlordResponse } from '@/types/users';

//
import { UserHeroBanner } from '../../_components';
import AccountTabPanel from '../account-tab-panel';

// ----------------------------------------------------------------------

export default function AccountLandlordView() {
  const { user } = useAuthContext();
  const userDetails = user as UserLandlordResponse;

  const data = {
    username: userDetails?.username,
    displayName: userDetails?.details.housingName,
    detailLine1: `${userDetails?.addressLine1}, ${userDetails?.addressLine2}`,
    detailLine2: `${userDetails?.addressLine3}, ${userDetails?.addressLine4}`,
    avatarUrl: userDetails?.avatarUrl,
  };

  return (
    <ThemedKeyboardAvoidingView>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
        <UserHeroBanner info={data} />

        <AccountTabPanel />
      </ScrollView>
    </ThemedKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.three,
  },
});
