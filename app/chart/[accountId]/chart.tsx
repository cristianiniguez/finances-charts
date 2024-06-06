'use client'

import { FC } from 'react'
import { groupBy } from 'lodash'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

type AccountChartProps = {
  data: AccountDataItem[]
}

const getMarginsData = (data: AccountDataItem[]) => {
  const dataGrouped = groupBy(data, 'date')
  return Object.entries(dataGrouped).map(([date, items]) => {
    const margin = items.reduce(
      (m, { income, outcome }) => m + income - outcome,
      0
    )
    return { date, margin }
  })
}

const getBalances = (margins: number[]) => {
  return margins.reduce<number[]>((balances, margin, i) => {
    return [...balances, (balances[i - 1] ?? 0) + margin]
  }, [])
}

const AccountChart: FC<AccountChartProps> = ({ data }) => {
  const marginsData = getMarginsData(data)
  const dates = marginsData.map(({ date }) => date)
  const margins = marginsData.map(({ margin }) => margin)
  const balances = getBalances(margins)

  const chartOptions: Highcharts.Options = {
    title: { text: 'Month Resume' },
    series: [
      { data: margins, type: 'column', name: 'Margins' },
      { data: balances, type: 'line', name: 'Balance' }
    ],
    xAxis: {
      categories: dates
    }
  }

  return (
    <div style={{ height: '100vh' }}>
      <HighchartsReact
        containerProps={{ style: { height: '100%' } }}
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  )
}

export default AccountChart
