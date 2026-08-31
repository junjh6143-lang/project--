'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface NavItem {
  title: string
  href: string
}

const navItems: NavItem[] = [{ title: '홈', href: '/' }]

// 더미 카테고리 (Phase 3-4에서 동적 로드)
const categories = [
  { title: 'React', href: '/category/React' },
  { title: 'Node.js', href: '/category/Node.js' },
  { title: 'DevOps', href: '/category/DevOps' },
]

export function MainNav() {
  const pathname = usePathname()
  const [categoryOpen, setCategoryOpen] = useState(false)

  return (
    <nav className="flex items-center space-x-6 lg:space-x-8">
      {navItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'hover:text-primary text-sm font-medium transition-colors',
            pathname === item.href ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          {item.title}
        </Link>
      ))}

      {/* 카테고리 드롭다운 */}
      <div className="group relative">
        <button
          className={cn(
            'hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors',
            pathname.startsWith('/category')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
          onClick={() => setCategoryOpen(!categoryOpen)}
        >
          카테고리
          <ChevronDown className="h-4 w-4" />
        </button>

        {/* 드롭다운 메뉴 */}
        <div className="bg-background absolute top-full left-0 z-50 mt-2 hidden w-48 rounded-lg border shadow-lg group-hover:block">
          {categories.map(cat => (
            <Link
              key={cat.href}
              href={cat.href}
              className="hover:bg-accent hover:text-accent-foreground block px-4 py-2 text-sm first:rounded-t-lg last:rounded-b-lg"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
