import { type NativeStackNavigationOptions } from 'expo-router';

// assets
import {
  TabIconAccount,
  TabIconHome,
  TabIconManage,
  TabIconSearch,
  TabIconSettings,
} from '@/assets/icons/tab-icons';
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
  Icon: typeof TabIconHome;
  hideFor?: AuthUserRoles;
};

export const TAB_ROUTES: TabRoutesType[] = [
  {
    name: 'index',
    title: 'Home',
    Icon: TabIconHome,
  },
  {
    name: 'search',
    title: 'Search',
    Icon: TabIconSearch,
    hideFor: AuthUserRoles.LANDLORD,
  },
  {
    name: 'manage',
    title: 'Manage',
    Icon: TabIconManage,
    hideFor: AuthUserRoles.STUDENT,
  },
  {
    name: 'account',
    title: 'Account',
    Icon: TabIconAccount,
  },
  {
    name: 'settings',
    title: 'Settings',
    Icon: TabIconSettings,
  },
];
