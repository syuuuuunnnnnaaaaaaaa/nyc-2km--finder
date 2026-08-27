import { Compass, Sparkles, Zap } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-8 md:py-10">
        {/* 상단 탑 앱바 영역 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Compass className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold uppercase tracking-wider text-primary">
                NY Route
              </span>
              <span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                Urban Velocity · NYC 2km Finder
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary/20 px-2.5 py-1 text-xs font-bold text-foreground">
              <Zap className="size-3 text-secondary-foreground fill-secondary" aria-hidden="true" />
              AI Powered
            </span>
          </div>
        </div>

        {/* 메인 히어로 타이틀 */}
        <div className="flex flex-col gap-2">
          <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
            뉴욕 2km 콕! 최적 동선 추천
          </h1>
          <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            입력한 뉴욕 여행지 기준 반경 2km 이내 명소 3곳과 스마트한 도보 동선을 빠르게 찾아드립니다.
          </p>
        </div>

        {/* 스펙 배지 */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-md bg-surface-low px-2.5 py-1 text-foreground">
            📍 반경 2.0 km
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-surface-low px-2.5 py-1 text-foreground">
            🗽 대표 명소 3곳
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-surface-low px-2.5 py-1 text-foreground">
            🚶 최적 도보 동선
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-surface-low px-2.5 py-1 text-primary font-bold">
            ⚡ 5초 이내 신속 요약
          </span>
        </div>
      </div>
    </header>
  )
}
