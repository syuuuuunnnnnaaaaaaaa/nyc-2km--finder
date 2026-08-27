import { CheckCircle2, Clock, Flag, Navigation, Route } from 'lucide-react'

import { ShareButton } from '@/components/share-button'
import { Card } from '@/components/ui/card'
import type { Itinerary } from '@/lib/spots'

export function RouteTimeline({ itinerary }: { itinerary: Itinerary }) {
  const stations = [
    { label: itinerary.origin, sub: '출발지 (기준 위치)', order: 0 },
    ...itinerary.spots.map((spot, index) => ({
      label: spot.name,
      sub: `${spot.distanceKm.toFixed(1)} km · 도보 약 ${spot.minutes}분`,
      order: index + 1,
    })),
  ]

  return (
    <section aria-labelledby="route-heading" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id="route-heading" className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
            추천하는 이동 동선
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            도보 이동 거리를 최소화한 최적의 순차 동선입니다.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="shrink-0 font-display text-xs font-bold uppercase tracking-widest text-primary">
            NY Route Line
          </span>
          <ShareButton itinerary={itinerary} />
        </div>
      </div>

      <Card className="gap-0 overflow-hidden rounded-lg border-border bg-card p-0 shadow-md">
        {/* 타임라인 스텝 목록 */}
        <ol className="flex flex-col px-5 py-6 md:px-7">
          {stations.map((station, index) => {
            const isLast = index === stations.length - 1
            const isOrigin = index === 0

            return (
              <li key={station.label} className="relative flex gap-4 pb-7 last:pb-0">
                {/* 연결선 */}
                {!isLast && (
                  <span
                    className="absolute left-[13px] top-7 h-[calc(100%-1rem)] w-[2px] rounded-full bg-primary/25"
                    aria-hidden="true"
                  />
                )}

                {/* 순서 노드 뱃지 */}
                <span
                  className={
                    isOrigin
                      ? 'relative z-10 flex size-7 shrink-0 items-center justify-center rounded-md bg-secondary font-display text-xs font-extrabold text-secondary-foreground shadow-xs'
                      : 'relative z-10 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary font-display text-xs font-bold text-primary-foreground shadow-xs'
                  }
                >
                  {isOrigin ? <Navigation className="size-3.5" aria-hidden="true" /> : station.order}
                </span>

                {/* 장소 정보 */}
                <div className="flex flex-col gap-0.5 pt-0.5">
                  <p className="font-display text-base font-bold leading-snug text-foreground">
                    {station.label}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground">{station.sub}</p>
                </div>

                {isLast && (
                  <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                    <Flag className="size-3.5" aria-hidden="true" />
                    도착
                  </span>
                )}
              </li>
            )
          })}
        </ol>

        {/* 하단 요약 메트릭 바 */}
        <div className="grid grid-cols-2 divide-x divide-border border-t border-border bg-surface-low">
          <div className="flex items-center gap-3 px-5 py-4">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Route className="size-4.5" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                총 이동 거리
              </span>
              <span className="font-display text-lg font-bold text-foreground">
                {itinerary.totalKm.toFixed(1)} km
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-4">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Clock className="size-4.5" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                예상 소요 시간
              </span>
              <span className="font-display text-lg font-bold tabular-nums text-foreground">
                약 {itinerary.totalMinutes}분
              </span>
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}
