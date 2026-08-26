import { Footprints, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { Spot } from '@/lib/spots'

export function NearbySpots({ spots }: { spots: Spot[] }) {
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
        {spots.map((spot, index) => (
          <li key={spot.nameEn}>
            <Card className="h-full gap-0 overflow-hidden rounded-2xl border-border p-0 transition-shadow duration-300 hover:shadow-md">
              <div className="flex items-center justify-between border-b border-border bg-secondary px-4 py-2.5">
                <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Stop {index + 1}
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
                  <Badge variant="secondary" className="rounded-full font-normal">
                    {spot.tag}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Footprints className="size-3.5" aria-hidden="true" />
                    도보 {spot.minutes}분
                  </span>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  )
}
