'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export interface TableOfContentsItem {
  id: string
  text: string
  level: 2 | 3
}

export interface TableOfContentsProps {
  items?: TableOfContentsItem[]
  title?: string
}

// 모바일 목차 (아코디언)
function MobileTableOfContents({
  items = [],
  title = '목차',
}: TableOfContentsProps) {
  const [open, setOpen] = useState(false)

  if (items.length === 0) {
    return null
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="mb-6 w-full sm:hidden">
          <ChevronDown className="mr-2 size-4" />
          {title} ({items.length})
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="space-y-4">
          <h3 className="text-foreground text-lg font-semibold">{title}</h3>
          <nav className="space-y-2">
            {items.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`hover:bg-accent hover:text-accent-foreground block truncate rounded-md px-3 py-2 text-sm transition-colors ${
                  item.level === 3
                    ? 'text-muted-foreground ml-4'
                    : 'text-foreground font-medium'
                }`}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// 데스크톱 목차 (사이드바)
function DesktopTableOfContents({
  items = [],
  title = '목차',
}: TableOfContentsProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <aside className="hidden sm:block">
      <div className="sticky top-20 space-y-4">
        <h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">
          {title}
        </h3>
        <nav className="border-border space-y-2 border-l pl-4">
          {items.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`hover:text-primary block truncate text-sm transition-colors ${
                item.level === 3
                  ? 'text-muted-foreground hover:text-muted-foreground/80 ml-3'
                  : 'text-foreground font-medium'
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export function TableOfContents(props: TableOfContentsProps) {
  return (
    <>
      <MobileTableOfContents {...props} />
      <DesktopTableOfContents {...props} />
    </>
  )
}
