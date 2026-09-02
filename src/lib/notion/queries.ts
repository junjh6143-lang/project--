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
import type { NotionPost, NotionCategory, NotionBlock } from '@/types'

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

    const dataSourceId = await getDataSourceId()

    // Slug 기반 필터링
    const filterParam: FullDataSourceQueryFilter = {
      property: 'Slug',
      rich_text: { equals: slug },
    } as FullDataSourceQueryFilter

    const pages = await collectAllDataSourceRows(notionClient, {
      data_source_id: dataSourceId,
      filter: filterParam,
    })

    if (pages.length === 0) return null

    const page = pages[0]
    if (!isFullPage(page)) return null

    const post = mapPageToPost(page)
    if (!post) return null

    // 개별 페이지의 블록 조회
    const blocks = await notionClient.blocks.children.list({
      block_id: page.id,
    })

    post.content = blocks.results
      .filter(block => 'type' in block && block.type !== 'unsupported')
      .map(block => {
        const b = block as unknown as NotionBlock & Record<string, unknown>
        return b
      })

    return post
  } catch (error) {
    if (isNotionClientError(error)) {
      console.error(
        `[Notion] fetchPostBySlug('${slug}') API 에러 (${error.code}):`,
        error.message
      )
    } else {
      console.error(`[Notion] fetchPostBySlug('${slug}') 에러:`, error)
    }
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

    // 모든 발행된 글 조회
    const result = await fetchAllPosts({ status: 'Published' }, undefined, {
      page: 1,
      pageSize: 10000,
    })

    const posts = result.posts

    // 카테고리별로 그룹화
    const categoryMap = new Map<string, NotionCategory>()

    posts.forEach(post => {
      if (post.category) {
        if (!categoryMap.has(post.category)) {
          categoryMap.set(post.category, {
            id: post.category, // Notion에서 실제 ID를 가져오지 않으므로 이름 사용
            name: post.category,
            postCount: 0,
          })
        }
        const category = categoryMap.get(post.category)!
        category.postCount += 1
      }
    })

    // Map을 배열로 변환하고 정렬 (이름 기준)
    const categories = Array.from(categoryMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    return categories
  } catch (error) {
    if (isNotionClientError(error)) {
      console.error(
        `[Notion] fetchCategories API 에러 (${error.code}):`,
        error.message
      )
    } else {
      console.error('[Notion] fetchCategories 에러:', error)
    }
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

    // fetchAllPosts를 사용하여 카테고리별 필터링
    const result = await fetchAllPosts(
      { category: categoryName, status: 'Published' },
      { property: 'published at 날짜', direction: 'descending' },
      { page: 1, pageSize: 10000 }
    )

    return { posts: result.posts, total: result.total, category: categoryName }
  } catch (error) {
    if (isNotionClientError(error)) {
      console.error(
        `[Notion] fetchPostsByCategory('${categoryName}') API 에러 (${error.code}):`,
        error.message
      )
    } else {
      console.error(
        `[Notion] fetchPostsByCategory('${categoryName}') 에러:`,
        error
      )
    }
    throw error
  }
}
