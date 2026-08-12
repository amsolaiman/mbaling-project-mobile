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
import { BOTTOM_TAB_BAR_INSET, Fonts, Spacing } from '@/styles';
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

export default function AccountStudentDetails() {
  const colorScheme = useColorScheme() ?? 'light';

  const { user } = useAuthContext();
  const userDetails = user as UserStudentResponse;

  const { alert } = useCustomAlert();

  const [current, setCurrent] = useState<StudentHousingResponse>();

  const [pending, setPending] = useState<StudentApplicationResponse>();

  const getData = useCallback(async () => {
    const currentHousing = userDetails?.details?.housingId;
    const pendingHousing = userDetails?.details?.applicationId;

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

      if (!currentHousing && !pendingHousing) return;
    } catch (error) {
      const message =
        typeof error === 'string' ? error : (error as Error).message;
      throw new Error(message);
    }
  }, [userDetails]);

  useEffect(() => {
    Promise.resolve().then(getData);
  }, [getData]);

  const handleDelete = () => {
    alert({
      message: 'Are you sure you want to delete this request?',
      buttons: [{ text: 'CANCEL' }, { text: 'YES', variant: 'contained' }],
    });
  };

  const handleRemove = () => {
    alert({
      message: 'Are you sure you want to remove this housing address?',
      buttons: [{ text: 'CANCEL' }, { text: 'YES', variant: 'contained' }],
    });
  };

  return (
    <View style={styles.container}>
      {current && (
        <View style={styles.wrapper}>
          <ThemedText
            style={{
              ...Fonts[600],
              fontSize: 16,
              color:
                colorScheme === 'light'
                  ? GREY_COLORS[700]
                  : COMMON_COLORS.white.main,
            }}
          >
            Campus housing
          </ThemedText>

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
          <ThemedText
            style={{
              ...Fonts[600],
              fontSize: 16,
              color:
                colorScheme === 'light'
                  ? GREY_COLORS[700]
                  : COMMON_COLORS.white.main,
            }}
          >
            Pending
          </ThemedText>

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
    paddingTop: Spacing.four,
    paddingBottom: BOTTOM_TAB_BAR_INSET + Spacing.four,
    flexDirection: 'column',
    gap: Spacing.four,
  },
  wrapper: {
    gap: 12,
  },
});
