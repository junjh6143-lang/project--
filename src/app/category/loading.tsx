import { Skeleton } from '@/components/ui/skeleton'

// 카테고리 페이지 로딩 UI (헤더 + 글 그리드 형태의 스켈레톤)
export default function CategoryLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* 카테고리 헤더 */}
      <Skeleton className="mb-3 h-9 w-56" />
      <Skeleton className="mb-8 h-5 w-80" />
      {/* 글 그리드 */}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} className="h-96 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
