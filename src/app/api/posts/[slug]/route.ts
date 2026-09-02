import type { NextRequest } from 'next/server'
import { fetchPostBySlug } from '@/lib/notion/queries'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    if (!slug || typeof slug !== 'string') {
      return Response.json(
        { error: '유효하지 않은 슬러그입니다.' },
        { status: 400 }
      )
    }

    const post = await fetchPostBySlug(slug)

    if (!post) {
      return Response.json(
        { error: '해당 글을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return Response.json(post, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error(`[API] GET /api/posts/${slug} 에러:`, error)
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Notion API 오류가 발생했습니다.',
      },
      { status: 500 }
    )
  }
}
