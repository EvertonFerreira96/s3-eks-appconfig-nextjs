import { NextResponse, NextRequest } from 'next/server'

export const config = {
  matcher: ['/_next/static/css/app/:filename*', '/_next/static/css/:filename*'],
}

const rgxToGetWhitelabelDomain = /whitelabel=([^&]+)/

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')
  // const domain = host?.indexOf('') !== -1 ? host?.split('.')[0] : 'orbia'

  const domain = host?.match(rgxToGetWhitelabelDomain) || 'orbia'

  return NextResponse.redirect(
    new URL(`/themes/_${domain}.layout.css`, request.url),
  )
}
