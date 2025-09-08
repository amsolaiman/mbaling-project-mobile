// @expo
import { router } from 'expo-router';
// auth
import { useAuthContext } from '@/auth/hooks';
// components
import useCustomAlert from '@/components/custom-alert';

// ----------------------------------------------------------------------

export type SettingsAccountRouteConfig = {
  title: string;
  showHeader: boolean;
  data: SettingsAccountRouteDataType[];
};

export type SettingsAccountRouteDataType = {
  label: string;
  onClick: VoidFunction;
};

// ----------------------------------------------------------------------

export const SettingAccountConfig = (): SettingsAccountRouteConfig[] => {
  const { isLandlord } = useAuthContext();

  const { alert } = useCustomAlert();

  return [
    {
      title: 'Account information',
      showHeader: false,
      data: [
        {
          label: 'Username',
          onClick: () => router.push('/settings/account/username'),
        },
        {
          label: 'Password',
          onClick: () => router.push('/settings/account/password'),
        },
        {
          label: 'E-mail',
          onClick: () => router.push('/settings/account/email'),
        },
        {
          label: 'Mobile number',
          onClick: () => router.push('/settings/account/mobile'),
        },
      ],
    },
    ...[
      isLandlord
        ? {
            title: 'Housing information',
            showHeader: true,
            data: [
              {
                label: 'Housing name',
                onClick: () => router.push('/settings/account/housing'),
              },
              {
                label: 'Address',
                onClick: () => router.push('/settings/account/address'),
              },
            ],
          }
        : {
            title: 'Address information',
            showHeader: true,
            data: [
              {
                label: 'Campus housing',
                onClick: () =>
                  alert({ title: 'Oops!', message: 'This page is not yet available.' }),
              },
              {
                label: 'Address',
                onClick: () => router.push('/settings/account/address'),
              },
            ],
          },
    ],
  ];
};
