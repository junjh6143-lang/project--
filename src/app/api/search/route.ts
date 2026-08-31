import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // TODO: 검색 기능 구현 (Phase 3-5에서)
  const searchParams = request.nextUrl.searchParams
  const q = searchParams.get('q')
  return Response.json(
    { error: 'Not implemented yet', query: q },
    { status: 501 }
  )
}
