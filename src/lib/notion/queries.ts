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
  try {
    if (!NOTION_DATABASE_ID) {
      throw new Error(
        'NEXT_PUBLIC_NOTION_DATABASE_ID 환경변수가 설정되지 않았습니다.'
      )
    }

    const pageSize = pagination?.pageSize ?? 10
    const page = pagination?.page ?? 1

    // TODO: 실제 Notion DB 조회 구현 (Phase 3-1에서)
    // 현재는 임시 응답 반환
    return {
      posts: [],
      total: 0,
      page,
      pageSize,
    }
  } catch (error) {
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
