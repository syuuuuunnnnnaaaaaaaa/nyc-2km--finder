export interface Spot {
  name: string
  nameEn: string
  distanceKm: number
  tag: string
  minutes: number
}

export interface Itinerary {
  origin: string
  originEn: string
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
