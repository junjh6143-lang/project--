# 개인 기술 블로그 - 개발 로드맵

## 📍 로드맵 개요

**구조 우선 접근법(Structure-First Approach)** 을 기반으로 4개 Phase로 구성된 개발 계획입니다.
각 Phase는 **1-2주 단위의 독립적인 Sprint** 로 진행되며, 실행 가능한 Task로 분해되어 있습니다.

```
Phase 1: 애플리케이션 골격 (1-2주)
  ↓
Phase 2: UI/UX 완성 (2-3주)
  ↓
Phase 3: 핵심 기능 구현 (3-4주)
  ↓
Phase 4: 성능 최적화 & 배포 (2주)
```

---

## Phase 1️⃣: 애플리케이션 골격 구축 (1-2주)

**목표**: 전체 라우트 구조, 빈 페이지, 공통 레이아웃, 타입 정의 완성

### Task 1-1: 프로젝트 구조 및 타입 정의

**예상 기간**: 2-3일
**담당**: Lead Developer

#### 구현 사항

- [x] `src/types/index.ts` 생성 - 핵심 타입 정의

  ```typescript
  interface NotionPost {
    id: string
    title: string
    slug: string
    category: string
    tags: string[]
    publishedAt: Date
    updatedAt?: Date
    status: 'Draft' | 'Published'
    description: string
    content: Block[] // Notion 블록
    thumbnail?: string
  }

  interface NotionCategory {
    id: string
    name: string
    postCount: number
  }
  ```

- [x] `src/constants/` 폴더 생성
  - `siteConfig.ts` - 사이트 메타데이터 (제목, 설명, 소유자)
  - `routes.ts` - 라우트 경로 상수
- [x] `src/lib/` 폴더 생성
  - `cn.ts` - classname 유틸 (Tailwind merge)
  - `utils.ts` - 공통 유틸 함수

#### 체크리스트

- [x] TypeScript 타입 정의 완료
- [x] ESLint 설정 검증
- [x] 프로젝트 구조 정의

---

### Task 1-2: Notion API 클라이언트 설정

**예상 기간**: 2일
**담당**: Backend/API Developer

#### 구현 사항

- [x] `.env.local` 템플릿 생성
  ```env
  NOTION_API_KEY=your_api_key
  NEXT_PUBLIC_NOTION_DATABASE_ID=your_database_id
  NEXT_PUBLIC_SITE_TITLE=My Tech Blog
  NEXT_PUBLIC_SITE_DESCRIPTION=개인 기술 블로그
  ```
- [x] `src/lib/notion/client.ts` - Notion API 클라이언트 초기화
- [x] `src/lib/notion/types.ts` - Notion API 응답 타입
- [x] `src/lib/notion/queries.ts` - Notion DB 조회 쿼리
- [x] 기본 에러 처리 구현

#### 체크리스트

- [x] Notion API 연결 테스트
- [x] 환경 변수 설정 검증
- [x] 에러 처리 구현

---

### Task 1-3: 레이아웃 컴포넌트 구축

**예상 기간**: 3-4일
**담당**: UI Developer

#### 구현 사항

- [x] `src/components/layout/Header.tsx`
  - 로고/사이트명 (클릭 시 홈)
  - 데스크톱 네비게이션 (홈, 카테고리)
  - 모바일 메뉴 아이콘 (해머거 메뉴)
  - 검색 바 입력 필드 (제출 미구현, 디자인만)
  - 테마 토글 버튼
- [x] `src/components/layout/MobileMenu.tsx`
  - 모바일/태블릿 전용 메뉴
  - 홈, 카테고리 링크
- [x] `src/components/layout/Footer.tsx`
  - 저작권 정보
  - 소셜 링크 (GitHub, Twitter, etc.)
  - 연락처 정보
- [x] `src/components/layout/RootLayout.tsx`
  - Header + Main Content + Footer 구조
  - 더미 데이터로 렌더링

#### 체크리스트

- [x] 모든 화면 크기에서 레이아웃 검증 (320px, 768px, 1024px+)
- [x] 어두운/밝은 테마 프리뷰
- [x] 네비게이션 구조 확인

---

### Task 1-4: 라우트 구조 및 페이지 스켈레톤

**예상 기간**: 3일
**담당**: Lead Developer

#### 구현 사항

- [x] 라우트 폴더 구조 생성
  ```
  app/
  ├─ page.tsx                    # 홈
  ├─ blog/
  │  └─ [slug]/
  │     └─ page.tsx              # 글 상세
  ├─ category/
  │  └─ [categoryName]/
  │     └─ page.tsx              # 카테고리
  ├─ search/
  │  └─ page.tsx                 # 검색 결과
  ├─ api/
  │  ├─ posts/
  │  │  └─ route.ts              # 글 목록 API
  │  ├─ categories/
  │  │  └─ route.ts              # 카테고리 목록 API
  │  └─ search/
  │     └─ route.ts              # 검색 API
  └─ layout.tsx                  # 루트 레이아웃
  ```
- [x] 각 페이지에 빈 페이지 컴포넌트 생성
  ```typescript
  export default function Page() {
    return <div className="min-h-screen">Loading...</div>;
  }
  ```
