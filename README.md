# 개인 기술 블로그

Notion을 CMS로 활용한 개인 기술 블로그. Notion에서 글을 작성하면 자동으로 블로그에 반영됩니다.

## 🎯 주요 기능

- **글 목록 조회**: Notion 데이터베이스에서 발행된 글 목록 자동 로드
- **글 상세 페이지**: 제목, 메타데이터, 본문, 관련 글 표시
- **카테고리별 필터링**: 카테고리로 글 필터링
- **검색 기능**: 제목 및 태그로 글 검색
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript 5.6+
- **CMS**: Notion API (@notionhq/client)
- **Styling**: TailwindCSS v4, shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 아래 내용을 추가합니다:

```env
# Notion API
NEXT_PUBLIC_NOTION_DATABASE_ID=your_database_id
NOTION_API_KEY=your_api_key

# 선택사항
NEXT_PUBLIC_SITE_TITLE=My Tech Blog
NEXT_PUBLIC_SITE_DESCRIPTION=개인 기술 블로그
```

**설정 방법:**

- `NEXT_PUBLIC_NOTION_DATABASE_ID`: Notion 데이터베이스 ID (URL에서 추출)
- `NOTION_API_KEY`: [Notion API Integration](https://www.notion.so/profile/integrations) 에서 생성

### 3. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 블로그를 확인할 수 있습니다.

## 📚 문서

자세한 요구사항 및 설계는 `docs/PRD.md`를 참조하세요.

## 🔧 개발 명령어

```bash
# 개발 서버 실행 (Turbopack)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 실행
npm start

# 코드 품질 검사
npm run check-all

# Lint 수정
npm run lint:fix

# 포맷팅
npm run format
```

## 📖 Notion 데이터베이스 구조

다음 필드를 가진 Notion 데이터베이스를 생성해야 합니다:

| 필드명    | 타입         | 필수 | 설명                   |
| --------- | ------------ | ---- | ---------------------- |
| Title     | Title        | ✓    | 글의 제목              |
| Slug      | Text         | ✓    | URL-friendly 식별자    |
| Category  | Select       | ✓    | 글의 카테고리          |
| Tags      | Multi-select | ○    | 글의 태그들            |
| Published | Date         | ✓    | 발행일                 |
| Status    | Select       | ✓    | 상태 (Draft/Published) |
| Content   | Page content | ✓    | 글의 본문              |

## 🚢 배포

Vercel에서 배포하는 것을 권장합니다:

1. GitHub에 저장소 푸시
2. [Vercel](https://vercel.com) 에 로그인
3. "New Project" → GitHub 저장소 연결
4. 환경 변수 설정 (`NOTION_API_KEY`, `NEXT_PUBLIC_NOTION_DATABASE_ID`)
5. 배포 완료

## 📝 라이센스

MIT
