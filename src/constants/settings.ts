import { LinkProps } from 'expo-router';

// auth
import { AuthUserRoles } from '@/auth/types';

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
        href: '/settings/profile',
      },
      {
        label: 'Account settings',
        href: '/settings/account',
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

type AccountSettingsConfigType = SettingsConfigType & {
  hideFor?: AuthUserRoles;
  hideHeader?: boolean;
};

export const ACCOUNT_SETTINGS_CONFIG: AccountSettingsConfigType[] = [
  {
    title: 'Account information',
    hideHeader: true,
    data: [
      {
        label: 'Username',
        href: '/',
      },
      {
        label: 'Password',
        href: '/',
      },
      {
        label: 'E-mail',
        href: '/',
      },
      {
        label: 'Mobile number',
        href: '/',
      },
    ],
  },
  {
    title: 'Housing information',
    hideFor: AuthUserRoles.STUDENT,
    data: [
      {
        label: 'Housing name',
        href: '/',
      },
      {
        label: 'Address',
        href: '/',
      },
    ],
  },
  {
    title: 'Address information',
    hideFor: AuthUserRoles.LANDLORD,
    data: [
      {
        label: 'Campus housing',
        href: '/',
      },
      {
        label: 'Address',
        href: '/',
      },
    ],
  },
];