- [x] API 라우트 스켈레톤 생성
- [x] 동적 라우트 매개변수 설정

#### 체크리스트

- [x] 모든 라우트 경로 접근 가능 확인
- [x] 404 에러 페이지 설정
- [x] 라우트 메타데이터 설정

---

### Task 1-5: 테마 토글 및 Dark Mode 설정

**예상 기간**: 2일
**담당**: UI Developer

#### 구현 사항

- [x] `src/components/providers/ThemeProvider.tsx` - next-themes 설정
- [x] 시스템 기본값 감지 (prefers-color-scheme)
- [x] 테마 저장소 (localStorage)
- [x] Tailwind Dark Mode 클래스명 확인
- [x] 모든 컴포넌트에 테마 호환성 적용

#### 체크리스트

- [x] 밝은/어두운 테마 전환 동작 확인
- [x] 새로고침 후 테마 유지 확인
- [x] 기본 색상 팔레트 정의

---

## Phase 2️⃣: UI/UX 구현 (2-3주)

**목표**: 모든 페이지의 UI 완성 (더미 데이터), 반응형 디자인, 공통 컴포넌트

### Task 2-1: 공통 UI 컴포넌트 구축 ✅

**예상 기간**: 4-5일
**담당**: UI Developer
**상태**: 완료 (2026-08-31)

#### 구현 사항

- [x] `src/components/ui/` 디렉토리 구성
  - [x] `Button.tsx` - shadcn/ui 버튼 또는 커스텀
  - [x] `Card.tsx` - 글 카드, 메인 컨테이너
  - [x] `Badge.tsx` - 카테고리, 태그 배지
  - [x] `Input.tsx` - 검색 입력 필드
  - [x] `Select.tsx` - 선택지 (드롭다운)
  - [x] `Pagination.tsx` - 페이지네이션 (새로 구축)
  - [x] `Skeleton.tsx` - 로딩 스켈레톤
  - [x] `EmptyState.tsx` - 결과 없음 상태 (새로 구축)
- [x] 색상 팔레트 정의 (Primary, Secondary, Accent, Foreground, Muted, Ring)
  - `src/constants/theme-colors.ts` 생성
  - 카테고리별 배지 색상 매핑 (Next.js, React, Node.js 등)
  - 태그 색상 함수 (featured, new, popular)
- [x] 타이포그래피 설정 (Heading1~4, Body, Caption, Label)
- [x] 간격 시스템 통일 (xs, sm, md, lg, xl, 2xl)
- [x] 블로그 더미 데이터 생성 (`src/constants/mock-data.ts`)
  - 12개 기술 블로그 글 (9개 카테고리)
  - 카테고리별 필터링 함수
  - 검색 함수
  - 페이지네이션 함수
  - 관련 글/이전/다음 글 조회 함수

#### 체크리스트

- [x] 모든 컴포넌트 TypeScript 검증 완료
- [x] 다크모드 호환성 검증 완료
- [x] 컴포넌트 재사용성 확인 완료
- [x] npm run check-all 통과 (TypeScript, ESLint, Prettier)

---

### Task 2-2: 홈 페이지 UI 완성 ✅

**예상 기간**: 4-5일
**담당**: UI Developer
**상태**: 완료 (2026-08-31)

- Task 2-2-1: 섹션 컴포넌트 구축 ✅
- Task 2-2-2: 통합 및 시각적 테스트 ✅

#### 구현 사항

- [x] 히어로 섹션 (`BlogHero`)
  - [x] 블로그 제목, 설명
  - [x] CTA 버튼 2개 (최신 글 보기, 카테고리 둘러보기)
  - [x] 배경 그래디언트 효과
  - [x] 통계 정보 (글 수, 카테고리 수, 기술 스택)
- [x] 카테고리 필터 바 (`CategoryFilter`)
  - [x] "모든 카테고리" 탭 (기본 선택)
  - [x] 각 카테고리 탭 (9개 카테고리: React, Next.js, TypeScript 등)
  - [x] 활성 탭 하이라이트
  - [x] 카테고리별 글 개수 표시
  - [x] 상태 관리 (선택된 카테고리)
- [x] 글 목록 영역 (`PostGrid`)
  - [x] 카드형 글 항목 (제목, 발행일, 카테고리, 미리보기 텍스트)
  - [x] Next.js Image 최적화된 썸네일 이미지
  - [x] 더미 데이터 12개 항목
  - [x] 태그 표시
- [x] 글 카드 컴포넌트 (`PostCard`)
  - [x] default 변형 (풀 스타일)
  - [x] compact 변형 (작은 레이아웃)
  - [x] 호버 효과
  - [x] 수정 날짜 표시
- [x] 페이지네이션
  - [x] 이전/다음 버튼
  - [x] 페이지 번호 (동적 계산, 최대 5개)
  - [x] 현재 페이지 하이라이트
  - [x] 비활성 버튼 상태 처리
- [x] 반응형 디자인 확인
  - [x] 모바일(320px): 1-컬럼 레이아웃
  - [x] 태블릿(768px): 2-컬럼 레이아웃
  - [x] 데스크톱(1024px+): 3-컬럼 레이아웃

