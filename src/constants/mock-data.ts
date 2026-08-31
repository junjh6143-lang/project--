import { NotionPost, NotionCategory } from '@/types'

/**
 * 블로그 글 더미 데이터
 * UI/UX 개발 중 데이터 표시 테스트용으로 사용합니다.
 */
export const MOCK_POSTS: NotionPost[] = [
  {
    id: '1',
    title: 'Next.js 15에서 App Router 완벽 가이드',
    slug: 'nextjs-15-app-router-guide',
    category: 'Next.js',
    tags: ['app-router', 'server-components', 'routing'],
    publishedAt: new Date('2026-08-25'),
    updatedAt: new Date('2026-08-27'),
    status: 'Published',
    description:
      'Next.js 15의 App Router는 파일 기반 라우팅 시스템으로 복잡한 URL 구조를 간단하게 관리할 수 있습니다. 이 글에서는 App Router의 기본 개념부터 고급 패턴까지 알아봅니다.',
    thumbnail:
      'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop',
    content: [],
  },
  {
    id: '2',
    title: 'React 19의 새로운 훅 - useTransition 활용법',
    slug: 'react-19-usetransition-hook',
    category: 'React',
    tags: ['hooks', 'performance', 'react-19'],
    publishedAt: new Date('2026-08-20'),
    status: 'Published',
    description:
      'React 19에서 도입된 useTransition 훅을 사용하면 비동기 작업을 더 효율적으로 관리할 수 있습니다. 실제 프로젝트에서 사용할 수 있는 사례를 소개합니다.',
    thumbnail:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    content: [],
  },
  {
    id: '3',
    title: 'TailwindCSS v4에서 달라진 점들',
    slug: 'tailwindcss-v4-changes',
    category: 'CSS',
    tags: ['tailwindcss', 'styling', 'css'],
    publishedAt: new Date('2026-08-18'),
    status: 'Published',
    description:
      'TailwindCSS v4는 이전 버전과 비교해 많은 변화가 있었습니다. 주요 변경사항과 마이그레이션 방법을 정리했습니다.',
    content: [],
  },
  {
    id: '4',
    title: 'TypeScript 제네릭 완벽 이해하기',
    slug: 'typescript-generics-complete-guide',
    category: 'TypeScript',
    tags: ['generics', 'type-safety', 'advanced'],
    publishedAt: new Date('2026-08-15'),
    status: 'Published',
    description:
      'TypeScript의 제네릭은 재사용 가능한 타입 안전한 컴포넌트를 작성할 수 있게 해줍니다. 기초부터 고급 패턴까지 자세히 설명합니다.',
    thumbnail:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    content: [],
  },
  {
    id: '5',
    title: 'Node.js와 Express로 REST API 만들기',
    slug: 'nodejs-express-rest-api',
    category: 'Node.js',
    tags: ['express', 'rest-api', 'backend'],
    publishedAt: new Date('2026-08-12'),
    status: 'Published',
    description:
      'Node.js와 Express 프레임워크를 사용하여 프로덕션 레벨의 REST API를 만드는 방법을 배워봅시다. 에러 처리, 인증, 데이터 검증 등을 포함합니다.',
    content: [],
  },
  {
    id: '6',
    title: 'Docker를 활용한 개발 환경 구축',
    slug: 'docker-development-environment',
    category: 'DevOps',
    tags: ['docker', 'containerization', 'development'],
    publishedAt: new Date('2026-08-10'),
    status: 'Published',
    description:
      'Docker를 사용하면 어느 환경에서나 동일한 개발 환경을 구축할 수 있습니다. Dockerfile과 Docker Compose를 활용한 실전 가이드입니다.',
    content: [],
  },
  {
    id: '7',
    title: 'shadcn/ui로 아름다운 UI 만들기',
    slug: 'shadcn-ui-beautiful-components',
    category: 'React',
    tags: ['shadcn-ui', 'components', 'design-system'],
    publishedAt: new Date('2026-08-08'),
    status: 'Published',
    description:
      'shadcn/ui는 복사-붙여넣기 기반의 컴포넌트 라이브러리입니다. 커스터마이징이 쉽고 Tailwind CSS와 완벽하게 호환됩니다.',
    thumbnail:
      'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop',
    content: [],
  },
  {
    id: '8',
    title: 'JavaScript 비동기 처리: Promise와 async/await',
    slug: 'javascript-async-promise-asyncawait',
    category: 'JavaScript',
    tags: ['async', 'promise', 'callbacks'],
    publishedAt: new Date('2026-08-05'),
    status: 'Published',
    description:
      'JavaScript의 비동기 처리는 현대 웹 개발에서 필수적입니다. Promise부터 async/await까지 단계적으로 학습하세요.',
    content: [],
  },
  {
    id: '9',
    title: '웹 성능 최적화: Core Web Vitals',
    slug: 'web-performance-core-web-vitals',
    category: 'Performance',
    tags: ['performance', 'web-vitals', 'optimization'],
    publishedAt: new Date('2026-08-01'),
    status: 'Published',
    description:
      'Core Web Vitals는 구글이 정한 웹 성능 지표입니다. LCP, FID, CLS를 개선하여 사용자 경험을 높여봅시다.',
    content: [],
  },
  {
    id: '10',
    title: 'Git 워크플로우: 효율적인 협업',
    slug: 'git-workflow-efficient-collaboration',
    category: 'DevOps',
    tags: ['git', 'version-control', 'collaboration'],
    publishedAt: new Date('2026-07-28'),
    status: 'Published',
    description:
      'Git을 효과적으로 사용하는 방법을 배워봅시다. 브랜치 전략, PR 리뷰, 커밋 메시지 작성 등 실전 팁을 소개합니다.',
    content: [],
  },
  {
    id: '11',
    title: 'MongoDB와 Mongoose로 데이터베이스 관리하기',
    slug: 'mongodb-mongoose-database-management',
    category: 'Database',
    tags: ['mongodb', 'mongoose', 'nosql'],
    publishedAt: new Date('2026-07-25'),
    status: 'Published',
    description:
      'MongoDB는 NoSQL 데이터베이스입니다. Mongoose를 활용하여 스키마 검증과 모델 정의를 체계적으로 관리하세요.',
    content: [],
  },
  {
    id: '12',
    title: 'CSS Grid와 Flexbox 마스터하기',
    slug: 'css-grid-flexbox-mastery',
    category: 'CSS',
    tags: ['css', 'layout', 'grid', 'flexbox'],
    publishedAt: new Date('2026-07-22'),
    status: 'Published',
    description:
      'CSS Grid와 Flexbox는 현대적인 레이아웃을 만드는 필수 기술입니다. 각각의 특징과 활용 시기를 알아봅시다.',
    thumbnail:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    content: [],
  },
]

