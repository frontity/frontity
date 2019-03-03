import { Mode, HeaderConfig } from "../../types";

export default ({ mode }: { mode: Mode }): HeaderConfig => {
  const commonHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Origin, X-Requested-With, Content-Type": "Accept"
  };
  const staticHeaders = {};
  const dynamicHeaders = {};
  if (mode === "development") {
    commonHeaders["Cache-Control"] = "no-cache, no-store, must-revalidate";
  } else {
    staticHeaders["Cache-Control"] =
      "public, max-age=31536000, s-maxage=31536000, immutable";
    dynamicHeaders["Cache-Control"] =
      "public, max-age=0, s-maxage=120, stale-while-revalidate=31536000, stale-if-error=31536000";
  }
  return {
    static: { ...staticHeaders, ...commonHeaders },
    dynamic: { ...dynamicHeaders, ...commonHeaders }
  };
};
