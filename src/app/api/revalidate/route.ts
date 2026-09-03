import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Notion 콘텐츠 변경 시 특정 경로를 즉시 재검증하기 위한 온디맨드 API
// 사용 예: POST /api/revalidate?path=/blog/my-post  (헤더: x-revalidate-secret)
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (
    !process.env.REVALIDATE_SECRET ||
    secret !== process.env.REVALIDATE_SECRET
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const path = request.nextUrl.searchParams.get('path') || '/'

  try {
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, path })
  } catch (error) {
    console.error(`[API] POST /api/revalidate 에러 (path: ${path}):`, error)
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
