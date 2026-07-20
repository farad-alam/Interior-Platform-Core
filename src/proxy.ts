import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/dashboard/login',
  },
})

export const config = {
  matcher: [
    // Protect all /dashboard routes except the login page itself
    '/dashboard/:path*',
  ],
}
