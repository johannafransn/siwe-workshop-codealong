import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
	const isAuthenticated = request.cookies.has('addresso')
	const url = request.nextUrl.clone()
	const { pathname } = url

	/** @todo call backend to check connected address and signature in cookies are valid */

	if (!isAuthenticated && pathname.endsWith('/contacts')) {
		return NextResponse.redirect(new URL('/', url))
	}

	if ((isAuthenticated && pathname.endsWith('/')) || !pathname) {
		return NextResponse.redirect(new URL('/contacts', url))
	}
}
 
export const config = {
	matcher: ['/:path*'],
}

/**
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
 
export function middleware(req: NextRequest, event: NextFetchEvent) {
  event.waitUntil(
    fetch('https://my-analytics-platform.com', {
      method: 'POST',
      body: JSON.stringify({ pathname: req.nextUrl.pathname }),
    })
  )
 
  return NextResponse.next()
}
 */
/** https://nextjs.org/docs/app/building-your-application/routing/middleware#conditional-statements */
