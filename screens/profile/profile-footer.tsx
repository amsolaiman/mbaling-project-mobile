import { useCallback } from 'react';
import { Linking, StyleSheet } from 'react-native';
// hooks
import { useAuthContext } from '@/auth/hooks';
import { useBoolean } from '@/hooks/use-boolean';
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// components
import Button from '@/components/button';
import useCustomAlert from '@/components/custom-alert';
import SpinnerOverlay from '@/components/spinner-overlay';
import { FooterActions } from '@/screens/_components';
// assets
import { IconChatRound, IconMapPoint } from '@/assets/icons';

// ----------------------------------------------------------------------
type Props = {
  id: string;
  mapLink?: string | null;
  chatLink?: string | null;
};

export default function ProfileFooter({ id, mapLink, chatLink }: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  const loading = useBoolean();

  const { user, isStudent } = useAuthContext();

  const { alert } = useCustomAlert();

  const handleViewChat = useCallback(() => {
    if (chatLink) {
      Linking.openURL(chatLink);
    } else {
      alert({ message: 'This account has not provided a Messenger link.' });
    }
  }, [chatLink, alert]);

  const handleViewMap = useCallback(() => {
    if (mapLink) {
      Linking.openURL(mapLink);
    } else {
      alert({ message: 'This account has not provided a Google Map link.' });
    }
  }, [mapLink, alert]);

  const handleApply = () => {
    alert({
      message: 'An application request will be sent to the landlord. Do you want to continue?',
      buttons: [{ text: 'CANCEL' }, { text: 'YES', onPress: onSubmit, variant: 'contained' }],
    });
  };

  const onSubmit = useCallback(async () => {
    loading.onTrue();

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      alert({ message: 'Success! Your application has been sent.' });
      console.info('DATA', id);
    } catch (error) {
      alert({ message: 'Oops! Application could not be sent.' });
      console.error(error);
    } finally {
      loading.onFalse();
    }
  }, [id, alert, loading]);

  return (
    <>
      <SpinnerOverlay state={loading.value} caption="Sending..." />

      <FooterActions
        leftAction={{
          function: () => handleViewChat(),
          icon: <IconChatRound size={24} color={Colors[colorScheme].text} />,
        }}
        rightAction={{
          function: () => handleViewMap(),
          icon: <IconMapPoint size={24} color={Colors[colorScheme].text} />,
        }}
      >
        {isStudent && (
          <Button
            onPress={handleApply}
            labelStyle={styles.buttonLabel}
            disabled={!!user?.studentDetails.housingId || !!user?.studentDetails.applicationId}
          >
            Apply
          </Button>
        )}
      </FooterActions>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonLabel: {
    marginVertical: 16,
    marginHorizontal: 24,
    fontSize: 14,
    ...Fonts[500],
  },
});
