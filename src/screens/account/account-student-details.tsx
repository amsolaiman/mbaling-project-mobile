/* eslint-disable no-console */

import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

// auth
import { useAuthContext } from '@/auth/hooks';
// components
import useCustomAlert from '@/components/custom-alert';
import InfoBanner from '@/components/info-banner';
import { ThemedText } from '@/components/themed-native';
// constants
import { COMMON_COLORS, GREY_COLORS } from '@/constants/theme';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import { BOTTOM_TAB_BAR_INSET, Spacing } from '@/styles';
// types
import {
  StudentApplicationResponse,
  StudentHousingResponse,
} from '@/types/housing';
import { UserStudentResponse } from '@/types/users';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';

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

export default function AccountStudentDetails() {
  const { user } = useAuthContext();
  const userDetails = user as UserStudentResponse;

  const { alert } = useCustomAlert();

  const [current, setCurrent] = useState<StudentHousingResponse>();
  const [pending, setPending] = useState<StudentApplicationResponse>();

  const getData = useCallback(async () => {
    const currentHousing = userDetails?.details?.housingId;
    const pendingHousing = userDetails?.details?.applicationId;

    if (!currentHousing && !pendingHousing) return;

    try {
      if (currentHousing) {
        const response = await axios.get(
          API_ENDPOINTS.student.housing(userDetails?.id)
        );
        setCurrent(response.data);
      }

      if (pendingHousing) {
        const response = await axios.get(
          API_ENDPOINTS.student.application(userDetails?.id)
        );
        setPending(response.data);
      }
    } catch (error) {
      const message =
        typeof error === 'string' ? error : (error as Error).message;
      console.error(message);
    }
  }, [userDetails]);

  useEffect(() => {
    Promise.resolve().then(getData);
  }, [getData]);

  const handleDelete = () => {
    alert({
      message: 'Are you sure you want to delete this request?',
      buttons: [{ label: 'Cancel' }, { label: 'Yes', variant: 'contained' }],
    });
  };

  const handleRemove = () => {
    alert({
      message: 'Are you sure you want to remove this housing address?',
      buttons: [{ label: 'Cancel' }, { label: 'Yes', variant: 'contained' }],
    });
  };

  return (
    <View style={styles.container}>
      {current && (
        <View style={styles.wrapper}>
          <SectionTitle>Campus housing</SectionTitle>

          <UserActionCard
            data={{
              name: current?.details?.housingName,
              username: current?.username,
              avatarUrl: current?.avatarUrl,
            }}
            onReject={handleRemove}
          />
        </View>
      )}

      {(!current || pending) && (
        <InfoBanner
          title="Set your campus housing"
          caption="Please set your campus housing address to complete your student record."
          instruction="Go to your landlord profile > click Apply."
        />
      )}

      {pending && (
        <View style={styles.wrapper}>
          <SectionTitle>Pending</SectionTitle>

          <UserActionCard
            data={{
              name: pending?.housingDetails?.details?.housingName,
              username: pending?.housingDetails?.username,
              avatarUrl: pending?.housingDetails?.avatarUrl,
            }}
            onReject={handleDelete}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.five,
    paddingBottom: BOTTOM_TAB_BAR_INSET + Spacing.five,
    flexDirection: 'column',
    gap: Spacing.five,
  },
  wrapper: {
    gap: Spacing.three,
  },
});
