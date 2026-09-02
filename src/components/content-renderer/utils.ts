import type { NotionBlock } from '@/types'

// Notion RichText 배열에서 일반 텍스트 추출
export function extractPlainText(richText: unknown[]): string {
  if (!Array.isArray(richText)) return ''
  return richText
    .map((item: unknown) => {
      if (typeof item === 'object' && item !== null && 'plain_text' in item) {
        return (item as Record<string, unknown>).plain_text
      }
      return ''
    })
    .join('')
}

// RichText 배열에서 스타일 정보와 함께 텍스트 추출
export function extractStyledText(richText: unknown[]) {
  if (!Array.isArray(richText)) return []
  return richText
    .map((item: unknown) => {
      if (typeof item === 'object' && item !== null) {
        const t = item as Record<string, unknown>
        return {
          text: t.plain_text || '',
          bold: (t.annotations as Record<string, unknown>)?.bold || false,
          italic: (t.annotations as Record<string, unknown>)?.italic || false,
          code: (t.annotations as Record<string, unknown>)?.code || false,
          strikethrough:
            (t.annotations as Record<string, unknown>)?.strikethrough || false,
          href: (t.href as string) || null,
        }
      }
      return {
        text: '',
        bold: false,
        italic: false,
        code: false,
        strikethrough: false,
        href: null,
      }
    })
    .filter(item => item.text)
}

// 블록에서 rich_text 배열 추출
export function getRichText(block: NotionBlock): unknown[] {
  const blockData = block[block.type] as Record<string, unknown> | undefined
  return (blockData?.rich_text as unknown[]) || []
}

// 코드 블록에서 언어 정보 추출
export function getCodeLanguage(block: NotionBlock): string {
  const codeBlock = block.code as Record<string, unknown> | undefined
  return (codeBlock?.language as string) || 'text'
}

// 이미지 블록 URL 추출
export function getImageUrl(block: NotionBlock): string | null {
  const imageBlock = block.image as Record<string, unknown> | undefined
  if (!imageBlock) return null

  const file = imageBlock.file as Record<string, unknown>
  const external = imageBlock.external as Record<string, unknown>

  if (file?.url) return file.url as string
  if (external?.url) return external.url as string
  return null
}

// 캐션(이미지 캡션) 추출
export function getCaption(block: NotionBlock): string {
  const blockData = block[block.type] as Record<string, unknown> | undefined
  const caption = blockData?.caption as unknown[]
  return extractPlainText(caption || [])
}
