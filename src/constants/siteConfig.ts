export const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE || 'My Tech Blog'
export const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION || '개인 기술 블로그'
export const SITE_AUTHOR = 'Tech Blogger'
export const SITE_KEYWORDS = [
  '기술',
  '블로그',
  'React',
  'Next.js',
  'TypeScript',
]
export const DEFAULT_OG_IMAGE = '/og-default.png'
export const NOTION_DATABASE_ID =
  process.env.NEXT_PUBLIC_NOTION_DATABASE_ID || ''

export const SOCIAL_LINKS = {
  github: 'https://github.com',
  twitter: 'https://twitter.com',
  linkedin: 'https://linkedin.com',
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
