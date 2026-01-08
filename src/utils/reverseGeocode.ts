export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
  );

  const data = await res.json();

  if (data?.display_name) {
    return data.display_name;
  }

  return 'Unknown Location';
}
