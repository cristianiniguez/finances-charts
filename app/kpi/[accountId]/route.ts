import { getAccountData } from '@/db'
import { sumBy } from 'lodash'

type GetParams = { accountId: string }

export const GET: NextRouteHandler<GetParams> = async (
  _,
  { params: { accountId } }
) => {
  const accountData = await getAccountData(accountId)
  const currentBalance = sumBy(
    accountData,
    ({ income, outcome }) => income - outcome
  )
  const currentBalanceFormatted = new Intl.NumberFormat('es-BO', {
    style: 'currency',
    currency: 'BOB'
  }).format(currentBalance)

  const svg = /* svg */ `
    <svg viewBox="0 0 200 100" fill="white" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="black" font-family="system-ui" font-weight="700">
        ${currentBalanceFormatted}
      </text>    
    </svg>
  `

  return new Response(svg, { headers: { 'content-type': 'image/svg+xml' }})
}
