/* eslint-disable no-plusplus */
function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export default function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: string,
  long2: string,
): number {
  const radius = 6371;

  const dLat = deg2rad(Number(lat2) - lat1);
  const dLon = deg2rad(Number(long2) - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(Number(lat2))) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return radius * center;
}
