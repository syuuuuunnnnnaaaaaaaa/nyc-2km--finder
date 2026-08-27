import { Compass, Sparkles, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        {/* 로고 */}
        <a href="#" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <span className="flex size-8.5 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
            <Compass className="size-4.5" aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold uppercase tracking-wider text-primary">
              NY Route
            </span>
            <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
              NYC 2km Finder
            </span>
          </div>
        </a>

        {/* 내비게이션 링크 & CTA */}
        <div className="flex items-center gap-4 md:gap-6">
          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#how-it-works"
              className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              작동 방식
            </a>
            <a
              href="#service"
              className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              동선 검색기
            </a>
          </nav>

          <a href="#service">
            <Button size="sm" className="h-8.5 rounded-lg px-4 text-xs font-bold shadow-xs">
              동선 만들기
            </Button>
          </a>
        </div>
      </div>
    </header>
  )
}
