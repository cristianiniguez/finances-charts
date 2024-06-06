import { FC, PropsWithChildren } from 'react'
import { Providers } from './providers'

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='es'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
