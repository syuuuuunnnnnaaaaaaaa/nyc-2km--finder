import type { Itinerary } from '@/lib/types'

export const MIN_QUERY_LENGTH = 2
export const MAX_QUERY_LENGTH = 50
export const STANDARD_ERROR_MESSAGE = '다시 입력해주세요..'

export type ValidationResult = {
  isValid: boolean
  errorMessage?: string
}

/**
 * 사용자 입력값 길이 및 유효성 검증
 * PRD 3.1: 2자 미만이거나 50자 초과인 경우 차단 및 빨간 글씨 '다시 입력해주세요..' 표시
 */
export function validateQuery(query: string): ValidationResult {
  const trimmed = query.trim()
  if (trimmed.length < MIN_QUERY_LENGTH || trimmed.length > MAX_QUERY_LENGTH) {
    return {
      isValid: false,
      errorMessage: STANDARD_ERROR_MESSAGE,
    }
  }
  return { isValid: true }
}

/**
 * 반환된 결과(명소 3개, 2km 이내) 무결성 검증
 * PRD 3.3, 3.4: 뉴욕 내 명소가 없거나 잘못된 결과 반환 시 차단 및 '다시 입력해주세요..' 표시
 */
export function validateItinerary(itinerary: Itinerary | null): boolean {
  if (!itinerary) return false
  if (!itinerary.spots || itinerary.spots.length !== 3) return false

  // 모든 명소가 2.0km 이내인지 검증
  const allWithin2km = itinerary.spots.every((spot) => spot.distanceKm <= 2.0 && spot.distanceKm >= 0)
  if (!allWithin2km) return false

  // 명소가 가까운 순서(오름차순)로 정렬되어 있는지 검증
  for (let i = 0; i < itinerary.spots.length - 1; i++) {
    if (itinerary.spots[i].distanceKm > itinerary.spots[i + 1].distanceKm) {
      return false
    }
  }

  return true
}
