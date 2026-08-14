import { useCallback } from 'react';
import { Linking, Share, StyleSheet } from 'react-native';

// assets
import { IconActionShare, IconChatRound } from '@/assets/icons';
// auth
import { useAuthContext } from '@/auth/hooks';
// components
import { AuthUserRoles } from '@/auth/types';
import Button from '@/components/_ui/button';
import useCustomAlert from '@/components/custom-alert';
import SpinnerOverlay from '@/components/spinner-overlay';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
import { useTheme } from '@/hooks/use-theme';
// styles
import { Fonts, Spacing } from '@/styles';
import { UserStudentResponse } from '@/types/users';

//
import { FooterActions } from '../../_components';

// ----------------------------------------------------------------------

type Props = {
  id: string;
  title: string;
  chatLink?: string | null;
};

export default function PostFooter({ id, title, chatLink }: Props) {
  const color = useTheme();

  const loading = useBoolean();

  const { user } = useAuthContext();
  const isStudent = user?.role === AuthUserRoles.STUDENT;

  const { alert } = useCustomAlert();

  const handleChat = useCallback(() => {
    if (chatLink) {
      Linking.openURL(chatLink);
    } else {
      alert({ message: 'This account has not provided a Messenger link.' });
    }
  }, [chatLink, alert]);

  const handleShare = useCallback(async () => {
    const link = `http://localhost:8081/post/${id}`;
    const message = `mBALING | ${title}\n\n${link}`;

    try {
      await Share.share({ message });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [id, title]);

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
          function: () => handleChat(),
          icon: <IconChatRound size={24} color={color.text} />,
        }}
        rightAction={{
          function: () => handleShare(),
          icon: <IconActionShare size={24} color={color.text} />,
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
            style={{ borderRadius: 50 }}
          >
            Apply
          </Button>
        )}
      </FooterActions>
    </>
  );
}

const styles = StyleSheet.create({
  buttonLabel: {
    marginVertical: Spacing.three,
    marginHorizontal: Spacing.four,
    fontSize: 14,
    ...Fonts[500],
  },
});
