import { describe, expect, it } from 'vitest'

import { withTimeout } from '@/lib/timeout'

describe('Timeout Utility Unit Tests', () => {
  it('제한 시간 내에 완료되는 비동기 작업은 정상 값을 반환해야 한다', async () => {
    const fastPromise = (signal?: AbortSignal) =>
      new Promise<string>((resolve) => {
        setTimeout(() => resolve('SUCCESS'), 50)
      })

    const result = await withTimeout(fastPromise, 500)
    expect(result).toBe('SUCCESS')
  })

  it('제한 시간을 초과하는 비동기 작업은 타임아웃 에러를 발생시켜야 한다', async () => {
    const slowPromise = (signal?: AbortSignal) =>
      new Promise<string>((resolve, reject) => {
        const timer = setTimeout(() => resolve('TOO_SLOW'), 500)
        signal?.addEventListener('abort', () => {
          clearTimeout(timer)
          reject(new Error('TIMEOUT'))
        })
      })

    await expect(withTimeout(slowPromise, 100)).rejects.toThrow()
  })
})
