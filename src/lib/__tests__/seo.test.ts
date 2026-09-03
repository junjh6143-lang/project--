import { buildMetadata } from '../seo'

describe('SEO Metadata', () => {
  it('buildMetadata 기본 메타데이터 생성', () => {
    const metadata = buildMetadata({
      title: '테스트 제목',
      description: '테스트 설명',
      path: '/test',
    })

    expect(metadata.title).toContain('테스트 제목')
    expect(metadata.description).toBe('테스트 설명')
  })

  it('buildMetadata Open Graph 메타데이터 생성', () => {
    const metadata = buildMetadata({
      title: '테스트',
      description: '설명',
      path: '/test',
      image: '/test.jpg',
    })

    expect(metadata.openGraph).toBeDefined()
    if (metadata.openGraph && typeof metadata.openGraph === 'object') {
      expect(metadata.openGraph.title).toContain('테스트')
      expect(metadata.openGraph.description).toBe('설명')
      expect(metadata.openGraph.images).toBeDefined()
    }
  })

  it('buildMetadata Twitter Card 메타데이터 생성', () => {
    const metadata = buildMetadata({
      title: '트위터 테스트',
      description: '트위터 설명',
      path: '/test',
    })

    expect(metadata.twitter).toBeDefined()
    if (metadata.twitter && typeof metadata.twitter === 'object') {
      expect(metadata.twitter.title).toContain('트위터 테스트')
      expect(metadata.twitter.description).toBe('트위터 설명')
    }
  })

  it('buildMetadata 응답이 메타데이터 객체', () => {
    const metadata = buildMetadata({
      title: '테스트',
      description: '설명',
      path: '/blog/test-post',
    })

    expect(metadata).toBeDefined()
    expect(metadata.title).toBeDefined()
    expect(metadata.description).toBeDefined()
  })
})
