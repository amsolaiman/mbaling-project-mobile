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

type StackRoutesType = {
  name: string;
  title: string;
  options?: NativeStackNavigationOptions;
};

export const ROOT_ROUTES: StackRoutesType[] = [
  {
    name: 'login',
    title: 'Login',
    options: {
      headerShown: false,
      animation: 'fade',
    },
  },
  {
    name: '(main)',
    title: 'Main Pages',
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

export const MAIN_ROUTES: StackRoutesType[] = [
  {
    name: '(tabs)',
    title: 'Tab Pages',
    options: {
      headerShown: false,
    },
  },
  {
    name: 'post/new',
    title: 'Create Post',
    options: {
      headerShown: false,
    },
  },
  {
    name: 'post/[id]',
    title: 'Post Details',
    options: {
      headerShown: false,
    },
  },
  {
    name: 'profile/[id]',
    title: 'Landlord Profile',
    options: {
      headerShown: false,
    },
  },
];

type TabsRoutesType = {
  name: string;
  title: string;
  Icon: typeof IconHome;
  hideFor?: AuthUserRoles;
};

export const TAB_ROUTES: TabsRoutesType[] = [
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
