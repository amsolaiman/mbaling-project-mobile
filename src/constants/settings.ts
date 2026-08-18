import { LinkProps } from 'expo-router';

// ----------------------------------------------------------------------

type SettingsConfigType = {
  title: string;
  data: {
    label: string;
    href: LinkProps['href'];
    isNotLive?: boolean;
  }[];
};

export const SETTINGS_CONFIG: SettingsConfigType[] = [
  {
    title: 'Account information',
    data: [
      {
        label: 'Edit profile',
        href: '/',
      },
      {
        label: 'Account settings',
        href: '/',
      },
      {
        label: 'Privacy',
        href: '/',
        isNotLive: true,
      },
    ],
  },
  {
    title: 'Support',
    data: [
      {
        label: 'Feedback',
        href: 'https://example.com',
        isNotLive: true,
      },
      {
        label: 'Terms & privacy',
        href: 'https://example.com',
        isNotLive: true,
      },
      {
        label: 'About',
        href: '/',
        isNotLive: true,
      },
    ],
  },
];