#### 체크리스트

- [x] 모바일(320px): 단일 컬럼 레이아웃 ✅
- [x] 태블릿(768px): 2-컬럼 레이아웃 ✅
- [x] 데스크톱(1024px+): 3-컬럼 레이아웃 ✅
- [x] 터치 친화적 버튼 크기 (최소 44x44px) ✅
- [x] EmptyState 처리 (글 없음) ✅
- [x] 카테고리별 필터링 동작 ✅
- [x] npm run check-all 통과 ✅
- [x] npm run build 성공 ✅
- [x] 홈 페이지 통합 (Task 2-2-2) ✅
  - [x] src/app/page.tsx 수정 (BlogHero, CategoryFilter, PostGrid 통합)
  - [x] 더미 데이터 적용 (12개 글, 9개 카테고리)
  - [x] 카테고리 필터 상태 관리
  - [x] 반응형 검증 (모바일 1/태블릿 2/데스크톱 3-컬럼)
  - [x] 다크모드 호환성 검증 (dark: 클래스 작동)
  - [x] npm run build 성공 (3.0s, First Load JS 185kB)

---

### Task 2-3: 글 상세 페이지 UI 완성 ✅

**예상 기간**: 4-5일
**담당**: UI Developer
**상태**: 완료 (2026-08-31)

- Task 2-3-1: 컴포넌트 구축 ✅
- Task 2-3-2: 페이지 통합 및 반응형 검증 ✅

#### 구현 사항

- [x] 글 메타데이터 섹션 (`PostDetailHeader`)
  - [x] 제목 (h1)
  - [x] 발행일, 수정일
  - [x] 카테고리 배지
  - [x] 태그 목록 (멀티 배지)
  - [x] 저자 정보 (아바타 + 이름)
- [x] 본문 영역 (`PostContent`)
  - [x] 더미 마크다운 콘텐츠 (플레이스홀더)
  - [x] 제목 (h1-h6 스타일링 준비)
  - [x] 단락, 코드 블록 (구문 강조 준비)
  - [x] 다크모드 텍스트 색상
- [x] 목차 (`TableOfContents`)
  - [x] h2/h3 제목 기반 구조
  - [x] 모바일: Sheet 아코디언
  - [x] 데스크톱: 우측 사이드바
  - [x] 스무스 스크롤 링크 (id 기반)
- [x] 관련 글 섹션 (`RelatedPosts`)
  - [x] 같은 카테고리 최근 글 3-5개
  - [x] PostCard (compact 변형) 재사용
  - [x] 반응형 그리드 (sm:2/lg:3-컬럼)
  - [x] EmptyState 처리
- [x] 이전/다음 글 네비게이션 (`PostNav`)
  - [x] 좌측/우측 카드 레이아웃
  - [x] 글 제목 + 발행일 표시
  - [x] 없는 경우 숨김
- [ ] 공유 버튼 (선택) - Phase 3에서 구현 예정
- [x] 반응형 디자인 확인
- [x] 페이지 통합 (`src/app/blog/[slug]/page.tsx`)
  - [x] 모든 섹션 컴포넌트 조합
  - [x] mock-data 함수 활용 (getPostBySlug, getRelatedPosts, getAdjacentPosts)
  - [x] async/await 패턴 (Next.js 15 호환)
  - [x] notFound() 활용 (404 처리)
  - [x] Grid 레이아웃 (lg:grid-cols-3)

#### 체크리스트

- [x] 모바일(320px): 1-컬럼 (목차 아코디언) ✅
- [x] 태블릿(768px): 1-컬럼 + 우측 사이드바 시작 ✅
- [x] 데스크톱(1024px+): 본문 + 우측 사이드바 (목차 고정) ✅
- [x] 터치 친화적 버튼 크기 ✅
- [x] 다크모드 호환성 (모든 섹션) ✅
- [x] 페이지 렌더링 (에러 없음) ✅
- [x] npm run check-all 통과 ✅
- [x] npm run build 성공 (5.87kB, First Load JS 177kB) ✅

---

### Task 2-4: 카테고리 페이지 UI 완성 ✅

**예상 기간**: 3-4일
**담당**: UI Developer
**상태**: Task 2-4-1 완료 (2026-08-31)

#### 구현 사항

- [x] 카테고리 헤더 (`CategoryHeader`)
  - [x] 카테고리 제목 (h1)
  - [x] 글 개수 표시 (예: "React (12)")
  - [x] 카테고리 설명 (선택)
  - [x] 그래디언트 배경 효과
  - [x] 반응형 레이아웃
- [x] 카테고리 탭/필터 (`CategoryTabs`)
  - [x] "모든 카테고리" (홈으로 링크)
  - [x] 개별 카테고리 탭 (9개)
  - [x] 현재 카테고리 강조 표시
  - [x] 카테고리별 글 개수 표시
  - [x] 가로 스크롤 가능한 레이아웃
- [x] 글 목록 (홈과 동일 스타일)
  - [x] PostGrid 컴포넌트 재사용
  - [x] 카테고리별 필터링된 글
  - [x] mock-data 함수 활용 (getPostsByCategory)
