import type { NotionBlock } from '@/types'
import { getRichText, extractPlainText } from '../utils'

interface ParagraphBlockProps {
  block: NotionBlock
}

export function ParagraphBlock({ block }: ParagraphBlockProps) {
  const richText = getRichText(block)
  const text = extractPlainText(richText)

  return <p className="text-foreground mb-4 leading-relaxed">{text}</p>
}
