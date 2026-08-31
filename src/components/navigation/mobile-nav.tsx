'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const navItems = [{ title: '홈', href: '/' }]

// 더미 카테고리 (Phase 3-4에서 동적 로드)
const categories = [
  { title: 'React', href: '/category/React' },
  { title: 'Node.js', href: '/category/Node.js' },
  { title: 'DevOps', href: '/category/DevOps' },
]

interface MobileNavProps {
  onClose: () => void
}

export function MobileNav({ onClose }: MobileNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col space-y-3 pt-6">
      {/* 메인 네비게이션 */}
      <div className="px-2">
        <h2 className="mb-2 px-2 text-lg font-semibold">메뉴</h2>
        <Separator className="mb-4" />
        <div className="space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block rounded-md px-2 py-1.5 text-sm leading-none font-medium no-underline transition-colors outline-none select-none',
                pathname === item.href ? 'bg-accent text-accent-foreground' : ''
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* 카테고리 */}
      <div className="px-2">
        <h2 className="mb-2 px-2 text-lg font-semibold">카테고리</h2>
        <Separator className="mb-4" />
        <div className="space-y-1">
          {categories.map(cat => (
            <Link
              key={cat.href}
              href={cat.href}
              onClick={onClose}
              className={cn(
                'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block rounded-md px-2 py-1.5 text-sm leading-none font-medium no-underline transition-colors outline-none select-none',
                pathname === cat.href ? 'bg-accent text-accent-foreground' : ''
              )}
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
