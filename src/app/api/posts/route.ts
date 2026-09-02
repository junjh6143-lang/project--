import type { NextRequest } from 'next/server'
import { fetchAllPosts } from '@/lib/notion/queries'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const pageParam = searchParams.get('page')
  const limitParam = searchParams.get('limit')
  const category = searchParams.get('category') ?? undefined

  const page = pageParam ? Number(pageParam) : 1
  const limit = limitParam ? Number(limitParam) : 10

  // 입력값 검증
  if (!Number.isInteger(page) || page < 1) {
    return Response.json(
      { error: 'page는 1 이상의 정수여야 합니다.' },
      { status: 400 }
    )
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    return Response.json(
      { error: 'limit은 1~100 사이의 정수여야 합니다.' },
      { status: 400 }
    )
  }

  try {
    const result = await fetchAllPosts(
      { status: 'Published', category },
      { property: 'Published', direction: 'descending' },
      { page, pageSize: limit }
    )
    return Response.json(result, { status: 200 })
  } catch (error) {
    console.error('[API] GET /api/posts 에러:', error)
    const message =
      error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
    return Response.json({ error: message }, { status: 500 })
  }
}
