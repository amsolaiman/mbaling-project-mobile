import { ScrollView, StyleSheet, View } from 'react-native';
// auth
import { useAuthContext } from '@/auth/hooks';
//
import { UserBanner } from '@/screens/_components';
import AccountStudentDetails from '../account-student-details';

// ----------------------------------------------------------------------

export default function AccountStudentView() {
  const { user } = useAuthContext();

  const data = {
    username: user?.username,
    displayName: user?.fullName,
    detailLine1: user?.studentDetails.degree,
    detailLine2: user?.studentDetails.college,
    avatarUrl: user?.avatarUrl,
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <UserBanner info={data} />

        <AccountStudentDetails />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
