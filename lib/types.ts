export interface Spot {
  name: string
  nameEn: string
  distanceKm: number
  tag: string
  minutes: number
  lat: number
  lng: number
}

export interface Itinerary {
  origin: string
  originEn: string
  originLat: number
  originLng: number
  line: string
  lineColor: string
  spots: Spot[]
  totalKm: number
  totalMinutes: number
}

export interface NYCLocation {
  id: string
  name: string
  nameEn: string
  lat: number
  lng: number
  tag: string
  aliases: string[]
  line?: string
  lineColor?: string
  borough: 'Manhattan' | 'Brooklyn' | 'Queens' | 'Bronx' | 'Staten Island'
}
