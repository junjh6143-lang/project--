import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PostDetailHeader } from '@/components/sections/post-detail-header'
import {
  TableOfContents,
  TableOfContentsItem,
} from '@/components/sections/table-of-contents'
import { ContentRenderer } from '@/components/content-renderer/ContentRenderer'
import { RelatedPosts } from '@/components/sections/related-posts'
import { PostNav } from '@/components/sections/post-nav'
import {
  fetchPostBySlug,
  fetchAllPosts,
  fetchRelatedPosts,
  fetchAdjacentPosts,
} from '@/lib/notion/queries'
import { extractPlainText } from '@/components/content-renderer/utils'
import { buildMetadata } from '@/lib/seo'
import type { NotionBlock } from '@/types'

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

// 12시간마다 재검증 (ISR)
export const revalidate = 43200

// 빌드 타임에 모든 발행된 글의 slug로 정적 페이지 생성
export async function generateStaticParams() {
  const { posts } = await fetchAllPosts({ status: 'Published' }, undefined, {
    page: 1,
    pageSize: 10000,
  })

  return posts.map(post => ({ slug: post.slug }))
}

// 블록 배열에서 heading 2/3을 추출하여 목차 항목 생성
function extractTableOfContents(blocks: NotionBlock[]): TableOfContentsItem[] {
  return blocks
    .filter(block => block.type === 'heading_2' || block.type === 'heading_3')
    .map((block, idx) => {
      const level = block.type === 'heading_2' ? 2 : 3
      const blockData = block[block.type] as Record<string, unknown> | undefined
      const richText = (blockData?.rich_text as unknown[]) || []
      const text = extractPlainText(richText)
      // ID: heading-{index} (스무스 스크롤 링크용)
      const id = `heading-${idx}`
      return { id, text, level }
    })
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPostBySlug(slug)

  if (!post) {
    return {
      title: '글을 찾을 수 없습니다',
    }
  }

  return buildMetadata({
    title: post.title,
    description: post.description || post.title,
    path: `/blog/${slug}`,
    image: post.thumbnail,
  })
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params

  // 글 조회
  const post = await fetchPostBySlug(slug)
  if (!post) {
    notFound()
  }

  // 전체 발행된 글 조회 (관련 글 및 이전/다음 글 계산용)
  const { posts: allPublishedPosts } = await fetchAllPosts(
    { status: 'Published' },
    undefined,
    { page: 1, pageSize: 10000 }
  )

  // 관련 글 조회
  const relatedPosts = fetchRelatedPosts(post, allPublishedPosts, 3)

  // 이전/다음 글 조회
  const { prev, next } = fetchAdjacentPosts(post, allPublishedPosts)

  // 목차 추출
  const tocItems = extractTableOfContents(post.content || [])

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
                <TableOfContents items={tocItems} title="목차" />

                {/* 본문 콘텐츠 */}
                <ContentRenderer blocks={post.content || []} />
              </div>

              {/* 우측: 사이드바(데스크톱에만 표시) */}
              <aside className="hidden lg:block">
                {/* 데스크톱 목차 (우측 사이드바 고정) */}
                <TableOfContents items={tocItems} title="이 글에서" />
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
