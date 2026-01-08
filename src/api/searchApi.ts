import api from './api';
import CookieManager from '@react-native-cookies/cookies';

export const searchProduct = async (query: string) => {
  const cookies = await CookieManager.get(api.defaults.baseURL!);

  // Convert cookies to header string
  const cookieHeader = Object.values(cookies)
    .map(c => `${c.name}=${c.value}`)
    .join('; ');

  const res = await api.post(
    '/api/search',
    { query },
    {
      headers: {
        Cookie: cookieHeader
      }
    }
  );

  return res.data;
};
