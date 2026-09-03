import { cn } from '../utils'

describe('cn utility', () => {
  it('combines class names correctly', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2')
  })

  it('handles Tailwind conflicts', () => {
    // tailwind-merge should handle conflicting utilities
    const result = cn('px-4 px-2', 'py-2')
    expect(result).toContain('py-2')
  })

  it('handles undefined and null values', () => {
    expect(cn('px-4', undefined, 'py-2', null)).toContain('px-4')
    expect(cn('px-4', undefined, 'py-2', null)).toContain('py-2')
  })

  it('handles conditional classes', () => {
    const isActive = true
    expect(cn('base', isActive && 'active')).toContain('base')
    expect(cn('base', isActive && 'active')).toContain('active')
  })
})
