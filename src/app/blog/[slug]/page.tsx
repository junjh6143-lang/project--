import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PostDetailHeader } from '@/components/sections/post-detail-header'
import {
  TableOfContents,
  TableOfContentsItem,
} from '@/components/sections/table-of-contents'
import { PostContent } from '@/components/sections/post-content'
import { RelatedPosts } from '@/components/sections/related-posts'
import { PostNav } from '@/components/sections/post-nav'
import {
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
} from '@/constants/mock-data'

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

// 더미 목차 데이터 (Phase 3에서 실제 콘텐츠에서 추출될 예정)
const DUMMY_TOC_ITEMS: TableOfContentsItem[] = [
  { id: 'introduction', text: '소개', level: 2 },
  { id: 'features', text: '주요 특징', level: 2 },
  { id: 'code-example', text: '코드 예제', level: 3 },
  { id: 'conclusion', text: '결론', level: 2 },
]

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params

  // 글 조회
  const post = getPostBySlug(slug)
  if (!post) {
    notFound()
  }

  // 관련 글 조회
  const relatedPosts = getRelatedPosts(slug, 3)

  // 이전/다음 글 조회
  const { prev, next } = getAdjacentPosts(slug)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* 글 헤더 */}
        <PostDetailHeader post={post} author="기술 블로거" />

        {/* 메인 콘텐츠 영역 */}
        <div className="border-border bg-background border-b">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            {/* 반응형 레이아웃: 모바일/태블릿 1-컬럼, 데스크톱 2-컬럼 */}
            <div className="grid gap-8 lg:grid-cols-3">
              {/* 왼쪽: 본문 (전체 너비) */}
              <div className="lg:col-span-2">
                {/* 모바일 목차 (Sheet 아코디언) */}
                <TableOfContents items={DUMMY_TOC_ITEMS} title="목차" />

                {/* 본문 콘텐츠 */}
                <PostContent post={post} />
              </div>

              {/* 우측: 사이드바 (데스크톱에만 표시) */}
              <aside className="hidden lg:block">
                {/* 데스크톱 목차 (우측 사이드바 고정) */}
                <TableOfContents items={DUMMY_TOC_ITEMS} title="이 글에서" />
              </aside>
            </div>
          </div>
        </div>

        {/* 관련 글 섹션 */}
        <RelatedPosts posts={relatedPosts} title="관련 글" />

        {/* 이전/다음 글 네비게이션 */}
        <PostNav prevPost={prev} nextPost={next} />
      </main>
      <Footer />
    </div>
  )
}
