export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string> {
  const url =
    `https://nominatim.openstreetmap.org/reverse` +
    `?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;

  const res = await fetch(url, {
    headers: {
      // REQUIRED by Nominatim — without this it returns HTML
      'User-Agent': 'SastaMaalApp/1.0 (contact: dev@sastamaal.app)',
      'Accept': 'application/json',
    },
  });

  // 🔴 IMPORTANT: detect HTML before parsing
  const text = await res.text();

  if (!text.startsWith('{')) {
    console.error('Reverse geocode returned non-JSON:', text);
    throw new Error('Reverse geocoding failed');
  }

  const data = JSON.parse(text);

  const addr = data.address || {};

  return (
    addr.suburb ||
    addr.neighbourhood ||
    addr.city ||
    addr.town ||
    addr.village ||
    'Selected location'
  );
}
