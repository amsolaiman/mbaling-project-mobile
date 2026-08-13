/* eslint-disable no-console */

import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import React, { useCallback } from 'react';
import { Pressable, Share, StyleSheet, View } from 'react-native';

// assets
import {
  IconActionChat,
  IconActionFlag,
  IconActionLetter,
  IconActionLink,
  IconActionShare,
} from '@/assets/icons';
// components
import useCustomAlert from '@/components/custom-alert';
import { ThemedText } from '@/components/themed-native';
// constants
import { COMMON_COLORS, GREY_COLORS } from '@/constants/theme';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import { Fonts, Spacing } from '@/styles';

//
import { socialsReaderIcon, socialsReaderUrl } from './action-socials';
import {
  ActionBasicProps,
  ActionButtonLinkProps,
  ActionButtonProps,
  SocialAppNames,
} from './types';
import { actionIconStyles, buildShareMessage } from './utils';

// ----------------------------------------------------------------------

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onPress,
}) => {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={[
          styles.button,
          {
            backgroundColor:
              colorScheme === 'light'
                ? GREY_COLORS[100]
                : COMMON_COLORS.white[40],
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
    gap: Spacing.two,
  },
  button: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  },
  label: {
    ...Fonts[300],
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
  },
});

// ----------------------------------------------------------------------
// Shared button for anything that opens a URL built from the share message
// (Message, Email, and each social app all use this).

const ActionButtonLink: React.FC<ActionButtonLinkProps> = ({
  label,
  icon,
  buildUrl,
  meta,
  onClose = () => {},
}) => {
  const { alert } = useCustomAlert();

  const handlePress = useCallback(async () => {
    try {
      const url = buildUrl(buildShareMessage(meta));

      await Linking.openURL(url).catch(() => {
        alert({ message: 'Failed to open app.' });
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [alert, buildUrl, meta, onClose]);

  return <ActionButton label={label} onPress={handlePress} icon={icon} />;
};

// ----------------------------------------------------------------------

export const ActionButtonCopy: React.FC<ActionBasicProps> = ({
  meta,
  onClose = () => {},
}) => {
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
      icon={<IconActionLink variant="outline" {...actionIconStyles()} />}
    />
  );
};

export const ActionButtonShare: React.FC<ActionBasicProps> = ({
  meta,
  onClose = () => {},
}) => {
  const handlePress = useCallback(async () => {
    try {
      await Share.share({ message: buildShareMessage(meta) });
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [meta, onClose]);

  return (
    <ActionButton
      label="Share"
      onPress={handlePress}
      icon={<IconActionShare variant="outline" {...actionIconStyles()} />}
    />
  );
};

export const ActionButtonMessage: React.FC<ActionBasicProps> = ({
  meta,
  onClose,
}) => (
  <ActionButtonLink
    label="Message"
    icon={<IconActionChat variant="outline" {...actionIconStyles()} />}
    buildUrl={(message) => `sms:?body=${encodeURIComponent(message)}`}
    meta={meta}
    onClose={onClose}
  />
);

export const ActionButtonEmail: React.FC<ActionBasicProps> = ({
  meta,
  onClose,
}) => (
  <ActionButtonLink
    label="Email"
    icon={<IconActionLetter variant="outline" {...actionIconStyles()} />}
    buildUrl={(message) => `mailto:?body=${encodeURIComponent(message)}`}
    meta={meta}
    onClose={onClose}
  />
);

export const ActionButtonSocial: React.FC<
  ActionBasicProps & { name: SocialAppNames }
> = ({ name, meta, onClose }) => (
  <ActionButtonLink
    label={name}
    icon={socialsReaderIcon(name)}
    buildUrl={(message) => socialsReaderUrl(name, message)}
    meta={meta}
    onClose={onClose}
  />
);

export const ActionButtonReport: React.FC<ActionBasicProps> = ({
  onClose = () => {},
}) => {
  const { alert } = useCustomAlert();

  const handlePress = useCallback(() => {
    alert({ title: 'Oops!', message: 'This feature is not yet available.' });
    onClose();
  }, [alert, onClose]);

  return (
    <ActionButton
      label="Report"
      onPress={handlePress}
      icon={<IconActionFlag {...actionIconStyles()} />}
    />
  );
};
