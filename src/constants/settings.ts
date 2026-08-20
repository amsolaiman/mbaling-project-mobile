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
        href: '/settings/account/username',
      },
      {
        label: 'Password',
        href: '/settings/account/password',
      },
      {
        label: 'E-mail',
        href: '/settings/account/email',
      },
      {
        label: 'Mobile number',
        href: '/settings/account/mobile',
      },
    ],
  },
  {
    title: 'Housing information',
    hideFor: AuthUserRoles.STUDENT,
    data: [
      {
        label: 'Housing name',
        href: '/settings/account/housing',
      },
      {
        label: 'Address',
        href: '/settings/account/address',
      },
    ],
  },
  {
    title: 'Address information',
    hideFor: AuthUserRoles.LANDLORD,
    data: [
      {
        label: 'Campus housing',
        href: '/settings/account/campus',
      },
      {
        label: 'Address',
        href: '/settings/account/address',
      },
    ],
  },
];
