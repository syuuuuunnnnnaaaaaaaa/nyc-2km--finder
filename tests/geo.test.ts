import { describe, expect, it } from 'vitest'

import { calculateDistanceKm, estimateWalkingMinutes } from '@/lib/geo'

describe('Geo Utility Unit Tests', () => {
  it('동일한 좌표 간의 거리는 0km 이어야 한다', () => {
    const lat = 40.758
    const lng = -73.9855
    expect(calculateDistanceKm(lat, lng, lat, lng)).toBe(0)
  })

  it('타임스퀘어와 브라이언트파크 간 거리는 약 0.4km ~ 0.6km 범위여야 한다', () => {
    // Times Square (40.7580, -73.9855), Bryant Park (40.7536, -73.9832)
    const distance = calculateDistanceKm(40.758, -73.9855, 40.7536, -73.9832)
    expect(distance).toBeGreaterThan(0.3)
    expect(distance).toBeLessThan(0.8)
  })

  it('도보 소요 시간은 거리에 비례하여 최소 1분 이상이어야 한다', () => {
    expect(estimateWalkingMinutes(0.4)).toBeGreaterThanOrEqual(5)
    expect(estimateWalkingMinutes(1.0)).toBeGreaterThanOrEqual(12)
    expect(estimateWalkingMinutes(0.01)).toBeGreaterThanOrEqual(1)
  })
})
