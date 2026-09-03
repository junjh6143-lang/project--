import type { Metadata } from 'next'
import {
  SITE_TITLE,
  SITE_URL,
  SITE_KEYWORDS,
  DEFAULT_OG_IMAGE,
} from '@/constants/siteConfig'

interface SEOMetadataParams {
  title: string
  description: string
  path: string
  image?: string
}

export function buildMetadata({
  title,
  description,
  path,
  image,
}: SEOMetadataParams): Metadata {
  const fullTitle = `${title} | ${SITE_TITLE}`
  const pageUrl = `${SITE_URL}${path}`
  const ogImage = image || DEFAULT_OG_IMAGE

  return {
    title: fullTitle,
    description,
    keywords: SITE_KEYWORDS,
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      type: 'article',
      images: [
        {
          url: `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${SITE_URL}${ogImage}`],
    },
  }
}
