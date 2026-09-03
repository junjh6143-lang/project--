import { Skeleton } from '@/components/ui/skeleton'

// 블로그 상세 페이지 로딩 UI (헤더 + 본문 형태의 스켈레톤)
export default function BlogLoading() {
  return (
    <div className="border-border bg-background border-b">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* 카테고리 배지 */}
        <Skeleton className="mb-4 h-6 w-20 rounded-full" />
        {/* 제목 */}
        <Skeleton className="mb-3 h-10 w-full" />
        <Skeleton className="mb-6 h-10 w-2/3" />
        {/* 메타데이터 */}
        <Skeleton className="mb-8 h-6 w-48" />
        {/* 본문 블록들 */}
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
