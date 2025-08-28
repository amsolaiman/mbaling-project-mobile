import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
// hooks
import { useAuthContext } from '@/auth/hooks';
import { useColorScheme } from '@/hooks/use-color-scheme';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';
// types
import { StudentApplicationResponse, StudentHousingResponse } from '@/types/housing';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// components
import useCustomAlert from '@/components/custom-alert';
import InfoBanner from '@/components/info-banner';
import { ThemedText } from '@/components/themed-native';
//
import { UserCard } from '../_components';

// ----------------------------------------------------------------------

export default function AccountStudentDetails() {
  const colorScheme = useColorScheme() ?? 'light';

  const { user } = useAuthContext();

  const { alert } = useCustomAlert();

  const [pending, setPending] = useState<StudentApplicationResponse>();

  const [current, setCurrent] = useState<StudentHousingResponse>();

  const getData = useCallback(async () => {
    try {
      if (user?.studentDetails.housingId) {
        const response = await axios.get(API_ENDPOINTS.student.housing(user?.id));

        setCurrent(response.data);
      } else {
        const response = await axios.get(API_ENDPOINTS.student.application(user?.id));

        setPending(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user?.id, user?.studentDetails.housingId]);

  useEffect(() => {
    getData();
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
              color: colorScheme === 'light' ? Colors.grey[700] : Colors.common.white.main,
            }}
          >
            Campus housing
          </ThemedText>

          <UserCard
            data={{
              name: current?.housingDetails.housingName,
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
              color: colorScheme === 'light' ? Colors.grey[700] : Colors.common.white.main,
            }}
          >
            Pending
          </ThemedText>

          <UserCard
            data={{
              name: pending?.housingDetails.housingDetails.housingName,
              username: pending?.housingDetails.username,
              avatarUrl: pending?.housingDetails.avatarUrl,
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
    paddingTop: 24,
    paddingBottom: 24 + 76,
    flexDirection: 'column',
    gap: 24,
  },
  wrapper: {
    gap: 12,
  },
});
