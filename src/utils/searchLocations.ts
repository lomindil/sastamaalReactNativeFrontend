export type LocationResult = {
  name: string;
  lat: number;
  lng: number;
};

export async function searchLocations(
  query: string
): Promise<LocationResult[]> {
  if (!query) return [];

  const res = await fetch(
    `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`
  );

  const data = await res.json();

  return data.features.map((item: any) => ({
    name: item.properties.name || item.properties.city,
    lat: item.geometry.coordinates[1],
    lng: item.geometry.coordinates[0],
  }));
}
