'use client'

import { useState, useMemo } from 'react'
import { NotionPost } from '@/types'
import { PostCard } from '@/components/sections/post-card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { EmptyState } from '@/components/ui/empty-state'
import { Search } from 'lucide-react'

export interface PostGridProps {
  posts: NotionPost[]
  selectedCategory?: string | null
  pageSize?: number
  variant?: 'default' | 'compact'
}

export function PostGrid({
  posts,
  selectedCategory = null,
  pageSize = 9,
  variant = 'default',
}: PostGridProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // 카테고리별 필터링
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts
    return posts.filter(post => post.category === selectedCategory)
  }, [posts, selectedCategory])

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredPosts.length / pageSize)
  const startIdx = (currentPage - 1) * pageSize
  const endIdx = startIdx + pageSize
  const paginatedPosts = filteredPosts.slice(startIdx, endIdx)

  // 페이지 번호 배열 (최대 5개)
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    pages.push(1)
    let startPage = Math.max(2, currentPage - 1)
    let endPage = Math.min(totalPages - 1, currentPage + 1)

    if (currentPage <= 3) {
      endPage = Math.min(totalPages - 1, 4)
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 3)
    }

    if (startPage > 2) pages.push('...')
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    if (endPage < totalPages - 1) pages.push('...')
    pages.push(totalPages)

    return pages
  }

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 글이 없는 경우
  if (filteredPosts.length === 0) {
    return (
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EmptyState
            icon={<Search className="text-muted-foreground size-8" />}
            title="글이 없습니다"
            description={
              selectedCategory
                ? `"${selectedCategory}" 카테고리에 발행된 글이 없습니다. 다른 카테고리를 선택해보세요.`
                : '아직 발행된 글이 없습니다. 곧 업데이트될 예정입니다.'
            }
          />
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 결과 수 표시 */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-2xl font-bold sm:text-3xl">
              {selectedCategory ? `${selectedCategory} 글` : '최신 글'}
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              총 {filteredPosts.length}개의 글
              {totalPages > 1 && ` • ${currentPage}/${totalPages} 페이지`}
            </p>
          </div>
        </div>

        {/* 글 그리드 */}
        <div
          className={`grid gap-4 sm:gap-6 lg:gap-8 ${
            variant === 'compact'
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {paginatedPosts.map(post => (
            <PostCard key={post.id} post={post} variant={variant} />
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Pagination>
              <PaginationContent>
                {/* 이전 버튼 */}
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    isDisabled={currentPage === 1}
                    className={
                      currentPage === 1
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer'
                    }
                  />
                </PaginationItem>

                {/* 페이지 번호 */}
                {getPageNumbers().map((page, idx) => (
                  <PaginationItem key={idx}>
                    {page === '...' ? (
                      <span className="text-muted-foreground flex size-9 items-center justify-center">
                        {page}
                      </span>
                    ) : (
                      <PaginationLink
                        onClick={() => handlePageChange(page as number)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                {/* 다음 버튼 */}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    isDisabled={currentPage === totalPages}
                    className={
                      currentPage === totalPages
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* 페이지 정보 */}
        {totalPages > 1 && (
          <div className="text-muted-foreground mt-6 text-center text-sm">
            {startIdx + 1}–{Math.min(endIdx, filteredPosts.length)}개 글 표시 (
            {filteredPosts.length}개 중)
          </div>
        )}
      </div>
    </section>
  )
}
