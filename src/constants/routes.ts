import { type NativeStackNavigationOptions } from 'expo-router';

// assets
import {
  IconHome,
  IconMagnifier,
  IconPen,
  IconSettings,
  IconUser,
} from '@/assets/icons';
// auth
import { AuthUserRoles } from '@/auth/types';

// ----------------------------------------------------------------------

type RootRoutesType = {
  name: string;
  title: string;
  options?: NativeStackNavigationOptions;
};

export const ROOT_ROUTES: RootRoutesType[] = [
  {
    name: 'login',
    title: 'Login',
    options: {
      headerShown: false,
      animation: 'fade',
    },
  },
  {
    name: '(tabs)',
    title: 'Tab Pages',
    options: {
      headerShown: false,
      animation: 'fade',
    },
  },
  {
    name: '+not-found',
    title: 'Not Found',
  },
];

type TabRoutesType = {
  name: string;
  title: string;
  Icon: typeof IconHome;
  hideFor?: AuthUserRoles;
};

export const TAB_ROUTES: TabRoutesType[] = [
  {
    name: 'index',
    title: 'Home',
    Icon: IconHome,
  },
  {
    name: 'search',
    title: 'Search',
    Icon: IconMagnifier,
    hideFor: AuthUserRoles.LANDLORD,
  },
  {
    name: 'manage',
    title: 'Manage',
    Icon: IconPen,
    hideFor: AuthUserRoles.STUDENT,
  },
  {
    name: 'account',
    title: 'Account',
    Icon: IconUser,
  },
  {
    name: 'settings',
    title: 'Settings',
    Icon: IconSettings,
  },
];
