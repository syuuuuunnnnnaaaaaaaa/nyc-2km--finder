'use client'

import { AlertCircle, Loader2, Search, Sparkles } from 'lucide-react'
import { useRef, useState } from 'react'

import { NearbySpots } from '@/components/nearby-spots'
import { RouteTimeline } from '@/components/route-timeline'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { findItinerary, SUGGESTIONS, type Itinerary } from '@/lib/spots'

const MIN_LENGTH = 2
const MAX_LENGTH = 50
const ERROR_MESSAGE = '다시 입력해주세요..'

export function SpotFinder() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<Itinerary | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function runSearch(value: string) {
    const trimmed = value.trim()
    setResult(null)

    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      setError(ERROR_MESSAGE)
      return
    }

    setError(null)
    setIsLoading(true)

    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      const itinerary = findItinerary(trimmed)
      if (!itinerary) {
        setError(ERROR_MESSAGE)
      } else {
        setResult(itinerary)
      }
      setIsLoading(false)
    }, 1400)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    runSearch(query)
  }

  function handleChip(value: string) {
    setQuery(value)
    runSearch(value)
  }

  const overLimit = query.trim().length > MAX_LENGTH

  return (
    <div className="flex flex-col gap-10">
      <section aria-labelledby="search-heading" className="flex flex-col gap-4">
        <h2 id="search-heading" className="sr-only">
          여행지 검색
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
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
              className="h-13 rounded-xl bg-card pl-11 pr-20 text-base shadow-none md:text-base"
            />
            <span
              className={`absolute right-4 top-1/2 -translate-y-1/2 font-display text-xs font-semibold tabular-nums ${
                overLimit ? 'text-destructive' : 'text-muted-foreground'
              }`}
            >
              {query.trim().length}/{MAX_LENGTH}
            </span>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-13 rounded-xl px-8 text-base font-bold transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                검색 중
              </>
            ) : (
              '요약'
            )}
          </Button>
        </form>

        {error ? (
          <p className="flex items-center gap-1.5 text-sm text-red-500 font-medium" role="alert">
            <AlertCircle className="size-4" aria-hidden="true" />
            {error}
          </p>
        ) : (
          <p id="query-hint" className="text-sm text-muted-foreground">
            최소 {MIN_LENGTH}자, 최대 {MAX_LENGTH}자까지 입력할 수 있습니다.
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Demo
          </span>
          {SUGGESTIONS.map((suggestion) => (
            <Button
              key={suggestion}
              type="button"
              variant="outline"
              size="sm"
              disabled={isLoading}
              onClick={() => handleChip(suggestion)}
              className="rounded-full bg-card font-normal"
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
            className="rounded-full font-normal text-muted-foreground"
          >
            Error Test
          </Button>
        </div>
      </section>

      {isLoading && (
        <div className="flex flex-col gap-3" aria-live="polite">
          <div className="h-5 w-48 animate-pulse rounded-full bg-secondary" />
          <div className="grid gap-3 md:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-32 animate-pulse rounded-2xl bg-secondary" />
            ))}
          </div>
          <div className="h-56 animate-pulse rounded-2xl bg-secondary" />
        </div>
      )}

      {!isLoading && result && (
        <div className="flex animate-in flex-col gap-10 fade-in duration-500 slide-in-from-bottom-3">
          <NearbySpots spots={result.spots} />
          <RouteTimeline itinerary={result} />
        </div>
      )}

      {!isLoading && !result && !error && (
        <p className="rounded-2xl border border-dashed border-border px-6 py-10 text-center text-sm text-muted-foreground">
          장소를 입력하고 <span className="font-semibold text-foreground">요약</span> 버튼을 누르면 반경 2km 명소와
          동선을 보여드립니다.
        </p>
      )}
    </div>
  )
}
