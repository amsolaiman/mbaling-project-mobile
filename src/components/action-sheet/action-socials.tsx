import * as Linking from 'expo-linking';
import React from 'react';
import { Platform } from 'react-native';

// assets
import {
  IconSocialDiscord,
  IconSocialMessenger,
  IconSocialTelegram,
  IconSocialViber,
  IconSocialWhatsapp,
} from '@/assets/icons';

//
import { SocialAppNames } from './types';

// ----------------------------------------------------------------------

const URL_SCHEMES: Record<SocialAppNames, string> = {
  [SocialAppNames.DISCORD]: 'discord://',
  [SocialAppNames.MESSENGER]: 'fb-messenger://',
  [SocialAppNames.TELEGRAM]: 'tg://',
  [SocialAppNames.VIBER]: 'viber://',
  [SocialAppNames.WHATSAPP]: 'whatsapp://',
};

const socialAppsChecking = async (): Promise<SocialAppNames[]> => {
  const entries = await Promise.all(
    (Object.values(SocialAppNames) as SocialAppNames[]).map(async (app) => {
      const canOpen = await Linking.canOpenURL(URL_SCHEMES[app]);
      return [app, canOpen] as const;
    })
  );

  return entries.filter(([, canOpen]) => canOpen).map(([app]) => app);
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
      return null;
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
