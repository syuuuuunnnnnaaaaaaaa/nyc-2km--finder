'use client'

import { AlertCircle, Loader2, Search, Sparkles } from 'lucide-react'
import { useRef, useState } from 'react'

import { AiThemeCard } from '@/components/ai-theme-card'
import { SpotMapContainer } from '@/components/map'
import { NearbySpots } from '@/components/nearby-spots'
import { RouteTimeline } from '@/components/route-timeline'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { searchItineraryAsync, SUGGESTIONS, type Itinerary } from '@/lib/spots'
import { withTimeout } from '@/lib/timeout'
import {
  MAX_QUERY_LENGTH,
  MIN_QUERY_LENGTH,
  STANDARD_ERROR_MESSAGE,
  validateQuery,
} from '@/lib/validator'

export function SpotFinder() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<Itinerary | null>(null)
  const [activeSpotIndex, setActiveSpotIndex] = useState<number | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  async function runSearch(value: string) {
    const trimmed = value.trim()

    // 1. 이전 결과 및 진행 중인 요청 초기화
    setResult(null)
    setActiveSpotIndex(null)
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }

    // 2. PRD 3.1: 입력값 길이 검증 (2~50자)
    const validation = validateQuery(trimmed)
    if (!validation.isValid) {
      setError(STANDARD_ERROR_MESSAGE)
      setIsLoading(false)
      return
    }

    // 3. 로딩 상태 활성화 및 5초 타임아웃 검색 실행
    setError(null)
    setIsLoading(true)

    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      // PRD 3.2: 5초 타임아웃 AbortController 적용
      const itinerary = await withTimeout(
        (signal) => searchItineraryAsync(trimmed, signal),
        5000,
        controller.signal,
      )

      // PRD 3.3, 3.4: 장소 검증 실패 또는 유효하지 않은 결과인 경우
      if (!itinerary) {
        setError(STANDARD_ERROR_MESSAGE)
        setResult(null)
      } else {
        setError(null)
        setResult(itinerary)
      }
    } catch {
      // 타임아웃(5초 초과) 또는 통신 에러 발생 시 강제 중단 및 에러 메시지 표시
      setError(STANDARD_ERROR_MESSAGE)
      setResult(null)
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    runSearch(query)
  }

  function handleChip(value: string) {
    setQuery(value)
    runSearch(value)
  }

  const overLimit = query.trim().length > MAX_QUERY_LENGTH

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <section aria-labelledby="search-heading" className="flex flex-col gap-4">
        <h2 id="search-heading" className="sr-only">
          여행지 검색
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                if (error) setError(null)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && event.nativeEvent.isComposing) event.preventDefault()
              }}
              placeholder="가고싶은 여행지를 입력하시오"
              aria-label="여행지 입력"
              aria-invalid={Boolean(error)}
              aria-describedby="query-hint"
              maxLength={80}
              className="h-12 rounded-lg bg-card pl-11 pr-20 text-base shadow-xs md:text-base border-border"
            />
            <span
              className={`absolute right-4 top-1/2 -translate-y-1/2 font-display text-xs font-semibold tabular-nums ${
                overLimit ? 'text-destructive' : 'text-muted-foreground'
              }`}
            >
              {query.trim().length}/{MAX_QUERY_LENGTH}
            </span>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 rounded-lg px-8 text-base font-bold transition-all duration-200 bg-primary text-white hover:opacity-90 shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4.5 animate-spin" aria-hidden="true" />
                검색 중
              </>
            ) : (
              '요약'
            )}
          </Button>
        </form>

        {error ? (
          <p className="flex items-center gap-1.5 text-sm font-semibold text-[#ba1a1a]" role="alert">
            <AlertCircle className="size-4" aria-hidden="true" />
            {error}
          </p>
        ) : (
          <p id="query-hint" className="text-xs text-muted-foreground">
            최소 {MIN_QUERY_LENGTH}자, 최대 {MAX_QUERY_LENGTH}자까지 입력할 수 있습니다. (자연어 검색 지원)
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Sparkles className="size-3.5 text-secondary" aria-hidden="true" />
            추천 키워드
          </span>
          {SUGGESTIONS.map((suggestion) => (
            <Button
              key={suggestion}
              type="button"
              variant="outline"
              size="sm"
              disabled={isLoading}
              onClick={() => handleChip(suggestion)}
              className="rounded-md border-border bg-card font-medium text-xs hover:border-primary/50 hover:bg-surface-low"
            >
              {suggestion}
            </Button>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isLoading}
            onClick={() => handleChip('X')}
            className="rounded-md font-normal text-xs text-muted-foreground hover:bg-surface-low"
          >
            에러 테스트 (1자)
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isLoading}
            onClick={() => handleChip('지연테스트')}
            className="rounded-md font-normal text-xs text-muted-foreground hover:bg-surface-low"
          >
            5초 타임아웃 테스트
          </Button>
        </div>
      </section>

      {isLoading && (
        <div className="flex flex-col gap-4" aria-live="polite">
          <div className="h-5 w-48 animate-pulse rounded-md bg-surface-low" />
          <div className="h-80 animate-pulse rounded-lg bg-surface-low" />
          <div className="grid gap-4 md:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-36 animate-pulse rounded-lg bg-surface-low" />
            ))}
          </div>
          <div className="h-56 animate-pulse rounded-lg bg-surface-low" />
        </div>
      )}

      {!isLoading && result && (
        <div className="flex animate-in flex-col gap-10 fade-in duration-500 slide-in-from-bottom-3">
          <AiThemeCard itinerary={result} />
          <SpotMapContainer
            itinerary={result}
            activeSpotIndex={activeSpotIndex}
            onSelectSpot={(idx) => setActiveSpotIndex(idx)}
          />
          <NearbySpots
            spots={result.spots}
            activeSpotIndex={activeSpotIndex}
            onSelectSpot={(idx) => setActiveSpotIndex(idx === activeSpotIndex ? null : idx)}
          />
          <RouteTimeline itinerary={result} />
        </div>
      )}

      {!isLoading && !result && !error && (
        <div className="rounded-lg border border-dashed border-border bg-card/60 px-6 py-12 text-center text-sm text-muted-foreground shadow-2xs">
          <p className="leading-relaxed">
            장소를 입력하고 <span className="font-bold text-primary">요약</span> 버튼을 누르면 반경 2km 명소와 최적 동선을 추천해드립니다.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            예: "소호 브런치 맛집 근처", "타임스퀘어", "브루클린 덤보 전망 좋은 곳"
          </p>
        </div>
      )}
    </div>
  )
}
