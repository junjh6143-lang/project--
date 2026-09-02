'use client'

import { useEffect, useState } from 'react'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { BlogHero } from '@/components/sections/blog-hero'
import { CategoryFilter } from '@/components/sections/category-filter'
import { PostGrid } from '@/components/sections/post-grid'
import { Skeleton } from '@/components/ui/skeleton'
import type { NotionPost } from '@/types'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [posts, setPosts] = useState<NotionPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/posts?limit=100')
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || '글을 불러올 수 없습니다.')
        }
        const data = await response.json()
        setPosts(data.posts)
      } catch (err) {
        console.error('글 목록 조회 실패:', err)
        setError(
          err instanceof Error ? err.message : '글을 불러올 수 없습니다.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* 블로그 히어로 섹션 */}
        <BlogHero
          title="기술 블로그에 오신 것을 환영합니다"
          description="Next.js, React, TypeScript 등 최신 웹 기술에 대한 심화 학습과 실전 경험을 공유합니다."
          ctaText="최신 글 보기"
          onCtaClick={() => {
            // 페이지를 글 섹션으로 스크롤
            const element = document.getElementById('posts-section')
            element?.scrollIntoView({ behavior: 'smooth' })
          }}
        />

        {/* 카테고리 필터 섹션 */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* 글 목록 섹션 */}
        <div id="posts-section">
          {isLoading ? (
            <div className="space-y-6 px-4 py-12 sm:px-6 lg:px-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <Skeleton key={i} className="h-96 rounded-lg" />
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="space-y-6 px-4 py-12 sm:px-6 lg:px-8">
              <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          ) : (
            <PostGrid
              posts={posts}
              selectedCategory={selectedCategory}
              pageSize={9}
              variant="default"
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
