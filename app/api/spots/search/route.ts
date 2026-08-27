import { NextResponse } from 'next/server'

import { analyzeLocationWithGemini, enrichSpotsWithGeminiDocent } from '@/lib/gemini'
import { calculateDistanceKm, estimateWalkingMinutes } from '@/lib/geo'
import { NYC_LOCATIONS } from '@/lib/nyc-dataset'
import { findMatchingOrigin, findNearbySpotsAndRoute, optimizeRouteFromOrigin } from '@/lib/route-optimizer'
import type { Itinerary } from '@/lib/types'
import { STANDARD_ERROR_MESSAGE, validateItinerary, validateQuery } from '@/lib/validator'

const MAX_RADIUS_KM = 2.0

/**
 * AI가 식별한 위치 좌표를 기반으로 반경 2km 이내 명소 추출 및 최적 동선 생성
 */
function buildItineraryFromCoords(
  originName: string,
  originNameEn: string,
  lat: number,
  lng: number,
  themeTitle?: string,
  themeDescription?: string,
): Itinerary | null {
  const candidatesWithDistance = NYC_LOCATIONS
    .map((loc) => {
      const distanceKm = calculateDistanceKm(lat, lng, loc.lat, loc.lng)
      return { location: loc, distanceKm, minutes: estimateWalkingMinutes(distanceKm) }
    })
    .filter((item) => item.distanceKm <= MAX_RADIUS_KM)

  if (candidatesWithDistance.length < 3) return null

  candidatesWithDistance.sort((a, b) => a.distanceKm - b.distanceKm)
  const selected = candidatesWithDistance.slice(0, 3)

  const spots = selected.map((item) => ({
    name: item.location.name,
    nameEn: item.location.nameEn,
    distanceKm: item.distanceKm,
    tag: item.location.tag,
    minutes: item.minutes,
    lat: item.location.lat,
    lng: item.location.lng,
  }))

  const leg1 = spots[0].distanceKm
  const leg2 = calculateDistanceKm(selected[0].location.lat, selected[0].location.lng, selected[1].location.lat, selected[1].location.lng)
  const leg3 = calculateDistanceKm(selected[1].location.lat, selected[1].location.lng, selected[2].location.lat, selected[2].location.lng)
  const totalKm = Number((leg1 + leg2 + leg3).toFixed(1))
  const totalMinutes = estimateWalkingMinutes(leg1) + estimateWalkingMinutes(leg2) + estimateWalkingMinutes(leg3)

  const itinerary: Itinerary = {
    origin: originName,
    originEn: originNameEn,
    originLat: lat,
    originLng: lng,
    line: 'AI Powered',
    lineColor: 'var(--color-primary)',
    spots,
    totalKm,
    totalMinutes,
    aiThemeTitle: themeTitle,
    aiThemeDescription: themeDescription,
    isAiGenerated: true,
  }

  return validateItinerary(itinerary) ? itinerary : null
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const query = typeof body?.query === 'string' ? body.query : ''

    // 1. 입력값 길이 검증 (2~50자, PRD 3.1)
    const validation = validateQuery(query)
    if (!validation.isValid) {
      return NextResponse.json({ success: false, message: STANDARD_ERROR_MESSAGE }, { status: 400 })
    }

    let itinerary: Itinerary | null = null
    let pipeline = 'local'

    // 2. AI 하이브리드 파이프라인: Gemini 자연어 분석 → 반경 2km 지오 필터 → 도슨트 팁 생성
    const geminiResult = await analyzeLocationWithGemini(query, 3800)

    if (geminiResult) {
      // 2-A. Gemini가 위치를 식별한 경우: 좌표 기반으로 반경 2km 필터링 실행
      const aiItinerary = buildItineraryFromCoords(
        geminiResult.identifiedName,
        geminiResult.identifiedNameEn,
        geminiResult.lat,
        geminiResult.lng,
        geminiResult.themeTitle,
        geminiResult.themeDescription,
      )

      if (aiItinerary) {
        // 2-B. 도슨트 꿀팁 추가 생성 (병렬 실행, 실패해도 무시)
        const docentResult = await enrichSpotsWithGeminiDocent(
          aiItinerary.origin,
          aiItinerary.spots,
          3000,
        ).catch(() => null)

        if (docentResult?.tips && docentResult.tips.length === 3) {
          aiItinerary.spots = aiItinerary.spots.map((spot, i) => ({
            ...spot,
            aiTip: docentResult.tips[i],
          }))
          if (docentResult.themeTitle) aiItinerary.aiThemeTitle = docentResult.themeTitle
          if (docentResult.themeDescription) aiItinerary.aiThemeDescription = docentResult.themeDescription
        }

        itinerary = aiItinerary
        pipeline = 'gemini-ai'
      }
    }

    // 3. Fallback: Gemini 실패 또는 AI 결과가 유효하지 않은 경우 → 로컬 규칙 기반 엔진
    if (!itinerary) {
      itinerary = findNearbySpotsAndRoute(query)
      pipeline = 'local-fallback'
    }

    if (!itinerary) {
      return NextResponse.json({ success: false, message: STANDARD_ERROR_MESSAGE }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      pipeline,
      data: itinerary,
    })
  } catch {
    return NextResponse.json({ success: false, message: STANDARD_ERROR_MESSAGE }, { status: 500 })
  }
}