- [x] 페이지네이션
  - [x] PostGrid에 통합됨
- [x] 반응형 디자인
  - [x] 모바일(320px): 1-컬럼
  - [x] 태블릿(768px): 2-컬럼
  - [x] 데스크톱(1024px+): 3-컬럼
- [x] 페이지 통합 (src/app/category/[categoryName]/page.tsx)
  - [x] Server Component (async/await)
  - [x] 동적 카테고리 조회
  - [x] 404 처리 준비

#### 체크리스트

- [x] 현재 카테고리 동적 반영 ✅
- [x] 다른 카테고리로 전환 동작 (라우팅) ✅
- [x] 모바일 탭 스크롤 동작 ✅
- [x] npm run check-all 통과 ✅
- [x] npm run build 성공 (1.07kB, First Load JS 184kB) ✅

---

### Task 2-5: 검색 결과 페이지 UI 완성 ✅

**예상 기간**: 3-4일
**담당**: UI Developer
**상태**: 완료 (2026-08-31)

#### 구현 사항

- [x] 검색 헤더 (`SearchHeader`)
  - [x] 검색 쿼리 표시 (예: "검색 결과: 'React' (5개 항목)")
  - [x] 새로운 검색 입력 필드
  - [x] 쿼리 없을 때 안내 문구 표시
- [x] 검색 결과 목록
  - [x] 글 카드 (홈과 동일 스타일, PostCard 재사용)
  - [x] 검색어 하이라이트 (더미용)
  - [x] 제목 + 카테고리 + 미리보기
  - [x] PostGrid로 반응형 그리드
- [x] 결과 없음 상태 (EmptyState)
  - [x] 메시지: "검색 결과가 없습니다"
  - [x] "다시 검색하기" 버튼 (홈으로 이동)
- [x] 페이지네이션 (결과 많을 경우)
  - [x] Pagination 컴포넌트 재사용
- [x] 반응형 디자인
  - [x] 모바일(320px): 1-컬럼
  - [x] 태블릿(768px): 2-컬럼
  - [x] 데스크톱(1024px+): 3-컬럼

#### 체크리스트

- [x] 검색 쿼리 URL 파라미터 파싱 (ex: /search?q=react) ✅
- [x] 결과 없음 UI 검증 ✅
- [x] 모바일 레이아웃 확인 ✅
- [x] npm run check-all 통과 ✅
- [x] npm run build 성공 ✅

---

### Task 2-6: 반응형 디자인 최적화 및 크로스 브라우저 테스트 ✅

**예상 기간**: 3-4일
**담당**: UI/QA
**상태**: 완료 (2026-08-31)

#### 구현 사항

- [x] 디바이스별 테스트
  - [x] **모바일 (320px - 480px)**
    - [x] 1-컬럼 레이아웃 ✅
    - [x] 해머버거 메뉴 동작 ✅
    - [x] 터치 버튼 크기 검증 (44x44px) ✅
  - [x] **태블릿 (768px - 1024px)**
    - [x] 2-컬럼 → 3-컬럼 전환 ✅
    - [x] 사이드바 표시 (글 상세) ✅
  - [x] **데스크톱 (1024px+)**
    - [x] 풀 3-컬럼 레이아웃 ✅
- [x] 성능 최적화
  - [x] 이미지 lazy loading 준비 ✅
  - [x] 폰트 로딩 최적화 ✅
- [x] 브라우저 호환성 (코드 레벨 검토)
  - [x] Chrome ✅
  - [x] Firefox ✅
  - [x] Safari ✅
  - [x] Edge ✅
- [x] 접근성 확인 (WCAG 2.1 AA)
  - [x] 색상 대비 검증 ✅
  - [x] 키보드 네비게이션 ✅
  - [x] 스크린 리더 호환성 ✅
  - [x] 모바일 터치 타겟 44x44px ✅ (수정 완료)

#### 체크리스트

- [x] 모든 해상도에서 UI 레이아웃 검증 ✅
- [x] 이미지 반응형 설정 (srcset, sizes) ✅
- [x] 폰트 로딩 상태 처리 (fout/foit) ✅
- [x] npm run check-all 통과 ✅
- [x] npm run build 성공 (11개 라우트) ✅

#### 발견 및 수정 내용

**모바일 터치 타겟 (44x44px) 최적화:**

- Pagination 컴포넌트: `size-9` → `size-11 sm:size-9`
- Header 햄버거 메뉴: `size-11` 추가
- 테마 토글 버튼: `size-11 sm:size-9`
- 모바일 메뉴 링크: `min-h-11 items-center`
- 카테고리 필터: `flex min-h-11 items-center`
- Footer 소셜 아이콘: `size-11` (히트 영역 확대)

---

## Phase 3️⃣: 핵심 기능 구현 (3-4주)

**목표**: Notion API 통합, 데이터 연동, 모든 기능(F001~F005) 완성

### Task 3-1: Notion API 통합 - 글 목록 조회 (F001) ✅

**예상 기간**: 3-4일
**담당**: Backend/API Developer
**상태**: 완료 (2026-08-31)

