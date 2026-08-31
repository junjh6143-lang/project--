import type { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // TODO: 글 상세 조회 구현 (Phase 3-2에서)
  const { slug } = await params
  return Response.json({ error: 'Not implemented yet', slug }, { status: 501 })
}
