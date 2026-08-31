'use client'

import { useState } from 'react'
import { MOCK_CATEGORIES } from '@/constants/mock-data'

export interface CategoryFilterProps {
  selectedCategory?: string | null
  onCategoryChange?: (category: string | null) => void
  categories?: typeof MOCK_CATEGORIES
}

export function CategoryFilter({
  selectedCategory = null,
  onCategoryChange,
  categories = MOCK_CATEGORIES,
}: CategoryFilterProps) {
  const [active, setActive] = useState<string | null>(selectedCategory)

  const handleCategoryClick = (categoryName: string | null) => {
    setActive(categoryName)
    onCategoryChange?.(categoryName)
  }

  return (
    <section className="border-border bg-background/50 border-b py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* 섹션 제목 */}
          <div>
            <h2 className="text-foreground text-lg font-semibold sm:text-xl">
              카테고리
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              관심 있는 주제를 선택하여 글을 필터링하세요.
            </p>
          </div>

          {/* 카테고리 탭 */}
          <div className="flex flex-wrap gap-2">
            {/* 모든 카테고리 탭 */}
            <button
              onClick={() => handleCategoryClick(null)}
              className={`flex min-h-11 items-center rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                active === null
                  ? 'bg-primary text-primary-foreground'
                  : 'border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground border'
              }`}
            >
              모든 카테고리
            </button>

            {/* 개별 카테고리 탭 (최소 44px 터치 타겟 확보) */}
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className={`flex min-h-11 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  active === category.name
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground border'
                }`}
              >
                <span>{category.name}</span>
                <span className="text-xs opacity-70">
                  ({category.postCount})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
