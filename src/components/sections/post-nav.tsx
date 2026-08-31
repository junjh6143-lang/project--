import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { NotionPost } from '@/types'
import { Card } from '@/components/ui/card'

export interface PostNavProps {
  prevPost?: NotionPost | null
  nextPost?: NotionPost | null
}

export function PostNav({ prevPost, nextPost }: PostNavProps) {
  // 둘 다 없으면 렌더링하지 않음
  if (!prevPost && !nextPost) {
    return null
  }

  const formattedDate = (date: Date) =>
    new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  return (
    <nav className="border-border border-t py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* 이전 글 */}
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`}>
              <Card className="group hover:border-primary/50 dark:hover:border-primary/30 h-full overflow-hidden transition-all hover:shadow-lg">
                <div className="flex flex-col gap-4 p-6">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <ChevronLeft className="size-4" />
                    <span>이전 글</span>
                  </div>
                  <h3 className="text-foreground group-hover:text-primary line-clamp-2 text-lg font-semibold transition-colors sm:text-xl">
                    {prevPost.title}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {formattedDate(prevPost.publishedAt)}
                  </p>
                </div>
              </Card>
            </Link>
          ) : (
            <div className="invisible sm:flex" />
          )}

          {/* 다음 글 */}
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`}>
              <Card className="group hover:border-primary/50 dark:hover:border-primary/30 h-full overflow-hidden transition-all hover:shadow-lg">
                <div className="flex flex-col gap-4 p-6">
                  <div className="text-muted-foreground flex items-center justify-end gap-2 text-sm">
                    <span>다음 글</span>
                    <ChevronRight className="size-4" />
                  </div>
                  <h3 className="text-foreground group-hover:text-primary line-clamp-2 text-right text-lg font-semibold transition-colors sm:text-xl">
                    {nextPost.title}
                  </h3>
                  <p className="text-muted-foreground text-right text-xs">
                    {formattedDate(nextPost.publishedAt)}
                  </p>
                </div>
              </Card>
            </Link>
          ) : (
            <div className="invisible sm:flex" />
          )}
        </div>
      </div>
    </nav>
  )
}
