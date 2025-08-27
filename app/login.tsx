// @expo
import { Redirect } from 'expo-router';
// auth
import { useAuthContext } from '@/auth/hooks';
// screens
import { LoginView } from '@/screens/login/view';

// ----------------------------------------------------------------------

export default function LoginScreen() {
  const { authenticated } = useAuthContext();

  if (authenticated) {
    return <Redirect href="/" />;
  }

  return <LoginView />;
}
