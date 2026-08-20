// auth
import { RoleBasedGuard } from '@/auth/guard';
// screens
import { SettingsAccountHousingView } from '@/screens/settings/account/view';

// ----------------------------------------------------------------------

export default function SettingsAccountHousingScreen() {
  return (
    <RoleBasedGuard roles={['landlord']}>
      <SettingsAccountHousingView />
    </RoleBasedGuard>
  );
}
