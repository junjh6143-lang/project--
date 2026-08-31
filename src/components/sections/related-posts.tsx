import { NotionPost } from '@/types'
import { PostCard } from '@/components/sections/post-card'
import { EmptyState } from '@/components/ui/empty-state'
import { BookOpen } from 'lucide-react'

export interface RelatedPostsProps {
  posts: NotionPost[]
  title?: string
}

export function RelatedPosts({ posts, title = '관련 글' }: RelatedPostsProps) {
  if (posts.length === 0) {
    return (
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-foreground mb-8 text-2xl font-bold sm:text-3xl">
            {title}
          </h2>
          <EmptyState
            icon={<BookOpen className="text-muted-foreground size-8" />}
            title="관련 글이 없습니다"
            description="같은 카테고리의 다른 글이 없습니다."
          />
        </div>
      </section>
    )
  }

  return (
    <section className="border-border border-t py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-foreground mb-8 text-2xl font-bold sm:text-3xl">
          {title}
        </h2>

        {/* 관련 글 그리드 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <PostCard key={post.id} post={post} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  )
}
