import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { HomeContent } from '@/components/sections/home-content'
import { fetchAllPosts } from '@/lib/notion/queries'

// 1시간마다 재검증 (ISR)
export const revalidate = 3600

export default async function Home() {
  // 서버에서 발행된 글 목록을 미리 조회 (초기 로딩 상태 없이 즉시 렌더링)
  const { posts } = await fetchAllPosts({ status: 'Published' }, undefined, {
    page: 1,
    pageSize: 100,
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HomeContent posts={posts} />
      </main>
      <Footer />
    </div>
  )
}
