import { FC, PropsWithChildren } from 'react'

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='es'>
      <head>
        <title>Finances Charts</title>
      </head>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
