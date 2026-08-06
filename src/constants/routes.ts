import { type NativeStackNavigationOptions } from 'expo-router';

// assets
import {
  TabIconAccount,
  TabIconHome,
  TabIconManage,
  TabIconSearch,
  TabIconSettings,
} from '@/assets/icons/tab-icons';

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
];

type TabRoutesType = {
  name: string;
  title: string;
  Icon: typeof TabIconHome;
  hideFor?: 'student' | 'landlord';
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
    hideFor: 'landlord',
  },
  {
    name: 'manage',
    title: 'Manage',
    Icon: TabIconManage,
    hideFor: 'student',
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
