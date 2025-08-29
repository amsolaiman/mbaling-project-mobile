import { StyleSheet, View } from 'react-native';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// types
import { HousingApplicantResponse, HousingTenantResponse } from '@/types/housing';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// components
import useCustomAlert from '@/components/custom-alert';
import { ThemedText } from '@/components/themed-native';
//
import { UserCard } from '@/screens/_components';

// ----------------------------------------------------------------------

type Props = {
  pendingList?: HousingApplicantResponse[];
  currentList?: HousingTenantResponse[];
};

export default function AccountLandlordList({ pendingList, currentList }: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  const { alert } = useCustomAlert();

  const handleApprove = (id: string) => {
    console.log('User: ', id);
    alert({
      message: 'Approving this request will list the student as tenant. Do you want to continue?',
      buttons: [{ text: 'CANCEL' }, { text: 'YES', variant: 'contained' }],
    });
  };

  const handleReject = (id: string) => {
    console.log('User: ', id);
    alert({
      message: 'Are you sure you want to reject this request?',
      buttons: [{ text: 'CANCEL' }, { text: 'YES', variant: 'contained' }],
    });
  };

  const handleDelete = (id: string) => {
    console.log('User: ', id);
    alert({
      message: 'Are you sure you want to delete this tenant?',
      buttons: [{ text: 'CANCEL' }, { text: 'YES', variant: 'contained' }],
    });
  };

  const renderPending = pendingList?.map((item) => (
    <UserCard
      key={item.id}
      data={{
        name: item.studentDetails.fullName,
        username: item.studentDetails.username,
        avatarUrl: item.studentDetails.avatarUrl,
      }}
      onApprove={() => handleApprove(item.id)}
      onReject={() => handleReject(item.id)}
    />
  ));

  const renderCurrent = currentList?.map((item) => (
    <UserCard
      key={item.id}
      data={{
        name: item.fullName,
        username: item.username,
        avatarUrl: item.avatarUrl,
      }}
      onReject={() => handleDelete(item.id)}
    />
  ));

  return (
    <View style={styles.container}>
      {!!pendingList?.length && (
        <View style={styles.listWrapper}>
          <ThemedText
            style={{
              ...Fonts[600],
              fontSize: 16,
              color: colorScheme === 'light' ? Colors.grey[700] : Colors.common.white.main,
            }}
          >
            Pending
          </ThemedText>

          {renderPending}
        </View>
      )}

      <View style={styles.listWrapper}>
        <ThemedText
          style={{
            ...Fonts[600],
            fontSize: 16,
            color: colorScheme === 'light' ? Colors.grey[700] : Colors.common.white.main,
          }}
        >
          Current
        </ThemedText>

        {!!currentList?.length ? (
          renderCurrent
        ) : (
          <ThemedText style={styles.noResult}>No current tenants</ThemedText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 24,
  },
  listWrapper: {
    gap: 12,
  },
  noResult: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.grey[500],
  },
});
