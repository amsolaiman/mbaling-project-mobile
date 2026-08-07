import * as Base64 from 'base-64';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

// utils
import axios from '@/utils/axios';

// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  const jsonPayload = decodeURIComponent(
    Base64.decode(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  if (typeof decoded.exp !== 'number' || !Number.isFinite(decoded.exp)) {
    return false;
  }

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

type EventHandler = () => void;

const listeners: Record<string, EventHandler[]> = {};

export const eventBus = {
  on: (event: string, handler: EventHandler) => {
    listeners[event] = listeners[event] || [];
    listeners[event].push(handler);
  },

  off: (event: string, handler: EventHandler) => {
    listeners[event] = listeners[event]?.filter((h) => h !== handler) || [];
  },

  emit: (event: string) => {
    listeners[event]?.forEach((handler) => handler());
  },
};

// ----------------------------------------------------------------------

let expirationTimer: ReturnType<typeof setTimeout> | null = null;

const clearTokenExpirationTimer = () => {
  if (expirationTimer) {
    clearTimeout(expirationTimer);
    expirationTimer = null;
  }
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  clearTokenExpirationTimer();

  if (!Number.isFinite(exp)) {
    return;
  }

  const timeLeft = exp * 1000 - Date.now();

  if (timeLeft <= 0) {
    void SecureStore.deleteItemAsync('accessToken');
    eventBus.emit('token-expired');
    return;
  }

  expirationTimer = setTimeout(async () => {
    expirationTimer = null;

    await SecureStore.deleteItemAsync('accessToken');

    eventBus.emit('token-expired');
    alert('Your session has timed out. Please login again to continue.');

    router.replace('/login');
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = async (accessToken: string | null) => {
  clearTokenExpirationTimer();

  if (accessToken) {
    await SecureStore.setItemAsync('accessToken', accessToken);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    try {
      const { exp } = jwtDecode(accessToken);

      if (typeof exp === 'number' && Number.isFinite(exp)) {
        tokenExpired(exp);
      } else {
        // eslint-disable-next-line no-console
        console.warn(
          'Access token has no valid exp claim; skipping auto-expiry timer.'
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to decode access token:', error);
    }
  } else {
    await SecureStore.deleteItemAsync('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};
