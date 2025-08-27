// components
import SpinnerOverlay from '@/components/spinner-overlay';
//
import { AuthContext } from './auth-context';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthConsumer({ children }: Props) {
  return (
    <AuthContext.Consumer>
      {(auth) => (auth.loading ? <SpinnerOverlay state={auth.loading} /> : children)}
    </AuthContext.Consumer>
  );
}
