import sumBy from 'lodash/sumBy'

export const getBalanceFromData = (data: AccountDataItem[]) =>
  sumBy(data, ({ income, outcome }) => income - outcome)

export const getBalanceSVG = (balance: number) => /* svg */ `
  <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="system-ui" font-weight="700">
      ${formatCurrency(balance)}
    </text>    
  </svg>
`

export const formatCurrency = (
  value: number,
  options?: Intl.NumberFormatOptions
) =>
  new Intl.NumberFormat('es-BO', {
    style: 'currency',
    currency: 'BOB',
    ...options
  }).format(value)
