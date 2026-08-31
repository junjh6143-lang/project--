# Notion CMS 개인 기술 블로그 - 개발 규칙

> AI 에이전트를 위한 프로젝트 표준 문서
> 작성: 2026-08-26 | Claude Code

---

## 1. 프로젝트 개요

### 핵심 정보

- **프로젝트명**: 개인 기술 블로그 (Personal Tech Blog)
- **목적**: Notion을 CMS로 활용한 풀스택 블로그 플랫폼
- **기술스택**: Next.js 15.5.3 + React 19 + TypeScript + TailwindCSS + shadcn/ui
- **아키텍처**: Notion API 기반 CMS, App Router 기반 페이지 구조

### 개발 단계

4-Phase 구조 (ROADMAP.md 참조):

1. **Phase 1**: 애플리케이션 골격 (라우트, 타입, 레이아웃)
2. **Phase 2**: UI/UX 완성 (컴포넌트, 반응형 디자인)
3. **Phase 3**: 핵심 기능 (Notion API 통합, 검색, 필터링)
4. **Phase 4**: 성능 & 배포 (캐싱, 최적화, Vercel 배포)

---

## 2. 프로젝트 구조 및 파일 조직

### 2.1 핵심 디렉토리 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지 (/)
│   ├── blog/[slug]/       # 글 상세 페이지
│   ├── category/[name]/   # 카테고리 페이지
│   ├── search/            # 검색 결과 페이지
│   ├── api/               # API 라우트 (Notion 통합)
│   └── globals.css        # 전역 스타일
├── components/            # React 컴포넌트
│   ├── ui/               # shadcn/ui 기반 순수 UI
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── sections/         # 페이지 섹션
│   ├── navigation/       # 네비게이션
│   └── providers/        # Context 프로바이더
├── lib/                   # 유틸리티 및 설정
│   ├── notion/           # Notion API 관련
│   │   ├── client.ts     # Notion 클라이언트
│   │   ├── queries.ts    # DB 쿼리 함수
│   │   └── types.ts      # Notion 응답 타입
│   ├── utils.ts          # 공통 유틸리티
│   ├── env.ts            # 환경변수 검증
│   └── constants.ts      # 프로젝트 상수
└── types/                # 프로젝트 전역 타입
    └── index.ts          # NotionPost, NotionCategory 등
```

### 2.2 파일 위치 의사결정 기준

**새 파일을 어디에 추가할지 판단하기:**

| 파일 유형                    | 배치 위치                    | 규칙                                     |
| ---------------------------- | ---------------------------- | ---------------------------------------- |
| Notion API 쿼리/타입         | `src/lib/notion/`            | queries.ts, types.ts, client.ts          |
| shadcn/ui 컴포넌트           | `src/components/ui/`         | 순수 UI, 비즈니스 로직 없음              |
| 페이지 섹션 (Hero, Features) | `src/components/sections/`   | 페이지 특정 영역                         |
| 레이아웃 (Header, Footer)    | `src/components/layout/`     | RootLayout 제외                          |
| 네비게이션 (Nav, Breadcrumb) | `src/components/navigation/` | 페이지 간 이동 관련                      |
| 폼 (LoginForm, SignupForm)   | `src/components/`            | 또는 `src/components/forms/`             |
| API 라우트                   | `src/app/api/{resource}/`    | POST/GET 핸들러                          |
| 유틸 함수                    | `src/lib/utils.ts`           | 또는 `src/lib/{domain}/`                 |
| 타입 정의                    | `src/types/index.ts`         | 전역 타입만, 도메인별 타입은 해당 폴더에 |
| 상수/설정                    | `src/lib/constants.ts`       | 또는 `src/constants/`                    |

---

## 3. 코드 표준

### 3.1 네이밍 컨벤션

**필수 규칙:**

| 대상        | 규칙                | 예시                                           |
| ----------- | ------------------- | ---------------------------------------------- |
| 파일명      | kebab-case          | `user-profile.tsx`, `api-utils.ts`             |
| 컴포넌트명  | PascalCase          | `export function UserProfile()`                |
| 변수/함수   | camelCase           | `const userId = 123`, `function getUserData()` |
| 상수        | UPPER_SNAKE_CASE    | `const MAX_PAGE_SIZE = 10`                     |
| 폴더명      | kebab-case (소문자) | `src/components/`, `user-settings/`            |
| Notion 필드 | Notion DB 표준      | `Title`, `Slug`, `Category`, `Published`       |

**✅ 올바른 예시:**

```typescript
// components/user-profile.tsx
export function UserProfile({ userId }: UserProfileProps) {
  const userData = getUserData(userId);
  return <div>{userData.name}</div>;
}

