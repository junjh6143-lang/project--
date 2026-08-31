// Notion API 응답 타입들 (임시 정의)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NotionPageResponse = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NotionDatabaseResponse = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NotionBlockResponse = any

// Notion 속성값 타입
export interface NotionPropertyValue {
  id: string
  type: string
  [key: string]: unknown
}

// Notion 데이터베이스 쿼리 응답

export interface NotionQueryDatabaseResponse {
  object: 'list'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any[]
  next_cursor: string | null
  has_more: boolean
}

// 텍스트 일반 타입
export interface TextProperty {
  type: 'text'
  text: Array<{
    type: 'text' | 'equation' | 'mention' | 'user'
    text?: {
      content: string
      link: { url: string } | null
    }
    annotations?: {
      bold: boolean
      italic: boolean
      strikethrough: boolean
      underline: boolean
      code: boolean
      color: string
    }
    plain_text?: string
    href?: string | null
  }>
}

// 제목 타입
export interface TitleProperty {
  type: 'title'
  title: Array<{
    type: 'text'
    text: {
      content: string
      link: { url: string } | null
    }
    annotations: {
      bold: boolean
      italic: boolean
      strikethrough: boolean
      underline: boolean
      code: boolean
      color: string
    }
    plain_text: string
    href: string | null
  }>
}

// Select/Select 타입
export interface SelectProperty {
  type: 'select'
  select: {
    id: string
    name: string
    color: string
  } | null
}

// MultiSelect 타입
export interface MultiSelectProperty {
  type: 'multi_select'
  multi_select: Array<{
    id: string
    name: string
    color: string
  }>
}

// Date 타입
export interface DateProperty {
  type: 'date'
  date: {
    start: string
    end: string | null
    time_zone: string | null
  } | null
}

// Rich Text 블록 타입
export interface RichTextBlock {
  type:
    | 'paragraph'
    | 'heading_1'
    | 'heading_2'
    | 'heading_3'
    | 'quote'
    | 'callout'
  [key: string]: unknown
}

// 코드 블록 타입
export interface CodeBlock {
  type: 'code'
  code: {
    rich_text: Array<{
      type: 'text'
      text: {
        content: string
      }
      plain_text: string
    }>
    language: string
    caption: Array<{
      type: 'text'
      text: {
        content: string
      }
    }>
  }
}

// 이미지 블록 타입
export interface ImageBlock {
  type: 'image'
  image: {
    type: 'external' | 'file'
    external?: {
      url: string
    }
    file?: {
      url: string
      expiry_time: string
    }
  }
}
