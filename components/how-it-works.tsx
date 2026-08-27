import { Compass, Footprints, MapPin, Radar, Sparkles, Wand2 } from 'lucide-react'

import { Card } from '@/components/ui/card'

export function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: MapPin,
      title: '1. 장소 입력',
      description: '숙소나 가고 싶은 뉴욕 랜드마크, 혹은 "소호 브런치 맛집"처럼 가고 싶은 곳을 자연어로 자유롭게 입력하세요.',
      badge: '한/영 자연어 지원',
    },
    {
      num: '02',
      icon: Radar,
      title: '2. 2km 반경 탐색',
      description: '입력한 지점을 중심으로 반경 2km 이내에 위치한 가장 매력적인 대표 명소 3곳을 가까운 순서대로 정확히 추출합니다.',
      badge: '반경 2000m 필터링',
    },
    {
      num: '03',
      icon: Footprints,
      title: '3. 최적 동선 & 도슨트',
      description: '각 명소 간의 최적 도보 순서와 총 소요 시간을 계산하고, Gemini AI가 장소별 현지 여행 꿀팁을 함께 들려드립니다.',
      badge: 'AI 도슨트 꿀팁',
    },
  ]

  return (
    <section id="how-it-works" className="border-b border-border bg-surface-low/50 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5">
        {/* 섹션 헤더 */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 font-display text-xs font-bold uppercase tracking-wider text-primary">
            <Compass className="size-3.5" aria-hidden="true" />
            How It Works
          </span>
          <h2 className="mt-3 text-balance font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            어떻게 작동하나요?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
            단 3단계로 복잡한 뉴욕 일정을 빠르고 스마트하게 최적화합니다.
          </p>
        </div>

        {/* 3단계 카드 그리드 */}
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <Card
                key={step.num}
                className="relative flex flex-col justify-between border-border bg-card p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary shadow-2xs">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="font-display text-2xl font-extrabold tracking-tight text-muted-foreground/30">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    <Sparkles className="size-3 text-secondary" aria-hidden="true" />
                    {step.badge}
                  </span>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
