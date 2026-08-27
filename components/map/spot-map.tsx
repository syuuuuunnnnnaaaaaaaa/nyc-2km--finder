'use client'

import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import { MapPin, Navigation } from 'lucide-react'
import { useEffect, useRef } from 'react'

import type { Itinerary } from '@/lib/types'

interface SpotMapProps {
  itinerary: Itinerary
  activeSpotIndex?: number | null
  onSelectSpot?: (index: number) => void
}

export default function SpotMap({ itinerary, activeSpotIndex, onSelectSpot }: SpotMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const circleRef = useRef<L.Circle | null>(null)
  const polylineRef = useRef<L.Polyline | null>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    // 지도 인스턴스가 이미 존재하면 정리 후 재생성
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    const { originLat, originLng, spots } = itinerary

    // 1. 지도 초기화 (CartoDB Voyager 모던 타일 레이어 적용)
    const map = L.map(mapContainerRef.current, {
      center: [originLat, originLng],
      zoom: 14,
      zoomControl: true,
      attributionControl: false,
    })
    mapInstanceRef.current = map

    // 고품질 모던 지도 타일 (CartoDB Voyager)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map)

    // 2. 2km 반경 Circle 오버레이
    const circle = L.circle([originLat, originLng], {
      radius: 2000,
      color: '#3b82f6',
      weight: 2,
      dashArray: '6, 6',
      fillColor: '#3b82f6',
      fillOpacity: 0.07,
    }).addTo(map)
    circleRef.current = circle

    // 3. 출발지 마커 (빨간색 네비게이션 핀)
    const originIcon = L.divIcon({
      className: 'custom-origin-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="flex size-9 items-center justify-center rounded-full bg-red-600 text-white shadow-lg ring-4 ring-red-600/20 transition-transform duration-200 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="3 11 22 2 13 21 11 13 3 11"/>
            </svg>
          </div>
          <span class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900/90 px-2 py-0.5 text-[11px] font-bold text-white shadow-md">
            출발지: ${itinerary.origin}
          </span>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    })

    const originMarker = L.marker([originLat, originLng], { icon: originIcon })
      .addTo(map)
      .bindPopup(
        `<div class="p-1 font-sans">
          <div class="text-xs font-bold uppercase tracking-wider text-red-600">출발지 (Origin)</div>
          <div class="text-sm font-bold text-neutral-900">${itinerary.origin}</div>
          <div class="text-xs text-neutral-500">${itinerary.originEn}</div>
        </div>`,
        { offset: [0, -14] },
      )

    // 4. 3개 명소 마커 (1, 2, 3 번호 뱃지)
    const markers: L.Marker[] = []
    const latLngs: L.LatLngExpression[] = [[originLat, originLng]]

    spots.forEach((spot, idx) => {
      const isSelected = activeSpotIndex === idx
      latLngs.push([spot.lat, spot.lng])

      const spotIcon = L.divIcon({
        className: `custom-spot-marker spot-marker-${idx}`,
        html: `
          <div class="relative flex items-center justify-center">
            <div class="flex size-8 items-center justify-center rounded-full ${
              isSelected ? 'bg-primary scale-125 ring-4 ring-primary/40' : 'bg-primary ring-2 ring-white'
            } text-white font-bold text-xs shadow-md transition-all duration-200 hover:scale-110">
              ${idx + 1}
            </div>
            <span class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900/90 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-sm">
              ${spot.name}
            </span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      const marker = L.marker([spot.lat, spot.lng], { icon: spotIcon })
        .addTo(map)
        .bindPopup(
          `<div class="p-1 font-sans">
            <div class="flex items-center gap-1.5">
              <span class="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">Stop ${idx + 1}</span>
              <span class="text-xs text-neutral-500">${spot.tag}</span>
            </div>
            <div class="text-sm font-bold text-neutral-900 mt-1">${spot.name}</div>
            <div class="text-xs text-neutral-500">${spot.nameEn}</div>
            <div class="mt-2 text-xs font-semibold text-neutral-700">
              📍 거리: ${spot.distanceKm.toFixed(1)}km · 도보 ${spot.minutes}분
            </div>
          </div>`,
          { offset: [0, -12] },
        )

      marker.on('click', () => {
        if (onSelectSpot) onSelectSpot(idx)
      })

      markers.push(marker)
    })

    markersRef.current = markers

    // 5. 최적 이동 동선 Polyline (출발지 → Spot 1 → Spot 2 → Spot 3)
    const polyline = L.polyline(latLngs, {
      color: '#2563eb',
      weight: 4,
      opacity: 0.85,
      dashArray: '8, 6',
      lineJoin: 'round',
    }).addTo(map)
    polylineRef.current = polyline

    // 6. 뷰포트 Bounds 맞춤 (출발지와 2km 반경 원이 지도에 꽉 차도록)
    const bounds = circle.getBounds()
    map.fitBounds(bounds, { padding: [24, 24] })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [itinerary])

  // activeSpotIndex 변경 시 해당 마커로 지도 포커스 및 팝업 열기
  useEffect(() => {
    if (!mapInstanceRef.current || activeSpotIndex == null) return
    const marker = markersRef.current[activeSpotIndex]
    if (marker) {
      const spot = itinerary.spots[activeSpotIndex]
      if (spot) {
        mapInstanceRef.current.panTo([spot.lat, spot.lng], { animate: true, duration: 0.5 })
        marker.openPopup()
      }
    }
  }, [activeSpotIndex, itinerary])

  return (
    <div className="relative flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
            <MapPin className="size-3.5" aria-hidden="true" />
          </span>
          <h3 className="text-sm font-bold tracking-tight md:text-base">반경 2km 추천 동선 지도</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-block size-2 rounded-full bg-blue-500 animate-pulse" />
          <span>반경 2km 원형 영역</span>
        </div>
      </div>

      <div className="relative h-[340px] w-full overflow-hidden rounded-2xl border border-border shadow-xs md:h-[400px]">
        <div ref={mapContainerRef} className="h-full w-full bg-secondary/50" />
      </div>
    </div>
  )
}
