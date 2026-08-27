import { Clock, Flag, Navigation, Route } from 'lucide-react'

import { ShareButton } from '@/components/share-button'
import { Card } from '@/components/ui/card'
import type { Itinerary } from '@/lib/spots'

export function RouteTimeline({ itinerary }: { itinerary: Itinerary }) {
  const stations = [
    { label: itinerary.origin, sub: '입력 장소', order: 0 },
    ...itinerary.spots.map((spot, index) => ({
      label: spot.name,
      sub: `${spot.distanceKm.toFixed(1)} km · 도보 ${spot.minutes}분`,
      order: index + 1,
    })),
  ]

  return (
    <section aria-labelledby="route-heading" className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="route-heading" className="text-lg font-bold tracking-tight md:text-xl">
          추천하는 이동 동선
        </h2>
        <div className="flex items-center gap-3">
          <span className="shrink-0 font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Line {itinerary.line}
          </span>
          <ShareButton itinerary={itinerary} />
        </div>
      </div>

      <Card className="gap-0 overflow-hidden rounded-2xl border-border p-0">
        <ol className="flex flex-col px-5 py-6 md:px-7">
          {stations.map((station, index) => {
            const isLast = index === stations.length - 1
            const isOrigin = index === 0

            return (
              <li key={station.label} className="relative flex gap-4 pb-7 last:pb-0">
                {!isLast && (
                  <span
                    className="absolute left-[13px] top-7 h-[calc(100%-1rem)] w-[3px] rounded-full bg-border"
                    aria-hidden="true"
                  />
                )}

                <span
                  className={
                    isOrigin
                      ? 'relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground'
                      : 'relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary font-display text-xs font-bold text-primary-foreground'
                  }
                >
                  {isOrigin ? <Navigation className="size-3.5" aria-hidden="true" /> : station.order}
                </span>

                <div className="flex flex-col gap-0.5 pt-0.5">
                  <p className="text-[15px] font-semibold leading-snug">{station.label}</p>
                  <p className="text-xs tracking-wide text-muted-foreground">{station.sub}</p>
                </div>

                {isLast && (
                  <Flag
                    className="ml-auto size-4 shrink-0 self-center text-muted-foreground"
                    aria-hidden="true"
                  />
                )}
              </li>
            )
          })}
        </ol>

        <div className="grid grid-cols-2 divide-x divide-border border-t border-border bg-secondary">
          <div className="flex items-center gap-3 px-5 py-4">
            <Route className="size-4 text-primary" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-[11px] font-medium tracking-wide text-muted-foreground">
                총 이동 거리
              </span>
              <span className="font-display text-lg font-bold">{itinerary.totalKm.toFixed(1)} km</span>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-4">
            <Clock className="size-4 text-primary" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-[11px] font-medium tracking-wide text-muted-foreground">
                예상 소요 시간
              </span>
              <span className="text-lg font-bold tabular-nums">{itinerary.totalMinutes}분</span>
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}
