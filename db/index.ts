import { Client, isFullPage } from '@notionhq/client'
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { orderBy } from 'lodash'

const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

export const getAccountData = async (accountId: string, filter?: QueryDatabaseParameters['filter']): Promise<AccountDataItem[]> => {
  const { results } = await notion.databases.query({ database_id: accountId, filter })

  const data = results.filter(isFullPage).map(({ properties }) => ({
    detail: (({ detail: detailRaw }) => {
      if (!detailRaw || detailRaw.type !== 'title') return ''

      return detailRaw.title.map(({ plain_text }) => plain_text).join('')
    })(properties),

    date: (({ date: dateRaw }) => {
      if (!dateRaw || dateRaw.type !== 'date') return ''
      return dateRaw.date?.start ?? ''
    })(properties),

    income: (({ income: incomeRaw }) =>
      (incomeRaw && incomeRaw.type === 'number' && incomeRaw.number) || 0)(properties),

    outcome: (({ outcome: outcomeRaw }) =>
      (outcomeRaw && outcomeRaw.type === 'number' && outcomeRaw.number) || 0)(properties),

    tags: (({ tags: tagsRaw }) => {
      if (!tagsRaw || tagsRaw.type !== 'multi_select') return []
      return tagsRaw.multi_select.map(opt => ({
        name: opt.name,
        color: opt.color
      }))
    })(properties)
  }))

  return orderBy(data, ['date'], ['asc'])
}
