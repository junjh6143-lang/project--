import { notionClient } from './client'
import { NOTION_DATABASE_ID } from '@/constants/siteConfig'

let cachedDataSourceId: string | null = null
let inFlight: Promise<string> | null = null

/**
 * Notion database_id에서 data_source_id를 조회하고 캐싱
 * v5.26.0 API에서는 dataSources.query()를 사용해야 하며,
 * 이를 위해 먼저 data_source_id를 확보해야 함
 */
export async function getDataSourceId(): Promise<string> {
  if (cachedDataSourceId) return cachedDataSourceId

  if (!inFlight) {
    inFlight = (async () => {
      try {
        if (!NOTION_DATABASE_ID) {
          throw new Error(
            'NEXT_PUBLIC_NOTION_DATABASE_ID 환경변수가 설정되지 않았습니다.'
          )
        }

        const database = await notionClient.databases.retrieve({
          database_id: NOTION_DATABASE_ID,
        })

        if (
          !('data_sources' in database) ||
          database.data_sources.length === 0
        ) {
          throw new Error(
            'Notion 데이터베이스에 연결된 data source가 없습니다.'
          )
        }

        cachedDataSourceId = database.data_sources[0].id
        return cachedDataSourceId
      } finally {
        inFlight = null
      }
    })()
  }

  return inFlight
}
