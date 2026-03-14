// middleware.ts
import { withAuth } from "next-auth/middleware";

// Use withAuth to explicitly export the middleware function
export default withAuth({
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  // Protects the dashboard and all sub-routes
  matcher: [
    "/dashboard/:path*", 
    "/journal/:path*", 
    "/skills/:path*"
  ],
};