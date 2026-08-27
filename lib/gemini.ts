import { GoogleGenAI, Type } from '@google/genai'

import type { Itinerary, Spot } from '@/lib/types'

// Gemini API Key 로드
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null

export interface GeminiGeocodeResult {
  identifiedName: string
  identifiedNameEn: string
  lat: number
  lng: number
  themeTitle: string
  themeDescription: string
  reasoning: string
}

export interface GeminiDocentResult {
  themeTitle: string
  themeDescription: string
  tips: string[]
}

/**
 * Gemini AI를 통해 사용자의 자연어 입력을 분석하고 뉴욕 내 기준 위치와 테마를 추출
 */
export async function analyzeLocationWithGemini(
  query: string,
  timeoutMs: number = 3800,
): Promise<GeminiGeocodeResult | null> {
  if (!ai) return null

  try {
    const prompt = `You are a New York City expert travel assistant.
The user wants to find spots within 2km of a location in NYC.
User Query: "${query}"

Analyze the user's intent and determine the most relevant NYC location (Manhattan, Brooklyn, Queens, Bronx, Staten Island).
If the query is a specific landmark, address, neighborhood, or conceptual place (e.g. "somewhere nice for coffee near Central Park", "vintage shops in Soho", "Brooklyn Bridge viewpoint"), identify the exact central anchor point in NYC with accurate latitude and longitude.

Return:
1. identifiedName: Korean name of the anchor location (e.g. "센트럴파크 남단", "소호 브로드웨이", "덤보 메인 스트리트")
2. identifiedNameEn: English name of the anchor location
3. lat: Latitude (number, e.g. 40.7580)
4. lng: Longitude (number, e.g. -73.9855)
5. themeTitle: A catchy Korean theme title for this route (e.g. "맨해튼 도심 속 건축 & 힐링 워킹 코스")
6. themeDescription: A warm, informative 1-2 sentence Korean summary of why this starting point and route are great.
7. reasoning: Short explanation of how this location was chosen.`

    const timeoutPromise = new Promise<null>((_, reject) =>
      setTimeout(() => reject(new Error('GEMINI_TIMEOUT')), timeoutMs),
    )

    const apiPromise = ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            identifiedName: { type: Type.STRING },
            identifiedNameEn: { type: Type.STRING },
            lat: { type: Type.NUMBER },
            lng: { type: Type.NUMBER },
            themeTitle: { type: Type.STRING },
            themeDescription: { type: Type.STRING },
            reasoning: { type: Type.STRING },
          },
          required: [
            'identifiedName',
            'identifiedNameEn',
            'lat',
            'lng',
            'themeTitle',
            'themeDescription',
          ],
        },
      },
    })

    const response = (await Promise.race([apiPromise, timeoutPromise])) as any
    if (!response || !response.text) return null

    const parsed = JSON.parse(response.text) as GeminiGeocodeResult

    // NYC 대략적인 바운딩 박스 검증 (위도 40.4 ~ 40.95, 경도 -74.3 ~ -73.65)
    if (
      parsed.lat < 40.4 ||
      parsed.lat > 40.95 ||
      parsed.lng < -74.3 ||
      parsed.lng > -73.65
    ) {
      return null
    }

    return parsed
  } catch (err) {
    // API 에러 또는 타임아웃 발생 시 fallback을 위해 null 반환
    return null
  }
}

/**
 * 2km 이내 추출된 3개 명소에 대해 AI 도슨트 꿀팁 생성
 */
export async function enrichSpotsWithGeminiDocent(
  originName: string,
  spots: Spot[],
  timeoutMs: number = 3000,
): Promise<{ themeTitle?: string; themeDescription?: string; tips: string[] } | null> {
  if (!ai || spots.length !== 3) return null

  try {
    const prompt = `You are an NYC local tour docent.
Starting Point: "${originName}"
Selected 3 Spots (within 2km):
1. ${spots[0].name} (${spots[0].nameEn}) - ${spots[0].distanceKm}km
2. ${spots[1].name} (${spots[1].nameEn}) - ${spots[1].distanceKm}km
3. ${spots[2].name} (${spots[2].nameEn}) - ${spots[2].distanceKm}km

Provide:
1. themeTitle: A captivating Korean title for this 2km walking route (e.g. "뉴욕 로컬 감성 만끽하는 도보 힐링 코스")
2. themeDescription: 1-2 friendly Korean sentences explaining why this 3-spot walking route is special.
3. tips: An array of exactly 3 short, practical Korean travel tips (1 tip per spot, e.g. "브라이언트 파크: 잔디밭 북카페 테이블에서 레모네이드 한 잔의 여유를 즐겨보세요!").`

    const timeoutPromise = new Promise<null>((_, reject) =>
      setTimeout(() => reject(new Error('GEMINI_TIMEOUT')), timeoutMs),
    )

    const apiPromise = ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            themeTitle: { type: Type.STRING },
            themeDescription: { type: Type.STRING },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ['themeTitle', 'themeDescription', 'tips'],
        },
      },
    })

    const response = (await Promise.race([apiPromise, timeoutPromise])) as any
    if (!response || !response.text) return null

    const parsed = JSON.parse(response.text)
    return {
      themeTitle: parsed.themeTitle,
      themeDescription: parsed.themeDescription,
      tips: parsed.tips && parsed.tips.length >= 3 ? parsed.tips.slice(0, 3) : [],
    }
  } catch (err) {
    return null
  }
}
