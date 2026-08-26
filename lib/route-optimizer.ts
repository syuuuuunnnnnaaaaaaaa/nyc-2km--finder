import { calculateDistanceKm, estimateWalkingMinutes } from '@/lib/geo'
import { NYC_LOCATIONS } from '@/lib/nyc-dataset'
import type { Itinerary, NYCLocation, Spot } from '@/lib/types'
import { validateItinerary } from '@/lib/validator'

function normalizeText(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, '')
}

/**
 * 쿼리 문자열에 가장 적합한 출발지 위치 찾기
 */
export function findMatchingOrigin(query: string): NYCLocation | null {
  const q = normalizeText(query)
  if (!q) return null

  // 1. 정확 일치 또는 별칭(alias) 일치
  const exact = NYC_LOCATIONS.find((loc) =>
    loc.aliases.some((alias) => normalizeText(alias) === q),
  )
  if (exact) return exact

  // 2. 부분 일치 (포함 관계)
  const partial = NYC_LOCATIONS.find((loc) =>
    loc.aliases.some((alias) => {
      const a = normalizeText(alias)
      return a.includes(q) || q.includes(a)
    }),
  )
  if (partial) return partial

  return null
}

/**
 * 출발지 기준 반경 2km 이내 명소 3곳 추출 및 최적 이동 동선 생성
 * PRD 2.2, 2.3 요구사항 충족
 */
export function optimizeRouteFromOrigin(origin: NYCLocation): Itinerary | null {
  // 1. 출발지를 제외한 모든 장소 중 반경 2.0km 이내의 후보군 필터링
  const candidatesWithDistance = NYC_LOCATIONS.filter((loc) => loc.id !== origin.id)
    .map((loc) => {
      const distanceKm = calculateDistanceKm(origin.lat, origin.lng, loc.lat, loc.lng)
      return {
        location: loc,
        distanceKm,
        minutes: estimateWalkingMinutes(distanceKm),
      }
    })
    .filter((item) => item.distanceKm <= 2.0)

  // PRD 3.4: 반경 2km 이내 명소가 3곳 미만이면 유효하지 않은 결과로 판정
  if (candidatesWithDistance.length < 3) {
    return null
  }

  // 2. 출발지로부터 가까운 순서(오름차순)로 정렬하여 상위 3곳 선정
  candidatesWithDistance.sort((a, b) => a.distanceKm - b.distanceKm)
  const selected = candidatesWithDistance.slice(0, 3)

  const spots: Spot[] = selected.map((item) => ({
    name: item.location.name,
    nameEn: item.location.nameEn,
    distanceKm: item.distanceKm,
    tag: item.location.tag,
    minutes: item.minutes,
  }))

  // 3. 최적 이동 동선 (출발지 → Spot 1 → Spot 2 → Spot 3) 구간 거리 및 소요 시간 계산
  const leg1Distance = spots[0].distanceKm
  const leg2Distance = calculateDistanceKm(
    selected[0].location.lat,
    selected[0].location.lng,
    selected[1].location.lat,
    selected[1].location.lng,
  )
  const leg3Distance = calculateDistanceKm(
    selected[1].location.lat,
    selected[1].location.lng,
    selected[2].location.lat,
    selected[2].location.lng,
  )

  const totalKm = Number((leg1Distance + leg2Distance + leg3Distance).toFixed(1))
  const totalMinutes =
    estimateWalkingMinutes(leg1Distance) +
    estimateWalkingMinutes(leg2Distance) +
    estimateWalkingMinutes(leg3Distance)

  const itinerary: Itinerary = {
    origin: origin.name,
    originEn: origin.nameEn,
    line: origin.line || 'Subway / Walking',
    lineColor: origin.lineColor || 'var(--color-primary)',
    spots,
    totalKm,
    totalMinutes,
  }

  // 4. 최종 무결성 검증
  if (!validateItinerary(itinerary)) {
    return null
  }

  return itinerary
}

/**
 * 검색 쿼리를 통한 명소 탐색 및 최적 동선 반환 메인 진입점
 */
export function findNearbySpotsAndRoute(query: string): Itinerary | null {
  const origin = findMatchingOrigin(query)
  if (!origin) return null
  return optimizeRouteFromOrigin(origin)
}
