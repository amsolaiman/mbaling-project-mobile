import { Redirect } from 'expo-router';

// auth
import { useAuthContext } from '@/auth/hooks';
// components
import { AppMain } from '@/components/app-layouts';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { unauthenticated } = useAuthContext();

  if (unauthenticated) {
    return <Redirect href="/login" />;
  }

  return <AppMain />;
}
