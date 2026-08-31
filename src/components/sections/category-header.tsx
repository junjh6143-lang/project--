import { Badge } from '@/components/ui/badge'
import { getCategoryColor } from '@/constants/theme-colors'

export interface CategoryHeaderProps {
  categoryName: string
  postCount: number
  description?: string
}

export function CategoryHeader({
  categoryName,
  postCount,
  description,
}: CategoryHeaderProps) {
  const categoryColor = getCategoryColor(categoryName)

  return (
    <header className="border-border from-background to-muted/30 border-b bg-gradient-to-b py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {/* 카테고리 배지 */}
          <div>
            <Badge className={categoryColor} variant="secondary">
              {categoryName}
            </Badge>
          </div>

          {/* 제목 */}
          <div>
            <h1 className="text-foreground text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
              {categoryName}
            </h1>

            {/* 글 개수 */}
            <p className="text-muted-foreground mt-2 text-lg sm:text-xl">
              총{' '}
              <span className="text-foreground font-semibold">{postCount}</span>
              개의 글
            </p>
          </div>

          {/* 설명 (선택) */}
          {description && (
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed sm:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}
