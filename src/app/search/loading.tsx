import { Skeleton } from '@/components/ui/skeleton'

// 검색 페이지 로딩 UI (검색 헤더 + 글 그리드 형태의 스켈레톤)
export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Skeleton className="mb-8 h-9 w-64" />
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} className="h-96 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
