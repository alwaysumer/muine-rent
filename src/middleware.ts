import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// Skip static files, llms.txt, sitemap, robots, API and Next internals.
export const config = { matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"] };