/**
 * 블로그 카테고리 더미 데이터
 */
export const MOCK_CATEGORIES: NotionCategory[] = [
  { id: '1', name: 'Next.js', postCount: 3 },
  { id: '2', name: 'React', postCount: 4 },
  { id: '3', name: 'TypeScript', postCount: 2 },
  { id: '4', name: 'Node.js', postCount: 2 },
  { id: '5', name: 'JavaScript', postCount: 1 },
  { id: '6', name: 'CSS', postCount: 2 },
  { id: '7', name: 'DevOps', postCount: 2 },
  { id: '8', name: 'Database', postCount: 1 },
  { id: '9', name: 'Performance', postCount: 1 },
]

/**
 * 카테고리별로 정렬된 포스트 조회
 */
export function getPostsByCategory(category: string): NotionPost[] {
  return MOCK_POSTS.filter(
    post =>
      post.category.toLowerCase() === category.toLowerCase() &&
      post.status === 'Published'
  ).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

/**
 * 검색어로 포스트 조회
 */
export function searchPosts(query: string): NotionPost[] {
  const lowerQuery = query.toLowerCase()
  return MOCK_POSTS.filter(
    post =>
      (post.title.toLowerCase().includes(lowerQuery) ||
        post.description.toLowerCase().includes(lowerQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) &&
      post.status === 'Published'
  ).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

/**
 * Slug로 포스트 조회
 */
export function getPostBySlug(slug: string): NotionPost | undefined {
  return MOCK_POSTS.find(post => post.slug === slug)
}

/**
 * 페이지네이션을 고려한 포스트 조회
 */
export function getPaginatedPosts(
  page: number = 1,
  pageSize: number = 10
): { posts: NotionPost[]; total: number; page: number; pageSize: number } {
  const total = MOCK_POSTS.filter(p => p.status === 'Published').length
  const start = (page - 1) * pageSize
  const end = start + pageSize

  const posts = MOCK_POSTS.filter(p => p.status === 'Published')
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(start, end)

  return { posts, total, page, pageSize }
}

/**
 * 같은 카테고리의 관련 포스트 조회
 */
export function getRelatedPosts(slug: string, limit: number = 5): NotionPost[] {
  const post = getPostBySlug(slug)
  if (!post) return []

  return MOCK_POSTS.filter(
    p =>
      p.category === post.category &&
      p.slug !== slug &&
      p.status === 'Published'
  )
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit)
}

/**
 * 이전/다음 포스트 조회
 */
export function getAdjacentPosts(slug: string): {
  prev: NotionPost | null
  next: NotionPost | null
} {
  const publishedPosts = MOCK_POSTS.filter(p => p.status === 'Published').sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const currentIndex = publishedPosts.findIndex(p => p.slug === slug)

  return {
    prev:
      currentIndex < publishedPosts.length - 1
        ? publishedPosts[currentIndex + 1]
        : null,
    next: currentIndex > 0 ? publishedPosts[currentIndex - 1] : null,
  }
}
