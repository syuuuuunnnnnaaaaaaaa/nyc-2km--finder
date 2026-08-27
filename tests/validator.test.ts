import { describe, expect, it } from 'vitest'

import type { Itinerary } from '@/lib/types'
import {
  MAX_QUERY_LENGTH,
  MIN_QUERY_LENGTH,
  STANDARD_ERROR_MESSAGE,
  validateItinerary,
  validateQuery,
} from '@/lib/validator'

describe('Validator Unit Tests', () => {
  describe('validateQuery (PRD 3.1: 2~50자 제한 및 단일 에러 메시지)', () => {
    it('1글자 입력 시 실패하고 표준 에러 문구를 반환해야 한다', () => {
      const result = validateQuery('A')
      expect(result.isValid).toBe(false)
      expect(result.errorMessage).toBe(STANDARD_ERROR_MESSAGE)
    })

    it('51글자 입력 시 실패하고 표준 에러 문구를 반환해야 한다', () => {
      const longText = 'a'.repeat(51)
      const result = validateQuery(longText)
      expect(result.isValid).toBe(false)
      expect(result.errorMessage).toBe(STANDARD_ERROR_MESSAGE)
    })

    it('최소 길이(2자) 입력 시 성공해야 한다', () => {
      const result = validateQuery('소호')
      expect(result.isValid).toBe(true)
      expect(result.errorMessage).toBeUndefined()
    })

    it('최대 길이(50자) 입력 시 성공해야 한다', () => {
      const validText = 'a'.repeat(50)
      const result = validateQuery(validText)
      expect(result.isValid).toBe(true)
    })

    it('앞뒤 공백(trim) 제거 후 2자 미만인 경우 실패해야 한다', () => {
      const result = validateQuery('   X   ')
      expect(result.isValid).toBe(false)
      expect(result.errorMessage).toBe(STANDARD_ERROR_MESSAGE)
    })
  })

  describe('validateItinerary (PRD 2.2, 3.4: 명소 3곳, 반경 2km 이내, 거리 오름차순 검증)', () => {
    const validItinerary: Itinerary = {
      origin: '타임스퀘어',
      originEn: 'Times Square',
      originLat: 40.758,
      originLng: -73.9855,
      line: 'N Q R W',
      lineColor: 'var(--color-primary)',
      spots: [
        {
          name: '브라이언트 파크',
          nameEn: 'Bryant Park',
          distanceKm: 0.4,
          minutes: 6,
          tag: '도심 공원',
          lat: 40.7536,
          lng: -73.9832,
        },
        {
          name: '뉴욕 공립도서관',
          nameEn: 'NY Public Library',
          distanceKm: 0.9,
          minutes: 12,
          tag: '건축 · 실내',
          lat: 40.7532,
          lng: -73.9822,
        },
        {
          name: '엠파이어 스테이트 빌딩',
          nameEn: 'Empire State Building',
          distanceKm: 1.6,
          minutes: 21,
          tag: '전망대',
          lat: 40.7484,
          lng: -73.9857,
        },
      ],
      totalKm: 2.9,
      totalMinutes: 39,
    }

    it('유효한 명소 3개 및 2km 이내 데이터는 true를 반환해야 한다', () => {
      expect(validateItinerary(validItinerary)).toBe(true)
    })

    it('명소가 3개가 아니면(예: 2개) false를 반환해야 한다', () => {
      const invalid = {
        ...validItinerary,
        spots: validItinerary.spots.slice(0, 2),
      }
      expect(validateItinerary(invalid)).toBe(false)
    })

    it('2.0km를 초과하는 명소가 포함되어 있으면 false를 반환해야 한다', () => {
      const invalid = {
        ...validItinerary,
        spots: [
          ...validItinerary.spots.slice(0, 2),
          {
            ...validItinerary.spots[2],
            distanceKm: 2.1,
          },
        ],
      }
      expect(validateItinerary(invalid)).toBe(false)
    })

    it('거리 오름차순(가까운 순)으로 정렬되지 않은 경우 false를 반환해야 한다', () => {
      const invalid = {
        ...validItinerary,
        spots: [validItinerary.spots[1], validItinerary.spots[0], validItinerary.spots[2]],
      }
      expect(validateItinerary(invalid)).toBe(false)
    })
  })
})
