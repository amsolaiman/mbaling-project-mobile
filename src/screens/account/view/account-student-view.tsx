import { ScrollView, StyleSheet, View } from 'react-native';

// auth
import { useAuthContext } from '@/auth/hooks';
// styles
import { Spacing } from '@/styles';
// types
import { UserStudentResponse } from '@/types/users';

//
import { UserHeroBanner } from '../../_components';
import AccountStudentDetails from '../account-student-details';

// ----------------------------------------------------------------------

export default function AccountStudentView() {
  const { user } = useAuthContext();
  const userDetails = user as UserStudentResponse;

  const data = {
    username: userDetails?.username,
    displayName: userDetails?.fullName,
    detailLine1: userDetails?.details?.degree,
    detailLine2: userDetails?.details?.college,
    avatarUrl: userDetails?.avatarUrl,
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <UserHeroBanner info={data} />

        <AccountStudentDetails />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
});
