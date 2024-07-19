'use client'

import { FC } from 'react'
import { groupBy, sumBy } from 'lodash'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import dayjs from 'dayjs'
import { formatCurrency } from '@/lib/utils'

type AccountChartProps = {
  data: AccountDataItem[]
}

type AccountChartDataItem = {
  date: string
  income: number
  outcome: number
  margin: number
  balance: number
}

const isCurrentMonth = (date: string) => dayjs(date).isSame(dayjs(), 'month')

const getChartData = (data: AccountDataItem[]) => {
  const dataGrouped = groupBy(data, 'date')

  return Object.entries(dataGrouped)
    .reduce<AccountChartDataItem[]>((chartData, [date, items], i) => {
      const income = sumBy(items, 'income')
      const outcome = sumBy(items, 'outcome')
      const margin = sumBy(items, item => item.income - item.outcome)
      const balance = (chartData[i - 1]?.balance ?? 0) + margin
      const chartDataItem = { date, income, outcome, margin, balance }
      return [...chartData, chartDataItem]
    }, [])
    .filter(item => isCurrentMonth(item.date))
}

const AccountChart: FC<AccountChartProps> = ({ data }) => {
  const chartData = getChartData(data)

  const dates = chartData.map(item => item.date)
  const incomesData = chartData.map(item => item.income)
  const outcomesData = chartData.map(item => -item.outcome)
  const balances = chartData.map(item => item.balance)

  const chartOptions: Highcharts.Options = {
    title: { text: `Month Resume (${dayjs().format('MMMM YYYY')})` },
    tooltip: {
      pointFormatter: function () {
        return formatCurrency(this.y ?? 0)
      }
    },
    series: [
      { data: incomesData, type: 'column', name: 'Incomes' },
      { data: outcomesData, type: 'column', name: 'Outcomes' },
      { data: balances, type: 'line', name: 'Balance' }
    ],
    xAxis: {
      categories: dates,
      labels: {
        formatter: function () {
          return dayjs(this.value).format('DD MMMM')
        }
      }
    },
    yAxis: {
      title: { text: '' },
      labels: {
        formatter: function () {
          return formatCurrency(+this.value, { notation: 'compact' })
        }
      }
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
