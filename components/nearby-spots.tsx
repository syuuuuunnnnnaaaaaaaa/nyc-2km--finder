import { Bot, Footprints, MapPin, Sparkles } from 'lucide-react'

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
    <section aria-labelledby="nearby-spots-heading" className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 id="nearby-spots-heading" className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
            반경 2키로 이내 유명 명소입니다
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            가까운 순서로 정렬된 3곳의 추천 명소를 클릭하여 지도 위치를 확인하세요.
          </p>
        </div>
        <span className="shrink-0 font-display text-xs font-bold uppercase tracking-widest text-primary">
          {spots.length} Spots
        </span>
      </div>

      <ol className="grid gap-4 md:grid-cols-3">
        {spots.map((spot, index) => {
          const isSelected = activeSpotIndex === index
          const hasAiTip = Boolean(spot.aiTip)

          return (
            <li key={spot.nameEn} className="h-full">
              <Card
                onClick={() => onSelectSpot && onSelectSpot(index)}
                className={`h-full cursor-pointer gap-0 overflow-hidden rounded-lg border transition-all duration-200 ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/30 shadow-lg scale-[1.01]'
                    : 'border-border hover:border-primary/40 hover:shadow-lg'
                } p-0 bg-card`}
              >
                {/* 상단 Spot 헤더 바 */}
                <div
                  className={`flex items-center justify-between border-b px-4 py-2.5 transition-colors ${
                    isSelected
                      ? 'border-primary/30 bg-primary/10 text-primary'
                      : 'border-border bg-surface-low text-muted-foreground'
                  }`}
                >
                  <span className="font-display text-xs font-bold uppercase tracking-widest">
                    Spot {index + 1}
                  </span>
                  <span className="flex items-center gap-1 font-display text-xs font-bold text-primary">
                    <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                    {spot.distanceKm.toFixed(1)} km
                  </span>
                </div>

                {/* 본문 명소 정보 */}
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <div>
                    <h3 className="font-display text-base font-bold leading-snug text-foreground">
                      {spot.name}
                    </h3>
                    <p className="font-display text-xs uppercase tracking-wider text-muted-foreground">
                      {spot.nameEn}
                    </p>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Badge variant={isSelected ? 'default' : 'secondary'} className="rounded-md font-semibold">
                      {spot.tag}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <Footprints className="size-3.5 text-muted-foreground" aria-hidden="true" />
                      도보 {spot.minutes}분
                    </span>
                  </div>

                  {/* AI 도슨트 꿀팁 말풍선 */}
                  {hasAiTip && (
                    <div className="mt-3 flex items-start gap-2 rounded-md border border-border/80 bg-surface-low/80 p-2.5 text-xs text-muted-foreground">
                      <Bot className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                      <p className="leading-relaxed">{spot.aiTip}</p>
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
