// @expo
import { Redirect } from 'expo-router';
//
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type Props = {
  roles?: string[];
  children: React.ReactNode;
};

export default function RoleBasedGuard({ roles, children }: Props) {
  const { user } = useAuthContext();

  const currentRole = user?.role;

  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return <Redirect href="/+not-found" />;
  }

  return children;
}
