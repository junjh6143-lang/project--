import type { Metadata } from 'next'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SearchHeader } from '@/components/sections/search-header'
import { PostGrid } from '@/components/sections/post-grid'
import { EmptyState } from '@/components/ui/empty-state'
import { Button } from '@/components/ui/button'
import { searchPosts } from '@/lib/notion/queries'
import { buildMetadata } from '@/lib/seo'
import { SITE_TITLE } from '@/constants/siteConfig'
import type { NotionPost } from '@/types'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams
  const query = (params.q ?? '').trim()

  if (!query) {
    return {
      title: `검색 | ${SITE_TITLE}`,
      description: '글을 검색하세요',
    }
  }

  return buildMetadata({
    title: `"${query}" 검색`,
    description: `"${query}"에 대한 검색 결과`,
    path: `/search?q=${encodeURIComponent(query)}`,
  })
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = (params.q ?? '').trim()

  let results: NotionPost[] = []

  if (query) {
    const searchResult = await searchPosts(query)
    results = searchResult.posts
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* 검색 쿼리가 없는 경우: 안내 상태 표시 */}
        {!query ? (
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
        ) : results.length === 0 ? (
          <>
            <SearchHeader query={query} resultCount={0} />
            <section className="py-12 sm:py-16 lg:py-20">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <EmptyState
                  icon={<Search className="text-muted-foreground size-8" />}
                  title="검색 결과가 없습니다"
                  description={`'${query}'에 대한 검색 결과를 찾을 수 없습니다. 다른 검색어로 시도해보세요.`}
                  action={
                    <Button asChild variant="outline">
                      <Link href="/">홈으로 돌아가기</Link>
                    </Button>
                  }
                />
              </div>
            </section>
          </>
        ) : (
          <>
            <SearchHeader query={query} resultCount={results.length} />
            <PostGrid posts={results} pageSize={9} variant="default" />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
