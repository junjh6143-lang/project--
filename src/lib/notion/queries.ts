import { cache } from 'react'
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

// 슬러그로 글 조회 (내부 구현)
async function _fetchPostBySlug(slug: string): Promise<NotionPost | null> {
  try {
    if (!NOTION_DATABASE_ID) {
      throw new Error(
        'NEXT_PUBLIC_NOTION_DATABASE_ID 환경변수가 설정되지 않았습니다.'
      )
    }

    if (!slug || slug.trim() === '') {
      throw new Error('슬러그가 유효하지 않습니다.')
    }

    // 모든 발행글 조회
    const result = await fetchAllPosts({ status: 'Published' }, undefined, {
      page: 1,
      pageSize: 10000,
    })

    // 슬러그로 메모리에서 찾기
    const post = result.posts.find(p => p.slug === slug)
    if (!post) return null

    // 찾은 글의 블록 조회
    const blocks = await notionClient.blocks.children.list({
      block_id: post.id,
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

// 슬러그로 글 조회 (캐시된 버전, export)
export const fetchPostBySlug = cache(_fetchPostBySlug)

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

// 관련 글 조회 (같은 카테고리, 자신 제외, 최신순)
export function fetchRelatedPosts(
  currentPost: NotionPost,
  allPublishedPosts: NotionPost[],
  limit = 3
): NotionPost[] {
  return allPublishedPosts
    .filter(
      post =>
        post.category === currentPost.category && post.slug !== currentPost.slug
    )
    .slice(0, limit)
}

// 이전/다음 글 조회 (발행 순서 기준)
export function fetchAdjacentPosts(
  currentPost: NotionPost,
  allPublishedPosts: NotionPost[]
): { prev: NotionPost | null; next: NotionPost | null } {
  const currentIndex = allPublishedPosts.findIndex(
    p => p.slug === currentPost.slug
  )

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    // prev: 더 오래된 글 (배열의 뒤쪽, 인덱스가 큼)
    prev:
      currentIndex < allPublishedPosts.length - 1
        ? allPublishedPosts[currentIndex + 1]
        : null,
    // next: 더 최신 글 (배열의 앞쪽, 인덱스가 작음)
    next: currentIndex > 0 ? allPublishedPosts[currentIndex - 1] : null,
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

    // 모든 발행글 조회
    const result = await fetchAllPosts({ status: 'Published' }, undefined, {
      page: 1,
      pageSize: 10000,
    })

    const lowerQuery = query.toLowerCase()

    // 검색 필터링 및 관련성 정렬
    const searchResults = result.posts
      .map(post => {
        const titleMatch = post.title.toLowerCase().includes(lowerQuery)
        const descriptionMatch = post.description
          .toLowerCase()
          .includes(lowerQuery)
        const tagMatch = post.tags.some(tag =>
          tag.toLowerCase().includes(lowerQuery)
        )

        // 관련성 점수 계산
        let score = 0
        if (titleMatch) score += 3
        if (tagMatch) score += 2
        if (descriptionMatch) score += 1

        return { post, score, titleMatch, descriptionMatch, tagMatch }
      })
      .filter(item => item.score > 0)
      .sort((a, b) => {
        // 관련성 점수로 정렬, 동점이면 최신순
        if (b.score !== a.score) return b.score - a.score
        return (
          new Date(b.post.publishedAt).getTime() -
          new Date(a.post.publishedAt).getTime()
        )
      })
      .map(item => item.post)

    return { posts: searchResults, total: searchResults.length, query }
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
