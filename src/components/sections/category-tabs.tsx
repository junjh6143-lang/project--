'use client'

import Link from 'next/link'
import { MOCK_CATEGORIES } from '@/constants/mock-data'

export interface CategoryTabsProps {
  activeCategory?: string | null
  categories?: typeof MOCK_CATEGORIES
}

export function CategoryTabs({
  activeCategory = null,
  categories = MOCK_CATEGORIES,
}: CategoryTabsProps) {
  return (
    <div className="border-border bg-background/50 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex overflow-x-auto" aria-label="카테고리 네비게이션">
          <div className="flex min-w-max gap-2 py-4 sm:gap-4">
            {/* 모든 카테고리 탭 */}
            <Link
              href="/"
              className={`border-b-2 px-3 py-2 text-sm font-medium whitespace-nowrap transition-all sm:px-4 ${
                activeCategory === null
                  ? 'border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground border-transparent'
              }`}
            >
              모든 카테고리
            </Link>

            {/* 개별 카테고리 탭 */}
            {categories.map(category => (
              <Link
                key={category.id}
                href={`/category/${category.name}`}
                className={`border-b-2 px-3 py-2 text-sm font-medium whitespace-nowrap transition-all sm:px-4 ${
                  activeCategory === category.name
                    ? 'border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground border-transparent'
                }`}
              >
                {category.name}
                <span className="ml-1 text-xs opacity-70">
                  ({category.postCount})
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
