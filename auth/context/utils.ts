import * as Base64 from 'base-64';
// @expo
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

export const tokenExpired = (exp: number) => {
  let expiredTimer;

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(async () => {
    await SecureStore.deleteItemAsync('accessToken');

    eventBus.emit('token-expired');
    alert('Your session has timed out. Please login again to continue.');

    router.replace('/login');
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = async (accessToken: string | null) => {
  if (accessToken) {
    await SecureStore.setItemAsync('accessToken', accessToken);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken); // ~1 hour by mbaling server
    tokenExpired(exp);
  } else {
    await SecureStore.deleteItemAsync('accessToken');

    delete axios.defaults.headers.common.Authorization;
  }
};
