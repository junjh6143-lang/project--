import type { NotionBlock } from '@/types'
import { getRichText, extractPlainText } from '../utils'

interface HeadingBlockProps {
  block: NotionBlock
}

export function HeadingBlock({ block }: HeadingBlockProps) {
  const blockType = block.type as string
  const level = parseInt(blockType.replace('heading_', '')) || 1
  const richText = getRichText(block)
  const text = extractPlainText(richText)

  const headingClass: Record<number, string> = {
    1: 'text-3xl md:text-4xl font-bold mt-8 mb-4',
    2: 'text-2xl md:text-3xl font-bold mt-6 mb-3',
    3: 'text-xl md:text-2xl font-bold mt-5 mb-3',
    4: 'text-lg md:text-xl font-bold mt-4 mb-2',
    5: 'text-base md:text-lg font-bold mt-3 mb-2',
    6: 'text-sm md:text-base font-bold mt-2 mb-2',
  }

  // 제목 ID 생성 (목차/스크롤 링크용)
  const headingId = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  const className = `${headingClass[level]} text-foreground`

  switch (level) {
    case 1:
      return (
        <h1 id={headingId} className={className}>
          {text}
        </h1>
      )
    case 2:
      return (
        <h2 id={headingId} className={className}>
          {text}
        </h2>
      )
    case 3:
      return (
        <h3 id={headingId} className={className}>
          {text}
        </h3>
      )
    case 4:
      return (
        <h4 id={headingId} className={className}>
          {text}
        </h4>
      )
    case 5:
      return (
        <h5 id={headingId} className={className}>
          {text}
        </h5>
      )
    default:
      return (
        <h6 id={headingId} className={className}>
          {text}
        </h6>
      )
  }
}
