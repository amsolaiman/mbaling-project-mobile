import { useCallback } from 'react';
import { Linking, Share, StyleSheet } from 'react-native';
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
import { IconActionShare, IconChatRound } from '@/assets/icons';

// ----------------------------------------------------------------------

type Props = {
  id: string;
  title: string;
  chatLink?: string | null;
};

export default function PostFooter({ id, title, chatLink }: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  const loading = useBoolean();

  const { user, isStudent } = useAuthContext();

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
      console.error(error);
    }
  }, [id, title]);

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
          function: () => handleChat(),
          icon: <IconChatRound size={24} color={Colors[colorScheme].text} />,
        }}
        rightAction={{
          function: () => handleShare(),
          icon: <IconActionShare size={24} color={Colors[colorScheme].text} />,
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
  buttonLabel: {
    marginVertical: 16,
    marginHorizontal: 24,
    fontSize: 14,
    ...Fonts[500],
  },
});
