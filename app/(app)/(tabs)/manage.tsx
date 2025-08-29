// auth
import { RoleBasedGuard } from '@/auth/guard';
// screens
import { ManageView } from '@/screens/manage/view';

// ----------------------------------------------------------------------

export default function ManageScreen() {
  return (
    <RoleBasedGuard roles={['landlord']}>
      <ManageView />
    </RoleBasedGuard>
  );
}
