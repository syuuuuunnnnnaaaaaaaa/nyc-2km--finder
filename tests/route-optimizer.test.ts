import { describe, expect, it } from 'vitest'

import { findMatchingOrigin, findNearbySpotsAndRoute } from '@/lib/route-optimizer'

describe('Route Optimizer Unit Tests', () => {
  describe('findMatchingOrigin (한/영 및 별칭 검색)', () => {
    it('한글 장소명("타임스퀘어")으로 출발지를 정상 매칭해야 한다', () => {
      const origin = findMatchingOrigin('타임스퀘어')
      expect(origin).not.toBeNull()
      expect(origin?.name).toBe('타임스퀘어')
    })

    it('영어 장소명("Times Square")으로 출발지를 정상 매칭해야 한다', () => {
      const origin = findMatchingOrigin('Times Square')
      expect(origin).not.toBeNull()
      expect(origin?.nameEn).toBe('Times Square')
    })

    it('센트럴파크 별칭 검색이 동작해야 한다', () => {
      const origin = findMatchingOrigin('센트럴 파크')
      expect(origin).not.toBeNull()
      expect(origin?.name).toBe('센트럴파크 남단')
      expect(origin?.nameEn).toBe('Central Park South')
    })

    it('존재하지 않는 장소 입력 시 null을 반환해야 한다', () => {
      const origin = findMatchingOrigin('서울역')
      expect(origin).toBeNull()
    })
  })

  describe('findNearbySpotsAndRoute (반경 2km 3개 명소 및 동선)', () => {
    it('타임스퀘어 검색 시 반경 2km 이내 명소 3곳과 최적 동선을 반환해야 한다', () => {
      const itinerary = findNearbySpotsAndRoute('타임스퀘어')
      expect(itinerary).not.toBeNull()
      expect(itinerary?.spots).toHaveLength(3)

      // 모든 명소가 2km 이내인지 확인
      itinerary?.spots.forEach((spot) => {
        expect(spot.distanceKm).toBeLessThanOrEqual(2.0)
        expect(spot.distanceKm).toBeGreaterThan(0)
        expect(spot.lat).toBeDefined()
        expect(spot.lng).toBeDefined()
      })

      // 거리 오름차순 정렬 확인
      expect(itinerary!.spots[0].distanceKm).toBeLessThanOrEqual(itinerary!.spots[1].distanceKm)
      expect(itinerary!.spots[1].distanceKm).toBeLessThanOrEqual(itinerary!.spots[2].distanceKm)

      // 총 이동 거리 및 소요 시간 확인
      expect(itinerary?.totalKm).toBeGreaterThan(0)
      expect(itinerary?.totalMinutes).toBeGreaterThan(0)
    })

    it('브루클린 브리지 검색 시 반경 2km 이내 명소 3곳이 반환되어야 한다', () => {
      const itinerary = findNearbySpotsAndRoute('Brooklyn Bridge')
      expect(itinerary).not.toBeNull()
      expect(itinerary?.spots).toHaveLength(3)
    })
  })
})
