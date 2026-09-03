import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export interface SearchHeaderProps {
  query: string
  resultCount: number
}

export function SearchHeader({ query, resultCount }: SearchHeaderProps) {
  return (
    <header className="border-border from-background to-muted/30 border-b bg-gradient-to-b py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* 검색 결과 안내 */}
          <div>
            <h1 className="text-foreground text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
              {query ? (
                <>
                  검색 결과:{' '}
                  <span className="text-primary">&apos;{query}&apos;</span>
                </>
              ) : (
                '검색'
              )}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg sm:text-xl">
              {query ? (
                <>
                  총{' '}
                  <span className="text-foreground font-semibold">
                    {resultCount}
                  </span>
                  개의 검색 결과
                </>
              ) : (
                '찾고 싶은 글의 제목이나 태그를 입력해보세요.'
              )}
            </p>
          </div>

          {/* 새로운 검색 입력 필드 */}
          <form
            className="flex max-w-xl gap-2"
            action="/search"
            method="get"
            role="search"
          >
            <div className="relative flex-1">
              <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="검색어를 입력하세요..."
                aria-label="블로그 글 검색"
                className="pl-9"
              />
            </div>
            <Button type="submit">검색</Button>
          </form>
        </div>
      </div>
    </header>
  )
}
