import type { NotionBlock } from '@/types'
import { getRichText, extractPlainText } from '../utils'

interface QuoteBlockProps {
  block: NotionBlock
}

export function QuoteBlock({ block }: QuoteBlockProps) {
  const richText = getRichText(block)
  const text = extractPlainText(richText)

  return (
    <blockquote className="border-primary text-muted-foreground bg-muted/50 mb-4 rounded-r-lg border-l-4 py-2 pl-4 italic">
      {text}
    </blockquote>
  )
}