#### 구현 사항

- [x] `src/api/posts/route.ts` 구현
  - Notion DB에서 발행된 글 목록 조회
  - 필터: `status = "Published"`
  - 정렬: `publishedAt DESC` (최신순)
  - 페이지네이션 지원 (limit, offset)
- [x] `src/lib/notion/queries.ts` 구현
  - `fetchAllPosts(filter, sort, pagination)` 함수
  - `collectAllDataSourceRows` 활용
- [x] 에러 처리 (Notion API 다운, 데이터 누락)
- [x] 응답 캐싱 (3시간 max-age, 24시간 stale-while-revalidate)

#### 체크리스트

- [x] 실제 Notion DB 연결 테스트 ✅
- [x] 페이지네이션 동작 확인 ✅
- [x] 에러 응답 처리 확인 ✅

---

### Task 3-2: Notion API 통합 - 글 상세 조회 (F002) ✅

**예상 기간**: 3-4일
**담당**: Backend/API Developer
**상태**: 완료 (2026-09-02)

#### 구현 사항

- [x] `src/api/posts/[slug]/route.ts` 구현
  - Slug 기반 개별 글 조회
  - 메타데이터 + 본문 블록 반환
- [x] Notion 블록 → React 컴포넌트 변환 시작
  - 기본 블록 타입 (paragraph, heading, code, image) 지원
  - 구문 강조 (react-syntax-highlighter 사용)
- [x] 메타데이터 추출
  - 제목, 발행일, 카테고리, 태그, 썸네일
- [x] 마크다운 렌더링 준비
  - Code 블록 구문 강조 완성

#### 체크리스트

- [x] Slug 기반 라우팅 동작 확인 ✅
- [x] 블록 변환 테스트 (단순 블록부터) ✅
- [x] 메타데이터 완전성 확인 ✅

---

### Task 3-3: 글 본문 렌더링 - 마크다운 & 구문 강조 ✅

**예상 기간**: 3-4일
**담당**: Backend/UI Developer
**상태**: 완료 (2026-09-02)

#### 구현 사항

- [x] `src/components/content-renderer/` 디렉토리 구성
  - ContentRenderer.tsx (메인 렌더러)
  - BlockRenderer.tsx (개별 블록 처리)
  - blocks/ 디렉토리 (블록별 컴포넌트)
- [x] 지원 블록 타입
  - Paragraph (텍스트)
  - Heading (h1-h6)
  - Code (구문 강조 포함)
  - Image
  - Quote
  - List (ordered/unordered)
  - Divider
  - Callout
- [x] 구문 강조 설정
  - react-syntax-highlighter 라이브러리 사용
  - 언어 자동 감지
  - 테마 (light/dark 호환)
- [x] 유틸리티 함수
  - extractPlainText, extractStyledText
  - getRichText, getCodeLanguage, getImageUrl 등

#### 체크리스트

- [x] 모든 주요 블록 타입 렌더링 확인 ✅
- [x] 구문 강조 스타일 확인 ✅
- [x] 모바일에서 코드 블록 가독성 검증 ✅
- [x] 리스트 그룹화 로직 구현 ✅

---

### Task 3-4: 카테고리 필터링 및 동적 카테고리 조회 (F003) ✅

**예상 기간**: 3-4일
**담당**: Backend/Frontend Developer
**상태**: 완료 (2026-09-02)

#### 구현 사항

- [x] `src/api/categories/route.ts` 구현
  - 모든 카테고리 목록 + 각 카테고리별 글 개수 반환
  - 캐싱 설정 (3시간 max-age, 24시간 stale-while-revalidate)
- [x] `fetchCategories()` 함수 구현
  - Notion DB에서 동적 카테고리 추출
  - 발행된 글들에서 카테고리 추출 및 집계
  - 알파벳 순 정렬
- [x] `fetchPostsByCategory()` 함수 구현
  - 카테고리별 글 필터링 조회
  - 최신순 정렬
- [x] Notion 필터 통합
  - fetchAllPosts에 카테고리 필터 지원

#### 체크리스트

- [x] 카테고리 목록 API 동작 확인 ✅
- [x] 카테고리별 글 필터링 확인 ✅
- [x] 동적 카테고리 라우팅 테스트 ✅
- [x] 타입 검증 및 린트 통과 ✅

---

### Task 3-5: 검색 기능 구현 (F004) ✅

**예상 기간**: 3-4일
**담당**: Backend/Frontend Developer
**상태**: 완료 (2026-09-03)

#### 구현 사항

- [x] `src/api/search/route.ts` 구현
  - 검색 쿼리 파라미터 처리
  - 제목 + 태그 검색 (키워드 매칭)
  ```typescript
  GET /api/search?q=react
  Response: {
    results: NotionPost[],
    query: "react",
    total: number
  }
  ```
- [x] 검색 알고리즘
  - 제목 매칭 (완전 또는 부분)
  - 태그 매칭
  - 결과 정렬 (관련성 순)
- [x] 홈 페이지 검색 바 동작
  - 입력 → `/search?q=keyword` 이동
  - 검색 결과 페이지에서 키워드 표시
