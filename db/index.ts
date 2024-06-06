import { Client, isFullPage } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

export const getAccountData = async (
  accountId: string
): Promise<AccountDataItem[]> => {
  const { results } = await notion.databases.query({
    database_id: accountId
  })

  return results.filter(isFullPage).map(({ properties }) => ({
    detail: (({ detail: detailRaw }) => {
      if (detailRaw.type !== 'title') return ''

      return detailRaw.title.map(({ plain_text }) => plain_text).join('')
    })(properties),

    date: (({ date: dateRaw }) => {
      if (dateRaw.type !== 'date') return ''
      return dateRaw.date?.start ?? ''
    })(properties),

    income: (({ income: incomeRaw }) =>
      (incomeRaw.type === 'number' && incomeRaw.number) || 0)(properties),

    outcome: (({ outcome: outcomeRaw }) =>
      (outcomeRaw.type === 'number' && outcomeRaw.number) || 0)(properties),

    tags: (({ tags: tagsRaw }) => {
      if (tagsRaw.type !== 'multi_select') return []
      return tagsRaw.multi_select.map(opt => ({
        name: opt.name,
        color: opt.color
      }))
    })(properties)
  }))
}
