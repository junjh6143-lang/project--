import { Badge } from '@/components/ui/badge'
import { NotionPost } from '@/types'
import { getCategoryColor } from '@/constants/theme-colors'

export interface PostDetailHeaderProps {
  post: NotionPost
  author?: string
}

export function PostDetailHeader({
  post,
  author = '기술 블로거',
}: PostDetailHeaderProps) {
  const categoryColor = getCategoryColor(post.category)
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const formattedUpdatedDate =
    post.updatedAt &&
    new Date(post.updatedAt).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  return (
    <header className="border-border bg-background border-b py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* 카테고리 배지 */}
        <div className="mb-4">
          <Badge className={categoryColor} variant="secondary">
            {post.category}
          </Badge>
        </div>

        {/* 글 제목 */}
        <h1 className="text-foreground mb-6 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        {/* 메타데이터 */}
        <div className="border-border flex flex-wrap items-center gap-4 border-t pt-6 sm:gap-6">
          {/* 저자 정보 */}
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 text-primary flex size-10 items-center justify-center rounded-full text-sm font-semibold">
              {author.charAt(0).toUpperCase()}
            </div>
            <div className="text-sm">
              <p className="text-foreground font-medium">{author}</p>
            </div>
          </div>

          {/* 발행일 */}
          <div className="text-muted-foreground text-sm">
            <time dateTime={new Date(post.publishedAt).toISOString()}>
              {formattedDate}
            </time>
          </div>

          {/* 수정일 */}
          {post.updatedAt &&
            post.publishedAt !== post.updatedAt &&
            formattedUpdatedDate && (
              <div className="text-muted-foreground text-sm">
                수정:{' '}
                <time dateTime={new Date(post.updatedAt).toISOString()}>
                  {formattedUpdatedDate}
                </time>
              </div>
            )}
        </div>

        {/* 태그 */}
        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
