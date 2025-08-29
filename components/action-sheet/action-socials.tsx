import { Platform } from 'react-native';
// @expo
import * as Linking from 'expo-linking';
// assets
import { IconCloseCircle } from '@/assets/icons';
import {
  IconSocialDiscord,
  IconSocialMessenger,
  IconSocialTelegram,
  IconSocialViber,
  IconSocialWhatsapp,
} from '@/assets/icons/socials';
//
import { IconStyles } from './action-button';

// ----------------------------------------------------------------------

type SocialAppName = 'Discord' | 'Messenger' | 'Telegram' | 'Viber' | 'WhatsApp';

const socialAppsChecking = async (): Promise<SocialAppName[]> => {
  const appsAvailability: Record<SocialAppName, boolean> = {
    Discord: await Linking.canOpenURL('discord://'),
    Messenger: await Linking.canOpenURL('fb-messenger://'),
    Telegram: await Linking.canOpenURL('tg://'),
    Viber: await Linking.canOpenURL('viber://'),
    WhatsApp: await Linking.canOpenURL('whatsapp://'),
  };

  return (Object.keys(appsAvailability) as SocialAppName[]).filter((app) => appsAvailability[app]);
};

export default socialAppsChecking;

// ----------------------------------------------------------------------

export const socialsReaderIcon = (name: string): React.ReactNode => {
  switch (name) {
    case 'Discord':
      return <IconSocialDiscord size={30} />;
    case 'Messenger':
      return <IconSocialMessenger size={30} />;
    case 'Telegram':
      return <IconSocialTelegram size={30} />;
    case 'Viber':
      return <IconSocialViber size={30} />;
    case 'WhatsApp':
      return <IconSocialWhatsapp size={30} />;
    default:
      return <IconCloseCircle variant="outline" {...IconStyles()} />;
  }
};

export const socialsReaderUrl = (name: string, message: string): string => {
  const encoded = encodeURIComponent(message);

  switch (name) {
    case 'Discord':
      return (
        Platform.select({
          ios: `discord://`,
          android: `discord://invite?text=${encoded}`,
        }) ?? ''
      );
    case 'Messenger':
      return (
        Platform.select({
          ios: `fb-messenger://share?link=${encoded}`,
          android: `fb-messenger://share?text=${encoded}`,
        }) ?? ''
      );
    case 'Telegram':
      return `tg://msg?text=${encoded}`;
    case 'Viber':
      return `viber://forward?text=${encoded}`;
    case 'WhatsApp':
      return `whatsapp://send?text=${encoded}`;
    default:
      return `sms:?body=${encoded}`;
  }
};
