'use client'

import { useState } from 'react'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { BlogHero } from '@/components/sections/blog-hero'
import { CategoryFilter } from '@/components/sections/category-filter'
import { PostGrid } from '@/components/sections/post-grid'
import { MOCK_POSTS } from '@/constants/mock-data'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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
          <PostGrid
            posts={MOCK_POSTS}
            selectedCategory={selectedCategory}
            pageSize={9}
            variant="default"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
