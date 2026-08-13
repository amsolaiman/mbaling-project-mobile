// auth
import { RoleBasedGuard } from '@/auth/guard';
import { AuthUserRoles } from '@/auth/types';
// screens
import { SearchView } from '@/screens/search/view';

// ----------------------------------------------------------------------

export default function SearchScreen() {
  return (
    <RoleBasedGuard roles={[AuthUserRoles.STUDENT]}>
      <SearchView />
    </RoleBasedGuard>
  );
}