// lib/notion/queries.ts
export async function fetchPosts(category?: string) {
  // ...
}

// constants
const DATABASE_ID = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;
```

**❌ 금지된 패턴:**

```typescript
// snake_case 폴더명 (금지)
// user_profile/UserProfile.tsx

// PascalCase 상수 (금지)
// const MaxPageSize = 10

// snake_case 변수 (금지)
// const user_id = 123
```

### 3.2 TypeScript 타입 안전성

**필수 사항:**

1. **타입 정의 누락 금지**

   ```typescript
   // ✅ 올바름
   interface NotionPost {
     id: string
     title: string
     slug: string
     category: string
     tags: string[]
     publishedAt: Date
     status: 'Draft' | 'Published'
     content: unknown // Notion 블록
   }

   export async function fetchPosts(): Promise<NotionPost[]> {
     // ...
   }

   // ❌ 금지
   export async function fetchPosts() {
     // 반환 타입 없음
   }

   const post: any = data // any 타입 금지
   ```

2. **환경변수 검증** (`src/lib/env.ts`)

   ```typescript
   // 필수 환경변수 검증
   const NOTION_API_KEY = process.env.NOTION_API_KEY
   const DATABASE_ID = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID

   if (!NOTION_API_KEY) throw new Error('NOTION_API_KEY not set')
   if (!DATABASE_ID) throw new Error('DATABASE_ID not set')
   ```

3. **Props 인터페이스**

   ```typescript
   // ✅ 올바름
   interface UserCardProps {
     user: User
     onSelect?: (id: string) => void
   }

   export function UserCard({ user, onSelect }: UserCardProps) {
     // ...
   }
   ```

### 3.3 Notion API 통합 규칙

**필수 패턴:**

1. **모든 Notion 쿼리는 `src/lib/notion/queries.ts`에 작성**

   ```typescript
   // src/lib/notion/queries.ts
   import { Client } from '@notionhq/client'

   export async function fetchPublishedPosts(
     category?: string,
     limit: number = 10
   ): Promise<NotionPost[]> {
     try {
       // Notion 쿼리 로직
       return posts
     } catch (error) {
       console.error('Failed to fetch posts:', error)
       throw new Error('Failed to fetch posts from Notion')
     }
   }
   ```

2. **응답 타입은 `src/lib/notion/types.ts`에 정의**

   ```typescript
   export interface NotionPost {
     id: string;
     title: string;
     slug: string;
     category: string;
     tags: string[];
     publishedAt: Date;
     updatedAt?: Date;
     status: 'Draft' | 'Published';
     description: string;
     content: NotionBlock[];
   }

   export interface NotionBlock {
     type: 'paragraph' | 'heading_1' | 'code' | 'image' | ...;
     content: unknown;
   }
   ```

3. **API 라우트에서 Notion 호출**

   ```typescript
   // src/app/api/posts/route.ts
   import { fetchPublishedPosts } from '@/lib/notion/queries'

   export async function GET(request: Request) {
     try {
       const { searchParams } = new URL(request.url)
       const category = searchParams.get('category')

       const posts = await fetchPublishedPosts(category)
       return Response.json({ posts })
     } catch (error) {
       return Response.json({ error: 'Failed to fetch posts' }, { status: 500 })
     }
   }
   ```

**❌ 금지 패턴:**

- Notion 쿼리를 컴포넌트에서 직접 호출
- Notion 클라이언트를 여러 파일에서 초기화
- 에러 처리 없이 API 호출
- 환경변수를 .ts 파일에 하드코딩

---

## 4. 컴포넌트 설계 원칙

### 4.1 컴포넌트 분류

**1. UI 컴포넌트** (`src/components/ui/`)

- shadcn/ui 기반 재사용 가능한 컴포넌트
- **특징**: 순수 UI, 비즈니스 로직 없음, Props로만 제어
- **예시**: Button, Card, Input, Badge, Pagination
- 명령: `npx shadcn@latest add [component-name]`

**2. 레이아웃 컴포넌트** (`src/components/layout/`)

- 페이지 구조를 담당하는 컴포넌트
- **예시**: Header, Footer, Container, Sidebar
- **주의**: `src/app/layout.tsx`는 여기 포함 안 함

**3. 섹션 컴포넌트** (`src/components/sections/`)

- 특정 페이지의 주요 섹션
- **예시**: HeroSection, FeaturesSection, PostListSection, CategoryFilter
- 페이지 특정 비즈니스 로직 포함 가능

**4. 네비게이션** (`src/components/navigation/`)

- 페이지 간 이동 관련 컴포넌트
- **예시**: MainNav, MobileNav, Breadcrumb, CategoryTabs

**5. 폼 컴포넌트** (`src/components/` 또는 `src/components/forms/`)

- React Hook Form + Zod 기반
- **예시**: LoginForm, SearchForm, FilterForm
- 복잡한 폼은 `src/components/forms/` 폴더 생성

### 4.2 컴포넌트 구조 규칙

**파일 크기 제한:**

- 단일 컴포넌트 파일: **300줄 이상 금지**
- 초과 시 하위 컴포넌트로 분할

**Props 정의:**

```typescript
// ✅ 올바름
interface PostCardProps {
  post: NotionPost;
  onSelect?: (slug: string) => void;
}

