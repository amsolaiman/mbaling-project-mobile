// auth
import { RoleBasedGuard } from '@/auth/guard';
// screens
import { SettingsAccountCampusView } from '@/screens/settings/account/view';

// ----------------------------------------------------------------------

export default function SettingsAccountCampusScreen() {
  return (
    <RoleBasedGuard roles={['student']}>
      <SettingsAccountCampusView />
    </RoleBasedGuard>
  );
}
