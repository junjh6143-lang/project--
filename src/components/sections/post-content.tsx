import { NotionPost } from '@/types'

export interface PostContentProps {
  post: NotionPost
}

export function PostContent({ post }: PostContentProps) {
  // 더미 콘텐츠: Phase 3에서 실제 마크다운 렌더링으로 교체될 예정
  const dummyContent = `
    <h2 id="introduction" class="text-2xl font-bold mt-8 mb-4 text-foreground">
      소개
    </h2>
    <p class="text-base leading-relaxed text-foreground mb-4">
      ${post.description}
    </p>

    <h2 id="features" class="text-2xl font-bold mt-8 mb-4 text-foreground">
      주요 특징
    </h2>
    <ul class="list-disc list-inside space-y-2 text-foreground mb-4">
      <li>첫 번째 특징</li>
      <li>두 번째 특징</li>
      <li>세 번째 특징</li>
    </ul>

    <h3 id="code-example" class="text-xl font-semibold mt-6 mb-4 text-foreground">
      코드 예제
    </h3>
    <pre class="bg-muted border border-border rounded-lg p-4 mb-4 overflow-x-auto dark:bg-slate-900">
      <code class="text-sm text-foreground font-mono">
// 더미 코드 예제
const greeting = "Hello, World!"
console.log(greeting)
      </code>
    </pre>

    <h2 id="conclusion" class="text-2xl font-bold mt-8 mb-4 text-foreground">
      결론
    </h2>
    <p class="text-base leading-relaxed text-foreground mb-4">
      이것은 글의 본문 영역입니다. Phase 3에서 실제 마크다운 렌더링 기능이 구현될 예정입니다.
    </p>
  `

  return (
    <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
      <div
        className="text-foreground space-y-4"
        dangerouslySetInnerHTML={{ __html: dummyContent }}
      />
    </article>
  )
}
