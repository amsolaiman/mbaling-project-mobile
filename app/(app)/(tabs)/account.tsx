// auth
import { useAuthContext } from '@/auth/hooks';
// screens
import { AccountLandlordView, AccountStudentView } from '@/screens/account/view';

// ----------------------------------------------------------------------

export default function AccountScreen() {
  const { isStudent } = useAuthContext();

  if (isStudent) {
    return <AccountStudentView />;
  }

  return <AccountLandlordView />;
}
