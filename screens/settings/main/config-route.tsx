// components
import useCustomAlert from '@/components/custom-alert';

// ----------------------------------------------------------------------

export type SettingsRouteConfig = {
  title: string;
  data: SettingsRouteDataType[];
};

export type SettingsRouteDataType = {
  label: string;
  onClick: VoidFunction;
  isExternal?: boolean;
};

// ----------------------------------------------------------------------

export const SettingsConfig = (): SettingsRouteConfig[] => {
  const { alert } = useCustomAlert();

  return [
    {
      title: 'Account information',
      data: [
        {
          label: 'Edit profile',
          onClick: () => alert({ title: 'Oops!', message: 'This page is not yet available.' }),
        },
        {
          label: 'Account settings',
          onClick: () => alert({ title: 'Oops!', message: 'This page is not yet available.' }),
        },
        {
          label: 'Privacy',
          onClick: () => alert({ title: 'Oops!', message: 'This page is not yet available.' }),
        },
      ],
    },
    {
      title: 'Support',
      data: [
        {
          label: 'Feedback',
          onClick: () => alert({ title: 'Oops!', message: 'This page is not yet available.' }),
          isExternal: true,
        },
        {
          label: 'Terms & privacy',
          onClick: () => alert({ title: 'Oops!', message: 'This page is not yet available.' }),
          isExternal: true,
        },
        {
          label: 'About',
          onClick: () => alert({ title: 'Oops!', message: 'This page is not yet available.' }),
        },
      ],
    },
  ];
};
