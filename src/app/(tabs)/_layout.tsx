import { Redirect } from 'expo-router';

// auth
import { useAuthContext } from '@/auth/hooks';
// components
import AppTabs from '@/components/app-tabs';

// ----------------------------------------------------------------------

export default function TabLayout() {
  const { unauthenticated } = useAuthContext();

  if (unauthenticated) {
    return <Redirect href="/login" />;
  }

  return <AppTabs />;
}
