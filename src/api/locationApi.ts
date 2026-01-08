import api from './api';
import CookieManager from '@react-native-cookies/cookies';

export const setLocation = async (
  lat: number,
  lng: number,
  address: string
) => {
  const res = await api.post('/api/location', { lat, lng, address });

  // 🔴 IMPORTANT: Persist cookies manually
  const cookies = await CookieManager.get(api.defaults.baseURL!);

  return cookies;
};
