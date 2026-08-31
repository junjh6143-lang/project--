'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMediaQuery } from 'usehooks-ts'
import { Menu, Search } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { MainNav } from '@/components/navigation/main-nav'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { Container } from './container'
import { ThemeToggle } from '@/components/theme-toggle'
import { SITE_TITLE } from '@/constants/siteConfig'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const isMobile = useMediaQuery('(max-width: 768px)')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">{SITE_TITLE}</span>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && <MainNav />}
          </div>

          {/* Search Bar (Desktop) */}
          {!isMobile && (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative hidden md:flex">
                <Input
                  type="search"
                  placeholder="검색..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="h-9 py-2 pr-4 pl-8 text-sm"
                />
                <Search className="text-muted-foreground absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 transform" />
              </div>
            </form>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            {isMobile && (
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  {/* 최소 44x44px 터치 타겟 확보 */}
                  <Button variant="ghost" size="icon" className="size-11">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">메뉴 열기</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <MobileNav onClose={() => setMobileMenuOpen(false)} />
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>

        {/* Search Bar (Mobile) */}
        {isMobile && (
          <form onSubmit={handleSearch} className="pb-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="검색..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="py-2 pr-4 pl-8 text-sm"
              />
              <Search className="text-muted-foreground absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 transform" />
            </div>
          </form>
        )}
      </Container>
    </header>
  )
}
