import * as Linking from 'expo-linking';
import React from 'react';
import { Platform } from 'react-native';

// assets
import {
  IconCloseCircle,
  IconSocialDiscord,
  IconSocialMessenger,
  IconSocialTelegram,
  IconSocialViber,
  IconSocialWhatsapp,
} from '@/assets/icons';

//
import { IconStyles } from './action-button';
import { SocialAppNames } from './types';

// ----------------------------------------------------------------------

const socialAppsChecking = async (): Promise<SocialAppNames[]> => {
  const appsAvailability: Record<SocialAppNames, boolean> = {
    [SocialAppNames.DISCORD]: await Linking.canOpenURL('discord://'),
    [SocialAppNames.MESSENGER]: await Linking.canOpenURL('fb-messenger://'),
    [SocialAppNames.TELEGRAM]: await Linking.canOpenURL('tg://'),
    [SocialAppNames.VIBER]: await Linking.canOpenURL('viber://'),
    [SocialAppNames.WHATSAPP]: await Linking.canOpenURL('whatsapp://'),
  };

  return (Object.keys(appsAvailability) as SocialAppNames[]).filter(
    (app) => appsAvailability[app]
  );
};

export default socialAppsChecking;

// ----------------------------------------------------------------------

export const socialsReaderIcon = (name: string): React.ReactNode => {
  switch (name) {
    case SocialAppNames.DISCORD:
      return <IconSocialDiscord size={30} />;
    case SocialAppNames.MESSENGER:
      return <IconSocialMessenger size={30} />;
    case SocialAppNames.TELEGRAM:
      return <IconSocialTelegram size={30} />;
    case SocialAppNames.VIBER:
      return <IconSocialViber size={30} />;
    case SocialAppNames.WHATSAPP:
      return <IconSocialWhatsapp size={30} />;
    default:
      return <IconCloseCircle variant="outline" {...IconStyles()} />;
  }
};

export const socialsReaderUrl = (name: string, message: string): string => {
  const encoded = encodeURIComponent(message);

  switch (name) {
    case SocialAppNames.DISCORD:
      return (
        Platform.select({
          ios: `discord://`,
          android: `discord://invite?text=${encoded}`,
        }) ?? ''
      );
    case SocialAppNames.MESSENGER:
      return (
        Platform.select({
          ios: `fb-messenger://share?link=${encoded}`,
          android: `fb-messenger://share?text=${encoded}`,
        }) ?? ''
      );
    case SocialAppNames.TELEGRAM:
      return `tg://msg?text=${encoded}`;
    case SocialAppNames.VIBER:
      return `viber://forward?text=${encoded}`;
    case SocialAppNames.WHATSAPP:
      return `whatsapp://send?text=${encoded}`;
    default:
      return `sms:?body=${encoded}`;
  }
};
