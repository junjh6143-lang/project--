import type { NotionBlock } from '@/types'
import { getRichText, extractPlainText } from '../utils'

interface CalloutBlockProps {
  block: NotionBlock
}

export function CalloutBlock({ block }: CalloutBlockProps) {
  const richText = getRichText(block)
  const text = extractPlainText(richText)

  return (
    <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
      <p className="text-sm text-blue-900 dark:text-blue-100">{text}</p>
    </div>
  )
}
