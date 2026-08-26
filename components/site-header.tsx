import { Compass } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-5 py-10 md:py-14">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Compass className="size-4.5" aria-hidden="true" />
          </span>
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
            NYC Spot &amp; Route Finder
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight md:text-[2.75rem]">
            뉴욕 2km 콕! 최적 동선 추천
          </h1>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            입력한 장소 기준 반경 2km 이내 명소와 최적 이동 경로를 한눈에
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <span>Radius 2.0 km</span>
          <span className="h-px w-8 bg-border" aria-hidden="true" />
          <span>Top 3 Spots</span>
          <span className="h-px w-8 bg-border" aria-hidden="true" />
          <span>Walking Route</span>
        </div>
      </div>
    </header>
  )
}
