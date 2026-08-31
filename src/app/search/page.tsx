'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SearchHeader } from '@/components/sections/search-header'
import { PostGrid } from '@/components/sections/post-grid'
import { EmptyState } from '@/components/ui/empty-state'
import { Button } from '@/components/ui/button'
import { searchPosts } from '@/constants/mock-data'

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''

  // 검색 쿼리가 없는 경우: 안내 상태 표시
  if (!query) {
    return (
      <>
        <SearchHeader query="" resultCount={0} />
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <EmptyState
              icon={<Search className="text-muted-foreground size-8" />}
              title="검색어를 입력해주세요"
              description="글 제목, 설명, 태그 등으로 원하는 글을 검색할 수 있습니다."
            />
          </div>
        </section>
      </>
    )
  }

  const results = searchPosts(query)

  return (
    <>
      {/* 검색 헤더: 검색어 + 결과 수 + 검색 입력 */}
      <SearchHeader query={query} resultCount={results.length} />

      {/* 검색 결과가 없는 경우 */}
      {results.length === 0 ? (
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <EmptyState
              icon={<Search className="text-muted-foreground size-8" />}
              title="검색 결과가 없습니다"
              description={`'${query}'에 대한 검색 결과를 찾을 수 없습니다. 다른 검색어로 시도해보세요.`}
              action={
                <Button asChild variant="outline">
                  <Link href="/">
                    {/* TODO: 검색 입력 포커스 등 추가 UX 로직 구현 필요 (Phase 3) */}
                    홈으로 돌아가기
                  </Link>
                </Button>
              }
            />
          </div>
        </section>
      ) : (
        /* 검색 결과 목록: 홈과 동일한 반응형 그리드 + 페이지네이션 */
        <PostGrid posts={results} pageSize={9} variant="default" />
      )}
    </>
  )
}

function SearchResultsFallback() {
  return (
    <>
      <SearchHeader query="" resultCount={0} />
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-muted-foreground">
          검색 결과를 불러오는 중입니다...
        </p>
      </div>
    </>
  )
}

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<SearchResultsFallback />}>
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
