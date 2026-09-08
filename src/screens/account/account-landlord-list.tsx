/* eslint-disable no-console */

import { StyleSheet, View } from 'react-native';

// components
import useCustomAlert from '@/components/custom-alert';
import { ThemedText } from '@/components/themed-native';
// constants
import { COMMON_COLORS, GREY_COLORS } from '@/constants/theme';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import { Spacing } from '@/styles';
// types
import {
  HousingApplicantResponse,
  HousingTenantResponse,
} from '@/types/housing';

//
import { UserActionCard } from '../_components';

// ----------------------------------------------------------------------

function SectionTitle({ children }: { children: string }) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ThemedText
      font={600}
      style={{
        fontSize: 16,
        color:
          colorScheme === 'light' ? GREY_COLORS[700] : COMMON_COLORS.white.main,
      }}
    >
      {children}
    </ThemedText>
  );
}

// ----------------------------------------------------------------------

type Props = {
  pendingList?: HousingApplicantResponse[];
  currentList?: HousingTenantResponse[];
};

export default function AccountLandlordList({
  pendingList,
  currentList,
}: Props) {
  const { alert } = useCustomAlert();

  const confirmAction = (id: string, message: string) => {
    console.log('User: ', id);
    alert({
      message,
      buttons: [{ label: 'Cancel' }, { label: 'Yes', variant: 'contained' }],
    });
  };

  const handleApprove = (id: string) =>
    confirmAction(
      id,
      'Approving this request will list the student as tenant. Do you want to continue?'
    );

  const handleReject = (id: string) =>
    confirmAction(id, 'Are you sure you want to reject this request?');

  const handleDelete = (id: string) =>
    confirmAction(id, 'Are you sure you want to delete this tenant?');

  return (
    <View style={styles.container}>
      {!!pendingList?.length && (
        <View style={styles.listWrapper}>
          <SectionTitle>Pending</SectionTitle>

          {pendingList.map((item) => (
            <UserActionCard
              key={item.id}
              data={{
                name: item.studentDetails.fullName,
                username: item.studentDetails.username,
                avatarUrl: item.studentDetails.avatarUrl,
              }}
              onApprove={() => handleApprove(item.id)}
              onReject={() => handleReject(item.id)}
            />
          ))}
        </View>
      )}

      <View style={styles.listWrapper}>
        <SectionTitle>Current tenants</SectionTitle>

        {currentList?.length ? (
          currentList.map((item) => (
            <UserActionCard
              key={item.id}
              data={{
                name: item.fullName,
                username: item.username,
                avatarUrl: item.avatarUrl,
              }}
              onReject={() => handleDelete(item.id)}
            />
          ))
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
    gap: Spacing.five,
  },
  listWrapper: {
    gap: Spacing.three,
  },
  noResult: {
    fontSize: 18,
    textAlign: 'center',
    color: GREY_COLORS[500],
  },
});
