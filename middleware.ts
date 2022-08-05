// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let url = new URL(request.url);

  if(process.env.MAINTENANCE_MODE === 'true' && !(url.pathname.startsWith('/_next/') || url.pathname.startsWith('/res/') || url.pathname.includes("maintenance")))
    return NextResponse.rewrite(new URL('/maintenance', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}