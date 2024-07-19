import { getAccountData, getAccountIds } from '@/db'
import { getBalanceFromData, getBalanceSVG } from '@/lib/utils'
import sum from 'lodash/sum'

type GetParams = { accountId: string }

export const GET: NextRouteHandler<GetParams> = async () => {
  const accountIds = await getAccountIds()

  const accountBalances = await Promise.all(
    accountIds.map(async id => {
      const data = await getAccountData(id)
      return getBalanceFromData(data)
    })
  )

  const currentBalance = sum(accountBalances)

  return new Response(getBalanceSVG(currentBalance), {
    headers: { 'content-type': 'image/svg+xml' }
  })
}
