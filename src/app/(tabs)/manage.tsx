// auth
import { RoleBasedGuard } from '@/auth/guard';
import { AuthUserRoles } from '@/auth/types';
// screens
import { ManageView } from '@/screens/manage/view';

// ----------------------------------------------------------------------

export default function ManageScreen() {
  return (
    <RoleBasedGuard roles={[AuthUserRoles.LANDLORD]}>
      <ManageView />
    </RoleBasedGuard>
  );
}
