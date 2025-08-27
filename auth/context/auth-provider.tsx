import { useCallback, useEffect, useMemo, useReducer } from 'react';
// @expo
import * as SecureStore from 'expo-secure-store';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';
//
import { ActionMapType, AuthStateType, AuthUserType } from '../types';
import { AuthContext } from './auth-context';
import { eventBus, isValidToken, setSession } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = await SecureStore.getItemAsync(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get(API_ENDPOINTS.auth.me, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user } = response.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (username: string, password: string) => {
    const data = {
      username,
      password,
      medium: process.env.SITE_TYPE ?? 'app',
    };

    const response = await axios.post(API_ENDPOINTS.auth.login, data);

    const { accessToken } = response.data;

    setSession(accessToken);

    const me = await axios.get(API_ENDPOINTS.auth.me, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { user } = me.data;

    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  useEffect(() => {
    eventBus.on('token-expired', logout);

    return () => {
      eventBus.off('token-expired', logout);
    };
  }, [logout]);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      //
      isStudent: state.user?.role === 'student',
      isLandlord: state.user?.role === 'landlord',
    }),
    [login, logout, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