- [x] 검색 결과 하이라이트 (선택)
  - 검색어를 결과에서 강조 표시

#### 체크리스트

- [x] 검색 API 동작 확인 ✅
- [x] 검색 결과 정확성 검증 ✅
- [x] 검색어 없는 경우 처리 (공백, 빈 쿼리) ✅

---

### Task 3-6: 페이지 메타데이터 & SEO 최적화 ✅

**예상 기간**: 2-3일
**담당**: Frontend Developer
**상태**: 완료 (2026-09-03)

#### 구현 사항

- [x] `src/lib/seo.ts` 생성
  - 메타 태그 생성 함수
  - Open Graph (og:title, og:description, og:image)
  - Twitter Card
- [x] 각 페이지에 동적 메타데이터 설정
  - 홈: 사이트 제목 + 설명
  - 글 상세: 글 제목 + 설명 + 썸네일
  - 카테고리: 카테고리 제목
  - 검색: 검색 쿼리
- [x] Sitemap 생성 (`src/app/sitemap.ts`)
- [x] robots.txt 설정 (`src/app/robots.ts`)

#### 체크리스트

- [x] 각 페이지 메타 태그 검증 (Chrome DevTools) ✅
- [x] Open Graph 미리보기 확인 (SNS 공유 시) ✅
- [x] 구조화된 데이터 (Schema.org) 설정 준비 ✅

---

### Task 3-7: 이전/다음 글 네비게이션 및 관련 글

**예상 기간**: 2-3일
**담당**: Backend Developer

#### 구현 사항

- [ ] 글 상세 페이지에서 이전/다음 글 계산
  - 발행일 기준 인접 글 찾기
  ```typescript
  const prev = posts.find(p => p.publishedAt < current.publishedAt)
  const next = posts.find(p => p.publishedAt > current.publishedAt)
  ```
- [ ] 같은 카테고리 최근 글 (관련 글 섹션)
  - 현재 글과 같은 카테고리
  - 발행일 내림차순
  - 최대 5개 반환
- [ ] 글 상세 페이지 렌더링에 포함
  - 이전/다음 버튼 + 글 제목
  - 관련 글 섹션

#### 체크리스트

- [ ] 첫 글/마지막 글에서 이전/다음 처리
- [ ] 관련 글이 없는 경우 처리
- [ ] 네비게이션 UI 상호작용 확인

---

## Phase 4️⃣: 성능 최적화 & 배포 (2주)

**목표**: 정적 생성, 캐싱 전략, SEO, 테스트, Vercel 배포

### Task 4-1: 정적 생성 및 캐싱 전략

**예상 기간**: 3-4일
**담당**: Backend/DevOps Developer

#### 구현 사항

- [ ] `generateStaticParams()` 구현
  - 블로그 글 페이지 사전 생성
  ```typescript
  export async function generateStaticParams() {
    const posts = await fetchAllPosts()
    return posts.map(p => ({ slug: p.slug }))
  }
  ```
- [ ] ISR (Incremental Static Regeneration) 설정
  - `revalidate` 옵션으로 자동 갱신 시간 설정
  ```typescript
  export const revalidate = 3600 // 1시간마다 재생성
  ```
- [ ] On-Demand Revalidation 구현
  - Notion 글 발행/수정 시 캐시 초기화
  - API 엔드포인트로 수동 갱신
  ```typescript
  // /api/revalidate?secret=xxx&path=/blog/slug
  revalidatePath('/blog/[slug]')
  ```
- [ ] 캐시 헤더 설정
  - API 응답에 Cache-Control 추가

#### 체크리스트

- [ ] 정적 생성 빌드 성공 확인
- [ ] ISR 동작 테스트 (시간 경과 후 재생성)
- [ ] On-Demand Revalidation 동작 확인

---

### Task 4-2: 이미지 최적화

**예상 기간**: 2-3일
**담당**: Frontend Developer

#### 구현 사항

- [ ] Next.js Image 컴포넌트로 전환
  - Notion 이미지 최적화
  - 썸네일 이미지 최적화
  - 자동 WebP 변환
- [ ] 이미지 크기 최적화
  - srcset 설정 (모바일/데스크톱별 크기)
  - `sizes` 속성 정의
- [ ] Lazy Loading 설정
  - Loading 스켈레톤 표시
- [ ] 이미지 해상도 설정
  - 썸네일: 400x300px (모바일), 600x400px (데스크톱)
  - 본문 이미지: 800px 최대 너비

#### 체크리스트

- [ ] 이미지 로드 시간 측정 (Lighthouse)
- [ ] 모바일에서 이미지 크기 검증
- [ ] 이미지 누락 시 대체 텍스트 확인

---

### Task 4-3: 번들 크기 최적화

**예상 기간**: 2-3일
**담당**: Frontend Developer

#### 구현 사항

- [ ] 동적 import 적용
  - 필요 시에만 라이브러리 로드
  ```typescript
  const Prism = dynamic(() => import('prismjs'))
  ```
- [ ] Tree Shaking 확인
  - ESLint 플러그인으로 unused export 검사
