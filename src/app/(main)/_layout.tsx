import { Redirect, Stack } from 'expo-router';

// auth
import { useAuthContext } from '@/auth/hooks';
// constants
import { MAIN_ROUTES } from '@/constants/routes';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { unauthenticated } = useAuthContext();

  if (unauthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      {MAIN_ROUTES.map(({ name, options }) => (
        <Stack.Screen key={name} name={name} options={options} />
      ))}
    </Stack>
  );
}
