export const SEARCH_TIMEOUT_MS = 5000

export class TimeoutError extends Error {
  constructor(message = 'Request timed out after 5 seconds') {
    super(message)
    this.name = 'TimeoutError'
  }
}

/**
 * 5초 타임아웃 래퍼 유틸리티 (AbortController 기반)
 * PRD 3.2: 5초 이상 응답 지연 시 요청을 강제 중단(Abort)하고 에러 처리
 */
export async function withTimeout<T>(
  asyncFn: (signal: AbortSignal) => Promise<T>,
  timeoutMs: number = SEARCH_TIMEOUT_MS,
  externalSignal?: AbortSignal,
): Promise<T> {
  const controller = new AbortController()

  let timedOut = false
  const timeoutId = setTimeout(() => {
    timedOut = true
    controller.abort(new TimeoutError())
  }, timeoutMs)

  // 외부 signal이 취소된 경우에도 연동
  if (externalSignal) {
    externalSignal.addEventListener('abort', () => {
      controller.abort()
    })
  }

  try {
    const result = await asyncFn(controller.signal)
    clearTimeout(timeoutId)
    return result
  } catch (error: unknown) {
    clearTimeout(timeoutId)
    if (timedOut || (error instanceof Error && error.name === 'AbortError')) {
      throw new TimeoutError()
    }
    throw error
  }
}
