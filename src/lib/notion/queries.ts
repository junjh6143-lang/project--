import {
  isFullPage,
  isNotionClientError,
  APIErrorCode,
  collectAllDataSourceRows,
} from '@notionhq/client'
import type { FullDataSourceQueryFilter } from '@notionhq/client'
import { notionClient } from './client'
import { getDataSourceId } from './data-source'
import { mapPageToPost } from './mappers'
import { NOTION_DATABASE_ID } from '@/constants/siteConfig'
import type { NotionPost, NotionCategory } from '@/types'

// 모든 글 조회
export async function fetchAllPosts(
  filter?: {
    category?: string
    status?: string
  },
  sort?: {
    property: string
    direction: 'ascending' | 'descending'
  },
  pagination?: {
    page: number
    pageSize: number
  }
): Promise<{
  posts: NotionPost[]
  total: number
  page: number
  pageSize: number
}> {
  const pageSize = pagination?.pageSize ?? 10
  const page = pagination?.page ?? 1
  const status = filter?.status ?? 'Published'

  try {
    if (!NOTION_DATABASE_ID) {
      throw new Error(
        'NEXT_PUBLIC_NOTION_DATABASE_ID 환경변수가 설정되지 않았습니다.'
      )
    }

    const dataSourceId = await getDataSourceId()

    // 필터 조합: 상태는 항상 포함, category가 있으면 AND 조건으로 추가
    const andFilters: Array<Record<string, unknown>> = [
      { property: '상태', select: { equals: status } },
    ]
    if (filter?.category) {
      andFilters.push({
        property: '카테고리',
        select: { equals: filter.category },
      })
    }

    const filterParam: FullDataSourceQueryFilter =
      andFilters.length > 1
        ? ({ and: andFilters } as FullDataSourceQueryFilter)
        : (andFilters[0] as FullDataSourceQueryFilter)

    // collectAllDataSourceRows: 10,000건 제한을 우회하면서 모든 행 조회
    const allPages = await collectAllDataSourceRows(notionClient, {
      data_source_id: dataSourceId,
      filter: filterParam,
    })

    // 페이지 매핑 및 필터링
    const posts = allPages
      .filter(isFullPage)
      .map(mapPageToPost)
      .filter((p): p is NotionPost => p !== null)

    // publishedAt 기준 내림차순 정렬 (최신순)
    posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    const total = posts.length
    const start = (page - 1) * pageSize
    const paged = posts.slice(start, start + pageSize)

    return { posts: paged, total, page, pageSize }
  } catch (error) {
    if (isNotionClientError(error)) {
      console.error(
        `[Notion] fetchAllPosts API 에러 (${error.code}):`,
        error.message
      )
      if (error.code === APIErrorCode.ObjectNotFound) {
        throw new Error(
          'Notion 데이터베이스를 찾을 수 없습니다. NOTION_DATABASE_ID를 확인하세요.'
        )
      }
      if (
        error.code === APIErrorCode.Unauthorized ||
        error.code === APIErrorCode.RestrictedResource
      ) {
        throw new Error(
          'Notion API 접근 권한이 없습니다. Integration 연결을 확인하세요.'
        )
      }
      throw new Error('Notion API 요청 중 오류가 발생했습니다.')
    }
    console.error('[Notion] fetchAllPosts 에러:', error)
    throw error
  }
}

// 슬러그로 글 조회
export async function fetchPostBySlug(
  slug: string
): Promise<NotionPost | null> {
  try {
    if (!NOTION_DATABASE_ID) {
      throw new Error(
        'NEXT_PUBLIC_NOTION_DATABASE_ID 환경변수가 설정되지 않았습니다.'
      )
    }

    if (!slug || slug.trim() === '') {
      throw new Error('슬러그가 유효하지 않습니다.')
    }

    // TODO: 실제 Notion DB에서 슬러그 기반 조회 구현 (Phase 3-2에서)
    // 현재는 null 반환
    return null
  } catch (error) {
    console.error(`[Notion] fetchPostBySlug('${slug}') 에러:`, error)
    throw error
  }
}

// 카테고리 목록 조회
export async function fetchCategories(): Promise<NotionCategory[]> {
  try {
    if (!NOTION_DATABASE_ID) {
      throw new Error(
        'NEXT_PUBLIC_NOTION_DATABASE_ID 환경변수가 설정되지 않았습니다.'
      )
    }

    // TODO: 실제 Notion DB에서 카테고리 추출 구현 (Phase 3-4에서)
    // 현재는 빈 배열 반환
    return []
  } catch (error) {
    console.error('[Notion] fetchCategories 에러:', error)
    throw error
  }
}

// 검색 쿼리
export async function searchPosts(
  query: string
): Promise<{ posts: NotionPost[]; total: number; query: string }> {
  try {
    if (!NOTION_DATABASE_ID) {
      throw new Error(
        'NEXT_PUBLIC_NOTION_DATABASE_ID 환경변수가 설정되지 않았습니다.'
      )
    }

    if (!query || query.trim() === '') {
      return { posts: [], total: 0, query }
    }

    // TODO: 실제 검색 로직 구현 (Phase 3-5에서)
    // 현재는 빈 결과 반환
    return { posts: [], total: 0, query }
  } catch (error) {
    console.error(`[Notion] searchPosts('${query}') 에러:`, error)
    throw error
  }
}

// 카테고리별 글 조회
export async function fetchPostsByCategory(
  categoryName: string
): Promise<{ posts: NotionPost[]; total: number; category: string }> {
  try {
    if (!NOTION_DATABASE_ID) {
      throw new Error(
        'NEXT_PUBLIC_NOTION_DATABASE_ID 환경변수가 설정되지 않았습니다.'
      )
    }

    if (!categoryName || categoryName.trim() === '') {
      throw new Error('카테고리명이 유효하지 않습니다.')
    }

    // TODO: 실제 Notion DB에서 카테고리 필터링 조회 구현 (Phase 3-4에서)
    // 현재는 빈 결과 반환
    return { posts: [], total: 0, category: categoryName }
  } catch (error) {
    console.error(
      `[Notion] fetchPostsByCategory('${categoryName}') 에러:`,
      error
    )
    throw error
  }
}