export function PostCard({ post, onSelect }: PostCardProps) {
  return (
    <div onClick={() => onSelect?.(post.slug)}>
      {post.title}
    </div>
  );
}

// ❌ 금지
export function PostCard(props: any) {
  // props 검증 없음
}

export function PostCard({ post, ...rest }: unknown) {
  // 타입 검증 없음
}
```

**의존성 순서:**

```typescript
// 1. 외부 라이브러리
import React from 'react'
import { useRouter } from 'next/navigation'

// 2. 내부 (@/ 별칭)
import { Button } from '@/components/ui/button'
import { PostCard } from '@/components/sections/post-card'
import { cn } from '@/lib/utils'
import { NotionPost } from '@/types'

// 3. 스타일
import styles from './styles.module.css'
```

---

## 5. 다중 파일 조정 규칙

### 중요: 한 곳을 변경하면 다른 곳도 확인하세요

| 변경 파일                 | 영향받는 파일                               | 확인사항                  |
| ------------------------- | ------------------------------------------- | ------------------------- |
| `src/types/index.ts`      | `src/lib/notion/queries.ts`, `src/app/api/` | 타입 호환성 검증          |
| `src/lib/notion/types.ts` | API 라우트, 페이지 컴포넌트                 | 응답 타입 반영            |
| shadcn/ui 컴포넌트 추가   | `components.json`, 해당 폴더 배치           | 경로 설정, 실제 폴더 생성 |
| 환경변수 추가             | `src/lib/env.ts`, `.env.local` 템플릿       | 검증 로직, 문서화         |
| 라우트 추가               | `src/app/layout.tsx`, SEO 메타데이터        | metadata 설정             |
| API 엔드포인트 추가       | `src/lib/notion/queries.ts`                 | 쿼리 함수 작성            |

**예시: NotionPost 타입 추가 시**

```typescript
// 1단계: src/types/index.ts 수정
export interface NotionPost {
  // 필드 추가
  viewCount?: number
}

// 2단계: 영향받는 파일 확인
// - src/lib/notion/queries.ts (쿼리에서 필드 추출)
// - src/app/api/posts/route.ts (응답 타입 확인)
// - src/components/sections/post-card.tsx (Props 업데이트)
// - 글 상세 페이지 컴포넌트

