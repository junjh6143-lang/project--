import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/constants/siteConfig'
import { fetchAllPosts, fetchCategories } from '@/lib/notion/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 정적 라우트
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  try {
    // 모든 발행글 조회
    const allPostsResult = await fetchAllPosts(
      { status: 'Published' },
      undefined,
      { page: 1, pageSize: 10000 }
    )

    const postRoutes: MetadataRoute.Sitemap = allPostsResult.posts.map(
      post => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.updatedAt || post.publishedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })
    )

    // 모든 카테고리 조회
    const categories = await fetchCategories()

    const categoryRoutes: MetadataRoute.Sitemap = categories.map(cat => ({
      url: `${SITE_URL}/category/${encodeURIComponent(cat.name)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    return [...staticRoutes, ...postRoutes, ...categoryRoutes]
  } catch (error) {
    console.error('[Sitemap] 동적 라우트 생성 실패:', error)
    return staticRoutes
  }
}
