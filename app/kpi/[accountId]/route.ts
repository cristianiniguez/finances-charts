import { getAccountData } from '@/db'
import { getBalanceFromData, getBalanceSVG } from '@/lib/utils'

type GetParams = { accountId: string }

export const GET: NextRouteHandler<GetParams> = async (
  _,
  { params: { accountId } }
) => {
  const accountData = await getAccountData(accountId)
  const currentBalance = getBalanceFromData(accountData)

  return new Response(getBalanceSVG(currentBalance), {
    headers: { 'content-type': 'image/svg+xml' }
  })
}
