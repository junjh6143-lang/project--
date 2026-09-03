'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

// 카테고리 페이지 세그먼트 에러 바운더리
export default function CategoryError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[Category Error]', error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="bg-muted mb-6 flex size-16 items-center justify-center rounded-full">
        <AlertTriangle className="text-destructive size-8" />
      </div>
      <h1 className="text-foreground mb-2 text-2xl font-bold sm:text-3xl">
        카테고리를 불러올 수 없습니다
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md text-sm sm:text-base">
        카테고리 글 목록을 불러오는 중 오류가 발생했습니다. 다시 시도하거나
        홈으로 돌아가주세요.
      </p>
      <div className="flex gap-3">
        <Button onClick={() => reset()}>다시 시도</Button>
        <Button asChild variant="outline">
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  )
}
