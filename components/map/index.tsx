'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'
import type { Itinerary } from '@/lib/types'

const DynamicSpotMap = dynamic(() => import('@/components/map/spot-map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[340px] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-secondary/50 md:h-[400px]">
      <Loader2 className="size-6 animate-spin text-primary" aria-hidden="true" />
      <span className="text-xs font-medium text-muted-foreground">지도를 불러오는 중...</span>
    </div>
  ),
})

interface SpotMapContainerProps {
  itinerary: Itinerary
  activeSpotIndex?: number | null
  onSelectSpot?: (index: number) => void
}

export function SpotMapContainer(props: SpotMapContainerProps) {
  return <DynamicSpotMap {...props} />
}
