'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">검색 결과</h1>
      <p className="text-muted-foreground mb-8">
        검색어: <strong>{query}</strong>
      </p>
      <p className="text-muted-foreground">Phase 3에서 구현될 예정입니다.</p>
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div>로딩 중...</div>}>
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