// 3단계: 모든 파일 수정 완료 확인 후 커밋
```

---

## 6. 기능별 구현 표준

### 6.1 Notion 데이터 조회 (Phase 3)

**필수 단계:**

1. `src/types/index.ts`에 타입 정의
2. `src/lib/notion/types.ts`에 Notion 응답 타입 정의
3. `src/lib/notion/queries.ts`에 조회 함수 작성
4. `src/app/api/{resource}/route.ts`에 API 라우트 구현

**예시: 글 목록 조회**

```typescript
// 1. src/types/index.ts
export interface NotionPost {
  id: string
  title: string
  slug: string
  category: string
  tags: string[]
  publishedAt: Date
  status: 'Published' | 'Draft'
  description: string
}

// 2. src/lib/notion/queries.ts
export async function fetchPublishedPosts(
  category?: string,
  limit: number = 10
): Promise<NotionPost[]> {
  try {
    const database = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Status',
        select: { equals: 'Published' },
      },
      sorts: [{ property: 'Published', direction: 'descending' }],
      page_size: limit,
    })

    return database.results.map(page => ({
      id: page.id,
      title: getTitle(page),
      slug: getSlug(page),
      // ...
    }))
  } catch (error) {
    console.error('Notion query failed:', error)
    throw new Error('Failed to fetch posts')
  }
}

// 3. src/app/api/posts/route.ts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const posts = await fetchPublishedPosts(category)
    return Response.json({ posts })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
```

### 6.2 React Hook Form + Zod 검증 (Phase 3)

```typescript
// src/components/search-form.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const searchSchema = z.object({
  query: z.string().min(1, 'Search query required'),
});

type SearchInput = z.infer<typeof searchSchema>;

export function SearchForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<SearchInput>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = async (data: SearchInput) => {
    // 검색 처리
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('query')} />
      {errors.query && <span>{errors.query.message}</span>}
      <button type="submit">Search</button>
    </form>
  );
}
```

### 6.3 이미지 최적화 (Phase 4)

```typescript
// ✅ 올바름: Next.js Image 컴포넌트 사용
import Image from 'next/image';

export function PostThumbnail({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      className="rounded-lg"
    />
  );
}

// ❌ 금지: 일반 img 태그
export function PostThumbnail({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} />;
}
```

---

## 7. Phase별 파일 추가 가이드

### Phase 1: 골격 구축

```
src/types/
  └── index.ts          # NotionPost, NotionCategory 타입

src/lib/
  ├── notion/
  │   ├── client.ts     # Notion 클라이언트 초기화
  │   ├── types.ts      # Notion API 응답 타입
  │   └── queries.ts    # (비어있음, Phase 3에서 구현)
  ├── env.ts            # 환경변수 검증
  └── constants.ts      # 사이트 설정, 라우트 상수

src/components/
  ├── layout/
  │   ├── header.tsx
  │   ├── footer.tsx
  │   └── container.tsx
  ├── navigation/
  │   ├── main-nav.tsx
  │   └── mobile-nav.tsx
  └── providers/
      └── theme-provider.tsx
```

### Phase 2: UI/UX

```
src/components/
  ├── ui/               # shadcn/ui 컴포넌트들
  │   ├── button.tsx
  │   ├── card.tsx
  │   ├── badge.tsx
  │   └── ...
  └── sections/
      ├── hero-section.tsx
      ├── post-list-section.tsx
      └── category-filter.tsx
```

### Phase 3: 기능 구현

```
src/lib/notion/
  └── queries.ts        # fetchPosts, fetchCategories, searchPosts

src/app/api/
  ├── posts/
  │   └── route.ts
  ├── categories/
  │   └── route.ts
  └── search/
      └── route.ts

src/components/
  ├── sections/
  │   ├── post-card.tsx
  │   └── post-grid.tsx
  └── posts-form.tsx    # (검색 폼 등)
```

### Phase 4: 최적화

```
src/hooks/
  ├── use-infinite-scroll.ts
  └── use-local-storage.ts

src/lib/
  └── validation/
      └── search.ts     # Zod 스키마
