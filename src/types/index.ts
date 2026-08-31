export type PostStatus = 'Draft' | 'Published'

export interface NotionPost {
  id: string
  title: string
  slug: string
  category: string
  tags: string[]
  publishedAt: Date
  updatedAt?: Date
  status: PostStatus
  description: string
  content: NotionBlock[]
  thumbnail?: string
}

export interface NotionCategory {
  id: string
  name: string
  postCount: number
}

// Notion 페이지 콘텐츠 블록의 임시 플레이스홀더 타입.
// 실제 @notionhq/client 응답 타입은 Task 1-2-2에서 정교화한다.
export interface NotionBlock {
  id: string
  type: string
  [key: string]: unknown
}

export interface SearchResult {
  posts: NotionPost[]
  query: string
  total: number
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}
