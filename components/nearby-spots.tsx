import { Bot, Footprints, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { Spot } from '@/lib/spots'

interface NearbySpotsProps {
  spots: Spot[]
  activeSpotIndex?: number | null
  onSelectSpot?: (index: number) => void
}

export function NearbySpots({ spots, activeSpotIndex, onSelectSpot }: NearbySpotsProps) {
  return (
    <section aria-labelledby="nearby-spots-heading" className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="nearby-spots-heading" className="text-lg font-bold tracking-tight md:text-xl">
          반경 2키로 이내 유명 명소입니다
        </h2>
        <span className="shrink-0 font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {spots.length} spots
        </span>
      </div>

      <ol className="grid gap-3 md:grid-cols-3">
        {spots.map((spot, index) => {
          const isSelected = activeSpotIndex === index
          const hasAiTip = Boolean(spot.aiTip)

          return (
            <li key={spot.nameEn}>
              <Card
                onClick={() => onSelectSpot && onSelectSpot(index)}
                className={`h-full cursor-pointer gap-0 overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20 shadow-md scale-[1.02]'
                    : 'border-border hover:border-primary/50 hover:shadow-sm'
                } p-0`}
              >
                <div
                  className={`flex items-center justify-between border-b px-4 py-2.5 transition-colors ${
                    isSelected ? 'border-primary/30 bg-primary/10' : 'border-border bg-secondary'
                  }`}
                >
                  <span
                    className={`font-display text-xs font-bold uppercase tracking-widest ${
                      isSelected ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    Spot {index + 1}
                  </span>
                  <span className="flex items-center gap-1 font-display text-sm font-bold text-primary">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {spot.distanceKm.toFixed(1)} km
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-2 px-4 py-4">
                  <p className="text-base font-semibold leading-snug">{spot.name}</p>
                  <p className="font-display text-xs uppercase tracking-wider text-muted-foreground">
                    {spot.nameEn}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant={isSelected ? 'default' : 'secondary'} className="rounded-full font-normal">
                      {spot.tag}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Footprints className="size-3.5" aria-hidden="true" />
                      도보 {spot.minutes}분
                    </span>
                  </div>

                  {/* AI 도슨트 꿀팁 뱃지 */}
                  {hasAiTip && (
                    <div className="mt-3 flex items-start gap-2 rounded-xl bg-primary/5 px-3 py-2.5 ring-1 ring-primary/10">
                      <Bot className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                      <p className="text-xs leading-relaxed text-muted-foreground">{spot.aiTip}</p>
                    </div>
                  )}
                </div>
              </Card>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
