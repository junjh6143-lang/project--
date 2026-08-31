import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { Container } from './container'
import { SITE_AUTHOR, SOCIAL_LINKS } from '@/constants/siteConfig'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t">
      <Container>
        <div className="py-12">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* About */}
            <div className="space-y-2">
              <h3 className="font-semibold">소개</h3>
              <p className="text-muted-foreground text-sm">
                개인 기술 블로그입니다. 개발 관련 주제를 다룹니다.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
              <h3 className="font-semibold">빠른 링크</h3>
              <div className="space-y-1 text-sm">
                <div>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    홈
                  </Link>
                </div>
                <div>
                  <Link
                    href="/category/React"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    카테고리
                  </Link>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-2">
              <h3 className="font-semibold">팔로우</h3>
              <div className="-m-2.5 flex gap-1">
                {/* 최소 44x44px 터치 타겟 확보를 위해 패딩으로 히트 영역 확장 */}
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground flex size-11 items-center justify-center rounded-md transition"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground flex size-11 items-center justify-center rounded-md transition"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground flex size-11 items-center justify-center rounded-md transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="text-muted-foreground hover:text-foreground flex size-11 items-center justify-center rounded-md transition"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t pt-8">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">
                © {currentYear} {SITE_AUTHOR}. 모든 권리 보유.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
