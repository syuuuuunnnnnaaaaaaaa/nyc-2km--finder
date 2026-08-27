import { HowItWorks } from '@/components/how-it-works'
import { LandingHero } from '@/components/landing-hero'
import { SiteHeader } from '@/components/site-header'
import { SpotFinder } from '@/components/spot-finder'

export default function Page() {
  return (
    <main className="min-h-dvh bg-background">
      {/* 1. 상단 내비게이션 헤더 */}
      <SiteHeader />

      {/* 2. 랜딩 히어로 섹션 (서비스 소개 & 메인 CTA) */}
      <LandingHero />

      {/* 3. 작동 방식 3단계 소개 */}
      <HowItWorks />

      {/* 4. 실제 서비스 인입 섹션 (2km 명소 검색 및 동선 생성기) */}
      <section id="service" className="scroll-mt-16 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary/20 px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-foreground">
              ⚡ Live Route Finder
            </span>
            <h2 className="mt-3 text-balance font-display text-2xl font-bold tracking-tight text-foreground md:text-4xl">
              어디로 가고 싶으신가요?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              뉴욕 랜드마크나 가고 싶은 여행지를 입력하고 2km 반경의 추천 명소와 최적 동선을 확인하세요.
            </p>
          </div>

          <SpotFinder />
        </div>
      </section>

      {/* 5. 푸터 */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 py-8 text-xs text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold uppercase text-primary">NY Route</span>
            <span>·</span>
            <span>Urban Velocity Design System</span>
          </div>
          <p className="text-[11px]">
            © {new Date().getFullYear()} NY Route. Optimized for New York City travelers.
          </p>
        </div>
      </footer>
    </main>
  )
}
