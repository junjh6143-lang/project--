import { Client } from '@notionhq/client'

const apiKey = process.env.NOTION_API_KEY

if (!apiKey) {
  throw new Error(
    'NOTION_API_KEY 환경변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요.'
  )
}

export const notionClient = new Client({
  auth: apiKey,
})
