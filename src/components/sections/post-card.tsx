import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Tag } from 'lucide-react'
import { NotionPost } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { getCategoryColor } from '@/constants/theme-colors'

export interface PostCardProps {
  post: NotionPost
  variant?: 'default' | 'compact'
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  const categoryColor = getCategoryColor(post.category)
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  if (variant === 'compact') {
    return (
      <Link href={`/blog/${post.slug}`}>
        <Card className="group hover:border-primary/50 dark:hover:border-primary/30 h-full overflow-hidden transition-all hover:shadow-lg">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* 카테고리 배지 */}
            <div className="flex items-center justify-between gap-2">
              <Badge
                className={`truncate ${categoryColor}`}
                variant="secondary"
              >
                {post.category}
              </Badge>
              <span className="text-muted-foreground text-xs whitespace-nowrap">
                {formattedDate}
              </span>
            </div>

            {/* 제목 */}
            <h3 className="text-foreground group-hover:text-primary line-clamp-2 text-base font-semibold transition-colors sm:text-lg">
              {post.title}
            </h3>

            {/* 미리보기 텍스트 */}
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {post.description}
            </p>

            {/* 태그 */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {post.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-muted-foreground text-xs">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group hover:border-primary/50 dark:hover:border-primary/30 h-full overflow-hidden transition-all hover:shadow-lg">
        {/* 썸네일 이미지 */}
        {post.thumbnail && (
          <div className="bg-muted relative h-48 w-full overflow-hidden sm:h-56">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <div className="flex flex-col gap-4 p-5 sm:p-6">
          {/* 메타데이터 */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge className={categoryColor} variant="secondary">
              {post.category}
            </Badge>
            <div className="text-muted-foreground flex items-center gap-1 text-xs sm:text-sm">
              <Calendar className="size-3 sm:size-4" />
              <time dateTime={new Date(post.publishedAt).toISOString()}>
                {formattedDate}
              </time>
            </div>
          </div>

          {/* 제목 */}
          <h3 className="text-foreground group-hover:text-primary line-clamp-2 text-lg font-bold transition-colors sm:text-xl">
            {post.title}
          </h3>

          {/* 설명 */}
          <p className="text-muted-foreground line-clamp-3 text-sm sm:text-base">
            {post.description}
          </p>

          {/* 태그 */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {post.tags.slice(0, 4).map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  <Tag className="mr-1 size-3" />
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 4 && (
                <span className="text-muted-foreground text-xs">
                  +{post.tags.length - 4}
                </span>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="border-border flex items-center justify-between border-t pt-4">
            <span className="text-primary group-hover:text-primary/80 text-xs font-medium transition-colors sm:text-sm">
              글 읽기 →
            </span>
            {post.updatedAt && (
              <span className="text-muted-foreground text-xs">
                {post.publishedAt !== post.updatedAt && (
                  <>
                    수정: {new Date(post.updatedAt).toLocaleDateString('ko-KR')}
                  </>
                )}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