```

---

## 8. 금지사항 (금지된 패턴 목록)

### ❌ 절대 금지

**폴더/파일명:**

- snake_case 사용 (kebab-case만 사용)
- 4단계 이상의 폴더 중첩
- `components/common/`, `components/shared/`, `components/misc/` 같은 의미불명 폴더
- 숨김 파일 무단 생성

**코드:**

- `any` 타입 사용
- 타입 정의 누락
- 환경변수 하드코딩
- 상대경로 import (항상 `@/` 별칭 사용)
- API 라우트에서 try-catch 생략
- Notion 쿼리를 컴포넌트에서 직접 호출
- 300줄 이상의 단일 파일

**구조:**

- 기존 라우트 무단 변경 (ROADMAP과 다른 라우트 생성)
- 기존 타입 정의 무단 변경 (호환성 검증 없음)
- Phase 순서 무시하고 불완전한 구현

---

## 9. AI 의사결정 기준 (의사결정 트리)

**Q: 새 파일을 어디에 추가할까?**

```
파일의 목적은?
├─ Notion API 쿼리/타입
│  └─ 답: src/lib/notion/ (queries.ts, types.ts)
├─ shadcn/ui 기반 순수 UI
│  └─ 답: src/components/ui/
├─ 페이지 특정 섹션 (Hero, Filter, List)
│  └─ 답: src/components/sections/
├─ 레이아웃 역할 (Header, Footer, Container)
│  └─ 답: src/components/layout/
├─ 네비게이션 (Nav, Breadcrumb, Pagination)
│  └─ 답: src/components/navigation/
├─ 폼 (Login, Search, Filter)
│  └─ 답: src/components/ 또는 src/components/forms/
├─ API 라우트 (GET/POST 핸들러)
│  └─ 답: src/app/api/{resource}/route.ts
├─ 유틸 함수 (헬퍼, 변환 함수)
│  └─ 답: src/lib/utils.ts 또는 src/lib/{domain}/
├─ 타입 정의 (전역 타입)
│  └─ 답: src/types/index.ts
└─ 도메인별 타입 (Notion 응답 타입)
   └─ 답: src/lib/{domain}/types.ts
```

**Q: 새 폴더를 만들어야 할까?**

```
기존 구조에 맞는가?
├─ Yes → 새 폴더 불필요, 기존 폴더 사용
└─ No (3개 이상 파일 필요)
   └─ Phase 로드맵에 있는가?
      ├─ Yes → Phase에 맞춰 생성
      └─ No → 유사 폴더와 협의 후 결정
```

**Q: 어떤 타입을 정의할까?**

```
범위는?
├─ 프로젝트 전역 (다중 파일에서 사용)
│  └─ src/types/index.ts
├─ 도메인 특정 (Notion 응답)
│  └─ src/lib/notion/types.ts
└─ 컴포넌트 Props만
   └─ 컴포넌트 파일 내 정의 (interface ComponentProps)
