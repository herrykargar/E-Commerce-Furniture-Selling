import { request } from './client.js';

export function getProductsByRoom(room, { signal } = {}) {
  const query = room ? `?room=${encodeURIComponent(room)}` : '';
  return request(`/products${query}`, { signal });
}
