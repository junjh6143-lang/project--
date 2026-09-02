'use client'

import { useMemo } from 'react'
import type { NotionBlock } from '@/types'
import { ParagraphBlock } from './blocks/ParagraphBlock'
import { HeadingBlock } from './blocks/HeadingBlock'
import { CodeBlock } from './blocks/CodeBlock'
import { ImageBlock } from './blocks/ImageBlock'
import { QuoteBlock } from './blocks/QuoteBlock'
import { DividerBlock } from './blocks/DividerBlock'
import { CalloutBlock } from './blocks/CalloutBlock'
import { ListItemBlock } from './blocks/ListItemBlock'

interface BlockRendererProps {
  block: NotionBlock
}

export function BlockRenderer({ block }: BlockRendererProps) {
  const blockType = block.type

  const component = useMemo(() => {
    switch (blockType) {
      case 'paragraph':
        return <ParagraphBlock block={block} />
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
      case 'heading_4':
      case 'heading_5':
      case 'heading_6':
        return <HeadingBlock block={block} />
      case 'code':
        return <CodeBlock block={block} />
      case 'image':
        return <ImageBlock block={block} />
      case 'quote':
        return <QuoteBlock block={block} />
      case 'divider':
        return <DividerBlock />
      case 'callout':
        return <CalloutBlock block={block} />
      case 'bulleted_list_item':
      case 'numbered_list_item':
        return <ListItemBlock block={block} />
      default:
        console.warn(`[BlockRenderer] 지원하지 않는 블록 타입: ${blockType}`)
        return null
    }
  }, [blockType, block])

  return <>{component}</>
}
