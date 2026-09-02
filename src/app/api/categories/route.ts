import { fetchCategories } from '@/lib/notion/queries'

export async function GET() {
  try {
    const categories = await fetchCategories()

    return Response.json(
      { categories },
      {
        headers: {
          'Cache-Control':
            'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    )
  } catch (error) {
    console.error('[API] GET /api/categories 에러:', error)
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
