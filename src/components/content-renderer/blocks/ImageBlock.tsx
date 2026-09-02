import type { NotionBlock } from '@/types'
import { getImageUrl, getCaption } from '../utils'
import Image from 'next/image'

interface ImageBlockProps {
  block: NotionBlock
}

export function ImageBlock({ block }: ImageBlockProps) {
  const imageUrl = getImageUrl(block)
  const caption = getCaption(block)

  if (!imageUrl) {
    return (
      <div className="text-muted-foreground mb-4 text-center">
        이미지 로드 실패
      </div>
    )
  }

  return (
    <figure className="mb-6">
      <div className="bg-muted relative h-auto w-full overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={caption || '블로그 이미지'}
          width={800}
          height={600}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
        />
      </div>
      {caption && (
        <figcaption className="text-muted-foreground mt-2 text-center text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