- [ ] 번들 분석
  - `next-bundle-analyzer` 또는 `webpack-bundle-analyzer`로 분석
- [ ] 대용량 라이브러리 제거 또는 대체
  - moment → date-fns (더 작음)
  - 불필요한 polyfill 제거

#### 체크리스트

- [ ] 번들 크기 측정 (Lighthouse)
- [ ] First Contentful Paint (FCP) < 1.5s 확인
- [ ] Cumulative Layout Shift (CLS) < 0.1 확인

---

### Task 4-4: 에러 처리 및 로딩 상태

**예상 기간**: 2-3일
**담당**: Backend/Frontend Developer

#### 구현 사항

- [ ] API 에러 처리
  - 404 (글 없음)
  - 500 (Notion API 오류)
  - 타임아웃 처리
- [ ] Loading 상태 UI
  - 스켈레톤 로더 (Card, Text)
  - 진행률 표시 (선택)
- [ ] Error Boundary 구현
  ```typescript
  export function ErrorBoundary({ error, reset }) {
    return (
      <div>
        <h2>문제가 발생했습니다</h2>
        <button onClick={reset}>다시 시도</button>
      </div>
    );
  }
  ```
- [ ] 친절한 에러 메시지
  - 사용자 관점에서 이해 가능한 메시지

#### 체크리스트

- [ ] 모든 API 실패 상황 테스트 (네트워크 끊김 등)
- [ ] 로딩 상태 UX 확인
- [ ] 에러 페이지 디자인 일치성 확인

---

### Task 4-5: 테스트 작성 (기본)

**예상 기간**: 3-4일
**담당**: QA/Frontend Developer

#### 구현 사항

- [ ] Unit Tests (Jest)
  - 유틸 함수 테스트
  - 컴포넌트 렌더링 테스트 (React Testing Library)
  ```typescript
  test('홈 페이지가 렌더링된다', () => {
    render(<HomePage />);
    expect(screen.getByText(/최근 글/)).toBeInTheDocument();
  });
  ```
- [ ] E2E Tests (선택, Playwright 또는 Cypress)
  - 주요 사용자 여정 테스트
  - 검색 → 글 읽기 → 카테고리 전환
- [ ] 성능 테스트 (Lighthouse)
  - Performance > 90
  - Accessibility > 90
  - SEO > 90

#### 체크리스트

- [ ] 테스트 커버리지 > 70% (중요 기능)
- [ ] 모든 테스트 통과 확인
- [ ] CI/CD 파이프라인에 테스트 통합

---

### Task 4-6: Vercel 배포 설정

**예상 기간**: 2-3일
**담당**: DevOps Developer

#### 구현 사항

- [ ] Vercel 프로젝트 생성
  - GitHub 리포지토리 연결
  - 자동 배포 설정
- [ ] 환경 변수 설정
  - 프로덕션: NOTION_API_KEY, DATABASE_ID
  - Preview: 테스트 데이터베이스 (선택)
- [ ] 도메인 설정
  - Custom Domain 또는 vercel.app 사용
- [ ] 배포 전 체크리스트
  - 모든 기능 테스트 완료
  - 성능 최적화 완료
  - SEO 메타 태그 확인
- [ ] 배포 후 모니터링
  - Web Vitals 데이터 수집
  - 에러 로깅 (Sentry, 선택)

#### 체크리스트

- [ ] 프로덕션 배포 완료
- [ ] 커스텀 도메인 연결 확인
- [ ] SSL 인증서 자동 설정 확인
- [ ] 배포 로그 모니터링

---

### Task 4-7: 모니터링 및 유지보수 (지속)

**예상 기간**: 지속
**담당**: DevOps/Lead Developer

#### 구현 사항

- [ ] Web Vitals 모니터링
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)
- [ ] Notion API 상태 감시
  - API 응답 시간 추적
  - 실패율 모니터링
- [ ] 정기 점검 (월 1회)
  - 새 Notion 글 발행 테스트
  - 모바일 UX 검증
  - 성능 지표 리뷰

#### 체크리스트

- [ ] 모니터링 대시보드 설정
- [ ] 알림 규칙 설정 (에러율, 응답시간)
- [ ] 정기 유지보수 일정 수립

---

## 📋 전체 체크리스트

### Phase 1 완료 조건

- [x] 모든 라우트 접근 가능
- [x] Notion API 클라이언트 테스트 완료
- [x] 레이아웃 컴포넌트 모든 화면에서 렌더링 확인
- [x] 테마 토글 동작

### Phase 2 완료 조건

- [x] 모든 페이지 UI 완성 (더미 데이터) ✅
- [x] 모바일/태블릿/데스크톱 반응형 검증 ✅
- [x] 색상, 타이포그래피, 간격 일관성 확인 ✅
- [x] 다크모드 호환성 100% ✅

### Phase 3 완료 조건

- [ ] Notion API 통합 전체 완료
- [ ] 모든 기능 (F001~F005) 동작 확인
- [ ] 실제 Notion DB 데이터로 엔드-투-엔드 테스트
- [ ] SEO 메타 태그 적용

### Phase 4 완료 조건

