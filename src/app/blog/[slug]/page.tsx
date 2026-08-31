import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface BlogPageProps {
  params: { slug: string }
}

export default function BlogPage({ params }: BlogPageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-4 text-3xl font-bold">글: {params.slug}</h1>
          <p className="text-muted-foreground">
            Phase 3에서 구현될 예정입니다.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
