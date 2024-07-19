import { FC } from 'react'
import { getAccountData } from '@/db'
import AccountChart from './chart'
// import dayjs from 'dayjs'

type AccountChartPageProps = {
  params: { accountId: string }
}

const AccountChartPage: FC<AccountChartPageProps> = async props => {
  // const currentMonthStartDate = dayjs().startOf('month').format('YYYY-MM-DD')
  // const currentMonthEndDate = dayjs().endOf('month').format('YYYY-MM-DD')
  // console.log({ currentMonthStartDate, currentMonthEndDate })
  // const accountData = await getAccountData(props.params.accountId, {
  //   and: [
  //     {
  //       property: 'date',
  //       date: { on_or_after: currentMonthStartDate }
  //     },
  //     {
  //       property: 'date',
  //       date: { on_or_before: currentMonthEndDate }
  //     }
  //   ]
  // })
  const accountData = await getAccountData(props.params.accountId)
  return <AccountChart data={accountData} />
}

export default AccountChartPage
