// auth
import { RoleBasedGuard } from '@/auth/guard';
// screens
import { SearchView } from '@/screens/search/view';

// ----------------------------------------------------------------------

export default function SearchScreen() {
  return (
    <RoleBasedGuard roles={['student']}>
      <SearchView />
    </RoleBasedGuard>
  );
}
