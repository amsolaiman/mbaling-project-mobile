export type ActionMapType<M extends Record<string, unknown>> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUserType = null | Record<string, unknown>;

export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: AuthUserType;
};

// ----------------------------------------------------------------------

export type AuthContextType = {
  user: AuthUserType;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export enum AuthUserRoles {
  STUDENT = 'student',
  LANDLORD = 'landlord',
}
