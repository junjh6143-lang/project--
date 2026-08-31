import React from 'react'
import { cn } from '@/lib/utils'

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'border-muted-foreground/25 bg-muted/50 flex min-h-[400px] flex-col items-center justify-center space-y-4 rounded-lg border border-dashed px-4 py-16 text-center',
        className
      )}
    >
      {icon && (
        <div className="bg-muted flex size-16 items-center justify-center rounded-full">
          {icon}
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-foreground text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>

      {action && <div className="pt-2">{action}</div>}
    </div>
  )
}
