import { ArrowDown, Compass, MapPin, Navigation, Sparkles, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function LandingHero() {
  return (
    <section className="relative flex min-h-[560px] w-full items-center justify-center overflow-hidden border-b border-border bg-slate-950 text-white">
      {/* 배경 이미지 및 다크 그라데이션 오버레이 */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-45 mix-blend-luminosity brightness-90"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop')`,
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-background" />

      {/* 히어로 콘텐츠 */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 py-16 text-center md:py-24">
        {/* 상단 뱃지 */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/15 px-3.5 py-1.5 backdrop-blur-md">
          <Sparkles className="size-3.5 text-secondary" aria-hidden="true" />
          <span className="font-display text-xs font-bold uppercase tracking-widest text-secondary">
            NY Route · AI Urban Velocity
          </span>
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="text-balance font-display text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-sm md:text-5xl lg:text-6xl">
          몇 시간이 아닌, <span className="text-secondary">몇 초 만에</span>
          <br />
          뉴욕 여행 동선을 완성하세요
        </h1>

        {/* 서브 카피 */}
        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-200 opacity-90 md:text-lg">
          복잡한 뉴욕 여행, 이제 헤매지 마세요. 가고 싶은 곳 한 곳만 입력하면 반경 2km 대표 명소 3곳과 AI 최적 도보 동선을 즉시 찾아드립니다.
        </p>

        {/* CTA 버튼 */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a href="#service">
            <Button
              size="lg"
              className="h-13 gap-2.5 rounded-lg bg-primary px-8 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:opacity-95 hover:shadow-xl"
            >
              지금 바로 동선 만들기
              <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
            </Button>
          </a>
        </div>

        {/* 핵심 스펙 태그 */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 backdrop-blur-xs">
            <MapPin className="size-3.5 text-secondary" aria-hidden="true" />
            반경 2km 이내 명소 3곳
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 backdrop-blur-xs">
            <Navigation className="size-3.5 text-secondary" aria-hidden="true" />
            최적 도보 순서 계산
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 backdrop-blur-xs">
            <Zap className="size-3.5 text-secondary" aria-hidden="true" />
            5초 이내 신속 응답
          </span>
        </div>
      </div>
    </section>
  )
}
