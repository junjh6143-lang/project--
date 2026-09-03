import type { NextRequest } from 'next/server'
import { isNotionClientError } from '@notionhq/client'
import { searchPosts } from '@/lib/notion/queries'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const q = (searchParams.get('q') ?? '').trim()

  try {
    const result = await searchPosts(q)

    return Response.json(result, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    if (isNotionClientError(error)) {
      console.error(
        `[Notion] searchPosts API 에러 (${error.code}):`,
        error.message
      )
      return Response.json(
        { error: 'Notion API 요청 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    console.error('[Notion] searchPosts 에러:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : '알 수 없는 오류' },
      { status: 500 }
    )
  }
}
