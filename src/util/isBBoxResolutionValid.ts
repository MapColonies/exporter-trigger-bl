/* eslint-disable */
const zoomToResolution: number[] = [
  0.703125, // 0
  0.3515625, // 1
  0.17578125, // 2
  0.087890625, // 3
  0.0439453125, // 4
  0.02197265625, // 5
  0.010986328125, // 6
  0.0054931640625, // 7
  0.00274658203125, // 8
  0.001373291015625, // 9
  0.0006866455078125, // 10
  0.00034332275390625, // 11
  0.000171661376953125, // 12
  8.58306884765625e-5, // 13
  4.29153442382812e-5, // 14
  2.14576721191406e-5, // 15
  1.07288360595703e-5, // 16
  5.36441802978516e-6, // 17
  2.68220901489258e-6, // 18
  1.34110450744629e-6, // 19
  6.70552253723145e-7, // 20
  3.35276126861572e-7, // 21
  1.67638063430786e-7, // 22
];
/* eslint-enable */

export default function isBBoxResolutionValid(
  zoomLevel: number,
  bbox: number[]
): boolean {
  const resolution = zoomToResolution[zoomLevel];
  const topRightLat = bbox[3];
  const topRightLon = bbox[2];
  const bottomLeftLat = bbox[1];
  const bottomLeftLon = bbox[0];

  // Check if bbox width and height are at least at the resolution of a pixle at the wanted zoom level
  return (
    topRightLon - bottomLeftLon >= resolution &&
    topRightLat - bottomLeftLat >= resolution
  );
}
