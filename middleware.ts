import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and Sanity Studio
    "/((?!_next/static|_next/image|favicon.ico|studio|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
    // Always run for API routes (except studio)
    "/api/((?!.*studio.*).*)",
  ],
};
