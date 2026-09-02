import type { PageObjectResponse } from '@notionhq/client'
import type { NotionPost } from '@/types'

function getTitle(page: PageObjectResponse, prop: string): string {
  const p = page.properties[prop]
  if (p?.type !== 'title') return ''
  return p.title.map(t => t.plain_text).join('')
}

function getRichText(page: PageObjectResponse, prop: string): string {
  const p = page.properties[prop]
  if (p?.type !== 'rich_text') return ''
  return p.rich_text.map(t => t.plain_text).join('')
}

function getSelect(page: PageObjectResponse, prop: string): string {
  const p = page.properties[prop]
  return p?.type === 'select' ? (p.select?.name ?? '') : ''
}

function getMultiSelect(page: PageObjectResponse, prop: string): string[] {
  const p = page.properties[prop]
  return p?.type === 'multi_select' ? p.multi_select.map(o => o.name) : []
}

function getDate(page: PageObjectResponse, prop: string): Date | undefined {
  const p = page.properties[prop]
  if (p?.type !== 'date' || !p.date?.start) return undefined
  return new Date(p.date.start)
}

/**
 * Notion 페이지를 NotionPost로 매핑
 * 필수 데이터(publishedAt, status)가 없으면 null 반환하고 경고 로그
 */
export function mapPageToPost(page: PageObjectResponse): NotionPost | null {
  const publishedAt = getDate(page, 'published at 날짜')
  const status = getSelect(page, '상태')

  if (!publishedAt || (status !== 'Draft' && status !== 'Published')) {
    console.warn(
      `[Notion] 페이지 ${page.id} 데이터 누락으로 스킵됨 (publishedAt=${publishedAt}, status=${status})`
    )
    return null
  }

  return {
    id: page.id,
    title: getTitle(page, '제목'),
    slug: getRichText(page, 'Slug'),
    category: getSelect(page, '카테고리'),
    tags: getMultiSelect(page, '태그'),
    publishedAt,
    updatedAt: getDate(page, 'Updated'),
    status: status as NotionPost['status'],
    description: getRichText(page, 'Description'),
    thumbnail: undefined,
    content: [],
  }
}
