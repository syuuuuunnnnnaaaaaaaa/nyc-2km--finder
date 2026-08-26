import { NextResponse } from 'next/server'

import { findNearbySpotsAndRoute } from '@/lib/route-optimizer'
import { STANDARD_ERROR_MESSAGE, validateQuery } from '@/lib/validator'

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const query = typeof body?.query === 'string' ? body.query : ''

    // 1. 입력값 길이 검증 (2~50자)
    const validation = validateQuery(query)
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, message: STANDARD_ERROR_MESSAGE },
        { status: 400 },
      )
    }

    // 2. 2km 반경 명소 3곳 탐색 및 최적 동선 계산
    const itinerary = findNearbySpotsAndRoute(query)

    // 3. 뉴욕 내 장소 미존재 또는 2km 이내 명소 부족/검증 실패 시
    if (!itinerary) {
      return NextResponse.json(
        { success: false, message: STANDARD_ERROR_MESSAGE },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: itinerary,
    })
  } catch {
    return NextResponse.json(
      { success: false, message: STANDARD_ERROR_MESSAGE },
      { status: 500 },
    )
  }
}
