import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 날짜 포맷팅 함수
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 슬러그 생성 함수 (한글 지원)
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-가-힣]/g, '') // 한글, 알파벳, 숫자, 공백, 하이픈만 유지
    .replace(/[\s_-]+/g, '-') // 공백 및 언더스코어를 하이픈으로
    .replace(/^-+|-+$/g, '') // 앞뒤 하이픈 제거
}

// 텍스트 자르기 함수
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

// 상대 시간 표현 (예: "2시간 전")
export function getRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - dateObj.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) return '방금 전'
  if (diffMin < 60) return `${diffMin}분 전`
  if (diffHour < 24) return `${diffHour}시간 전`
  if (diffDay < 7) return `${diffDay}일 전`
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}주 전`
  if (diffDay < 365) return `${Math.floor(diffDay / 30)}개월 전`
  return `${Math.floor(diffDay / 365)}년 전`
}

// 배열에서 중복 제거
export function removeDuplicates<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

// 객체 깊은 병합
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target } as T
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(
        result[key] || {},
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        source[key] as Record<string, any>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any
    } else if (source[key] !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result[key] = source[key] as any
    }
  }
  return result
}
