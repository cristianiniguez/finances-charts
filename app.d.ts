type AccountDataItemTag = {
  name: string
  color: string
}

type AccountDataItem = {
  detail: string
  date: string
  income: number
  outcome: number
  tags: AccountDataItemTag[]
}
