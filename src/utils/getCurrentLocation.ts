import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export async function getCurrentLocation(): Promise<{
  lat: number;
  lng: number;
}> {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      throw {
        message: 'Location permission not granted',
        code: 1,
      };
    }
  }

  // STEP 1: Try FAST location (network / cached)
  try {
    return await new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        pos =>
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        reject,
        {
          enableHighAccuracy: false, // 👈 IMPORTANT
          timeout: 10000,
          maximumAge: 60000, // allow cached location
        }
      );
    });
  } catch {
    // Ignore and fallback
  }

  // STEP 2: Fallback to GPS (slower but accurate)
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      pos =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      reject,
      {
        enableHighAccuracy: true,
        timeout: 30000, // 👈 longer timeout
        maximumAge: 0,
      }
    );
  });
}
