import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = new URL(request.url)
  const secret = url.searchParams.get('s')

  if (secret !== process.env.APP_SECRET) {
    return NextResponse.json({ message: 'unauthorized '})
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/chart/:path*', '/kpi/:path*', '/kpi-all'],
}
