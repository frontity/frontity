import { Mode, HeaderConfig } from "../../types";

export default ({ mode }: { mode: Mode }): HeaderConfig => {
  // Add CORS in general.
  const commonHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Origin, X-Requested-With, Content-Type": "Accept"
  };
  const staticHeaders = {};
  const dynamicHeaders = {};
  // Do not use browser cache in development.
  if (mode === "development") {
    commonHeaders["Cache-Control"] = "no-cache, no-store, must-revalidate";
  } else {
    // Use max cache for static assets in production.
    staticHeaders["Cache-Control"] =
      "public, max-age=31536000, s-maxage=31536000, immutable";
    // Don't cache in the browser but cache in the CDN for dynamic assets
    // in production.
    dynamicHeaders["Cache-Control"] =
      "public, max-age=0, s-maxage=120, stale-while-revalidate=31536000, stale-if-error=31536000";
  }
  return {
    static: { ...staticHeaders, ...commonHeaders },
    dynamic: { ...dynamicHeaders, ...commonHeaders }
  };
};
