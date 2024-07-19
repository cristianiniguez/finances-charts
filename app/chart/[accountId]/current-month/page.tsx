import { FC } from 'react'
import { getAccountData } from '@/db'
import AccountChart from './chart'

type AccountChartPageProps = {
  params: { accountId: string }
}

const AccountChartPage: FC<AccountChartPageProps> = async props => {
  const accountData = await getAccountData(props.params.accountId)
  return <AccountChart data={accountData} />
}

export default AccountChartPage
