export const formatCurrency = (value: number, options?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat('es-BO', {
    style: 'currency',
    currency: 'BOB',
    ...options
  }).format(value)
