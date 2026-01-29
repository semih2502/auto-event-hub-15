export async function geocodeAddress(address: string) {
  if (!address) return null;
  try {
    const key = 'geocode_cache_v1';
    const raw = localStorage.getItem(key) || '{}';
    const cache = JSON.parse(raw);
    if (cache[address]) return cache[address];

    // Use Nominatim (OpenStreetMap) public API. Keep minimal requests and cache results.
    const q = encodeURIComponent(address + ', France');
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${q}`;

    const res = await fetch(url, {
      headers: {
        'Accept-Language': 'fr',
        'User-Agent': 'auto-event-hub/1.0 (contact: your-email@example.com)'
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || data.length === 0) return null;
    const first = data[0];
    const coords = { lat: Number(first.lat), lon: Number(first.lon) };

    cache[address] = coords;
    try {
      localStorage.setItem(key, JSON.stringify(cache));
    } catch (e) {
      // ignore storage errors
    }

    // be gentle on the public API
    await new Promise((r) => setTimeout(r, 250));

    return coords;
  } catch (err) {
    console.error('Geocoding error', err);
    return null;
  }
}
