import { useCallback } from 'react';
import { Linking, StyleSheet } from 'react-native';

// assets
import { IconChatRound, IconMapPoint } from '@/assets/icons';
// auth
import { useAuthContext } from '@/auth/hooks';
import { AuthUserRoles } from '@/auth/types';
// components
import Button from '@/components/_ui/button';
import useCustomAlert from '@/components/custom-alert';
import SpinnerOverlay from '@/components/spinner-overlay';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
import { useTheme } from '@/hooks/use-theme';
// styles
import { Fonts, Spacing } from '@/styles';
// types
import { UserStudentResponse } from '@/types/users';

//
import { FooterActions } from '../_components';

// ----------------------------------------------------------------------

type Props = {
  id: string;
  mapLink?: string | null;
  chatLink?: string | null;
};

export default function ProfileFooter({ id, mapLink, chatLink }: Props) {
  const color = useTheme();

  const loading = useBoolean();

  const { user } = useAuthContext();
  const isStudent = user?.role === AuthUserRoles.STUDENT;

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
      message:
        'An application request will be sent to the landlord. Do you want to continue?',
      buttons: [
        { text: 'CANCEL' },
        { text: 'YES', onPress: onSubmit, variant: 'contained' },
      ],
    });
  };

  const onSubmit = useCallback(async () => {
    loading.onTrue();

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert({ message: 'Success! Your application has been sent.' });
    } catch {
      alert({ message: 'Oops! Application could not be sent.' });
    } finally {
      loading.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, alert, loading.onTrue, loading.onFalse]);

  return (
    <>
      <SpinnerOverlay state={loading.value} caption="Sending..." />

      <FooterActions
        leftAction={{
          function: () => handleViewChat(),
          icon: <IconChatRound size={24} color={color.text} />,
        }}
        rightAction={{
          function: () => handleViewMap(),
          icon: <IconMapPoint size={24} color={color.text} />,
        }}
      >
        {isStudent && (
          <Button
            onPress={handleApply}
            labelStyle={styles.buttonLabel}
            disabled={
              !!(user as UserStudentResponse)?.details?.housingId ||
              !!(user as UserStudentResponse)?.details?.applicationId
            }
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
    marginVertical: Spacing.three,
    marginHorizontal: Spacing.four,
    fontSize: 14,
    ...Fonts[500],
  },
});