```

---

## 10. 필수 체크리스트

### 새 파일 생성/수정 후 반드시 확인:

- [ ] TypeScript 타입 안전성 검증 (`npm run typecheck`)
- [ ] 경로 별칭 사용 (상대경로 import 없음)
- [ ] 필요한 다중 파일 수정 완료
  - [ ] 새 타입 정의 시: 영향받는 쿼리/API 라우트 확인
  - [ ] API 라우트 추가 시: 쿼리 함수 작성 완료
  - [ ] 환경변수 추가 시: src/lib/env.ts에 검증 로직 추가
- [ ] ESLint 검증 통과 (`npm run lint`)
- [ ] Prettier 포맷팅 확인 (`npm run format`)
- [ ] Phase 로드맵과 일치 확인 (ROADMAP.md)
- [ ] 기존 가이드 문서 참조 (docs/guides/)
- [ ] 파일 크기 300줄 이하 유지

### Phase 완료 전 최종 검사:

- [ ] `npm run check-all` 통과
- [ ] `npm run build` 성공
- [ ] 해당 Phase의 모든 Task 완료 (ROADMAP.md)
- [ ] 테스트 코드 작성 (Phase 4 이후)
- [ ] 커밋 메시지 한글로 작성

---

## 11. 참고 문서

프로젝트 개발 시 항상 참고하세요:

- **📋 PRD**: `docs/PRD.md` - 제품 요구사항, 기능명세, 페이지 구조
- **🗺️ ROADMAP**: `docs/ROADMAP.md` - 4 Phase 개발 계획, Task 분해
- **📁 프로젝트 구조**: `docs/guides/project-structure.md` - 파일 조직, 네이밍
- **🎨 스타일링**: `docs/guides/styling-guide.md` - TailwindCSS 패턴
- **🧩 컴포넌트**: `docs/guides/component-patterns.md` - 컴포넌트 작성법
- **⚡ Next.js 15**: `docs/guides/nextjs-15.md` - App Router, Server Actions
- **📝 폼 처리**: `docs/guides/forms-react-hook-form.md` - React Hook Form 패턴
- **🤖 개발 지침**: `CLAUDE.md` - 코딩 스타일, 커밋 규칙

---

## 12. 예시 구현

### 예시 1: Notion 글 조회 기능 (Phase 3)

**1단계: 타입 정의**

```typescript
// src/types/index.ts
export interface NotionPost {
  id: string
  title: string
  slug: string
  category: string
  tags: string[]
  publishedAt: Date
  updatedAt?: Date
  status: 'Draft' | 'Published'
  description: string
  content: unknown
}
```

**2단계: Notion 쿼리 작성**

```typescript
// src/lib/notion/queries.ts
export async function fetchPublishedPosts(
  category?: string,
  limit: number = 10
): Promise<NotionPost[]> {
  try {
    const database = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: category
        ? { property: 'Category', select: { equals: category } }
        : undefined,
      sorts: [{ property: 'Published', direction: 'descending' }],
    })

    return database.results.map(transformNotionPage)
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    throw new Error('Notion API error')
  }
}
```

**3단계: API 라우트**

```typescript
// src/app/api/posts/route.ts
import { fetchPublishedPosts } from '@/lib/notion/queries'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const posts = await fetchPublishedPosts(category)
    return Response.json({ posts })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
```

**4단계: 컴포넌트에서 사용**

```typescript
// src/components/sections/post-list-section.tsx
'use client';

import { useEffect, useState } from 'react';
import { NotionPost } from '@/types';
import { PostCard } from '@/components/sections/post-card';

interface PostListSectionProps {
  category?: string;
}

export function PostListSection({ category }: PostListSectionProps) {
  const [posts, setPosts] = useState<NotionPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/posts${category ? `?category=${category}` : ''}`
      );
      const data = await response.json();
      setPosts(data.posts);
      setLoading(false);
    };

    fetchPosts();
  }, [category]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid gap-4">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### 예시 2: 새 컴포넌트 추가

**컴포넌트 추가 시 체크리스트:**

```typescript
// ✅ 올바른 구조

// 1. 파일명: kebab-case
// src/components/sections/post-card.tsx

// 2. Props 인터페이스 정의
interface PostCardProps {
  post: NotionPost;
  onSelect?: (slug: string) => void;
}

// 3. 컴포넌트명: PascalCase
export function PostCard({ post, onSelect }: PostCardProps) {
  return (
    <div onClick={() => onSelect?.(post.slug)}>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
    </div>
  );
}

// 4. 경로 별칭으로 import
import { NotionPost } from '@/types';
```

---

## 최종 요약

이 규칙 문서는 AI 에이전트가 프로젝트에서 일관성 있게 작업하기 위한 지침입니다.

**핵심 원칙:**

1. 기존 구조 존중 (ROADMAP, PRD, guides 문서)
2. Notion API 통합 명확화 (lib/notion/ 중심)
3. 컴포넌트 분류 체계화 (ui, sections, layout 등)
4. 다중 파일 조정 사전 명시 (타입 변경 시 연쇄 수정)
5. 의사결정 자동화 (의사결정 트리 제공)

**의문사항 발생 시 참고 순서:**

1. 이 규칙 문서 (shrimp-rules.md)
2. PRD & ROADMAP (기능/구조)
3. docs/guides/ (상세 가이드)
4. CLAUDE.md (코딩 스타일)
