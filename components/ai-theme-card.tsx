'use client'

import { Bot, Sparkles } from 'lucide-react'

import { Card } from '@/components/ui/card'
import type { Itinerary } from '@/lib/types'

export function AiThemeCard({ itinerary }: { itinerary: Itinerary }) {
  if (!itinerary.isAiGenerated || (!itinerary.aiThemeTitle && !itinerary.aiThemeDescription)) {
    return null
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-primary/3 to-background p-5 shadow-xs">
      {/* 배경 장식 */}
      <div className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-primary/5 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-6 -left-6 size-32 rounded-full bg-primary/5 blur-2xl" />

      <div className="relative flex flex-col gap-3">
        {/* 헤더 */}
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Bot className="size-4" aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-primary/80">
              AI 추천 동선 테마
            </span>
          </div>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
            <Sparkles className="size-2.5" aria-hidden="true" />
            Gemini AI
          </span>
        </div>

        {/* 테마 제목 */}
        {itinerary.aiThemeTitle && (
          <h3 className="text-base font-bold leading-snug tracking-tight text-foreground md:text-lg">
            {itinerary.aiThemeTitle}
          </h3>
        )}

        {/* 테마 설명 */}
        {itinerary.aiThemeDescription && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {itinerary.aiThemeDescription}
          </p>
        )}
      </div>
    </div>
  )
}
