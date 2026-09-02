'use client'

import type { NotionBlock } from '@/types'
import { BlockRenderer } from './BlockRenderer'

interface ContentRendererProps {
  blocks: NotionBlock[]
}

export function ContentRenderer({ blocks }: ContentRendererProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        콘텐츠가 없습니다.
      </div>
    )
  }

  // 리스트 아이템들을 그룹화
  const groupedBlocks: (NotionBlock | NotionBlock[])[] = []
  let currentList: NotionBlock[] = []
  let currentListType: string | null = null

  blocks.forEach(block => {
    const isListItem =
      block.type === 'bulleted_list_item' || block.type === 'numbered_list_item'

    if (isListItem) {
      if (currentListType === null) {
        currentListType = block.type
        currentList = [block]
      } else if (currentListType === block.type) {
        currentList.push(block)
      } else {
        // 리스트 타입이 바뀜
        groupedBlocks.push([...currentList])
        currentListType = block.type
        currentList = [block]
      }
    } else {
      // 리스트 항목이 아님
      if (currentList.length > 0) {
        groupedBlocks.push([...currentList])
        currentList = []
        currentListType = null
      }
      groupedBlocks.push(block)
    }
  })

  // 마지막 리스트 그룹 추가
  if (currentList.length > 0) {
    groupedBlocks.push([...currentList])
  }

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      {groupedBlocks.map((item, idx) => {
        if (Array.isArray(item)) {
          // 리스트 그룹
          const isOrdered = item[0].type === 'numbered_list_item'
          const ListTag = isOrdered ? 'ol' : 'ul'
          return (
            <ListTag
              key={idx}
              className={`mb-4 ${isOrdered ? 'list-decimal' : 'list-disc'} list-inside space-y-1`}
            >
              {item.map(block => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </ListTag>
          )
        } else {
          // 단일 블록
          return <BlockRenderer key={item.id} block={item} />
        }
      })}
    </div>
  )
}
