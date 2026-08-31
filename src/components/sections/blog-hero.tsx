import { Button } from '@/components/ui/button'

export interface BlogHeroProps {
  title?: string
  description?: string
  ctaText?: string
  onCtaClick?: () => void
}

export function BlogHero({
  title = '기술 블로그에 오신 것을 환영합니다',
  description = 'Next.js, React, TypeScript 등 최신 웹 기술에 대한 심화 학습과 실전 경험을 공유합니다.',
  ctaText = '최신 글 보기',
  onCtaClick,
}: BlogHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 py-16 sm:py-20 lg:py-28 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* 배경 그래디언트 효과 */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 size-96 rounded-full bg-blue-600/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 size-96 rounded-full bg-purple-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        {/* 메인 제목 */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* 설명 텍스트 */}
        <p className="mb-8 text-lg text-slate-200 sm:text-xl">{description}</p>

        {/* CTA 버튼 */}
        <div className="flex justify-center gap-4 sm:gap-6">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={onCtaClick}
          >
            {ctaText}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 dark:border-white/20"
          >
            카테고리 둘러보기
          </Button>
        </div>

        {/* 통계 정보 (선택) */}
        <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-white sm:text-3xl">12+</div>
            <p className="text-sm text-slate-400">기술 포스트</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white sm:text-3xl">9</div>
            <p className="text-sm text-slate-400">카테고리</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white sm:text-3xl">5</div>
            <p className="text-sm text-slate-400">기술 스택</p>
          </div>
        </div>
      </div>
    </section>
  )
}
