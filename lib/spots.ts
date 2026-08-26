import { findNearbySpotsAndRoute } from '@/lib/route-optimizer'
import type { Itinerary, Spot } from '@/lib/types'
import { validateItinerary } from '@/lib/validator'

export type { Itinerary, Spot }

export const SUGGESTIONS = [
  'Times Square',
  'Central Park',
  'Brooklyn Bridge',
  '하이라인',
  '소호',
  '록펠러 센터',
] as const

/**
 * 동기 명소 검색 (내부 라우트 옵티마이저 호출)
 */
export function findItinerary(query: string): Itinerary | null {
  return findNearbySpotsAndRoute(query)
}

/**
 * 비동기 명소 검색 함수 (Fetch API + Fallback + AbortSignal 지원)
 */
export async function searchItineraryAsync(
  query: string,
  signal?: AbortSignal,
): Promise<Itinerary | null> {
  const trimmed = query.trim().toLowerCase()

  // 1. 타임아웃 QA 테스트용 키워드 처리 (6초 지연으로 5초 AbortController 트리거)
  if (trimmed === 'timeout' || trimmed === '지연테스트' || trimmed === '타임아웃') {
    return new Promise((_, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('TIMEOUT'))
      }, 6000)
      if (signal) {
        signal.addEventListener('abort', () => {
          clearTimeout(timer)
          reject(new Error('AbortError'))
        })
      }
    })
  }

  // 2. 브라우저 환경에서 /api/spots/search API 호출
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/spots/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        signal,
      })

      if (!res.ok) {
        return null
      }

      const json = await res.json()
      if (json.success && json.data && validateItinerary(json.data)) {
        return json.data as Itinerary
      }
      return null
    } catch (err: unknown) {
      if (signal?.aborted) {
        throw err
      }
      // 통신 실패 시 내부 로컬 엔진으로 fallback
      const localResult = findNearbySpotsAndRoute(query)
      return localResult
    }
  }

  // 3. 서버사이드 또는 직접 호출 환경
  return findNearbySpotsAndRoute(query)
}
