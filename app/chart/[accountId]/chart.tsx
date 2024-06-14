'use client'

import { FC } from 'react'
import { groupBy, sumBy } from 'lodash'
import Highcharts, { SeriesColumnOptions } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import dayjs from 'dayjs'

type AccountChartProps = {
  data: AccountDataItem[]
}

const getChartData = (data: AccountDataItem[]) => {
  const dataGrouped = groupBy(data, 'date')
  return Object.entries(dataGrouped).map(([date, items]) => {
    const income = sumBy(items, 'income')
    const outcome = sumBy(items, 'outcome')
    const margin = sumBy(items, item => item.income - item.outcome)
    return { date, income, outcome, margin }
  })
}

const getX = (date: string) => dayjs(date).startOf('d').unix()

const AccountChart: FC<AccountChartProps> = ({ data }) => {
  const chartData = getChartData(data)
  console.log(chartData)

  const dates = chartData.map(item => item.date)
  const incomesData = chartData.map(item => item.income)
  const outcomesData = chartData.map(item => -item.outcome)

  const balances = chartData.reduce<number[]>((b, item, i) => {
    return [...b, (b[i - 1] ?? 0) + item.margin]
  }, [])

  const chartOptions: Highcharts.Options = {
    title: { text: 'Month Resume' },
    series: [
      { data: incomesData, type: 'column', name: 'Incomes' },
      { data: outcomesData, type: 'column', name: 'Outcomes' },
      { data: balances, type: 'line', name: 'Balance' }
    ],
    xAxis: { categories: dates }
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
