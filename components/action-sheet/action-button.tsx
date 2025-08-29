import React, { useCallback } from 'react';
import { Pressable, Share, StyleSheet, View } from 'react-native';
// @expo
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// components
import useCustomAlert from '@/components/custom-alert';
import { ThemedText } from '@/components/themed-native';
// assets
import {
  IconActionLink,
  IconActionMail,
  IconActionMessage,
  IconActionReport,
  IconActionShare,
} from '@/assets/icons/actions';
//
import { ActionBasicProps, ActionButtonProps } from './types';

// ----------------------------------------------------------------------

const ActionButton: React.FC<ActionButtonProps> = ({ label, icon, onPress }) => {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={[
          styles.button,
          {
            backgroundColor: colorScheme === 'light' ? Colors.grey[100] : Colors.common.white[40],
          },
        ]}
      >
        {icon}
      </Pressable>

      <ThemedText numberOfLines={1} style={styles.label}>
        {label}
      </ThemedText>
    </View>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    width: 60,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  label: {
    ...Fonts[300],
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
  },
});

// ----------------------------------------------------------------------

export const IconStyles = () => {
  const colorScheme = useColorScheme() ?? 'light';

  return {
    size: 30,
    color: Colors[colorScheme].text,
  };
};

export const ActionButtonCopy: React.FC<ActionBasicProps> = ({ meta, onClose = () => {} }) => {
  const handlePress = useCallback(async () => {
    try {
      await Clipboard.setStringAsync(meta.link);
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [meta.link, onClose]);

  return (
    <ActionButton
      label="Copy link"
      onPress={handlePress}
      icon={<IconActionLink variant="outline" {...IconStyles()} />}
    />
  );
};

export const ActionButtonShare: React.FC<ActionBasicProps> = ({ meta, onClose = () => {} }) => {
  const handlePress = useCallback(async () => {
    const message = `mBALING | ${meta.title}\n\n${meta.link}`;
    try {
      await Share.share({ message });
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [meta.link, meta.title, onClose]);

  return (
    <ActionButton
      label="Share"
      onPress={handlePress}
      icon={<IconActionShare variant="outline" {...IconStyles()} />}
    />
  );
};

export const ActionButtonMessage: React.FC<ActionBasicProps> = ({ meta, onClose = () => {} }) => {
  const { alert } = useCustomAlert();

  const handlePress = useCallback(async () => {
    const message = `mBALING | ${meta.title}\n\n${meta.link}`;
    try {
      const url = `sms:?body=${encodeURIComponent(message)}`;
      await Linking.openURL(url).catch(() => {
        alert({ message: 'Failed to open messaging app.' });
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [alert, meta.link, meta.title, onClose]);

  return (
    <ActionButton
      label="Message"
      onPress={handlePress}
      icon={<IconActionMessage variant="outline" {...IconStyles()} />}
    />
  );
};

export const ActionButtonEmail: React.FC<ActionBasicProps> = ({ meta, onClose = () => {} }) => {
  const { alert } = useCustomAlert();

  const handlePress = useCallback(async () => {
    const message = `mBALING | ${meta.title}\n\n${meta.link}`;
    try {
      const url = `mailto:?body=${encodeURIComponent(message)}`;
      await Linking.openURL(url).catch(() => {
        alert({ message: 'Failed to open mailing app.' });
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [alert, meta.link, meta.title, onClose]);

  return (
    <ActionButton
      label="Email"
      onPress={handlePress}
      icon={<IconActionMail variant="outline" {...IconStyles()} />}
    />
  );
};

export const ActionButtonReport: React.FC<ActionBasicProps> = ({ onClose = () => {} }) => {
  const { alert } = useCustomAlert();

  const handlePress = useCallback(() => {
    alert({ title: 'Oops!', message: 'This feature is not yet available.' });
    onClose();
  }, [alert, onClose]);

  return (
    <ActionButton
      label="Report"
      onPress={handlePress}
      icon={<IconActionReport {...IconStyles()} />}
    />
  );
};
