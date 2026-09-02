'use client'

import { Suspense } from 'react'
import type { NotionBlock } from '@/types'
import { getRichText, extractPlainText, getCodeLanguage } from '../utils'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useTheme } from 'next-themes'

interface CodeBlockProps {
  block: NotionBlock
}

function CodeBlockContent({ block }: CodeBlockProps) {
  const { theme } = useTheme()
  const richText = getRichText(block)
  const code = extractPlainText(richText)
  const language = getCodeLanguage(block)

  const isDark = theme === 'dark'

  if (!code) {
    return (
      <pre className="bg-muted border-border mb-4 overflow-x-auto rounded-lg border p-4">
        <code className="text-muted-foreground text-sm">코드 없음</code>
      </pre>
    )
  }

  return (
    <div className="border-border mb-4 overflow-hidden rounded-lg border">
      <div className="bg-muted text-muted-foreground px-4 py-2 font-mono text-xs">
        {language || 'text'}
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={docco}
        customStyle={{
          margin: 0,
          padding: '1rem',
          backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          color: isDark ? '#e0e0e0' : '#333333',
        }}
        showLineNumbers
        wrapLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export function CodeBlock({ block }: CodeBlockProps) {
  return (
    <Suspense
      fallback={
        <pre className="bg-muted border-border mb-4 overflow-x-auto rounded-lg border p-4">
          <code className="text-muted-foreground text-sm">코드 로딩 중...</code>
        </pre>
      }
    >
      <CodeBlockContent block={block} />
    </Suspense>
  )
}
