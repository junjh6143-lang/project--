export const ROUTES = {
  HOME: '/',
  BLOG: '/blog',
  BLOG_POST: (slug: string) => `/blog/${slug}`,
  CATEGORY: '/category',
  CATEGORY_PAGE: (categoryName: string) => `/category/${categoryName}`,
  SEARCH: '/search',
} as const

export const API_ROUTES = {
  POSTS: '/api/posts',
  POST_BY_SLUG: (slug: string) => `/api/posts/${slug}`,
  CATEGORIES: '/api/categories',
  SEARCH: '/api/search',
} as const
