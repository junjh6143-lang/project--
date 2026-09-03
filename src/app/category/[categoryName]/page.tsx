import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CategoryHeader } from '@/components/sections/category-header'
import { CategoryTabs } from '@/components/sections/category-tabs'
import { PostGrid } from '@/components/sections/post-grid'
import { getPostsByCategory, MOCK_CATEGORIES } from '@/constants/mock-data'
import { buildMetadata } from '@/lib/seo'

interface CategoryPageProps {
  params: Promise<{ categoryName: string }>
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categoryName } = await params
  const decodedCategoryName = decodeURIComponent(categoryName)

  return buildMetadata({
    title: decodedCategoryName,
    description: `${decodedCategoryName} 카테고리의 모든 글`,
    path: `/category/${categoryName}`,
  })
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryName } = await params
  const decodedCategoryName = decodeURIComponent(categoryName)

  // 카테고리 정보 조회
  const categoryInfo = MOCK_CATEGORIES.find(
    cat => cat.name === decodedCategoryName
  )

  // 카테고리별 글 조회
  const categoryPosts = getPostsByCategory(decodedCategoryName)

  // 카테고리가 없는 경우 처리 (Phase 3에서 notFound() 추가)
  if (!categoryInfo || categoryPosts.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
            <h1 className="text-foreground text-3xl font-bold">
              카테고리를 찾을 수 없습니다
            </h1>
            <p className="text-muted-foreground mt-4">
              요청하신 카테고리에 해당하는 글이 없습니다.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* 카테고리 헤더 */}
        <CategoryHeader
          categoryName={decodedCategoryName}
          postCount={categoryPosts.length}
          description={`${decodedCategoryName} 관련 기술 글들을 모아놓았습니다.`}
        />

        {/* 카테고리 탭 */}
        <CategoryTabs activeCategory={decodedCategoryName} />

        {/* 글 목록 */}
        <PostGrid
          posts={categoryPosts}
          selectedCategory={decodedCategoryName}
          pageSize={9}
          variant="default"
        />
      </main>
      <Footer />
    </div>
  )
}
