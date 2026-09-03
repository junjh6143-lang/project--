'use client'

import { useState } from 'react'
import { BlogHero } from '@/components/sections/blog-hero'
import { CategoryFilter } from '@/components/sections/category-filter'
import { PostGrid } from '@/components/sections/post-grid'
import type { NotionPost } from '@/types'

export interface HomeContentProps {
  posts: NotionPost[]
}

// 홈 페이지의 인터랙티브 영역 (카테고리 필터 상태 관리)
// 서버 컴포넌트인 page.tsx에서 미리 조회한 posts를 받아 클라이언트에서 필터링/페이지네이션 처리
export function HomeContent({ posts }: HomeContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <>
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
          posts={posts}
          selectedCategory={selectedCategory}
          pageSize={9}
          variant="default"
        />
      </div>
    </>
  )
}
