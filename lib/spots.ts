export type Spot = {
  name: string
  nameEn: string
  distanceKm: number
  tag: string
  minutes: number
}

export type Itinerary = {
  origin: string
  originEn: string
  line: string
  lineColor: string
  spots: Spot[]
  totalKm: number
  totalMinutes: number
}

type Entry = {
  aliases: string[]
  data: Omit<Itinerary, 'totalKm' | 'totalMinutes'>
}

const ENTRIES: Entry[] = [
  {
    aliases: ['times square', 'timessquare', '타임스퀘어', '타임스퀘어역', '미드타운'],
    data: {
      origin: '타임스퀘어',
      originEn: 'Times Square',
      line: 'N Q R W',
      lineColor: 'var(--color-chart-2)',
      spots: [
        { name: '브라이언트 파크', nameEn: 'Bryant Park', distanceKm: 0.4, tag: '도심 공원', minutes: 6 },
        { name: '뉴욕 공립도서관', nameEn: 'NY Public Library', distanceKm: 0.9, tag: '건축 · 실내', minutes: 12 },
        { name: '엠파이어 스테이트 빌딩', nameEn: 'Empire State Building', distanceKm: 1.6, tag: '전망대', minutes: 21 },
      ],
    },
  },
  {
    aliases: ['central park', 'centralpark', '센트럴파크', '센트럴 파크', '어퍼웨스트'],
    data: {
      origin: '센트럴파크 남단',
      originEn: 'Central Park South',
      line: 'A B C',
      lineColor: 'var(--color-primary)',
      spots: [
        { name: '컬럼버스 서클', nameEn: 'Columbus Circle', distanceKm: 0.3, tag: '광장 · 쇼핑', minutes: 5 },
        { name: '메트로폴리탄 미술관', nameEn: 'The Met', distanceKm: 1.2, tag: '미술관', minutes: 16 },
        { name: '베데스다 분수', nameEn: 'Bethesda Terrace', distanceKm: 1.8, tag: '산책 코스', minutes: 24 },
      ],
    },
  },
  {
    aliases: ['brooklyn bridge', 'brooklynbridge', '브루클린 브리지', '브루클린브리지', '덤보', 'dumbo'],
    data: {
      origin: '브루클린 브리지',
      originEn: 'Brooklyn Bridge',
      line: '4 5 6',
      lineColor: 'var(--color-chart-1)',
      spots: [
        { name: '덤보 워싱턴 스트리트', nameEn: 'Dumbo Washington St', distanceKm: 0.6, tag: '포토 스팟', minutes: 8 },
        { name: '브루클린 브리지 파크', nameEn: 'Brooklyn Bridge Park', distanceKm: 1.1, tag: '수변 공원', minutes: 15 },
        { name: '제인스 캐러셀', nameEn: "Jane's Carousel", distanceKm: 1.4, tag: '가족 · 명소', minutes: 18 },
      ],
    },
  },
  {
    aliases: ['soho', '소호', '그리니치빌리지', 'greenwich village', '차이나타운'],
    data: {
      origin: '소호',
      originEn: 'SoHo',
      line: 'C E',
      lineColor: 'var(--color-chart-5)',
      spots: [
        { name: '워싱턴 스퀘어 파크', nameEn: 'Washington Sq Park', distanceKm: 0.7, tag: '거리 공연', minutes: 9 },
        { name: '리틀 이태리', nameEn: 'Little Italy', distanceKm: 1.0, tag: '먹거리', minutes: 13 },
        { name: '뉴 뮤지엄', nameEn: 'New Museum', distanceKm: 1.5, tag: '현대미술', minutes: 19 },
      ],
    },
  },
  {
    aliases: ['하이라인', 'high line', 'highline', '첼시', 'chelsea'],
    data: {
      origin: '하이라인 파크',
      originEn: 'The High Line',
      line: '7',
      lineColor: 'var(--color-chart-2)',
      spots: [
        { name: '첼시 마켓', nameEn: 'Chelsea Market', distanceKm: 0.5, tag: '푸드홀', minutes: 7 },
        { name: '리틀 아일랜드', nameEn: 'Little Island', distanceKm: 0.8, tag: '수변 공원', minutes: 11 },
        { name: '허드슨 야드 베슬', nameEn: 'Hudson Yards Vessel', distanceKm: 1.9, tag: '랜드마크', minutes: 25 },
      ],
    },
  },
]

export const SUGGESTIONS = ['Times Square', 'Central Park', 'Brooklyn Bridge', '하이라인'] as const

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function findItinerary(query: string): Itinerary | null {
  const q = normalize(query)
  if (!q) return null

  const entry = ENTRIES.find((item) =>
    item.aliases.some((alias) => {
      const a = normalize(alias)
      return a === q || a.includes(q) || q.includes(a)
    }),
  )
  if (!entry) return null

  const legs = entry.data.spots.reduce<number[]>((acc, spot, index) => {
    const previous = index === 0 ? 0 : entry.data.spots[index - 1].distanceKm
    acc.push(Math.abs(Number((spot.distanceKm - previous).toFixed(2))))
    return acc
  }, [])

  const totalKm = Number(legs.reduce((sum, leg) => sum + leg, 0).toFixed(1))

  return {
    ...entry.data,
    totalKm,
    totalMinutes: Math.round(totalKm * 13),
  }
}