- [ ] 성능 지표: Lighthouse > 90
- [ ] Vercel 배포 완료
- [ ] 모니터링 시스템 구축
- [ ] 정기 유지보수 일정 수립

---

## 🎯 주요 의존성 및 위험 요소

| 항목                       | 설명                    | 영향 | 완화 방법                                  |
| -------------------------- | ----------------------- | ---- | ------------------------------------------ |
| **Notion API 레이트 제한** | 3 req/sec 제한          | 높음 | 요청 배치 처리, ISR 캐싱                   |
| **블록 변환 복잡성**       | Notion 블록 타입 다양성 | 중간 | remark/rehype 라이브러리 사용, 점진적 구현 |
| **이미지 최적화**          | CDN 설정, WebP 지원     | 중간 | Next.js Image 컴포넌트 활용                |
| **모바일 테스트**          | 다양한 디바이스 호환성  | 중간 | 반응형 테스트 자동화                       |
| **SEO 메타 데이터**        | 동적 메타 태그 생성     | 낮음 | Next.js generateMetadata() 활용            |

---

## 📞 참고 문서

- **PRD**: `docs/PRD.md` - 제품 요구사항 상세
- **기술 스택**: Next.js 15.5.3, React 19, TailwindCSS 4
- **컴포넌트 가이드**: `docs/guides/component-patterns.md`
- **스타일링 가이드**: `docs/guides/styling-guide.md`
- **Next.js 15 가이드**: `docs/guides/nextjs-15.md`
- **형식 처리**: `docs/guides/forms-react-hook-form.md`

---

## 🚀 배포 후 로드맵 (추가 기능)

다음 버전에서 구현할 수 있는 기능들:

- [ ] **댓글 시스템** (Giscus, Disqus 통합)
- [ ] **뉴스레터 구독** (이메일 발송)
- [ ] **글 조회수 추적** (Analytics)
- [ ] **어두운 모드 고급 설정** (시간별 자동 전환)
- [ ] **다국어 지원** (i18n)
- [ ] **RSS 피드** (RSS 구독)
- [ ] **관련 글 AI 추천** (벡터 검색)
- [ ] **검색 고급 필터** (날짜, 저자별)

---

**마지막 업데이트**: 2026-09-03
**프로젝트 매니저**: Claude Code
**상태**: Phase 1 완료 ✅ → Phase 2 완료 ✅ → **Phase 3 진행 중** → Phase 4 대기 중
**진행률**:

- Phase 1: 5/5 Tasks ✅ (100%)
- Phase 2: 6/6 Tasks ✅ (100%) 완료 🎉
  - Task 2-1: 공통 UI 컴포넌트 ✅ (100%)
  - Task 2-2: 홈 페이지 UI 완성 ✅ (100%)
    - Task 2-2-1: 섹션 컴포넌트 구축 ✅
    - Task 2-2-2: 통합 및 시각적 테스트 ✅
  - Task 2-3: 글 상세 페이지 UI ✅ (100%)
    - Task 2-3-1: 컴포넌트 구축 ✅
    - Task 2-3-2: 페이지 통합 및 반응형 검증 ✅
  - Task 2-4: 카테고리 페이지 UI ✅ (100%)
    - Task 2-4-1: 컴포넌트 구축 ✅
    - Task 2-4-2: 시각적 테스트 ✅
  - Task 2-5: 검색 결과 페이지 UI ✅ (100%)
  - Task 2-6: 반응형 디자인 최적화 ✅ (100%)
- Phase 3: 6/7 Tasks ✅ (86%) - 진행 중 🚀
  - Task 3-1: Notion API 통합 - 글 목록 조회 ✅ (100%)
  - Task 3-2: Notion API 통합 - 글 상세 조회 ✅ (100%)
  - Task 3-3: 글 본문 렌더링 - 마크다운 & 구문 강조 ✅ (100%)
  - Task 3-4: 카테고리 필터링 및 동적 카테고리 조회 ✅ (100%)
  - Task 3-5: 검색 기능 구현 ✅ (100%)
  - Task 3-6: 페이지 메타데이터 & SEO 최적화 ✅ (100%)
  - Task 3-7: 이전/다음 글 네비게이션 (0%)
- Phase 4: 0/7 Tasks (0%) - 대기 중

**Phase 2 완료 성과**:

✅ **구현 완료**

- 4개 주요 페이지 (홈, 글 상세, 카테고리, 검색)
- 15개 이상의 UI 컴포넌트
- 더미 데이터 기반 전체 UI 완성

✅ **반응형 디자인**

- 모바일 (320px): 1-컬럼 레이아웃
- 태블릿 (768px): 2-컬럼 레이아웃
- 데스크톱 (1024px+): 3-컬럼 레이아웃

✅ **다크모드**

- 100% 호환성
- 모든 페이지에서 다크 클래스 적용
- 색상 대비 WCAG AA 이상

✅ **접근성 (WCAG 2.1 AA)**

- 모바일 터치 타겟 44x44px 이상
- 시맨틱 HTML 적용
- 키보드 네비게이션 가능

✅ **빌드 성공**

- npm run build 성공 (11개 라우트)
- npm run check-all 통과
- TypeScript 검증 완료
