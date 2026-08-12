// auth
import { useAuthContext } from '@/auth/hooks';
import { AuthUserRoles } from '@/auth/types';
// screens
import { AccountStudentView } from '@/screens/account/view';

// ----------------------------------------------------------------------

export default function AccountScreen() {
  const { user } = useAuthContext();

  if (user?.role === AuthUserRoles.LANDLORD) {
    return null;
  }

  return <AccountStudentView />;
}
