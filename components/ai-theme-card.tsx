'use client'

import { Bot, Sparkles } from 'lucide-react'

import type { Itinerary } from '@/lib/types'

export function AiThemeCard({ itinerary }: { itinerary: Itinerary }) {
  if (!itinerary.isAiGenerated || (!itinerary.aiThemeTitle && !itinerary.aiThemeDescription)) {
    return null
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-gradient-to-br from-primary/10 via-surface-low/80 to-card p-5 md:p-6 shadow-md">
      {/* 배경 은은한 블러 악센트 */}
      <div className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 size-36 rounded-full bg-secondary/15 blur-2xl" />

      <div className="relative flex flex-col gap-3">
        {/* 상단 뱃지 및 메타 */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-2xs">
              <Bot className="size-4" aria-hidden="true" />
            </span>
            <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
              AI 도슨트 코스 브리핑
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-secondary/20 px-2.5 py-0.5 font-display text-[11px] font-bold text-foreground">
            <Sparkles className="size-3 text-secondary fill-secondary" aria-hidden="true" />
            Gemini AI
          </span>
        </div>

        {/* AI 테마 제목 */}
        {itinerary.aiThemeTitle && (
          <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-foreground md:text-xl">
            {itinerary.aiThemeTitle}
          </h3>
        )}

        {/* AI 테마 설명 */}
        {itinerary.aiThemeDescription && (
          <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
            {itinerary.aiThemeDescription}
          </p>
        )}
      </div>
    </div>
  )
}
