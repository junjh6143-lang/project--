import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('Button Component', () => {
  it('렌더링 테스트', () => {
    render(<Button>클릭</Button>)
    expect(screen.getByRole('button', { name: '클릭' })).toBeInTheDocument()
  })

  it('disabled 상태 테스트', () => {
    render(<Button disabled>비활성</Button>)
    expect(screen.getByRole('button', { name: '비활성' })).toBeDisabled()
  })

  it('variant prop 적용 테스트', () => {
    render(<Button variant="outline">아웃라인</Button>)
    const button = screen.getByRole('button', { name: '아웃라인' })
    expect(button.className).toContain('border')
  })

  it('size prop 적용 테스트', () => {
    render(<Button size="lg">크다</Button>)
    const button = screen.getByRole('button', { name: '크다' })
    expect(button).toBeInTheDocument()
  })

  it('className prop 병합 테스트', () => {
    render(<Button className="custom-class">커스텀</Button>)
    const button = screen.getByRole('button', { name: '커스텀' })
    expect(button.className).toContain('custom-class')
  })
})
