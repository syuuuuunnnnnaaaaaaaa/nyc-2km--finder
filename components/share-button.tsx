'use client'

import { Check, Copy, Share2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import type { Itinerary } from '@/lib/types'

export function ShareButton({ itinerary }: { itinerary: Itinerary }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const text = `🗽 NYC 2km Spot & Route Plan
📍 출발지: ${itinerary.origin} (${itinerary.originEn})

[추천 명소 3곳 (반경 2km)]
1. ${itinerary.spots[0].name} (${itinerary.spots[0].distanceKm.toFixed(1)}km, 도보 ${itinerary.spots[0].minutes}분) - ${itinerary.spots[0].tag}
2. ${itinerary.spots[1].name} (${itinerary.spots[1].distanceKm.toFixed(1)}km, 도보 ${itinerary.spots[1].minutes}분) - ${itinerary.spots[1].tag}
3. ${itinerary.spots[2].name} (${itinerary.spots[2].distanceKm.toFixed(1)}km, 도보 ${itinerary.spots[2].minutes}분) - ${itinerary.spots[2].tag}

🚶 추천 동선:
${itinerary.origin} ➔ ${itinerary.spots[0].name} ➔ ${itinerary.spots[1].name} ➔ ${itinerary.spots[2].name}
총 거리: ${itinerary.totalKm.toFixed(1)}km | 총 예상 소요 시간: ${itinerary.totalMinutes}분`

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="rounded-xl border-border bg-card text-xs font-semibold shadow-2xs hover:bg-secondary transition-all"
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-green-600" aria-hidden="true" />
          동선 복사 완료!
        </>
      ) : (
        <>
          <Copy className="size-3.5 text-muted-foreground" aria-hidden="true" />
          동선 복사하기
        </>
      )}
    </Button>
  )
}
