const EARTH_RADIUS_KM = 6371

/**
 * 하버사인(Haversine) 공식을 이용한 두 좌표 간의 직선 거리(km) 계산
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const radLat1 = (lat1 * Math.PI) / 180
  const radLat2 = (lat2 * Math.PI) / 180

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = EARTH_RADIUS_KM * c

  return Number(distance.toFixed(2))
}

/**
 * 반경 내 포함 여부 검증 (기본 2.0km)
 */
export function isWithinRadius(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  radiusKm = 2.0,
): boolean {
  const distance = calculateDistanceKm(lat1, lon1, lat2, lon2)
  return distance <= radiusKm
}

/**
 * 거리(km) 기반 도보 예상 시간(분) 계산 (도심 평균 4.6km/h, 1km당 약 13분)
 */
export function estimateWalkingMinutes(distanceKm: number): number {
  const minutes = Math.round(distanceKm * 13)
  return Math.max(1, minutes)
}
