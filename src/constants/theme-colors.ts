/**
 * 색상 팔레트 정의
 * TailwindCSS 유틸리티 클래스명을 기반으로 정의되어 있습니다.
 * 각 색상은 light/dark 테마에서 사용됩니다.
 */

export const THEME_COLORS = {
  /**
   * Primary Color (주요 색상)
   * 버튼, 링크, 활성 상태 등에 사용
   */
  primary: {
    light: 'hsl(0 0% 0%)',
    dark: 'hsl(0 0% 100%)',
    className: 'text-primary dark:text-primary',
  },

  /**
   * Secondary Color (보조 색상)
   * 버튼, 배지 등의 보조적 요소
   */
  secondary: {
    light: 'hsl(240 10% 90%)',
    dark: 'hsl(240 10% 20%)',
    className: 'text-secondary dark:text-secondary',
  },

  /**
   * Accent Color (강조 색상)
   * 호버 상태, 포커스 상태 등
   */
  accent: {
    light: 'hsl(240 84% 59%)',
    dark: 'hsl(240 84% 59%)',
    className: 'text-accent dark:text-accent',
  },

  /**
   * Foreground Color (텍스트 색상)
   */
  foreground: {
    light: 'hsl(0 0% 0%)',
    dark: 'hsl(0 0% 100%)',
    className: 'text-foreground dark:text-foreground',
  },

  /**
   * Muted (약한 색상)
   * 비활성 상태, 보조 텍스트 등
   */
  muted: {
    light: 'hsl(240 10% 95%)',
    dark: 'hsl(240 10% 15%)',
    className: 'text-muted dark:text-muted',
  },

  /**
   * Muted Foreground (약한 텍스트)
   * 보조 설명, 날짜, 메타데이터 등
   */
  mutedForeground: {
    light: 'hsl(240 5% 40%)',
    dark: 'hsl(240 5% 60%)',
    className: 'text-muted-foreground dark:text-muted-foreground',
  },

  /**
   * Destructive (위험 색상)
   * 삭제, 에러 등에 사용
   */
  destructive: {
    light: 'hsl(0 84% 60%)',
    dark: 'hsl(0 84% 60%)',
    className: 'text-destructive dark:text-destructive',
  },

  /**
   * Ring Color (포커스 링)
   * 키보드 포커스 등에 사용
   */
  ring: {
    light: 'hsl(240 84% 59%)',
    dark: 'hsl(240 84% 59%)',
  },
}

/**
 * 카테고리별 색상 매핑
 * 각 카테고리에 고유한 배지 색상을 할당합니다.
 */
export const CATEGORY_COLORS: Record<string, string> = {
  'Next.js': 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100',
  React: 'bg-cyan-100 text-cyan-900 dark:bg-cyan-900 dark:text-cyan-100',
  TypeScript: 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100',
  'Node.js':
    'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100',
  JavaScript:
    'bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100',
  CSS: 'bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100',
  DevOps:
    'bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100',
  Database: 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100',
  Performance: 'bg-pink-100 text-pink-900 dark:bg-pink-900 dark:text-pink-100',
}

/**
 * 기본 카테고리 색상
 */
export const DEFAULT_CATEGORY_COLOR =
  'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'

/**
 * 태그 색상 매핑
 */
export const TAG_COLORS: Record<string, string> = {
  default:
    'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700',
  featured:
    'bg-yellow-50 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800',
  new: 'bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-800',
  popular:
    'bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
}

/**
 * 카테고리별 색상 조회 함수
 */
export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || DEFAULT_CATEGORY_COLOR
}

/**
 * 태그별 색상 조회 함수
 */
export function getTagColor(tag: string): string {
  // 특정 태그에 대한 특별한 색상을 지정할 수 있습니다.
  if (tag === 'featured') return TAG_COLORS.featured
  if (tag === 'new') return TAG_COLORS.new
  if (tag === 'popular') return TAG_COLORS.popular
  return TAG_COLORS.default
}

/**
 * 타이포그래피 스타일 정의
 */
export const TYPOGRAPHY = {
  /**
   * 페이지 제목 (H1)
   */
  heading1: 'text-4xl font-bold tracking-tight sm:text-5xl',

  /**
   * 섹션 제목 (H2)
   */
  heading2: 'text-3xl font-bold tracking-tight',

  /**
   * 서브 제목 (H3)
   */
  heading3: 'text-2xl font-semibold tracking-tight',

  /**
   * 작은 제목 (H4)
   */
  heading4: 'text-xl font-semibold',

  /**
   * 본문 텍스트
   */
  body: 'text-base leading-relaxed',

  /**
   * 작은 텍스트 (캡션)
   */
  caption: 'text-sm text-muted-foreground',

  /**
   * 매우 작은 텍스트 (레이블)
   */
  label: 'text-xs font-medium uppercase tracking-wider',
}

/**
 * 간격 시스템 (Tailwind 기반)
 * 일관된 레이아웃을 위해 미리 정의된 간격
 */
export const SPACING = {
  xs: '0.5rem', // 8px
  sm: '1rem', // 16px
  md: '1.5rem', // 24px
  lg: '2rem', // 32px
  xl: '3rem', // 48px
  '2xl': '4rem', // 64px
}
