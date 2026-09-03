'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

// 루트 레벨 에러 바운더리 (모든 페이지 렌더링 에러를 캐치)
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[App Error]', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="bg-muted mb-6 flex size-16 items-center justify-center rounded-full">
        <AlertTriangle className="text-destructive size-8" />
      </div>
      <h1 className="text-foreground mb-2 text-2xl font-bold sm:text-3xl">
        문제가 발생했습니다
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md text-sm sm:text-base">
        페이지를 불러오는 중 예상치 못한 오류가 발생했습니다. 잠시 후 다시
        시도해주세요.
      </p>
      <Button onClick={() => reset()}>다시 시도</Button>
    </div>
  )
}
