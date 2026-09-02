import type { NotionBlock } from '@/types'
import { getRichText, extractPlainText } from '../utils'

interface ListItemBlockProps {
  block: NotionBlock
}

export function ListItemBlock({ block }: ListItemBlockProps) {
  const richText = getRichText(block)
  const text = extractPlainText(richText)

  return <li className="text-foreground mb-2 leading-relaxed">{text}</li>
}
